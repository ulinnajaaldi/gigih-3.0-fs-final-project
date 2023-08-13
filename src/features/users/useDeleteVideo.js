import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { axiosInstanceWithToken } from "../../lib/axios";
import { toastNotify } from "../../lib/utils";

export const useDeleteVideo = ({ refetchUserDetails }) => {
  const [isDeleteVideoModalOpen, setIsDeleteVideoModalOpen] = useState(false);
  const [videoIdToDelete, setVideoIdToDelete] = useState(null);

  const handleDeleteVideo = (videoId) => {
    setIsDeleteVideoModalOpen(true);
    setVideoIdToDelete(videoId);
  };

  const { mutate: deleteVideo, isLoading: deleteVideoLoading } = useMutation({
    mutationFn: async (videoId) => {
      if (videoId) {
        const deleteVideo = await axiosInstanceWithToken.delete(
          `/videos/${videoId}`,
        );

        return deleteVideo;
      }
    },
    onSuccess: () => {
      toastNotify({
        type: "info",
        message: "Video successfully deleted",
      });
      refetchUserDetails();
    },
    onError: () => {
      toastNotify({
        type: "error",
        message: "Failed to delete video",
      });
    },
  });

  return {
    isDeleteVideoModalOpen,
    setIsDeleteVideoModalOpen,
    videoIdToDelete,
    handleDeleteVideo,
    deleteVideo,
    deleteVideoLoading,
  };
};
