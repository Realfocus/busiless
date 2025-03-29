import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Check for existing token on initial load
  useEffect(() => {
    const token = sessionStorage.getItem('loginToken');
    if (!token) {
      navigate('/auth');
    } else {
      setUser({ token }); // You can decode and set user info here if needed
    }
  }, [navigate]);

  const login = (token) => {
    sessionStorage.setItem('loginToken', token);
    setUser({ token });
    navigate('/'); // Redirect to home after login
  };

  const logout = () => {
    sessionStorage.removeItem('loginToken');
    setUser(null);
    navigate('/auth');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};
