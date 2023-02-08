import React from "react";
import Layout from "../components/Layout";
import { useFormik } from "formik";
import * as yup from "yup";
import RenderError from "../components/RenderError";

export const Support = () => {
  const ValidationSchema = yup.object().shape({
    email: yup.string().email("Email not valid").required("Required"),
    subject: yup.string().required("Required"),
    message: yup.string().required("Required"),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      subject: "",
      message: "",
    },
    validationSchema: ValidationSchema,
    onSubmit: (values) => {
      console.log({ values });
    },
  });

  return (
    <Layout>
      <div className="row">
        <div className="col-lg-6 text-start mx-auto">
          <form
            onSubmit={formik.handleSubmit}
            className="main-box"
          >
            <h2 className="pb-4">Support</h2>
            <div className="input-group form-box p-3 mb-5">
              <input
                type="text"
                id="email"
                name="email"
                className="form-control text-white fs-md"
                style={{
                    backgroundColor: '#413460',
                    borderColor: 'transparent'
                }}
                placeholder="Email ..."
                onChange={formik.handleChange}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email ? (
                <RenderError message={formik.errors.email} />
              ) : null}
            </div>
            <div className="input-group form-box p-3 mb-5">
              <input
                type="text"
                id="subject"
                name="subject"
                className="form-control text-white fs-md"
                style={{
                    backgroundColor: '#413460',
                    borderColor: 'transparent'
                }}
                placeholder="Subject ..."
                onChange={formik.handleChange}
                value={formik.values.subject}
              />
              {formik.touched.subject && formik.errors.subject ? (
                <RenderError message={formik.errors.subject} />
              ) : null}
            </div>
            <div className="input-group form-box p-3 mb-5">
              <input
                type="text"
                id="message"
                name="message"
                className="form-control text-white fs-md"
                style={{
                    backgroundColor: '#413460',
                    borderColor: 'transparent'
                }}
                placeholder="Message ..."
                onChange={formik.handleChange}
                value={formik.values.message}
              />
              {formik.touched.message && formik.errors.message ? (
                <RenderError message={formik.errors.message} />
              ) : null}
            </div>
            <input
              type="submit"
              id="next"
              value="Send"
              data-bs-dismiss="modal"
              className="hero-gradient hero-btn w-100 mt-3 me-2"
            />
          </form>
        </div>
      </div>
    </Layout>
  );
};
