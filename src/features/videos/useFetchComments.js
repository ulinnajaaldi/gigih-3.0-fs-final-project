import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";

export const useFetchComments = ({ id }) => {
  return useQuery({
    queryFn: async () => {
      const response = await axiosInstance.get(`/comments/${id}`);

      return response.data;
    },
    queryKey: ["comments", id],
  });
};
