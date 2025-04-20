import axios from 'axios';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
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
import { setAuthData } from '../store/slices/authSlice';

const AuthForm = () => {
  const [authError, setAuthError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.auth.username);
  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      password: '',
      username: '',
    },
    onSubmit: ({ username, password }, { resetForm }) => {
      setAuthError('');

      axios.post('http://localhost:5001/api/v1/login', JSON.stringify({ username, password }), {
        headers: { 'Content-Type': 'application/json' },
      })
        .then(({ data }) => {
          const { token } = data;

          localStorage.setItem('JWT', token);
          localStorage.setItem('username', username);
          dispatch(setAuthData({ token, username }));
          navigate('/');
          resetForm();
        })
        .catch(() => {
          setAuthError('Неверные имя пользователя или пароль');
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
                <FloatingLabel className="mb-3" label="Ваш ник">
                  <Form.Control
                    type="text"
                    name="username"
                    placeholder="Ваш ник"
                    autoComplete="username"
                    value={values.username}
                    onChange={handleChange}
                    isInvalid={authError.length}
                  />
                </FloatingLabel>
                <FloatingLabel className="mb-4" label="Пароль">
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Пароль"
                    autoComplete="password"
                    value={values.password}
                    onChange={handleChange}
                    isInvalid={authError.length}
                  />
                  {authError ? <div className="invalid-tooltip">{authError}</div> : null}
                </FloatingLabel>
                <Button className="w-100 mb-3" type="submit" variant="outline-primary">Вход</Button>
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
