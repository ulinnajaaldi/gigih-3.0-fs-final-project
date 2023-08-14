import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";

export const useFetchVideoDetails = ({ id }) => {
  return useQuery({
    queryFn: async () => {
      const response = await axiosInstance.get(`/videos/${id}`);

      return response.data;
    },
    queryKey: ["video-details", id],
  });
};
