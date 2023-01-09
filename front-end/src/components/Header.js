import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import Context from '../context/Context';

function Header() {
  // const { user } = useContext(Context);
  const user = JSON.parse(localStorage.getItem('user'));

  const navigate = useNavigate();

  const handleLogout = async () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <header
      className="w-screenen flex justify-around items-center
        bg-yellow-900 text-white font-medium text-lg p-5"
    >
      { user.role === 'customer' ? (
        <Link to="/customer/products">
          <h2 data-testid="customer_products__element-navbar-link-products"> Produtos</h2>
        </Link>
      ) : null }
      <Link to={ `/${user.role}/orders` }>
        <h2 data-testid="customer_products__element-navbar-link-orders"> Meus Pedidos</h2>
      </Link>
      <Link to="/">
        <h2
          data-testid="customer_products__element-navbar-user-full-name"
        >
          { user.name }
        </h2>
      </Link>
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
