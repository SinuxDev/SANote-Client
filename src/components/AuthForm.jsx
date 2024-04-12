import { Formik, Field, Form } from "formik";
import PropTypes from "prop-types";
import * as Yup from "yup";

//formik custom error message
import CustomStyleErrorMessage from "./CustomStyleErrorMessage";

const AuthForm = ({ isLogin }) => {
  const initialValues = {
    username: "",
    email: "",
    password: "",
  };

  const submitHandler = (values) => {
    console.log(values);
  };

  const AuthFormSchema = Yup.object({
    username: Yup.string()
      .min(3, "Username is too short")
      .max(10, "Username is too long")
      .required("Username is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(4, "Password is too short")
      .required("Password is required"),
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={submitHandler}
      validationSchema={AuthFormSchema}
    >
      {() => (
        <Form className="w-1/2 mx-auto mt-6">
          <h1 className="text-center font-bold text-4xl my-4 text-teal-600 mb-3">
            {isLogin ? "Login To Your Account" : "Register A New Account"}
          </h1>
          <div className="mb-3">
            <label htmlFor="username" className=" font-medium block">
              Username
            </label>
            <Field
              type="text"
              name="username"
              id="username"
              className=" text-lg border-2 border-teal-600 py-1 w-full rounded-lg"
            />
            <CustomStyleErrorMessage name="username" />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className=" font-medium block">
              Email
            </label>
            <Field
              type="email"
              name="email"
              id="email"
              className=" text-lg border-2 border-teal-600 py-1 w-full rounded-lg"
            />
            <CustomStyleErrorMessage name="email" />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className=" font-medium block">
              Password
            </label>
            <Field
              type="password"
              name="password"
              id="password"
              className=" text-lg border-2 border-teal-600 py-1 w-full rounded-lg"
            />
            <CustomStyleErrorMessage name="password" />
          </div>
          <button
            type="submit"
            className="text-white bg-teal-600 py-3 font-medium w-full"
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </Form>
      )}
    </Formik>
  );
};

AuthForm.propTypes = {
  isLogin: PropTypes.bool.isRequired,
};

export default AuthForm;
