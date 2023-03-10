import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import { requestPost, setToken } from '../services/requests';

export default function LoginInputs() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [failedLogin, setFailedLogin] = useState(false);
  const [btnIsDisabled, setBtnIsDisabled] = useState(true);
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);
  const navigate = useNavigate();

  const toggleBtn = () => {
    setPasswordIsVisible((prevState) => !prevState);
  };

  const validateInfo = () => {
    const regexEmail = /^[a-z0-9._]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    const minLength = 6;

    if (email.match(regexEmail) && password.length >= minLength) {
      return setBtnIsDisabled(false);
    }
    return setBtnIsDisabled(true);
  };

  useEffect(() => {
    setFailedLogin(false);
    validateInfo();
  }, [email, password]);

  const handleRegister = () => {
    navigate('/register');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
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
      setFailedLogin(true);
    }
  };

  return (
    <form className="flex flex-col space-y-2">
      <label htmlFor="input-email" className="indent-2">
        Login
        <input
          className="placeholder:italic placeholder:text-slate-400
            bg-white w-full border border-slate-300 rounded-md py-2 pl-2 pr-20
            shadow-sm focus:outline-none focus:border-yellow-500 focus:ring-yellow-500
            focus:ring-1 sm:text-sm"
          data-testid="common_login__input-email"
          id="input-email"
          type="email"
          name="email"
          value={ email }
          placeholder="email@delivery.com"
          onChange={ (e) => setEmail(e.target.value) }
          required
        />
      </label>
      <div className="flex">
        <label htmlFor="input-password" className="indent-2">
          Senha
          <input
            data-testid="common_login__input-password"
            className="placeholder:italic placeholder:text-slate-400
            bg-white w-full border border-slate-300 rounded-md py-2 pl-2 pr-20
            shadow-sm focus:outline-none focus:border-yellow-500 focus:ring-yellow-500
            focus:ring-1 sm:text-sm"
            id="input-password"
            name="password"
            type={ passwordIsVisible ? 'text' : 'password' }
            value={ password }
            placeholder="******"
            onChange={ (e) => setPassword(e.target.value) }
            required
          />
          <button
            type="button"
            onClick={ toggleBtn }
            className="-ml-8 absolute h-9 text-xl"
          >
            {passwordIsVisible ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </button>
        </label>
      </div>
      <button
        data-testid="common_login__button-login"
        className="bg-yellow-900 disabled:opacity-20 py-2
          px-4 rounded-md text-white shadow-lg hover:bg-yellow-700"
        type="button"
        onClick={ (e) => handleLogin(e) }
        disabled={ btnIsDisabled }
      >
        LOGIN
      </button>
      {
        (failedLogin)
          ? (
            <p data-testid="common_login__element-invalid-email">
              {
                `O endere??o de e-mail ou a senha n??o est??o corretos.
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
        Ainda n??o tenho conta
      </button>
    </form>
  );
}
