import PropTypes from 'prop-types';

import { useNavigate } from 'react-router-dom';

export default function OrderCards(props) {
  const { orders } = props;
  const navigate = useNavigate();
  const MINUS4 = -4;

  return (
    <section
      className="bg-amber-50 p-5"
    >

      { orders.map((order, index) => (
        <button
          className="bg-slate-200 m-2 pr-2 border border-bg-yellow-800
          shadow-lg hover:bg-slate-50"
          type="button"
          key={ order.id }
          onClick={ () => navigate(`/customer/orders/${order.id}`) }
        >
          <div className="flex">
            <div className="bg-white p-6">
              <p>Pedido</p>
              <p data-testid={ `customer_orders__element-order-id-${order.id}` }>
                { `000${index + 1}`.slice(MINUS4) }
              </p>
            </div>
            <p
              className="bg-green-400 m-2 p-8 border-none rounded-md"
              data-testid={ `customer_orders__element-delivery-status-${order.id}` }
            >
              { order.status }
            </p>
            <div className="flex flex-col">
              <p
                className="bg-white bg-opacity-40 py-2 px-4
                  border-none rounded-md mt-2 mb-2"
                data-testid={ `customer_orders__element-order-date-${order.id}` }
              >
                {
                  new Date(order.saleDate)
                    .toLocaleDateString('pt-br', { timezone: 'UTF-8' })
                }
              </p>
              <p
                className="bg-white bg-opacity-40 py-2 px-4 border-none rounded-md"
                data-testid={ `customer_orders__element-card-price-${order.id}` }
              >
                { `R$ ${order.totalPrice.replace(/\./, ',')}` }
              </p>
            </div>

          </div>
        </button>
      )) }
    </section>
  );
}

OrderCards.propTypes = {
  orders: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)),
}.isRequired;
