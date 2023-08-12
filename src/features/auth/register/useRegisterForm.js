import { useRegisterUser } from "./useRegisterUser";
import { useFormik } from "formik";
import * as Yup from "yup";

export const useRegisterForm = ({ onSuccess, onError }) => {
  const { mutate, isLoading } = useRegisterUser({ onSuccess, onError });

  const formik = useFormik({
    initialValues: {
      fullname: "",
      email: "",
      password: "",
      cheked: false,
    },
    onSubmit: () => {
      const { cheked, ...data } = formik.values;

      mutate(data);
    },
    validationSchema: Yup.object({
      fullname: Yup.string()
        .min(4, "Fullname must be at least 4 characters")
        .required("Fullname is required"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
      cheked: Yup.boolean().oneOf([true], "You must agree to the terms"),
    }),
  });

  return { formik, isLoading };
};
