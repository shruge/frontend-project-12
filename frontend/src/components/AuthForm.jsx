import { useFormik } from 'formik';
import { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/esm/Col';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import authImg from '../assets/authImg.jpg';
import { getToken } from '../store/slices/authSlice';

const AuthForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { username: userName, error: authError } = useSelector((state) => state.authData);
  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      password: '',
      username: '',
    },
    onSubmit: ({ username, password }, { resetForm }) => {
      dispatch(getToken({ username, password }))
        .unwrap()
        .then(() => {
          navigate('/');
          resetForm();
        });
    },
  });

  useEffect(() => {
    if (userName.length) { navigate('/', { replace: true }); }
  }, [userName, navigate]);

  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col xs={12} md={8} className="col-xxl-6">
          <Card className="shadow-sm">
            <Card.Body className="row p-5">
              <Col xs={12} md={6} className="d-flex align-items-center justify-content-center">
                <img src={authImg} className="rounded-circle" alt="Войти" />
              </Col>
              <Form className="col-12 col-md-6 mt-3 mt-md-0" onSubmit={handleSubmit}>
                <h1 className="text-center mb-4">Войти</h1>
                <FloatingLabel className="mb-3" label="Ваш ник" controlId="username">
                  <Form.Control
                    required
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Ваш ник"
                    isInvalid={authError}
                    autoComplete="username"
                    onChange={handleChange}
                    value={values.username}
                  />
                </FloatingLabel>
                <FloatingLabel className="mb-4" label="Пароль" controlId="password">
                  <Form.Control
                    required
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Пароль"
                    isInvalid={authError}
                    value={values.password}
                    onChange={handleChange}
                    autoComplete="current-password"
                  />
                  {authError ? <div className="invalid-tooltip">{authError}</div> : null}
                </FloatingLabel>
                <Button className="w-100 mb-3" type="submit" variant="outline-primary">Войти</Button>
              </Form>
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span>Нет аккаунта? </span>
                <a href="/signup">Регистрация</a>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AuthForm;
