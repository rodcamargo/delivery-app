import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import CardMyOrders from '../components/CardMyOrders';
import { requestGet, setToken } from '../services/requests';

export default function CustomerOrders() {
  const [orders, setOrders] = useState([]);

  const getOrders = async (id) => {
    const result = await requestGet(`/customer/${id}/orders`);
    setOrders(result);
  };

  const getUser = () => JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    setToken();
    getOrders(getUser().id);
  }, []);

  return (
    <main className="h-screen bg-amber-50">
      <Header />
      <CardMyOrders orders={ orders } />
    </main>
  );
}
