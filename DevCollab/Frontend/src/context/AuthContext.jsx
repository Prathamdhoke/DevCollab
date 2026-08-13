import { createContext, useContext, useState, useEffect } from "react";

import api from "../api/axios.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  /* ===========================================
                CHECK CURRENT USER
    =========================================== */

  const getCurrentUser = async () => {
    try {
      const response = await api.get("/auth/me");

      setUser(response.data.data);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  /* ===========================================
                RUN ON APP LOAD
    =========================================== */

  useEffect(() => {
    getCurrentUser();
  }, []);

  /* ===========================================
                    SIGNUP
    =========================================== */

  const signup = async (userData) => {
    try {
      setLoading(true);

      const response = await api.post("/auth/signup", userData);

      setUser(response.data.data);

      return {
        success: true,

        data: response.data.data,
      };
    } catch (error) {
      return {
        success: false,

        message: error.response?.data?.message || "Signup failed",
      };
    } finally {
      setLoading(false);
    }
  };

  /* ===========================================
                    LOGIN
    =========================================== */

  const login = async (credentials) => {
    try {
      setLoading(true);

      const response = await api.post("/auth/login", credentials);

      setUser(response.data.data);

      return {
        success: true,

        data: response.data.data,
      };
    } catch (error) {
      return {
        success: false,

        message: error.response?.data?.message || "Login failed",
      };
    } finally {
      setLoading(false);
    }
  };

  /* ===========================================
                    LOGOUT
    =========================================== */

  const logout = async () => {
    try {
      await api.post("/auth/logout");

      setUser(null);
    } catch (error) {
      console.log(error);
    }
  };

  /* ===========================================
                UPDATE USER
    =========================================== */

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider
      value={{
        user,

        loading,

        signup,

        login,

        logout,

        getCurrentUser,

        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
