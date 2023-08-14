import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toastNotify } from "../../lib/utils";
import { useMutation } from "@tanstack/react-query";
import { axiosInstanceWithToken } from "../../lib/axios";
import { getYoutubeEmbedUrl } from "../../lib/utils";

export const useAddVideo = ({ refetchUserDetails }) => {
  const [isModalAddVideo, setIsModalAddVideo] = useState(false);

  const formikAddVideo = useFormik({
    initialValues: {
      title: "",
      url: "",
      thumbnailUrl: "",
    },
    onSubmit: () => {
      const { ...data } = formikAddVideo.values;
      data.url = getYoutubeEmbedUrl(data.url);
      addVideo(data);
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .required("Title is required")
        .max(100, "Title must be less than 100 characters"),
      url: Yup.string()
        .required("Youtube url is required")
        .matches(
          /^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/,
          "Youtube url is not valid",
        ),
      thumbnailUrl: Yup.string()
        .required("Thumbnail url is required")
        .matches(/^https:\/\/.*img.*$/, "Thumbnail url is not valid"),
    }),
  });

  const { mutate: addVideo, isLoading: addVideoLoading } = useMutation({
    mutationFn: async (body) => {
      const response = await axiosInstanceWithToken.post(`/videos`, body);

      return response;
    },
    onSuccess: () => {
      toastNotify({
        type: "success",
        message: "Video successfully added",
      });
      refetchUserDetails();
      setIsModalAddVideo(false);
    },
    onError: (error) => {
      toastNotify({
        type: "error",
        message: `${error.response.data.message}` || "Failed to add video",
      });
    },
  });

  const handleAddVideoFormInput = (e) => {
    formikAddVideo.setFieldValue(e.target.name, e.target.value);
  };

  return {
    isModalAddVideo,
    setIsModalAddVideo,
    formikAddVideo,
    addVideoLoading,
    handleAddVideoFormInput,
  };
};
