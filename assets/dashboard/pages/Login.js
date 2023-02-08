import React, { useContext } from "react";
import AuthLayout from "../components/AuthLayout";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/auth/authContext";
import RenderError from "../components/RenderError";

export default function Login() {
  const navigate = useNavigate();
  const { login, error, emailSuccess, emailError } = useContext(AuthContext);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      await login(values.email, values.password);
    },
  });

  const redirectToRegister = () => navigate("/dashboard/register");

  console.log({error})
  return (
    <AuthLayout>
      <section>
        <div className="container auth">
          {/* <!-- Log in box --> */}
          <div className="row pb-5">
            <div className="col-xl-4 col-lg-6 col-md-8 col-sm-12 mt-5">
              <div className="main-box">
                <div className="row">
                  <div className="col-lg-12 text-center">
                    <h1 className="pb-3">Log In</h1>
                    <p className="pb-3">Welcome to Quantic Staking</p>
                    {error ? <RenderError message={error} /> : <></>}
                    {emailError ? <RenderError message={emailError} /> : <></>}
                    <form onSubmit={formik.handleSubmit}>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-control form-box mb-3"
                        placeholder="E-mail Address ..."
                        onChange={formik.handleChange}
                        value={formik.values.email}
                      />
                      {formik.touched.email && formik.errors.email ? (
                        <RenderError message={formik.errors.email} />
                      ) : null}
                      <input
                        type="password"
                        id="pass"
                        name="password"
                        className="form-control form-box mb-2"
                        placeholder="Password ..."
                        onChange={formik.handleChange}
                        value={formik.values.firstName}
                      />
                      {formik.touched.password && formik.errors.password ? (
                        <RenderError message={formik.errors.password} />
                      ) : null}
                      <a href="">Forgot Password?</a>
                      <input
                        type="submit"
                        id="login"
                        value="Log In"
                        className="hero-gradient hero-btn w-100 mb-3 mt-5"
                      />
                      <p
                        href=""
                        onClick={redirectToRegister}
                        className="btn second-btn w-100"
                      >
                        Create Account
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </AuthLayout>
  );
}
