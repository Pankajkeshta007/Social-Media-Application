import { Button, TextField } from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { loginUserAction } from "../../Redux/Auth/auth.action";
import { useNavigate } from "react-router-dom";
import ErrorPopup from "../../components/ErrorPopup/ErrorPopup";

const initialValues = { email: "", password: "" };
const validationSchema = {
  email: Yup.string().email("invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be atleast of 6 characters")
    .required("Password is required"),
};
const Login = () => {
  const [formValue, setFormValue] = useState();
  const dispatch=useDispatch();
  const [error, setError] = useState('');

  // const handleLogin = () => {
  //   // Logic for login
  //   // If login fails, set error message
  //   setError('Login failed. Please try again.');
  // };

  const handleSubmit = async(values) => {
    console.log("handle Submit", values);
    dispatch(loginUserAction({data:values}))

     .then(() => {
        // Reset error state if login is successful
        setError("");
      })
      .catch(() => {
        // Set error message if login fails
        setError("Login failed. Please try again.");
      });
  };

  const navigate=useNavigate();
  return (
    <>
      <Formik
        onSubmit={handleSubmit}
        // validationSchema={validationSchema}
        initialValues={initialValues}
      >
        <Form className="space-y-5 mx-auto">
          <div className="space-y-5">
            <div>
              <Field
                as={TextField}
                name="email"
                placeholder="Email"
                type="email"
                variant="outlined"
                fullWidth
              />
              <ErrorMessage
                name="email"
                component={"div"}
                className="text-red-500"
              />
            </div>

            <div>
              <Field
                as={TextField}
                name="password"
                placeholder="Password"
                type="password"
                variant="outlined"
                fullWidth
              />
              <ErrorMessage
                name="password"
                component={"div"}
                className="text-red-500"
              />
            </div>
          </div>
          <Button
            sx={{ padding: ".8rem 0rem" }}
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
          >
            Login
          </Button>
        </Form>
      </Formik>
      {error && <ErrorPopup message={error} onClose={() => setError('')} />}
      <div className="flex gap-2 items-center justify-center pt-5 mx-auto">
        <p>if you don't have account ?</p>
        <Button className="text-primary" onClick={()=>navigate("/register")}>Register</Button>
      </div>
    </>
  );
};

export default Login;
