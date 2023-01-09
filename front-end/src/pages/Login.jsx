import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import Context from '../context/Context';
import { requestPost, setToken } from '../services/requests';
import logo from '../images/logo.png';

export default function Login() {
  // const { setUser } = useContext(Context);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [failedTryLogin, setFailedTryLogin] = useState(false);
  const [btnIsDisabled, setBtnIsDisabled] = useState(true);
  const navigate = useNavigate();

  const validateInfo = () => {
    const emailRules = /^[a-z0-9._]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    const passwordRules = 6;

    if (email.match(emailRules) && password.length >= passwordRules) {
      return setBtnIsDisabled(false);
    }
    return setBtnIsDisabled(true);
  };

  const handleRegister = () => {
    navigate('/register');
  };

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      navigate('/customer/products');
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await requestPost('/login', { email, password });
      localStorage.setItem('user', JSON.stringify(user));
      if (user.role === 'administrator') {
        navigate('/admin/manage');
        setToken();
        return;
      }
      if (user.role === 'seller') {
        navigate('/seller/orders');
        setToken();
        return;
      }
      setToken();
      navigate('/customer/products');
    } catch (error) {
      setFailedTryLogin(true);
    }
  };

  useEffect(() => {
    setFailedTryLogin(false);
    validateInfo();
  }, [email, password]);

  return (
    <section className="h-screen flex flex-col justify-center items-center bg-amber-50">
      <img src={ logo } alt="Kneckos Delivery" className="h-auto max-w-md mx-auto py-8" />
      <form className="flex flex-col space-y-2">
        <label htmlFor="input-email" className="indent-2">
          Login
          <input
            className="placeholder:italic placeholder:text-slate-400 block
            bg-white w-full border border-slate-300 rounded-md py-2 pl-2 pr-20
            shadow-sm focus:outline-none focus:border-yellow-500 focus:ring-yellow-500
            focus:ring-1 sm:text-sm"
            data-testid="common_login__input-email"
            id="input-email"
            type="email"
            name="email"
            value={ email }
            placeholder="email@trybeer.com.br"
            onChange={ (e) => setEmail(e.target.value) }
            required
          />
        </label>
        <label htmlFor="input-password" className="indent-2">
          Senha
          <input
            data-testid="common_login__input-password"
            className="placeholder:italic placeholder:text-slate-400 block
            bg-white w-full border border-slate-300 rounded-md py-2 pl-2 pr-20
            shadow-sm focus:outline-none focus:border-yellow-500 focus:ring-yellow-500
            focus:ring-1 sm:text-sm"
            id="input-password"
            name="password"
            type="password"
            value={ password }
            placeholder="******"
            onChange={ (e) => setPassword(e.target.value) }
            required
          />
        </label>
        <button
          data-testid="common_login__button-login"
          className="bg-yellow-900 disabled:opacity-20 py-2
          px-4 rounded-md text-white shadow-lg hover:bg-yellow-700"
          type="button"
          onClick={ (event) => handleLogin(event) }
          disabled={ btnIsDisabled }
        >
          LOGIN
        </button>
        {
          (failedTryLogin)
            ? (
              <p data-testid="common_login__element-invalid-email">
                {
                  `O endereço de e-mail ou a senha não estão corretos.
                    Por favor, tente novamente.`
                }
              </p>
            )
            : null
        }
        <button
          data-testid="common_login__button-register"
          className="bg-yellow-900 py-2 px-4 rounded-md
          text-white shadow-lg hover:bg-yellow-700"
          type="button"
          onClick={ handleRegister }
        >
          Ainda não tenho conta
        </button>
      </form>
    </section>
  );
}
