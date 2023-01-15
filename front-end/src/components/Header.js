import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <header
      className="w-screen flex justify-around items-center
        bg-yellow-900 text-white font-medium text-lg p-5"
    >
      { user.role === 'customer' ? (
        <Link to="/customer/products">
          <p data-testid="customer_products__element-navbar-link-products"> Produtos</p>
        </Link>
      ) : null }
      <Link to={ `/${user.role}/orders` }>
        <p data-testid="customer_products__element-navbar-link-orders"> Meus Pedidos</p>
      </Link>
      <p
        data-testid="customer_products__element-navbar-user-full-name"
      >
        { user.name }
      </p>
      <button
        data-testid="customer_products__element-navbar-link-logout"
        type="button"
        onClick={ handleLogout }
      >
        Sair
      </button>
    </header>
  );
}

export default Header;
