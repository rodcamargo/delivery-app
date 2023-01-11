import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CheckoutProductsTable from '../components/CheckoutProductsTable';
import Header from '../components/Header';
import { requestPost, requestGet } from '../services/requests';

export default function Checkout() {
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [sellers, setSellers] = useState([]);
  const [formInfo, setFormInfo] = useState({});
  const navigate = useNavigate();

  const getProductsInfo = async () => {
    try {
      const productsCart = localStorage.getItem('cart');
      const productsInfo = await requestPost(
        '/customer/checkout',
        { cart: productsCart },
      );
      setProducts(productsInfo);
    } catch (error) {
      console.log(error);
    }
  };

  const getSellers = async () => {
    try {
      const response = await requestGet('/customer/checkout/sellers');
      setSellers(response);
      setFormInfo({ seller: response[0] });
    } catch (e) {
      console.log(e);
    }
  };

  const calcTotalPrice = () => {
    setTotalPrice(
      products.reduce((acc, product) => acc + product.quantity * product.price, 0),
    );
  };

  const removeItem = (id) => {
    const newProducts = products.filter((product) => product.id !== id);
    setProducts(newProducts);
    localStorage.setItem('cart', JSON.stringify(newProducts));
  };

  const closeOrder = async () => {
    try {
      const result = await requestPost('/customer/checkout/close', {
        sale: {
          deliveryAddress: formInfo.address,
          deliveryNumber: formInfo.addressNumber,
          totalPrice,
          sellerId: formInfo.seller,
        },
        products,
      });
      localStorage.removeItem('cart');
      navigate(`/customer/orders/${result.saleId}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = async (e) => {
    setFormInfo({ ...formInfo, [e.name]: e.value });
  };

  // ComponentDidMount
  useEffect(() => {
    getProductsInfo();
    getSellers();
    calcTotalPrice();
  }, []);

  // Atualiza o preço total quando um item é removido
  useEffect(() => {
    calcTotalPrice();
  }, [products]);

  return (
    <section className="h-screen  bg-amber-50">
      <Header />
      <div
        className="flex flex-col justify-center items-center p-5"
      >
        <h2
          className="text-yellow-900 font-medium text-lg pt-3 text-center"
        >
          Finalizar Pedido
        </h2>
        <CheckoutProductsTable products={ products } removeItem={ removeItem } />
        <div
          className="text-yellow-900 font-medium text-lg pt-3 text-center"
          data-testid="customer_checkout__element-order-total-price"
        >
          { `Total: R$ ${(+totalPrice).toFixed(2).replace(/\./, ',')}` }
        </div>
        <hr />
        <h2
          className="text-yellow-900 font-medium text-lg pt-3 text-center"
        >
          Detalhes e Endereço para Entrega
        </h2>
        <form className="flex flex-col space-y-2">
          <label htmlFor="select-seller">
            P. Vendedora Responsável
            <select
              className="form-select w-full py-1.5 text-base bg-white
            border border-solid border-slate-300 rounded transition
            ease-in-out focus:bg-white focus:border-yellow-500
          focus:ring-yellow-500 focus:ring-1 focus:outline-none"
              id="select-seller"
              data-testid="customer_checkout__select-seller"
              name="seller"
              onChange={ (e) => handleChange(e.target) }
            >
              {
                sellers.map((vendedor) => (
                  <option key={ vendedor.name } value={ vendedor.id }>
                    { vendedor.name }
                  </option>
                ))
              }
            </select>
          </label>
          <label htmlFor="address-input">
            Endereço
            <input
              className="placeholder:italic placeholder:text-slate-400 block
            bg-white w-full border border-slate-300 rounded-md py-2 pl-2 pr-20
            shadow-sm focus:outline-none focus:border-yellow-500 focus:ring-yellow-500
            focus:ring-1 sm:text-sm"
              type="text"
              placeholder="Insira seu endereço"
              id="address-input"
              data-testid="customer_checkout__input-address"
              name="address"
              onChange={ (e) => handleChange(e.target) }
            />
          </label>
          <label htmlFor="address-number-input">
            Número
            <input
              className="placeholder:italic placeholder:text-slate-400 block
            bg-white w-full border border-slate-300 rounded-md py-2 pl-2 pr-20
            shadow-sm focus:outline-none focus:border-yellow-500 focus:ring-yellow-500
            focus:ring-1 sm:text-sm"
              type="number"
              placeholder="391"
              id="address-number-input"
              data-testid="customer_checkout__input-address-number"
              name="addressNumber"
              onChange={ (e) => handleChange(e.target) }
            />
          </label>
          <button
            className="bg-yellow-900 disabled:opacity-20 py-2
          px-4 rounded-md text-white shadow-lg hover:bg-yellow-700"
            type="button"
            data-testid="customer_checkout__button-submit-order"
            onClick={ closeOrder }
          >
            FINALIZAR PEDIDO
          </button>
        </form>
      </div>

    </section>
  );
}
