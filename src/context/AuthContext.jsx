import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('curry_user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (e) {
      console.error('Failed to parse user:', e);
      return null;
    }
  });
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    setLoading(true);
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const dummyUser = {
          id: '1',
          name: 'Rohit Sharma',
          email: email,
          token: 'simulated_jwt_token_12345'
        };
        setUser(dummyUser);
        localStorage.setItem('curry_user', JSON.stringify(dummyUser));
        setLoading(false);
        resolve(dummyUser);
      }, 1000);
    });
  };

  const register = async (name, email, password) => {
    setLoading(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        const dummyUser = {
          id: '2',
          name: name,
          email: email,
          token: 'simulated_jwt_token_67890'
        };
        setUser(dummyUser);
        localStorage.setItem('curry_user', JSON.stringify(dummyUser));
        setLoading(false);
        resolve(dummyUser);
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('curry_user');
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      login,
      register,
      logout,
      isAuthenticated
    }}>
      {children}
    </AuthContext.Provider>
  );
};
