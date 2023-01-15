import React from 'react';
import PropTypes from 'prop-types';

export default function DetailsCards(props) {
  const { products } = props;
  const prefixTestId = 'customer_order_details__element-order-table-';

  return (
    <section
      className="p-5"
    >
      <h2
        className="text-yellow-900 font-medium text-lg p-3 text-center"
      >
        Detalhes do pedido
      </h2>
      <table className="min-w-full text-center">
        <thead className="border border-amber-200">
          <tr className="border-b bg-amber-200 border-amber-200">
            <th className="text-sm font-medium text-gray-900 px-6 py-4">Item</th>
            <th className="text-sm font-medium text-gray-900 px-6 py-4">Descrição</th>
            <th className="text-sm font-medium text-gray-900 px-6 py-4">Quantidade</th>
            <th
              className="text-sm font-medium text-gray-900 px-6 py-4"
            >
              Valor Unitário
            </th>
            <th className="text-sm font-medium text-gray-900 px-6 py-4">Sub-total</th>
          </tr>
        </thead>
        <tbody className="border-b">
          {
            products.map((product, index) => (
              <tr
                key={ product.id }
                className="border-b bg-amber-100 border-amber-200"
              >
                <td
                  data-testid={ `${prefixTestId}item-number-${index}` }
                >
                  { index + 1 }
                </td>
                <td
                  data-testid={ `${prefixTestId}name-${index}` }
                >
                  { product.name }
                </td>
                <td
                  data-testid={ `${prefixTestId}quantity-${index}` }
                >
                  { product.SalesProducts.quantity }
                </td>
                <td
                  data-testid={ `${prefixTestId}unit-price-${index}` }
                >
                  { `R$ ${(+product.price).toFixed(2).replace(/\./, ',')}` }
                </td>
                <td
                  data-testid={ `${prefixTestId}sub-total-${index}` }
                >
                  { `R$ ${(+product.price * +product.SalesProducts.quantity).toFixed(2).replace(/\./, ',')}` }
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </section>
  );
}

DetailsCards.propTypes = {
  products: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)),
}.isRequired;
