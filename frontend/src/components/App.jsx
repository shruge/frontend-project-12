import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './styles/App.css';
import AuthForm from './AuthForm';
import NotFound from './NotFound';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<AuthForm />} />
      <Route path="/login" element={<AuthForm />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;
