import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { axiosInstanceWithToken } from "../../lib/axios";
import { toastNotify } from "../../lib/utils";

export const useAddProduct = ({ refetchUserDetails }) => {
  const [isModalAddProduct, setIsModalAddProduct] = useState(false);
  const [videoId, setVideoId] = useState(null);

  const formikAddProduct = useFormik({
    initialValues: {
      title: "",
      price: 0,
      link: "",
      imageUrl: "",
    },
    onSubmit: () => {
      const { ...data } = formikAddProduct.values;
      addProduct(data);
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      price: Yup.number()
        .required("Price is required")
        .test("is-non-zero", "Price is required", (value) => value > 0)
        .typeError("Price must be a number"),
      link: Yup.string().required("Product url is required"),
      imageUrl: Yup.string().required("Image url is required"),
    }),
  });

  const { mutate: addProduct, isLoading: addProductLoading } = useMutation({
    mutationFn: async (body) => {
      const response = await axiosInstanceWithToken.post(
        `/products/${videoId}`,
        body,
      );

      return response;
    },
    onSuccess: () => {
      toastNotify({
        type: "success",
        message: "Product successfully added",
      });
      refetchUserDetails();
      setIsModalAddProduct(false);
    },
    onError: (error) => {
      toastNotify({
        type: "error",
        message: `${error.response.data.message}` || "Failed to add product",
      });
    },
  });

  const handleAddProduct = (id) => {
    setVideoId(id);
    setIsModalAddProduct(true);
  };

  const handleAddProductFormInput = (e) => {
    formikAddProduct.setFieldValue(e.target.name, e.target.value);
  };

  return {
    isModalAddProduct,
    setIsModalAddProduct,
    formikAddProduct,
    addProductLoading,
    handleAddProduct,
    handleAddProductFormInput,
  };
};
