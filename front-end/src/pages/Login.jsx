import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../images/logo.png';
import LoginInputs from '../components/LoginInputs';

export default function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      navigate('/customer/products');
    }
  }, []);

  return (
    <section className="h-screen flex flex-col justify-center items-center bg-amber-50">
      <img src={ logo } alt="Kneckos Delivery" className="h-auto max-w-md mx-auto py-8" />
      <LoginInputs />
    </section>
  );
}
