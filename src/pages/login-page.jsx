import { Link } from "react-router-dom";
import { HomeIcon } from "@heroicons/react/24/outline";
import {
  Button,
  Tooltip,
  Card,
  Input,
  Typography,
  Spinner,
} from "@material-tailwind/react";
import { AuthHero } from "../components";
import { toastNotify } from "../lib/utils";
import { useLoginForm } from "../features/auth/login/useLoginForm";

const LoginPage = () => {
  const onSuccess = () => {
    window.location.href = "/";
  };
  const onError = (error) => {
    toastNotify({
      type: "error",
      message: error.response.data.message,
    });
  };

  const { formik, isLoading } = useLoginForm({ onSuccess, onError });

  const handleForm = (event) => {
    const { target } = event;

    formik.setFieldValue(target.name, target.value);
  };

  return (
    <section className="container relative">
      <Tooltip content="Back to Homepage" placement="right">
        <Link
          to="/"
          className="group absolute left-3 top-3 flex items-center justify-center gap-2 rounded-full bg-gray-800 p-2 text-white"
        >
          <HomeIcon className="h-5 w-5" />
        </Link>
      </Tooltip>
      <div className="flex min-h-screen items-center justify-center">
        <Card color="transparent" shadow={false}>
          <AuthHero />
          <Typography variant="h4" color="blue-gray">
            Hi there! Nice to see you again.
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            Please login to continue
          </Typography>
          <form
            className="mb-2 mt-8 w-80 max-w-screen-lg sm:w-96"
            onSubmit={formik.handleSubmit}
          >
            <div className="mb-4 flex flex-col gap-6">
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
                {formik.errors.password && formik.touched.password && (
                  <Typography
                    variant="small"
                    color="red"
                    className="mt-2 font-normal"
                  >
                    {formik.errors.password}
                  </Typography>
                )}
              </div>
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
                Login
              </Button>
            )}
            <Typography color="gray" className="mt-4 text-center font-normal">
              Don't have an account?{" "}
              <Link to="/register" className="font-medium text-gray-900">
                Register Now
              </Link>
            </Typography>
          </form>
        </Card>
      </div>
    </section>
  );
};

export default LoginPage;
