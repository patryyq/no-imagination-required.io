import React, { createContext, useState, useEffect } from 'react';
import api from '../../api';
const Context = createContext(null);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const isLocalhost = window.location.hostname === 'localhost'
    const user = !isLocalhost ?
      '/backend' : 'http://localhost:5000';
    api
      .get(user + '/user', { withCredentials: true })
      .then((res) => {
        const userData = res && res?.data;
        setUser(userData);
      })
  }, []);

  return <Context.Provider value={user}>{children}</Context.Provider>;
};

UserProvider.Context = Context;

export default UserProvider;
