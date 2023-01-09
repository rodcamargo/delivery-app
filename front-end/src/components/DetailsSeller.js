import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { requestGet, requestPatch, setToken } from '../services/requests';

function DetailsSeller() {
  const [sales, setSales] = useState();
  // const [disabledPrepare, setDisabledPrepare] = useState(sales.status !== 'pendente' || true);
  // const [disabledDispatch, setDisabledPrepare] = useState(sales.status !== 'preparando' || true);
  const params = useParams();

  const PREFIX = 'seller_order_details__';

  const fetch = async () => {
    try {
      setToken();
      const getsales = await requestGet(`/seller/orders/${+params.id}`);
      setSales(getsales);
    } catch (error) {
      console.log(error);
      navigate('/login', { replace: true });
    }
  };

  const handleChange = async ({ target }) => {
    const status = target.name;
    const changeStatus = await requestPatch(`/seller/orders/${+params.id}`, {
      status,
    });

    setSales(changeStatus);
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <section>
      {
        sales ? (
          <section className="h-screen bg-amber-50 p-5">
            <div className="flex justify-between">
              <p
                className="text-yellow-900 font-medium text-lg pt-3 text-center"
                data-testid="seller_order_details__element-order-details-label-order-id"
              >
                {`Pedido ${sales.id}`}
              </p>
              <p
                className="bg-green-400 m-2 py-2 px-4 border-none rounded-md"
                data-testid={ `${PREFIX}element-order-details-label-delivery-status` }
              >
                {sales.status}
              </p>
              <p
                className="text-yellow-900 font-medium text-lg pt-3 text-center"
                data-testid="seller_order_details__element-order-details-label-order-date"
              >
                {new Date(sales.saleDate).toLocaleDateString('pt-br')}
              </p>
              <button
                className="bg-yellow-900 disabled:opacity-20 m-2 py-2
              px-4 rounded-md text-white shadow-lg hover:bg-yellow-700"
                data-testid="seller_order_details__button-preparing-check"
                type="button"
                disabled={ sales.status !== 'Pendente' }
                name="Preparando"
                onClick={ handleChange }
              >
                PREPARAR PEDIDO
              </button>
              <button
                className="bg-yellow-900 disabled:opacity-20 m-2 py-2
              px-4 rounded-md text-white shadow-lg hover:bg-yellow-700"
                data-testid="seller_order_details__button-dispatch-check"
                type="button"
                disabled={ sales.status !== 'Preparando' }
                name="Em Trânsito"
                onClick={ handleChange }
              >
                SAIU PARA ENTREGA
              </button>
            </div>

            <table className="min-w-full text-center">
              <thead className="border-b border-amber-200">
                <tr className="border-b bg-amber-200 border-amber-200">
                  <th
                    className="text-sm font-medium text-gray-900 px-6 py-4"
                  >
                    Item
                  </th>
                  <th
                    className="text-sm font-medium text-gray-900 px-6 py-4"
                  >
                    Descrição
                  </th>
                  <th
                    className="text-sm font-medium text-gray-900 px-6 py-4"
                  >
                    Quantidade
                  </th>
                  <th
                    className="text-sm font-medium text-gray-900 px-6 py-4"
                  >
                    Valor Unitário
                  </th>
                  <th
                    className="text-sm font-medium text-gray-900 px-6 py-4"
                  >
                    Sub-total
                  </th>
                </tr>
              </thead>
              <tbody className="border-b">
                { sales.products?.map(({ id, name, quantity, price }, index) => (
                  <tr
                    key={ id }
                    className="border-b bg-amber-100 border-amber-200"
                  >
                    <td
                      className="text-sm text-gray-900 font-medium
                        px-6 py-4 whitespace-nowrap"
                      data-testid={
                        `seller_order_details__element-order-table-item-number-${index}`
                      }
                    >
                      {index + 1}
                    </td>
                    <td
                      className="text-sm text-gray-900 font-medium
                        px-6 py-4 whitespace-nowrap"
                      data-testid={
                        `seller_order_details__element-order-table-name-${index}`
                      }
                    >
                      {name}
                    </td>
                    <td
                      className="text-sm text-gray-900 font-medium
                        px-6 py-4 whitespace-nowrap"
                      data-testid={
                        `seller_order_details__element-order-table-quantity-${index}`
                      }
                    >
                      {quantity}
                    </td>
                    <td
                      className="text-sm text-gray-900 font-medium
                        px-6 py-4 whitespace-nowrap"
                      data-testid={
                        `seller_order_details__element-order-table-unit-price-${index}`
                      }
                    >
                      {`R$ ${(+price).toFixed(2).replace(/\./, ',')}`}
                    </td>
                    <td
                      className="text-sm text-gray-900 font-medium
                        px-6 py-4 whitespace-nowrap"
                      data-testid={
                        `seller_order_details__element-order-table-sub-total-${index}`
                      }
                    >
                      {`R$ ${(+quantity * +price).toFixed(2).replace(/\./, ',')}`}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p
              className="text-yellow-900 font-medium text-xl pt-3 text-right m-5"
              data-testid="seller_order_details__element-order-total-price"
            >
              { `Total: R$ ${(+sales.totalPrice).toFixed(2).replace(/\./, ',')}` }
            </p>
          </section>
        ) : <p>Carregando</p>
      }
    </section>
  );
}

export default DetailsSeller;
