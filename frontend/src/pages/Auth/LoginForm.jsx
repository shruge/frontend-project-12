import { useFormik } from 'formik'
import { useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/esm/Col'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import authImg from '../../assets/authImg.jpg'
import { getToken, setAuthError } from '../../store/slices/authSlice'
import { toastOptions } from '../../utils'

const AuthForm = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { username: userName, error: authError } = useSelector(state => state.authData)
  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      password: '',
      username: '',
    },
    validateOnChange: false,
    onSubmit: ({ username, password }, { resetForm }) => {
      dispatch(getToken({ username, password })).unwrap()
        .then(() => {
          navigate('/')
          resetForm()
        }).catch((e) => {
          const errorMessage = t(`fetchErrors.${e}`)

          dispatch(setAuthError(errorMessage))

          if (e === 'networkError') {
            toast.error(errorMessage, toastOptions)
          }
        })
    },
  })
  const isInvalid = authError && authError !== 'Ошибка соединения'

  useEffect(() => {
    if (userName.length) {
      navigate('/', { replace: true })
    }
  }, [userName, navigate])

  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col xs={12} md={8} className="col-xxl-6">
          <Card className="shadow-sm">
            <Card.Body className="row p-5">
              <Col xs={12} md={6} className="d-flex align-items-center justify-content-center">
                <img src={authImg} className="rounded-circle" alt={t('logIn')} />
              </Col>
              <Form className="col-12 col-md-6 mt-3 mt-md-0" onSubmit={handleSubmit}>
                <h1 className="text-center mb-4">{t('logIn')}</h1>
                <FloatingLabel className="mb-3" label={t('placeholders.username')} controlId="username">
                  <Form.Control
                    required
                    type="text"
                    id="username"
                    name="username"
                    isInvalid={isInvalid}
                    autoComplete="username"
                    onChange={handleChange}
                    value={values.username}
                    placeholder={t('placeholders.username')}
                  />
                </FloatingLabel>
                <FloatingLabel className="mb-4" label={t('labels.password')} controlId="password">
                  <Form.Control
                    required
                    id="password"
                    type="password"
                    name="password"
                    isInvalid={isInvalid}
                    value={values.password}
                    onChange={handleChange}
                    autoComplete="current-password"
                    placeholder={t('placeholders.password')}
                  />
                  {isInvalid ? <div className="invalid-tooltip">{authError}</div> : null}
                </FloatingLabel>
                <Button type="submit" className="w-100 mb-3" variant="outline-primary">
                  {t('logIn')}
                </Button>
              </Form>
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span>{t('noAccount')}</span>
                <Link to="/signup">{t('signUp')}</Link>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default AuthForm
