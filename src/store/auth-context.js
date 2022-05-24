import React, { useCallback, useEffect, useState } from 'react';

let logoutTimer;

const AuthContext = React.createContext({
  token: '',
  UID: '',
  isLoggedIn: false,
  logout: () => {},
  login: () => {},
  changePassword: () => {},
});

const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();

  const remainingTime = adjExpirationTime - currentTime;

  return remainingTime;
};

const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem('token');
  const storedUID = localStorage.getItem('UID');
  const storedExpirationTime = localStorage.getItem('expirationTime');

  const remainingTime = calculateRemainingTime(storedExpirationTime);

  if (remainingTime <= 60000) {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    localStorage.removeItem('UID');

    return null;
  }

  return {
    token: storedToken,
    UID: storedUID,
    duration: remainingTime,
  };
};

export const AuthContextProvider = (props) => {
  const tokenData = retrieveStoredToken();
  let initialToken;
  let initialUID;
  if (tokenData) {
    initialToken = tokenData.token;
    initialUID = tokenData.UID;
  }

  const [token, setToken] = useState(initialToken);
  const [UID, setUID] = useState(initialUID);

  const loggedIn = !!token;

  const logoutHandler = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    localStorage.removeItem('UID');
    setUID(null);
    setToken(null);

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  const loginHandler = async (loginB, information) => {
    let url = '';
    if (loginB) {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyASFNrswDBzzXPvN6jYmHqaTXQOBea4ajA';
    } else {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyASFNrswDBzzXPvN6jYmHqaTXQOBea4ajA';
    }
    const res = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: information.email,
        password: information.password,
        returnSecureToken: true,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    try {
      if (res.ok) {
        const data = await res.json();
        //console.log(data);
        setToken(data.idToken);
        setUID(data.localId);
        localStorage.setItem('token', data.idToken);
        localStorage.setItem('UID', data.localId);

        const expirationTime = new Date(
          new Date().getTime() + +data.expiresIn * 1000
        );
        const remainingTime = calculateRemainingTime(
          expirationTime.toISOString()
        );

        localStorage.setItem('expirationTime', expirationTime);

        logoutTimer = setTimeout(logoutHandler, remainingTime);
      } else {
        const data = await res.json();
        throw new Error(data.error.message);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const changePasswordHandler = async (payload) => {
    const res = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyASFNrswDBzzXPvN6jYmHqaTXQOBea4ajA',
      {
        method: 'POST',
        body: JSON.stringify({
          idToken: token,
          password: payload,
          returnSecureToken: true,
        }),
        headers: {
          'Content-type': 'application/json',
        },
      }
    );

    try {
      if (res.ok) {
        // const data = await res.json();
        // console.log(data);
      } else {
        const data = await res.json();
        throw new Error(data.error.message);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    if (tokenData) {
      // console.log(tokenData.duration)
      logoutTimer = setTimeout(logoutHandler, tokenData.duration);
    }
  }, [tokenData, logoutHandler]);

  const contextValue = {
    token: token,
    UID: UID,
    isLoggedIn: loggedIn,
    login: loginHandler,
    logout: logoutHandler,
    changePassword: changePasswordHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
