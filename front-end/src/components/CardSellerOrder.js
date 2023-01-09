import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import Context from '../context/Context';
import { requestGet, setToken } from '../services/requests';

function CardSellerOrder() {
  // const { stats } = useContext(Context);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  const MINUS4 = -4;

  const fetchApi = async () => {
    try {
      setToken();
      const data = await requestGet('/seller/orders');
      return data;
    } catch (error) {
      return error;
    }
  };

  const toPageOrder = (id) => (event) => {
    if (event.key === 'Enter' || event.type === 'click') {
      navigate(`/seller/orders/${id}`);
    }
  };

  useEffect(() => {
    const getAllProducts = async () => {
      const result = await fetchApi();
      if (!result) return setOrders([]);

      setOrders(result);
    };

    getAllProducts();
  }, []);

  return (
    <section className="bg-amber-50 p-5">
      { orders
        .map(({ id, status, saleDate, totalPrice, deliveryAddress, deliveryNumber }) => (
          <button
            className="flex m-2 bg-slate-200 pr-2 border border-bg-yellow-800
          shadow-lg hover:bg-slate-50"
            key={ id }
            type="button"
            tabIndex={ 0 }
            onClick={ toPageOrder(id) }
            onKeyDown={ toPageOrder(id) }
          >
            <div className="bg-white p-11">
              <p>Pedido</p>
              <p
                data-testid={ `seller_orders__element-order-id-${id}` }
              >
                {`000${id}`.slice(MINUS4)}
              </p>

            </div>
            <div>
              <div className="flex">
                <p
                  className="bg-green-400 m-2 p-8 border-none rounded-md"
                  data-testid={ `seller_orders__element-delivery-status-${id}` }
                >
                  {status}
                </p>
                <div className="flex flex-col">
                  <p
                    className="bg-white bg-opacity-40 py-2 px-4
                    border-none rounded-md mt-2 mb-2"
                    data-testid={ `seller_orders__element-order-date-${id}` }
                  >
                    {new Date(saleDate).toLocaleDateString('pt-br')}
                  </p>
                  <p
                    className="bg-white bg-opacity-40 py-2 px-4
                    border-none rounded-md mb-2"
                    data-testid={ `seller_orders__element-card-price-${id}` }
                  >
                    { `R$ ${totalPrice?.replace(/\./, ',')}` }
                  </p>
                </div>
              </div>

              <p
                className="text-right pr-2"
                data-testid={ `seller_orders__element-card-address-${id}` }
              >
                {`${deliveryAddress}, ${deliveryNumber}`}
              </p>
            </div>

          </button>
        ))}
    </section>
  );
}

export default CardSellerOrder;
