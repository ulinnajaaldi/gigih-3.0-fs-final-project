import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";

export const useFetchVideos = (search) => {
  return useQuery({
    queryFn: async () => {
      const videosResponse = await axiosInstance.get("/videos", {
        params: {
          search,
        },
      });
      return videosResponse;
    },
    queryKey: ["videos", search],
  });
};
