import { Field, Form, Formik } from 'formik';

const AuthForm = () => (
  <Formik
    initialValues={{ login: '', password: '' }}
  >
    {() => (
      <Form>
        <h1>Войти</h1>
        <Field type="text" name="login" placeholder="Ваш ник" autoComplete="login" />
        <Field type="password" name="password" placeholder="Пароль" autoComplete="password" />
        <button type="submit">Вход</button>
      </Form>
    )}
  </Formik>
);

export default AuthForm;
