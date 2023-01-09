import React from 'react';
import PropTypes from 'prop-types';

export default function TableManager(props) {
  const { users, removeUser } = props;

  const handlerRole = (role) => {
    if (role === 'customer') return 'Cliente';
    if (role === 'seller') return 'P. Vendedora';
    if (role === 'administrator') return 'Admin';
  };

  return (
    <section>
      <h2
        className="text-yellow-900 font-medium text-lg mt-8 mb-4 text-center"
      >
        Lista de usuários
      </h2>
      <table className="min-w-full text-center">
        <thead className="border-b border-amber-200">
          <tr className="border-b bg-amber-200 border-amber-200">
            <th className="text-sm font-medium text-gray-900 px-6 py-4">Item</th>
            <th className="text-sm font-medium text-gray-900 px-6 py-4">Nome</th>
            <th className="text-sm font-medium text-gray-900 px-6 py-4">Email</th>
            <th className="text-sm font-medium text-gray-900 px-6 py-4">Tipo</th>
            <th className="text-sm font-medium text-gray-900 px-6 py-4">Excluir</th>
          </tr>
        </thead>
        <tbody className="border-b">
          { users.map(({ id, name, email, role }, index) => (
            <tr className="border-b bg-amber-100 border-amber-200" key={ id }>
              <td
                className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap"
                data-testid={ `admin_manage__element-user-table-item-number-${index}` }
              >
                { index + 1 }
              </td>
              <td
                className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap"
                data-testid={ `admin_manage__element-user-table-name-${index}` }
              >
                { name }
              </td>
              <td
                className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap"
                data-testid={ `admin_manage__element-user-table-email-${index}` }
              >
                { email }
              </td>
              <td
                className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap"
                data-testid={ `admin_manage__element-user-table-role-${index}` }
              >
                { handlerRole(role) }
              </td>
              { role === 'administrator' ? null : (
                <td>
                  <button
                    className="bg-yellow-900 py-2 px-4 rounded-md
                    text-white shadow-lg hover:bg-yellow-700"
                    type="button"
                    data-testid={ `admin_manage__element-user-table-remove-${index}` }
                    onClick={ () => removeUser(id) }
                  >
                    Excluir
                  </button>
                </td>
              ) }
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

TableManager.propTypes = {
  users: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)),
  removeItem: PropTypes.func,
}.isRequired;
