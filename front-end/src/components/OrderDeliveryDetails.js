import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function DeliveryDetails(props) {
  const { sale, markAsDelivered } = props;
  const [status, setStatus] = useState(sale.status);
  const prefixTestId = 'customer_order_details__element-order-details-label-';

  return (
    <table className="min-w-full text-center">
      <tbody className="border-b">
        <tr className="border-b bg-amber-100 border-amber-200">
          <td
            className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap"
            data-testid={ `${prefixTestId}order-id` }
          >
            {sale.id}
          </td>
          <td
            className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap"
            data-testid={ `${prefixTestId}seller-name` }
          >
            {sale.seller.name}
          </td>
          <td
            className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap"
            data-testid={ `${prefixTestId}order-date` }
          >
            { new Date(sale.saleDate).toLocaleDateString('pt-br', { timezone: 'UTF-8' })}
          </td>
          <td
            className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap"
            data-testid={ `${prefixTestId}delivery-status` }
          >
            { status }
          </td>
          <td>
            <button
              className="bg-yellow-900 py-2 px-4 rounded-md
              text-white shadow-lg hover:bg-yellow-700 disabled:opacity-20"
              type="button"
              data-testid="customer_order_details__button-delivery-check"
              onClick={ async () => {
                if (await markAsDelivered()) setStatus('Entregue');
              } }
              disabled={ status !== 'Em Trânsito' }
            >
              MARCAR COMO ENTREGUE
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

DeliveryDetails.propTypes = {
  sale: PropTypes.objectOf(PropTypes.any),
}.isRequired;
