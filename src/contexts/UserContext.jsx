import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [token, setToken] = useState(() => {
    const tokenStore = localStorage.getItem("token");
    return tokenStore ? JSON.parse(tokenStore) : null;
  });

  const updateToken = (JWTtoken) => {
    localStorage.setItem("token", JSON.stringify(JWTtoken));
    setToken(JWTtoken);
  };

  useEffect(() => {
    const tokenStore = localStorage.getItem("token");
    if (tokenStore) {
      setToken(JSON.parse(tokenStore));
    }
  }, []);

  return (
    <UserContext.Provider value={{ token, updateToken }}>
      {children}
    </UserContext.Provider>
  );
};

UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
