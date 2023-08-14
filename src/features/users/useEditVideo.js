import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toastNotify } from "../../lib/utils";
import { useMutation } from "@tanstack/react-query";
import { axiosInstanceWithToken } from "../../lib/axios";
import { getYoutubeEmbedUrl } from "../../lib/utils";

export const useEditVideo = ({
  refetchVideosDetails,
  getVideosDetails,
  id,
}) => {
  const [isModalEditVideo, setIsModalEditVideo] = useState(false);

  const { mutate: editVideo, isLoading: editVideoLoading } = useMutation({
    mutationFn: async (body) => {
      const response = await axiosInstanceWithToken.patch(
        `/videos/${id}`,
        body,
      );

      return response.data;
    },
    onSuccess: () => {
      toastNotify({
        type: "info",
        message: "Video edited successfully",
      });
      refetchVideosDetails();
      setIsModalEditVideo(false);
    },
    onError: (error) => {
      toastNotify({
        type: "error",
        message: error?.response?.data?.message,
      });
    },
  });

  const formikEditVideo = useFormik({
    initialValues: {
      title: getVideosDetails?.data?.title,
      url: getVideosDetails?.data?.url,
      thumbnailUrl: getVideosDetails?.data?.thumbnailUrl,
    },
    enableReinitialize: true,
    onSubmit: () => {
      const { ...data } = formikEditVideo.values;
      data.url = getYoutubeEmbedUrl(data.url);
      editVideo(data);
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

  const handleEditVideoFormInput = (e) => {
    formikEditVideo.setFieldValue(e.target.name, e.target.value);
  };

  return {
    isModalEditVideo,
    setIsModalEditVideo,
    formikEditVideo,
    editVideoLoading,
    handleEditVideoFormInput,
  };
};
