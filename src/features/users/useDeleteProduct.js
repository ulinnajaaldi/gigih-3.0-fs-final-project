import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { axiosInstanceWithToken } from "../../lib/axios";
import { toastNotify } from "../../lib/utils";

export const useDeleteProduct = ({ refetchVideosDetails }) => {
  const [isModalDeleteProduct, setIsModalDeleteProduct] = useState(false);
  const [productId, setProductId] = useState(null);

  const handleDeleteProduct = (productId) => {
    setProductId(productId);
    setIsModalDeleteProduct(true);
  };

  const { mutate: deleteProduct, isLoading: deleteProductLoading } =
    useMutation({
      mutationFn: async (productId) => {
        if (productId) {
          const response = await axiosInstanceWithToken.delete(
            `/products/${productId}`,
          );

          return response.data;
        }
      },
      onSuccess: () => {
        toastNotify({
          type: "info",
          message: "Product deleted successfully",
        });
        setIsModalDeleteProduct(false);
        refetchVideosDetails();
      },
      onError: (error) => {
        toastNotify({
          type: "error",
          message: error?.response?.data?.message,
        });
      },
    });

  return {
    isModalDeleteProduct,
    setIsModalDeleteProduct,
    handleDeleteProduct,
    deleteProduct,
    deleteProductLoading,
    productId,
  };
};
