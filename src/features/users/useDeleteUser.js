import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import Cookies from "js-cookie";
import { axiosInstanceWithToken } from "../../lib/axios";
import { toastNotify } from "../../lib/utils";

export const useDeleteUser = ({ setData, navigate }) => {
  const [isDeleteAccountModalOpen, setIsDeleteAccountModalOpen] =
    useState(false);

  const { mutate: deleteAccount, isLoading: deleteAccountLoading } =
    useMutation({
      mutationFn: async () => {
        if (Cookies.get("access_token")) {
          const deleteAccount = await axiosInstanceWithToken.delete(
            `/auth/user`,
          );

          return deleteAccount;
        }
      },
      onSuccess: () => {
        toastNotify({
          type: "info",
          message: "Account successfully deleted",
        });
        setData(null);
        Cookies.remove("access_token");
        Cookies.remove("refresh_token");
        navigate("/");
      },
      onError: () => {
        toastNotify({
          type: "error",
          message: "Failed to delete account",
        });
      },
    });

  return {
    isDeleteAccountModalOpen,
    setIsDeleteAccountModalOpen,
    deleteAccount,
    deleteAccountLoading,
  };
};
