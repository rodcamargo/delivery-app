import PropTypes from 'prop-types';

export default function CheckoutProductsTable(props) {
  const { products, removeItem } = props;

  return (
    <table
      className="min-w-full text-center"
    >
      <thead className="border-b border-amber-200">
        <tr className="border-b bg-amber-200 border-amber-200">
          <th className="text-sm font-medium text-gray-900 px-6 py-4">
            Item
          </th>
          <th className="text-sm font-medium text-gray-900 px-6 py-4">
            Descrição
          </th>
          <th className="text-sm font-medium text-gray-900 px-6 py-4">
            Quantidade
          </th>
          <th className="text-sm font-medium text-gray-900 px-6 py-4">
            Valor Unitário
          </th>
          <th className="text-sm font-medium text-gray-900 px-6 py-4">
            Sub-total
          </th>
          <th className="text-sm font-medium text-gray-900 px-6 py-4">
            Remover Item
          </th>
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
                className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap"
                data-testid={
                  `customer_checkout__element-order-table-item-number-${index}`
                }
              >
                { index + 1 }
              </td>
              <td
                className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap"
                data-testid={ `customer_checkout__element-order-table-name-${index}` }
              >
                { product.name }
              </td>
              <td
                className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap"
                data-testid={ `customer_checkout__element-order-table-quantity-${index}` }
              >
                { product.quantity }
              </td>
              <td
                className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap"
                data-testid={
                  `customer_checkout__element-order-table-unit-price-${index}`
                }
              >
                { `R$ ${(+product.price).toFixed(2).replace(/\./, ',')}` }
              </td>
              <td
                className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap"
                data-testid={
                  `customer_checkout__element-order-table-sub-total-${index}`
                }
              >
                { `R$ ${(+product.price * +product.quantity).toFixed(2).replace(/\./, ',')}` }
              </td>
              <td
                data-testid={ `customer_checkout__element-order-table-remove-${index}` }
              >
                <button
                  className="bg-yellow-900 py-2 px-4 rounded-md
                  text-white shadow-lg hover:bg-yellow-700"
                  type="button"
                  onClick={ () => removeItem(product.id) }
                >
                  REMOVER
                </button>
              </td>
            </tr>
          ))
        }
      </tbody>
    </table>
  );
}

CheckoutProductsTable.propTypes = {
  products: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)),
  removeItem: PropTypes.func,
}.isRequired;
