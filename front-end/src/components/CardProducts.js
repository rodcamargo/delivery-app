import React, { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import Context from '../context/Context';
import { requestGet, setToken } from '../services/requests';

function CardProducts() {
  const { dataProducts, setDataProducts } = useContext(Context);
  const [totalCart, setTotalCart] = useState([]);
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);
  const [pointer, setPointer] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApi = async () => {
      try {
        setToken();
        const products = await requestGet('/products');
        const savedCart = JSON.parse(localStorage.getItem('cart'));
        if (!savedCart) {
          const productsWithQuantitys = products.map((el) => ({ ...el, quantity: 0 }));
          setDataProducts(productsWithQuantitys);
          return;
        }
        const productsWithQuantitys = products.map((el) => {
          const elFounded = savedCart.find((elt) => elt.id === el.id);
          if (!elFounded) return { ...el, quantity: 0 };
          return { ...el, quantity: elFounded.quantity };
        });
        setDataProducts(productsWithQuantitys);
      } catch (error) {
        console.log(error);
        navigate('/login', { replace: true });
      }
    };
    fetchApi();
  }, []);

  useEffect(() => {
    const totalprice = () => dataProducts.reduce((acc, el) => {
      const totalproduct = Number(el.price) * Number(el.quantity);
      return acc + totalproduct;
    }, 0);
    setTotalCart(totalprice());
  }, [dataProducts, pointer]);

  const handleChange = ({ target: { id, value } }) => {
    const findProduct = dataProducts.find((el) => el.id === Number(id));
    const findCartProduct = cart.find((el) => el.id === Number(id));

    if (Number.isNaN(Number(value))) return findProduct.quantity;

    if (Number(value) === 0) {
      findProduct.quantity = 0;
      setCart(cart.filter((el) => el.id !== findCartProduct.id));
      setPointer(!pointer);
      return;
    }

    findProduct.quantity = Number(value);
    setPointer(!pointer);

    if (!cart.length) return setCart([findProduct]);

    if (!findCartProduct) return setCart([...cart, findProduct]);
  };

  const handleAddRm = ({ target: { id, value } }) => {
    const findProduct = dataProducts.find((el) => el.id === Number(id));
    const findCartProduct = cart.find((el) => (el.id) === Number(id));

    switch (value) {
    case '+':
      findProduct.quantity += 1;
      setPointer(!pointer);
      break;
    case '-':
      if (!findProduct.quantity || Number.isNaN(findProduct.quantity)) {
        findProduct.quantity = 0;
      }
      findProduct.quantity -= 1;
      if (findProduct.quantity <= 0) {
        findProduct.quantity = 0;
        setCart(cart.filter((el) => el.quantity));
        setPointer(!pointer);
      }
      setPointer(!pointer);
      break;
    default:
      findProduct.quantity = 0;
      break;
    }

    if (!cart.length) return setCart([findProduct]);

    if (!findCartProduct) return setCart([...cart, findProduct]);
  };

  const handleCart = () => {
    const noZeroQtItems = cart.filter((item) => item.quantity);
    localStorage.setItem('cart', JSON.stringify(noZeroQtItems));
    navigate('/customer/checkout');
  };

  return (
    <section
      className="bg-amber-50 grid grid-cols-4"
    >
      { dataProducts.map(({ id, price, name, urlImage, quantity }) => (
        <div
          key={ id }
          className="relative flex flex-col m-4 p-4 bg-white border
            border-yellow-900 border-opacity-20 shadow-md justify-center items-center"
        >
          <p
            data-testid={ `customer_products__element-card-price-${id}` }
            className="absolute left-4 top-4 text-yellow-900 bg-gray-200
              bg-opacity-30 rounded-lg font-medium text-lg pl-2 pt-1 px-2
              py-1.5 text-center"
          >
            { `R$ ${(+price).toFixed(2).replace(/\./, ',')}` }
          </p>
          <img
            data-testid={ `customer_products__img-card-bg-image-${id}` }
            className="mx-auto"
            src={ urlImage }
            alt={ name }
          />
          <p
            data-testid={ `customer_products__element-card-title-${id}` }
            className="text-yellow-900 font-medium text-sm pt-3 text-center"
          >
            { name }
          </p>
          <br />
          <div>
            <button
              className="text-yellow-900 hover:text-white border border-yellow-900
              hover:bg-yellow-900 focus:ring-2 focus:outline-none focus:ring-yellow-600
              font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              type="button"
              data-testid={ `customer_products__button-card-add-item-${id}` }
              id={ id }
              onClick={ handleAddRm }
              value="+"
              data-price={ price }
            >
              +
            </button>
            <input
              className="bg-white w-16 border border-slate-300 rounded-md py-2
              shadow-sm focus:outline-none focus:border-yellow-500 text-center m-2"
              type="text"
              id={ id }
              value={ quantity }
              data-testid={ `customer_products__input-card-quantity-${id}` }
              onChange={ handleChange }
            />
            <button
              className="text-yellow-900 hover:text-white border border-yellow-900
              hover:bg-yellow-900 focus:ring-2 focus:outline-none focus:ring-yellow-600
              font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              type="button"
              data-testid={ `customer_products__button-card-rm-item-${id}` }
              id={ id }
              onClick={ handleAddRm }
              value="-"
              data-price={ price }
            >
              -
            </button>
          </div>
        </div>
      ))}
      <button
        type="button"
        data-testid="customer_products__button-cart"
        onClick={ handleCart }
        disabled={ !cart.length }
      >
        <p
          data-testid="customer_products__checkout-bottom-value"
          className="fixed right-4 bottom-4 text-white bg-yellow-900
              bg-opacity-70 rounded-lg font-medium text-lg pl-2 pt-1 px-2
              py-1.5 text-center"
        >
          Ver Carrinho: R$
          { Number(totalCart).toFixed(2).replace('.', ',') }
        </p>
      </button>
    </section>
  );
}

export default CardProducts;
