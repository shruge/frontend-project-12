import { useFormik } from 'formik';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/esm/Button';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel';
import Row from 'react-bootstrap/esm/Row';
import Form from 'react-bootstrap/Form';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import registrImg from '../../assets/registrImg.jpg';
import { createUser, setAuthData, setAuthError } from '../../store/slices/authSlice';
import { getRegistrSchema } from '../../utils';

const RegisterForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const schema = getRegistrSchema(t);
  const {
    setErrors, touched, errors, values, handleChange, handleSubmit, handleBlur,
  } = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validateOnBlur: false,
    validationSchema: schema,
    onSubmit: ({ username, password }, { resetForm }) => {
      dispatch(createUser({ username, password })).unwrap()
        .then(() => {
          dispatch(setAuthData({ username, password }));
          navigation('/');
          resetForm();
        }).catch((err) => {
          const errorMessage = t(`fetchErrors.${err}`);

          dispatch(setAuthError(errorMessage));
          setErrors({ username: ' ', password: ' ', confirmPassword: errorMessage });
        });
    },
  });

  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col xs={12} md={8} className="col-xxl-6">
          <Card className="shadow-sm">
            <Card.Body className="d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <div>
                <img src={registrImg} className="rounded-circle" alt={t('signUp')} />
              </div>
              <Form className="w-50" onSubmit={handleSubmit}>
                <h1 className="text-center mb-4">{t('signUp')}</h1>
                <FloatingLabel className="mb-3" label={t('labels.username')} controlId="username">
                  <Form.Control
                    required
                    type="text"
                    id="username"
                    name="username"
                    onBlur={handleBlur}
                    autoComplete="username"
                    onChange={handleChange}
                    value={values.username}
                    isInvalid={errors.username && touched.username}
                    placeholder={t('errors.usernameLen')}
                  />
                  {errors.username && touched.username ? <div className="invalid-tooltip">{errors.username}</div> : null}
                </FloatingLabel>
                <FloatingLabel className="mb-3" label={t('labels.password')} controlId="password">
                  <Form.Control
                    required
                    id="password"
                    type="password"
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.password}
                    autoComplete="new-password"
                    isInvalid={errors.password && touched.password}
                    placeholder={t('errors.pasMinWidth')}
                    aria-describedby="passwordHelpBlock"
                  />
                  {errors.password && touched.password ? <div className="invalid-tooltip">{errors.password}</div> : null}
                </FloatingLabel>
                <FloatingLabel className="mb-4" label={t('labels.passwordConfirm')} controlId="confirmPassword">
                  <Form.Control
                    required
                    type="password"
                    id="confirmPassword"
                    onBlur={handleBlur}
                    name="confirmPassword"
                    onChange={handleChange}
                    autoComplete="new-password"
                    value={values.confirmPassword}
                    isInvalid={errors.confirmPassword && touched.confirmPassword}
                    placeholder={t('errors.passwordConfirm')}
                  />
                  {errors.confirmPassword && touched.confirmPassword ? <div className="invalid-tooltip">{errors.confirmPassword}</div> : null}
                </FloatingLabel>
                <Button className="w-100" type="submit" variant="outline-primary">{t('buttons.signUp')}</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterForm;
