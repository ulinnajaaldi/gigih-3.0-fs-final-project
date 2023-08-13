import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { axiosInstanceWithToken } from "../../lib/axios";
import { toastNotify } from "../../lib/utils";
import { useState } from "react";

export const useEditProfile = ({ userData, setData, refetchUserDetails }) => {
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);

  const formikEditProfile = useFormik({
    initialValues: {
      fullname: "",
      email: "",
    },
    onSubmit: async () => {
      const { ...data } = formikEditProfile.values;
      editProfile(data);
    },
  });

  const { mutate: editProfile, isLoading: editProfileLoading } = useMutation({
    mutationFn: async (body) => {
      const response = await axiosInstanceWithToken.patch("/auth/user", body);

      return response;
    },
    onSuccess: () => {
      toastNotify({
        type: "info",
        message: "Profile successfully updated",
      });
      refetchUserDetails();
      setIsEditProfileModalOpen(false);
      setData({
        ...userData,
        data: {
          ...userData.data,
          fullname: formikEditProfile.values.fullname,
          email: formikEditProfile.values.email,
        },
      });
    },
  });

  const handleEditFormInput = (e) => {
    formikEditProfile.setFieldValue(e.target.name, e.target.value);
  };

  const onEditProfileClick = () => {
    formikEditProfile.setFieldValue("fullname", userData?.data?.fullname);
    formikEditProfile.setFieldValue("email", userData?.data?.email);
    setIsEditProfileModalOpen(true);
  };

  return {
    isEditProfileModalOpen,
    setIsEditProfileModalOpen,
    formikEditProfile,
    editProfileLoading,
    handleEditFormInput,
    onEditProfileClick,
  };
};
