import { Formik, Field, Form } from "formik";
import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import * as Yup from "yup";

import { UserContext } from "../contexts/UserContext";

import { ToastContainer, Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//formik custom error message
import CustomStyleErrorMessage from "./CustomStyleErrorMessage";

const AuthForm = ({ isLogin }) => {
  const [redirect, setRedirect] = useState(false);
  const { updateToken } = useContext(UserContext);
  const initialValues = {
    username: "",
    email: "",
    password: "",
  };

  const submitHandler = async (values) => {
    const { username, password, email } = values;
    let END_POINT = `${import.meta.env.VITE_API}/register`;

    if (isLogin) {
      END_POINT = `${import.meta.env.VITE_API}/login`;
    }

    const response = await fetch(END_POINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password, email }),
    });

    const toastFire = (message) => {
      toast.error(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    };

    const responseData = await response.json();
    console.log(responseData);
    if (response.status === 201) {
      setRedirect(true);
    } else if (response.status === 200) {
      updateToken(responseData);
      setRedirect(true);
    } else if (response.status === 400) {
      const selectedMessage = responseData.errorMessages[0].msg;
      toastFire(selectedMessage);
    } else if (response.status === 401) {
      toastFire(responseData.message);
    }
  };

  if (redirect) {
    return <Navigate to={isLogin ? "/" : "/login"} />;
  }

  const AuthFormSchema = Yup.object({
    username: isLogin
      ? null
      : Yup.string()
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
    <>
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
            {!isLogin && (
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
            )}

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
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
    </>
  );
};

AuthForm.propTypes = {
  isLogin: PropTypes.bool.isRequired,
};

export default AuthForm;
