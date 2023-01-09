import React, { useState, useMemo } from 'react';
import propTypes from 'prop-types';
import Context from './Context';

function Provider({ children }) {
  const [dataProducts, setDataProducts] = useState([]);
  const [user, setUser] = useState();
  const [stats, setStats] = useState(true);

  const contextValue = useMemo(() => ({
    dataProducts,
    setDataProducts,
    user,
    setUser,
    stats,
    setStats,
  }), [dataProducts, user]);

  return (
    <Context.Provider value={ contextValue }>
      {children}
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: propTypes.node,
}.isRequired;

export default Provider;
