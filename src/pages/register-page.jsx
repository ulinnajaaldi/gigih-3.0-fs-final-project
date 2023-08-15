import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/auth-provider";
import { HomeIcon } from "@heroicons/react/24/outline";
import { InformationCircleIcon } from "@heroicons/react/20/solid";
import {
  Button,
  Tooltip,
  Card,
  Input,
  Checkbox,
  Typography,
  Spinner,
} from "@material-tailwind/react";
import { AuthHero } from "../components";
import { toastNotify } from "../lib/utils";
import { useRegisterForm } from "../features/auth/register/useRegisterForm";

const RegisterPage = () => {
  const { data } = useContext(AuthContext);
  const navigate = useNavigate();
  if (data) {
    navigate("/");
  }

  const onSuccess = (data) => {
    toastNotify({
      type: "success",
      message: data.data.message,
    });
    navigate("/login");
  };

  const onError = (error) => {
    toastNotify({
      type: "error",
      message: error.response.data.message,
    });
  };

  const { formik, isLoading } = useRegisterForm({ onSuccess, onError });

  const handleForm = (event) => {
    const { target } = event;

    formik.setFieldValue(target.name, target.value);
  };

  return (
    <section className="container relative">
      <Tooltip content="Back to Homepage" placement="right">
        <Link
          to="/"
          className="group fixed left-3 top-3 flex items-center justify-center gap-2 rounded-full bg-gray-800 p-2 text-white"
        >
          <HomeIcon className="h-5 w-5" />
        </Link>
      </Tooltip>
      <div
        className="flex min-h-screen items-center justify-center"
        style={{
          height: "400px",
        }}
      >
        <Card color="transparent" shadow={false} className="py-3">
          <AuthHero />
          <Typography variant="h4" color="blue-gray">
            Sign up
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            Enter your details to register.
          </Typography>
          <form
            className="mb-2 mt-8 w-80 max-w-screen-lg sm:w-96"
            onSubmit={formik.handleSubmit}
          >
            <div className="mb-4 flex flex-col gap-6">
              <div>
                <Input
                  size="lg"
                  label="Fullname"
                  name="fullname"
                  onChange={handleForm}
                  error={
                    formik.errors.fullname && formik.touched.fullname && true
                  }
                />
                {formik.errors.fullname && formik.touched.fullname && (
                  <Typography
                    variant="small"
                    color="red"
                    className="mt-2 font-normal"
                  >
                    {formik.errors.fullname}
                  </Typography>
                )}
              </div>
              <div>
                <Input
                  size="lg"
                  label="Email"
                  name="email"
                  onChange={handleForm}
                  error={formik.errors.email && formik.touched.email && true}
                />
                {formik.errors.email && formik.touched.email && (
                  <Typography
                    variant="small"
                    color="red"
                    className="mt-2 font-normal"
                  >
                    {formik.errors.email}
                  </Typography>
                )}
              </div>
              <div>
                <Input
                  type="password"
                  size="lg"
                  label="Password"
                  name="password"
                  onChange={handleForm}
                  error={
                    formik.errors.password && formik.touched.password && true
                  }
                />
                <Typography
                  variant="small"
                  color={
                    formik.errors.password && formik.touched.password
                      ? "red"
                      : "gray"
                  }
                  className="mt-2 flex items-center gap-1 font-normal"
                >
                  {formik.errors.password && formik.touched.password ? (
                    <>{formik.errors.password}</>
                  ) : (
                    <>
                      <InformationCircleIcon className="h-4 w-4" />
                      Password must be at least 8 characters
                    </>
                  )}
                </Typography>
              </div>
            </div>
            <div>
              <Checkbox
                name="cheked"
                checked={formik.values.cheked}
                onChange={() => {
                  formik.setFieldValue("cheked", !formik.values.cheked);
                }}
                label={
                  <Typography
                    variant="small"
                    color="gray"
                    className="flex items-center font-normal"
                  >
                    I agree the
                    <a
                      href="#"
                      className="font-medium transition-colors hover:text-gray-900"
                    >
                      &nbsp;Terms and Conditions
                    </a>
                  </Typography>
                }
                containerProps={{ className: "-ml-2.5" }}
              />
              {formik.errors.cheked && formik.touched.cheked && (
                <Typography
                  variant="small"
                  color="red"
                  className="mt-2 flex items-center gap-1 font-normal"
                >
                  <InformationCircleIcon className="h-4 w-4" />
                  {formik.errors.cheked}
                </Typography>
              )}
            </div>
            {isLoading ? (
              <Button
                type="submit"
                disabled
                className="mt-6 flex items-center justify-center"
                fullWidth
              >
                <Spinner color="green" size="sm" />
              </Button>
            ) : (
              <Button type="submit" className="mt-6" fullWidth>
                Register
              </Button>
            )}

            <Typography color="gray" className="mt-4 text-center font-normal">
              Already have an account?{" "}
              <Link to="/login" className="font-medium text-gray-900">
                Login here
              </Link>
            </Typography>
          </form>
        </Card>
      </div>
    </section>
  );
};

export default RegisterPage;
