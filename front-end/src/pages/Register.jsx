import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { requestPost, setToken } from '../services/requests';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [btnIsDisabled, setBtnIsDisabled] = useState(true);
  const navigate = useNavigate();

  const isUserValidation = () => {
    const minLengthName = 12;
    const regexCode = /\S+@\S+\.\S+/;
    const minLengthPassword = 6;
    const validEmail = regexCode.test(email);
    setBtnIsDisabled(!(
      validEmail
        && password.length >= minLengthPassword
        && name.length >= minLengthName
    ));
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      const user = await requestPost('/register', {
        name,
        email,
        password,
      });
      localStorage.setItem('user', JSON.stringify(user));
      setToken();
      navigate('/customer/products', { replace: true });
    } catch (error) {
      setErrorMessage('Email já cadastrado');
    }
  };

  useEffect(() => {
    isUserValidation();
  }, [email, password, name]);

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-amber-50">
      <h2
        className="text-yellow-900 font-medium text-lg"
      >
        Cadastro
      </h2>
      <form className="flex flex-col space-y-2">
        <label htmlFor="input-name" className="indent-2">
          Nome
          <input
            className="placeholder:italic placeholder:text-slate-400 block
            bg-white w-full border border-slate-300 rounded-md py-2 pl-2 pr-20
            shadow-sm focus:outline-none focus:border-yellow-500 focus:ring-yellow-500
            focus:ring-1 sm:text-sm"
            data-testid="common_register__input-name"
            id="input-name"
            type="text"
            name="name"
            value={ name }
            placeholder="Seu nome"
            onChange={ (e) => setName(e.target.value) }
            required
          />
        </label>
        <label htmlFor="input-password" className="indent-2">
          Email
          <input
            className="placeholder:italic placeholder:text-slate-400 block
            bg-white w-full border border-slate-300 rounded-md py-2 pl-2 pr-20
            shadow-sm focus:outline-none focus:border-yellow-500 focus:ring-yellow-500
            focus:ring-1 sm:text-sm"
            data-testid="common_register__input-email"
            id="input-email"
            type="text"
            name="email"
            value={ email }
            placeholder="seu-email@site.com.br"
            onChange={ (e) => setEmail(e.target.value) }
            required
          />
        </label>
        <label htmlFor="input-password" className="indent-2">
          Senha
          <input
            className="placeholder:italic placeholder:text-slate-400 block
            bg-white w-full border border-slate-300 rounded-md py-2 pl-2 pr-20
            shadow-sm focus:outline-none focus:border-yellow-500 focus:ring-yellow-500
            focus:ring-1 sm:text-sm"
            data-testid="common_register__input-password"
            id="input-password"
            type="password"
            name="password"
            value={ password }
            placeholder="******"
            onChange={ (e) => setPassword(e.target.value) }
            required
          />
        </label>
        <button
          className="bg-yellow-900 disabled:opacity-20 py-2
          px-4 rounded-md text-white shadow-lg hover:bg-yellow-700"
          data-testid="common_register__button-register"
          type="button"
          onClick={ handleRegister }
          disabled={ btnIsDisabled }
        >
          Cadastrar
        </button>
      </form>
      {
        (errorMessage)
          ? (
            <p data-testid="common_register__element-invalid_register">
              {errorMessage}
            </p>
          )
          : null
      }
    </div>
  );
}
