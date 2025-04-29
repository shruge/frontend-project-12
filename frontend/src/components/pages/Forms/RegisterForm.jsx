import { useFormik } from 'formik';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/esm/Button';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel';
import Row from 'react-bootstrap/esm/Row';
import Form from 'react-bootstrap/Form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import registrImg from '../../../assets/registrImg.jpg';
import { createUser, setAuthData } from '../../../store/slices/authSlice';
import { getRegistrSchema } from '../../../utils';

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const schema = getRegistrSchema();
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
          setErrors({ username: ' ', password: ' ', confirmPassword: err });
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
                <img src={registrImg} className="rounded-circle" alt="Регистрация" />
              </div>
              <Form className="w-50" onSubmit={handleSubmit}>
                <h1 className="text-center mb-4">Регистрация</h1>
                <FloatingLabel className="mb-3" label="Имя пользователя" controlId="username">
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
                    placeholder="От 3 до 20 символов"
                  />
                  {errors.username && touched.username ? <div className="invalid-tooltip">{errors.username}</div> : null}
                </FloatingLabel>
                <FloatingLabel className="mb-3" label="Пароль" controlId="password">
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
                    placeholder="Не менее 6 символов"
                    aria-describedby="passwordHelpBlock"
                  />
                  {errors.password && touched.password ? <div className="invalid-tooltip">{errors.password}</div> : null}
                </FloatingLabel>
                <FloatingLabel className="mb-4" label="Подтвердите пароль" controlId="password">
                  <Form.Control
                    required
                    type="password"
                    id="confirmPassword"
                    onBlur={handleBlur}
                    name="confirmPassword"
                    onChange={handleChange}
                    value={values.confirmPassword}
                    autoComplete="new-password"
                    isInvalid={errors.confirmPassword && touched.confirmPassword}
                    placeholder="Пароли должны совпадать"
                  />
                  {errors.confirmPassword && touched.confirmPassword ? <div className="invalid-tooltip">{errors.confirmPassword}</div> : null}
                </FloatingLabel>
                <Button className="w-100" type="submit" variant="outline-primary">Зарегистрироваться</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterForm;
