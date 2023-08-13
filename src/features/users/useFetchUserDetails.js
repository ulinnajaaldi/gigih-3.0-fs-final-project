import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";

export const useFetchUserDetails = (id) => {
  return useQuery({
    queryFn: async () => {
      if (id) {
        const userDetailsResponse = await axiosInstance.get(`/user/${id}`);

        return userDetailsResponse.data;
      } else {
        return {};
      }
    },
    queryKey: ["userDetails", id],
  });
};
