import React, { useMemo, useContext } from 'react';
export const UAContext = React.createContext();
export const UAProvider = ({ userAgent, children }) => {
  const value = useMemo(() => {
    return {
      userAgent,
    };
  }, [userAgent]);
  return <UAContext.Provider value={value}>{userAgent ? children : null}</UAContext.Provider>;
};

export const useUAContext = () => useContext(UAContext);
export const getInitialProps = ({ req }) => {
  let userAgent;
  if (req) {
    userAgent = req.headers['user-agent']; // get the user-agent from the headers
  } else {
    userAgent = navigator.userAgent; // if you are on the client you can access the navigator from the window object
  }
  return { userAgent };
};
