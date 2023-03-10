import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import OrderDeliveryDetails from '../components/OrderDeliveryDetails';
import OrderDetailsTable from '../components/OrderDetailsTable';
import Header from '../components/Header';
import { requestGet, requestPatch, setToken } from '../services/requests';

export default function CustomerOrderDetails() {
  const [details, setDetails] = useState();
  const params = useParams();

  const getDetails = async () => {
    const result = await requestGet(`/sale/${+params.id}`);
    setDetails(result);
  };

  const markAsDelivered = async () => {
    const result = await requestPatch(
      `/sale/${+params.id}/delivered`,
      { status: 'Entregue' },
    );
    if (result) return true;
  };

  useEffect(() => {
    setToken();
    getDetails();
  }, []);

  return (
    <section className="h-screen  bg-amber-50">
      <Header />
      { details ? (
        <>
          <OrderDeliveryDetails sale={ details } markAsDelivered={ markAsDelivered } />
          <OrderDetailsTable products={ details.products } />
          <div
            className="text-yellow-900 font-medium text-xl pt-3 text-right m-5"
            data-testid="customer_order_details__element-order-total-price"
          >
            { `Total: R$ ${(+details.totalPrice).toFixed(2).replace(/\./, ',')}` }
          </div>
        </>
      ) : <p>Carregando</p> }
    </section>
  );
}
