import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../../lib/axios";
import Cookies from "js-cookie";

export const useLoginUser = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: async (body) => {
      const response = await axiosInstance.post("/auth/login", body);
      Cookies.set("access_token", `Bearer ${response.data.access_token}`);
      Cookies.set("refresh_token", response.data.refresh_token, {
        expires: 7,
      });
      return response;
    },
    onSuccess,
    onError,
  });
};
