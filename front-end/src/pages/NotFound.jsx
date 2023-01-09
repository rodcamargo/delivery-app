import { useEffect } from 'react';
import { setToken } from '../services/requests';
import Header from '../components/Header';

export default function NotFound() {
  useEffect(() => {
    setToken();
  }, []);

  return (
    <main>
      <Header />
      <h1>Error: 404</h1>
      <h3>Página não encontrada</h3>
    </main>
  );
}
