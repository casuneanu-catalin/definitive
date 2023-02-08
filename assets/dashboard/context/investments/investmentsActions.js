import {
  SET_INVESTMENT_OPPORTUNITIES,
  SET_NEW_USER_INVESTMENT,
  SET_NEW_USER_INVESTMENT_API_RESPONSE,
  SET_NEW_USER_INVESTMENT_FORM_ACTIVE_STEP,
  SET_NEW_USER_INVESTMENT_FORM_DATA,
  SET_USER_INVESTMENTS,
} from "./investmentsActionTypes";

export const setUserInvestments = (payload) => ({
  type: SET_USER_INVESTMENTS,
  payload,
});

export const setInvestmentOpportunities = (payload) => ({
  type: SET_INVESTMENT_OPPORTUNITIES,
  payload,
});

export const setNewUserInvestment = (payload) => ({
    type: SET_NEW_USER_INVESTMENT,
    payload
})

export const setNewUserInvestmentFormActiveStep = (payload) => ({
  type: SET_NEW_USER_INVESTMENT_FORM_ACTIVE_STEP,
  payload
})

export const setNewUserInvestmentFormData = (payload) => ({
  type: SET_NEW_USER_INVESTMENT_FORM_DATA,
  payload
})

export const setNewUserInvestmentApiResponse = (payload) => ({
  type: SET_NEW_USER_INVESTMENT_API_RESPONSE,
  payload
})