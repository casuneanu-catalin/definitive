import React from "react";
import {
  setNewUserInvestmentFormActiveStep,
  setNewUserInvestmentFormData,
} from "../../context/investments/investmentsActions";
import InvestmentsContext from "../../context/investments/investmentsContext";
import { useFormik } from "formik";
import * as Yup from "yup";
import RenderError from "../RenderError";
import { isEmptyObject } from "jquery";
import ProfileContext from "../../context/profile/profileContext";

export default function FirstStakingPanelModal() {
  const { dispatch, newUserInvestment, createDepositRequest } =
    React.useContext(InvestmentsContext);
  const { profile } = React.useContext(ProfileContext);

  const validationSchema = Yup.object({
    amount: Yup.number()
      .integer()
      .min(1, "Amount can not be 0")
      .required("Amount is required"),
    duration: Yup.mixed().required("Schema is required"),
    acceptedInvestmentRisk: Yup.bool().oneOf(
      [true],
      "You must acknowledge the Investment Risk."
    ),
  });

  const formik = useFormik({
    initialValues: {
      duration: {
        duration: "",
        apr: ""
      },
      amount: 0,
      stakeWithBalance: false,
      acceptedInvestmentRisk: false,
    },
    validationSchema,
    onSubmit: (values) => {
      console.log({values})
      if (values.stakeWithBalance) {
        dispatch(
          setNewUserInvestmentFormData({
            ...values,
            amount: values.duration.amount * 100,
            duration: values.duration.duration,
            apr: values.duration.apr
          })
        );
        createDepositRequest();
        dispatch(setNewUserInvestmentFormActiveStep(3));
      } else {
        dispatch(
          setNewUserInvestmentFormData({
            ...values,
            duration: values.duration.duration,
            apr: values.duration.apr
          })
        );
        dispatch(setNewUserInvestmentFormActiveStep(2));
      }
    },
  });

  React.useEffect(() => {
    if (isEmptyObject(newUserInvestment)) return;
    formik.setFieldValue("duration", newUserInvestment.durations[0]);
    formik.setFieldValue("apr", newUserInvestment.durations[1])
  }, [newUserInvestment]);

  const calculateEarnings = () => {
    const total = formik.values.amount * (formik.values.duration.apr * 10) / 100;
    return parseFloat(total.toFixed(3));
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <h2 className="pb-4">Staking Panel</h2>
      <div className="pb-5">
        <img src="/build/images/multiversx.png" alt="" className="w-40 me-3" />
        <span className="fs-md">
          {newUserInvestment?.coin?.name}{" "}
          {`(${newUserInvestment?.coin?.token})`}
        </span>
      </div>
      <h3 className="pb-4">Select Strategy</h3>
      {newUserInvestment?.durations?.map((duration, idx) => (
        <button
          type="button"
          onClick={() => {
            formik.setFieldValue("duration", duration);
          }}
          className={`btn form-box modal-btn${
            formik.values.duration?.duration === duration.duration
              ? "-selected"
              : ""
          } w-100 mb-3`}
          key={idx}
        >
          <div className="row">
            <div className="col-lg-6 text-start fs-md">
              {duration?.duration} <span className="fs-xs">days</span>
            </div>
            <div className="col-lg-6 text-end fs-md">
              {parseFloat(duration?.apr * 10)}% <span className="fs-xs">APR</span>
            </div>
          </div>
        </button>
      ))}
      {formik.errors.duration ? (
        <RenderError message={formik.errors.duration} />
      ) : null}
      <h3 className="pt-5 pb-4">Amount</h3>
      <div className="input-group form-box p-3 w-50 mb-5">
        <input
          type="text"
          className="form-control text-white fs-md"
          placeholder="..."
          aria-label="..."
          aria-describedby="basic-addon2"
          name="amount"
          value={formik.values.amount}
          onChange={formik.handleChange}
        />
        <span className="text-end fs-xs center-right" id="basic-addon2">
          {newUserInvestment?.coin?.token}
        </span>
      </div>
      {formik.touched.amount && formik.errors.amount ? (
        <RenderError message={formik.errors.amount} />
      ) : null}
      {formik.values.duration ? (
        <h3 className="mb-5">
          In
          <span className="text-tertiary">
            &nbsp;{formik.values.duration?.duration} days,
          </span>
          &nbsp; you will earn
          <span className="text-tertiary">
            &nbsp;
            {calculateEarnings()}
            {newUserInvestment?.coin?.token}
          </span>
        </h3>
      ) : (
        <></>
      )}
      {!profile?.balance?.initial || (
        <label
          className="form-check-label ps-2 m-4 ms-0"
          htmlFor="stakeWithBalance"
        >
          <input
            className="form-check-input"
            type="checkbox"
            name="stakeWithBalance"
            id="stakeWithBalance"
            onChange={formik.handleChange}
          />
          &nbsp;Stake with Active Balance
        </label>
      )}
      <label
        className="form-check-label ps-2 m-4 ms-0"
        htmlFor="acceptedInvestmentRisk"
      >
        <input
          className="form-check-input"
          type="checkbox"
          name="acceptedInvestmentRisk"
          id="acceptedInvestmentRisk"
          onChange={formik.handleChange}
        />
        &nbsp;Acknowledge <a>Investment Risk</a>
      </label>
      {formik.touched.acceptedInvestmentRisk &&
      formik.errors.acceptedInvestmentRisk ? (
        <RenderError message={formik.errors.acceptedInvestmentRisk} />
      ) : null}
      <input
        type="submit"
        className="btn hero-gradient hero-btn w-100 mt-2"
        value="Finalise Deposit"
      />
    </form>
  );
}
