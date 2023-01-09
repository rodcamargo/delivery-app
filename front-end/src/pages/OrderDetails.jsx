import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DeliveryDetails from '../components/DeliveryDetails';
// import Context from '../context/Context';
import DetailsCards from '../components/DetailsCards';
import Header from '../components/Header';
import { requestGet, requestPatch, setToken } from '../services/requests';

export default function OrderDetails() {
  // const { stats, setStats } = useContext(Context);
  const [details, setDetails] = useState();
  const params = useParams();

  const getDetails = async () => {
    const result = await requestGet(`/sale/${+params.id}`);
    setDetails(result);
  };

  const markAsDelivered = async () => {
    // setStats(!stats);
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
          <DeliveryDetails sale={ details } markAsDelivered={ markAsDelivered } />
          <DetailsCards products={ details.products } />
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
