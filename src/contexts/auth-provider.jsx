import { createContext, useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import axiosInstance from "../lib/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const location = useLocation();
  const [data, setData] = useState(null);

  const getUser = useCallback(async () => {
    try {
      const token = Cookies.get("access_token");

      if (!token) {
        setData(null);
        return;
      }

      const response = await axiosInstance.get("/auth/user", {
        headers: {
          Authorization: token,
        },
      });

      if (JSON.stringify(response.data) !== JSON.stringify(data)) {
        setData(response.data);
      }
    } catch (error) {
      try {
        const refreshToken = Cookies.get("refresh_token");

        if (!refreshToken) {
          setData(null);
          return;
        }

        const response = await axiosInstance.post("/auth/refresh-token", {
          refresh_token: refreshToken,
        });

        Cookies.set("access_token", `Bearer ${response.data.access_token}`);
        getUser();
      } catch (error) {
        setData(null);
        Cookies.remove("access_token");
        Cookies.remove("refresh_token");
      }
    }
  }, [data]);

  useEffect(() => {
    if (location.pathname === "/") {
      getUser();
    }
  }, [getUser, location]);

  return (
    <AuthContext.Provider value={{ data, setData }}>
      {children}
    </AuthContext.Provider>
  );
};
