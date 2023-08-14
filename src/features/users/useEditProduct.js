import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { axiosInstanceWithToken } from "../../lib/axios";
import { toastNotify } from "../../lib/utils";

export const useEditProduct = ({ refetchVideosDetails }) => {
  const [isModalEditProduct, setIsModalEditProduct] = useState(false);
  const [productId, setProductId] = useState("");

  const handleEditProduct = (productId) => {
    setProductId(productId);
    setIsModalEditProduct(true);
  };

  const { data: getProductDetails } = useQuery({
    queryFn: async () => {
      if (productId !== "") {
        const response = await axiosInstanceWithToken.get(
          `/products/${productId}`,
        );

        return response.data;
      }
    },
    enabled: productId !== "",
    queryKey: ["product", productId],
  });

  const { mutate: editProduct, isLoading: editProductLoading } = useMutation({
    mutationFn: async (body) => {
      const response = await axiosInstanceWithToken.patch(
        `/products/${productId}`,
        body,
      );

      return response.data;
    },
    onSuccess: () => {
      toastNotify({
        type: "info",
        message: "Product updated successfully",
      });
      setIsModalEditProduct(false);
      refetchVideosDetails();
    },
    onError: (error) => {
      toastNotify({
        type: "error",
        message: error?.response?.data?.message,
      });
    },
  });

  const formikEditProduct = useFormik({
    initialValues: {
      title: getProductDetails?.data?.title,
      price: getProductDetails?.data?.price,
      link: getProductDetails?.data?.link,
      imageUrl: getProductDetails?.data?.imageUrl,
    },
    enableReinitialize: true,
    onSubmit: async () => {
      const { ...data } = formikEditProduct.values;

      editProduct(data);
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      price: Yup.number()
        .required("Price is required")
        .test("is-non-zero", "Price is required", (value) => value > 0)
        .typeError("Price must be a number"),
      link: Yup.string()
        .required("Product url is required")
        .matches(/^https:\/\/.*$/, "Product url is not valid"),
      imageUrl: Yup.string()
        .required("Image url is required")
        .matches(/^https:\/\/.*$/, "Image url must start with https")
        .matches(/.*img.*|.*images.*|.*image.*/, "Image url is not valid"),
    }),
  });

  const handleEditProductFormInput = (e) => {
    formikEditProduct.setFieldValue(e.target.name, e.target.value);
  };

  return {
    isModalEditProduct,
    setIsModalEditProduct,
    handleEditProduct,
    formikEditProduct,
    handleEditProductFormInput,
    editProductLoading,
  };
};
