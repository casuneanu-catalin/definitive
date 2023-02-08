import React from "react";
import { useNavigate } from "react-router-dom";
import RegistrationContext from "../context/registration/registrationContext";
import { useFormik } from "formik";
import * as yup from "yup";
import RenderError from "./RenderError";
import {
  setActiveStepIndex,
  setFormData,
} from "../context/registration/registrationActions";
import countryList from "../config/countries";

const RegisterFormSecondStep = () => {
  const { redirectToLogin, dispatch, activeStepIndex, formData, registrate } =
    React.useContext(RegistrationContext);

  const ValidationSchema = yup.object().shape({
    firstName: yup.string().required("Required"),
    lastName: yup.string().required("Required"),
    email: yup.string().email("Email not valid").required("Required"),
    password: yup
      .string()
      .required("Required")
      .min(8, "Password must be 8 characters long")
      .matches(/[0-9]/, "Password requires a number")
      .matches(/[a-z]/, "Password requires a lowercase letter")
      .matches(/[A-Z]/, "Password requires an uppercase letter")
      .matches(/[^\w]/, "Password requires a symbol"),
    confpassword: yup
      .string()
      .required("Required")
      .oneOf([yup.ref("password"), null], 'Must match "password" field value'),
    addressLine: yup.string().required("Required"),
    addressPostcode: yup.string().required("Postcode is required"),
    acceptedTerms: yup
      .string() 
      .oneOf(["on"], "You must accept the terms and conditions."),
    addressCountry: yup.string().required("Country is required"),
  });

  const formik = useFormik({
    initialValues: {
      ...formData,
      addressLine: "",
      addressPostcode: "",
      addressCountry: "",
      file: "",
      acceptedTerms: "off",
    },
    validationSchema: ValidationSchema,
    onSubmit: (values) => registrate(values),
  });

  const handleUploadFile = (e) => {
    formik.setFieldValue("file", e.currentTarget.files[0])
  }

  return (
    <div className="row py-5" style={{position: 'relative', zIndex: 10}}>
      <div className="col-lg-8">
        <div className="row pb-3 ">
          <div className="mt-3 col-lg-6 col-sm-8">
            <h1>Create Account</h1>
            <p className="py-4">
              Before you can access all the investment opportunities, you need
              to create a Quantic Staking account.
            </p>
          </div>
        </div>
        <div className="row pb-5">
          <div className="col-lg-6 col-lg-6 col-md-6 col-sm-6 col-xs-12 pb-3">
            <div
              role="button"
              onClick={() => setStep(1)}
              className="step-icon hero-step center d-inline-flex me-3"
            >
              1
            </div>
            <span className="text-secondary d-inline">Account Info</span>
          </div>
          <div className="col-lg-6 col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <div className="step-icon hero-step center d-inline-flex me-3">
              2
            </div>
            <span className="text-secondary">KYC</span>
          </div>
        </div>
        <div className="main-box mb-3">
          <div className="row">
            <div className="col-lg-6">
              <h2 className="pb-3">Account Info</h2>
              <p className="pb-3">Basic details to use when logging in</p>
              <form>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  className="form-control form-box mb-3"
                  placeholder="First Name ..."
                  onChange={formik.handleChange}
                  value={formik.values.firstName}
                />
                {formik.touched.firstName && formik.errors.firstName ? (
                  <RenderError message={formik.errors.firstName} />
                ) : null}
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  className="form-control form-box mb-3"
                  placeholder="Last Name ..."
                  onChange={formik.handleChange}
                  value={formik.values.lastName}
                />
                {formik.touched.lastName && formik.errors.lastName ? (
                  <RenderError message={formik.errors.lastName} />
                ) : null}
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
                  className="form-control form-box mb-3"
                  placeholder="Password ..."
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
                {formik.touched.password && formik.errors.password ? (
                  <RenderError message={formik.errors.password} />
                ) : null}
                <input
                  type="password"
                  id="confpass"
                  name="confpassword"
                  className="form-control form-box mb-5"
                  placeholder="Confirm Password ..."
                  onChange={formik.handleChange}
                  value={formik.values.confpassword}
                />
                {formik.touched.confpassword && formik.errors.confpassword ? (
                  <RenderError message={formik.errors.confpassword} />
                ) : null}
              </form>
            </div>
            <div className="col-lg-6">
              <h2 className="pb-3">Know Your Customers</h2>
              <p className="pb-3">Getting to know you more</p>
              <form
                onSubmit={formik.handleSubmit}
                encType="multipart/form-data"
              >
                <input
                  type="address"
                  id="addressLine"
                  name="addressLine"
                  className="form-control form-box mb-3"
                  placeholder="Address ..."
                  onChange={formik.handleChange}
                  value={formik.values.addressLine}
                />
                {formik.touched.addressLine && formik.errors.addressLine ? (
                  <RenderError message={formik.errors.addressLine} />
                ) : null}
                <div className="input-group pb-3">
                  <input
                    type="text"
                    id="addressPostcode"
                    name="addressPostcode"
                    className="form-control form-box mb-3 me-3"
                    placeholder="Postcode ..."
                    onChange={formik.handleChange}
                    value={formik.values.addressPostcode}
                  />
                  <select
                    id="addressCountry"
                    name="addressCountry"
                    className="form-control form-box mb-3"
                    value={formik.values.addressCountry}
                    onChange={formik.handleChange}
                  >
                    {countryList?.map((countryName, idx) => (
                      <option value={countryName} key={idx}>
                        {countryName}
                      </option>
                    ))}
                  </select>
                </div>
                {formik.touched.addressPostcode &&
                  formik.errors.addressPostcode ? (
                    <RenderError message={formik.errors.addressPostcode} />
                  ) : null}
                  {formik.touched.addressCountry &&
                  formik.errors.addressCountry ? (
                    <RenderError message={formik.errors.addressCountry} />
                  ) : null}
                <h2 className="pb-2">Passport Photo</h2>
                <p className="fs-xs pb-2">
                  Upload a recent photo of yourself, holding the passport in
                  your hand where both your face and the passport is visible.
                </p>
                <input
                  type="file"
                  name="file"
                  id="file"
                  accept=".jpg,.jpeg,.png"
                  className="upload-btn"
                  onChange={handleUploadFile}
                />
                <label htmlFor="file" className="w-50">
                  Browse Files
                </label>
                {formik.touched.file && formik.errors.file ? (
                  <RenderError message={formik.errors.file} />
                ) : null}
                <div className="form-check pt-4 pb-5">
                <label
                    className="form-check-label ps-2 pt-1"
                    htmlFor="acceptedTerms"
                  >
                  <input
                    className="form-check-input"
                    type="radio"
                    name="acceptedTerms"
                    id="acceptedTerms"
                    onChange={formik.handleChange}
                  />
                    I accept the <a href="">terms and conditions</a>
                  </label>
                </div>
                {formik.touched.acceptedTerms && formik.errors.acceptedTerms ? (
                    <RenderError message={formik.errors.acceptedTerms} />
                  ) : null}
                <input
                  type="submit"
                  id="next"
                  value="Create Account"
                  className="hero-gradient hero-btn w-100 mt-3 me-2"
                />
              </form>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 text-center">
            <a onClick={redirectToLogin} href="">
              Back To Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

function RegisterFormFirstStep() {
  const { redirectToLogin, dispatch, activeStepIndex, formData } =
    React.useContext(RegistrationContext);

  const ValidationSchema = yup.object().shape({
    firstName: yup.string().required("Required"),
    lastName: yup.string().required("Required"),
    email: yup.string().email("Email not valid").required("Required"),
    password: yup
      .string()
      .required("Required")
      .min(8, "Password must be 8 characters long")
      .matches(/[0-9]/, "Password requires a number")
      .matches(/[a-z]/, "Password requires a lowercase letter")
      .matches(/[A-Z]/, "Password requires an uppercase letter")
      .matches(/[^\w]/, "Password requires a symbol"),
    confpassword: yup
      .string()
      .required("Required")
      .oneOf([yup.ref("password"), null], 'Must match "password" field value'),
  });
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confpassword: "",
    },
    validationSchema: ValidationSchema,
    onSubmit: (values) => {
      const data = { ...formData, ...values };
      dispatch(setFormData(data));
      dispatch(setActiveStepIndex(activeStepIndex + 1));
    },
  });

  return (
    <div className="row py-5" style={{position: 'relative', zIndex: 10}}>
      <div className="col-xl-4 col-lg-6 col-md-8 col-sm-12">
        <div className="row pb-3">
          <div className="mt-3 col-lg-12 col-sm-8">
            <h1>Create Account</h1>
            <p className="py-4">
              Before you can access all the investment opportunities, you need
              to create a Quantic Staking account.
            </p>
          </div>
        </div>
        <div className="row pb-5">
          <div className="col-lg-6 col-lg-6 col-md-6 col-sm-6 col-xs-12 pb-3">
            <div className="step-icon hero-step center d-inline-flex me-3">
              1
            </div>
            <span className="text-secondary d-inline">Account Info</span>
          </div>
          <div className="col-lg-6 col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <div className="step-icon next-step center d-inline-flex me-3">
              2
            </div>
            <span className="info-purple">KYC</span>
          </div>
        </div>
        <div className="main-box mb-3">
          <div className="row">
            <div className="col-lg-12">
              <h2 className="pb-3">Account Info</h2>
              <p className="pb-3">All fields are mandatory</p>
              <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  className="form-control form-box mb-3"
                  placeholder="Name ..."
                  onChange={formik.handleChange}
                  value={formik.values.firstName}
                />
                {formik.touched.firstName && formik.errors.firstName ? (
                  <RenderError message={formik.errors.firstName} />
                ) : null}
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  className="form-control form-box mb-3"
                  placeholder="Last Name ..."
                  onChange={formik.handleChange}
                  value={formik.values.lastName}
                />
                {formik.touched.lastName && formik.errors.lastName ? (
                  <RenderError message={formik.errors.lastName} />
                ) : null}
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
                  className="form-control form-box mb-3"
                  placeholder="Password ..."
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
                {formik.touched.password && formik.errors.password ? (
                  <RenderError message={formik.errors.password} />
                ) : null}
                <input
                  type="password"
                  id="confpass"
                  name="confpassword"
                  className="form-control form-box mb-5"
                  placeholder="Confirm Password ..."
                  onChange={formik.handleChange}
                  value={formik.values.confpassword}
                />
                {formik.touched.confpassword && formik.errors.confpassword ? (
                  <RenderError message={formik.errors.confpassword} />
                ) : null}
                <input
                  type="submit"
                  id="next"
                  value="Next"
                  className="hero-gradient hero-btn w-100 mt-3"
                />
              </form>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 text-center">
            <a onClick={redirectToLogin} href="">
              Back To Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export function RegisterForm() {
  const { activeStepIndex } = React.useContext(RegistrationContext);

  switch (activeStepIndex) {
    case 1:
      return <RegisterFormFirstStep />;
      break;
    case 2:
      return <RegisterFormSecondStep />;
      break;
    default:
      break;
  }
}
