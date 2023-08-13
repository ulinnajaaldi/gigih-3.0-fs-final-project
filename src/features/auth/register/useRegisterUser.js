import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../../lib/axios";

export const useRegisterUser = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: async (body) => {
      const registerResponse = await axiosInstance.post("/auth/register", body);

      return registerResponse;
    },
    onSuccess,
    onError,
  });
};
