import React from "react";
import ProfileContext from "../context/profile/profileContext";
import { useFormik } from "formik";
import * as yup from "yup";
import RenderError from "../components/RenderError";
import countryList from "../config/countries";

const Profile = () => {
  const { profile, updateProfile, getUserByEmail } = React.useContext(ProfileContext);
  
  const ValidationSchema = yup.object().shape({
    firstName: yup.string().required("Required"),
    lastName: yup.string().required("Required"),
    email: yup.string().email("Email not valid").required("Required"),
    addressLine: yup.string().required("Required"),
    addressPostcode: yup.string().required("Postcode is required"),
    addressCountry: yup.string().required("Country is required"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: profile?.firstName || "",
      lastName: profile?.lastName || "",
      email: profile?.email || "",
      password: "",
      confpassword: "",
      addressLine: profile?.addressLine || "",
      addressPostcode: profile?.addressPostcode || "",
      addressCountry: profile?.addressCountry || "",
    },
    validationSchema: ValidationSchema,
    onSubmit: async (values) => {
      await updateProfile(profile?.id ,values);
      await getUserByEmail();
    },
  });

  React.useEffect(() => {
    if(!profile) return;

    formik.setValues({
      firstName: profile?.firstName,
      lastName: profile?.lastName,
      email: profile?.email,
      password: "",
      confpassword: "",
      addressLine: profile?.addressLine,
      addressPostcode: profile?.addressPostcode,
      addressCountry: profile?.addressCountry,
    })
  }, [profile])

  return (
    <form onSubmit={formik.handleSubmit}>
      <h2 className="pb-4">Edit Profile</h2>
      <div className="input-group form-box p-3 mb-5">
      <input
        type="text"
        id="firstName"
        name="firstName"
        className="form-control text-white fs-md"
        placeholder="First Name ..."
        onChange={formik.handleChange}
        value={formik.values.firstName}
      />
      {formik.touched.firstName && formik.errors.firstName ? (
        <RenderError message={formik.errors.firstName} />
      ) : null}
      </div>
      
      <div className="input-group form-box p-3 mb-5">
      <input
        type="text"
        id="lastName"
        name="lastName"
        className="form-control text-white fs-md"
        placeholder="Last Name ..."
        onChange={formik.handleChange}
        value={formik.values.lastName}
      />
      {formik.touched.lastName && formik.errors.lastName ? (
        <RenderError message={formik.errors.lastName} />
      ) : null}
      </div>

      <div className="input-group form-box p-3 mb-5">
      <input
        type="email"
        id="email"
        name="email"
        className="form-control text-white fs-md"
        placeholder="E-mail Address ..."
        onChange={formik.handleChange}
        value={formik.values.email}
      />
      {formik.touched.email && formik.errors.email ? (
        <RenderError message={formik.errors.email} />
      ) : null}
      </div>
      
      <div className="input-group form-box p-3 mb-5">
      <input
        type="password"
        id="pass"
        name="password"
        className="form-control text-white fs-md"
        placeholder="New Password ..."
        onChange={formik.handleChange}
        value={formik.values.password}
      />
      {formik.touched.password && formik.errors.password ? (
        <RenderError message={formik.errors.password} />
      ) : null}
      </div>

      <div className="input-group form-box p-3 mb-5">
      <input
        type="password"
        id="confpass"
        name="confpassword"
        className="form-control text-white fs-md"
        placeholder="Confirm New Password ..."
        onChange={formik.handleChange}
        value={formik.values.confpassword}
      />
      {formik.touched.confpassword && formik.errors.confpassword ? (
        <RenderError message={formik.errors.confpassword} />
      ) : null}
      </div>

      <div className="input-group form-box p-3 mb-5">
      <input
        type="address"
        id="addressLine"
        name="addressLine"
        className="form-control text-white fs-md"
        placeholder="Address ..."
        onChange={formik.handleChange}
        value={formik.values.addressLine}
      />
      {formik.touched.addressLine && formik.errors.addressLine ? (
        <RenderError message={formik.errors.addressLine} />
      ) : null}
      </div>
      
      <div className="input-group form-box p-3 mb-5">
        <input
          type="text"
          id="addressPostcode"
          name="addressPostcode"
          className="form-control text-white fs-md"
          placeholder="Postcode ..."
          onChange={formik.handleChange}
          value={formik.values.addressPostcode}
        />
        </div>
        
        
        <select
          id="addressCountry"
          name="addressCountry"
          className="input-group form-box p-3 mb-5"
          value={formik.values.addressCountry}
          onChange={formik.handleChange}
        >
          {countryList?.map((countryName, idx) => (
            <option value={countryName} key={idx}>
              {countryName}
            </option>
          ))}
        </select>

      {formik.touched.addressPostcode && formik.errors.addressPostcode ? (
        <RenderError message={formik.errors.addressPostcode} />
      ) : null}
      {formik.touched.addressCountry && formik.errors.addressCountry ? (
        <RenderError message={formik.errors.addressCountry} />
      ) : null}
      <input
        type="submit"
        id="next"
        value="Edit Profile"
        data-bs-dismiss="modal"
        className="hero-gradient hero-btn w-100 mt-3 me-2"
      />
    </form>
  );
};

export default Profile;
