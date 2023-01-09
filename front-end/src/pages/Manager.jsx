import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import TableManager from '../components/TableManager';
import { requestPost, requestGet, requestDelete, setToken } from '../services/requests';

export default function Manager() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState();
  const [role, setRole] = useState('seller');
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

  const handleCadUser = async (event) => {
    event.preventDefault();
    try {
      const user = await requestPost('/register', {
        name,
        email,
        password,
        role,
      });
      setUsers([...users, user]);
    } catch (error) {
      setErrorMessage('Usuário já cadastrado');
    }
  };
  useEffect(() => {
    isUserValidation();
  }, [email, password, name]);

  useEffect(() => {
    setToken();
    const user = JSON.parse(localStorage.getItem('user'));
    if (user.role !== 'administrator') {
      navigate('/login');
      return;
    }

    const fetch = async () => {
      const allUsers = await requestGet('/manager/users');
      setUsers(allUsers);
    };
    fetch();
  }, [users]);

  const removeUser = async (id) => {
    await requestDelete(`/manager/${id}`);
    setUsers([...users]);
  };

  return (
    <>
      <Header />
      <div className="h-screen flex flex-col items-center bg-amber-50 p-6">
        <h2 className="text-yellow-900 font-medium text-lg">Cadastrar novo usuário</h2>
        <form className="flex flex-col space-y-2">
          <label htmlFor="input-name" className="indent-2">
            Nome
            <input
              className="placeholder:italic placeholder:text-slate-400 block
            bg-white w-full border border-slate-300 rounded-md py-2 pl-2 pr-20
            shadow-sm focus:outline-none focus:border-yellow-500 focus:ring-yellow-500
            focus:ring-1 sm:text-sm"
              data-testid="admin_manage__input-name"
              id="input-name"
              type="text"
              name="name"
              value={ name }
              placeholder="Nome e sobrenome"
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
              data-testid="admin_manage__input-email"
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
              data-testid="admin_manage__input-password"
              id="input-password"
              type="password"
              name="password"
              value={ password }
              placeholder="******"
              onChange={ (e) => setPassword(e.target.value) }
              required
            />
          </label>
          <select
            className="form-select w-full py-1.5 text-base bg-white
            border border-solid border-slate-300 rounded transition
            ease-in-out focus:bg-white focus:border-yellow-500
          focus:ring-yellow-500 focus:ring-1 focus:outline-none"
            data-testid="admin_manage__select-role"
            id="role-select"
            name="role"
            value={ role }
            label="Tipo"
            onChange={ (e) => setRole(e.target.value) }
            required
          >
            <option value="customer">Cliente</option>
            <option value="seller">P. Vendedora</option>
          </select>
          <button
            className="bg-yellow-900 disabled:opacity-20 py-2
            px-4 rounded-md text-white shadow-lg hover:bg-yellow-700"
            data-testid="admin_manage__button-register"
            type="button"
            onClick={ handleCadUser }
            disabled={ btnIsDisabled }
          >
            Cadastrar
          </button>
        </form>
        {
          (errorMessage)
            ? (
              <p data-testid="admin_manage__element-invalid-register">
                {errorMessage}
              </p>
            )
            : null
        }
        { users ? (
          <TableManager users={ users } removeUser={ removeUser } />
        ) : <p>Carregando...</p> }
      </div>
    </>
  );
}
