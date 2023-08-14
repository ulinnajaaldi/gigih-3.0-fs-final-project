import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";
import { debounce } from "../../lib/utils";

export const useCommentForm = ({
  id,
  data,
  channel,
  refetchAllComments,
  commentValueRef,
}) => {
  const formik = useFormik({
    initialValues: {
      comment: "",
    },
    onSubmit: () => {
      const { comment } = formik.values;
      const username = data?.data.fullname;
      const videoId = id;
      channel.publish("new comment", { username, comment, videoId });

      addComment({ comment, username });
    },
    validationSchema: Yup.object({
      comment: Yup.string().max(200),
    }),
  });

  const { mutate: addComment, isLoading: addCommentLoading } = useMutation({
    mutationFn: async (body) => {
      const response = await axiosInstance.post(`/comments/${id}`, body);

      return response.data;
    },
    onSuccess: () => {
      formik.setFieldValue("comment", "");
      commentValueRef.current.value = "";
      refetchAllComments();
    },
  });

  const handleCommentInput = debounce((e) => {
    formik.setFieldValue("comment", e.target.value);

    commentValueRef.current = e.target;
  }, 500);

  return {
    formik,
    addCommentLoading,
    handleCommentInput,
  };
};
