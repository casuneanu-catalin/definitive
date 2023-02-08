import { REGISTRATION_ERROR, REGISTRATION_SUCCESS, SET_ACTIVE_STEP, SET_FORM_DATA, START_REGISTRATION } from "./registrationActionTypes"

export const setActiveStepIndex = (payload) => (
    { type: SET_ACTIVE_STEP, payload }
)

export const setFormData = (payload) => (
    { type: SET_FORM_DATA, payload }
)

export const setRegistrationSuccess = () => ({type: REGISTRATION_SUCCESS});
export const setRegistrationError = (payload) => ({type: REGISTRATION_ERROR, payload})