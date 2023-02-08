import React, { createContext, useReducer } from "react";
import registrationReducer from "./registrationReducer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  USER_ENTRYPOINT,
  LOGIN_ENTRYPOINT,
} from "../../config/endpoints";
import {
  setRegistrationError,
  setRegistrationSuccess,
} from "./registrationActions";
import { AUTH_TAG, USER_TAG } from "../../config/localStorage";
import { multipartFormData } from "../../config/axios";

const RegistrationContext = createContext();

export const RegistrationProvider = ({ children }) => {
  const navigate = useNavigate();
  const redirectToLogin = () => navigate("/dashboard/login");

  const initialState = {
    activeStepIndex: 1,
    formData: {},
    error: "",
    loading: false,
  };

  const [state, dispatch] = useReducer(registrationReducer, initialState);

  const registrate = async (data) => {
    try {
      const timeElapsed = Date.now();
      const today = new Date(timeElapsed);
      await axios
        .post(USER_ENTRYPOINT, {
          ...data,
          email: data.email,
          roles: [],
          password: data.password,
          firstName: data.firstName,
          lastName: data.lastName,
          status: "pending",
          dateCreated: today.toISOString(),
        }, multipartFormData)
        .then((data) => data?.data);

      dispatch(setRegistrationSuccess());
      navigate('/dashboard/congratulations');
    } catch (err) {
      console.log({ err });
      dispatch(setRegistrationError(err.response?.data?.detail));
    }
  };

  return (
    <RegistrationContext.Provider
      value={{
        activeStepIndex: state.activeStepIndex,
        formData: state.formData,
        redirectToLogin,
        dispatch,
        registrate,
      }}
    >
      {children}
    </RegistrationContext.Provider>
  );
};

export default RegistrationContext;
