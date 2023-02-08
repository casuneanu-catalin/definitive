import {
  SET_INVESTMENT_OPPORTUNITIES,
  SET_NEW_USER_INVESTMENT,
  SET_NEW_USER_INVESTMENT_API_RESPONSE,
  SET_NEW_USER_INVESTMENT_FORM_ACTIVE_STEP,
  SET_NEW_USER_INVESTMENT_FORM_DATA,
  SET_USER_INVESTMENTS,
} from "./investmentsActionTypes";
import { initialState } from "./investmentsContext";

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_INVESTMENTS: {
      return {
        ...state,
        userInvestments: action.payload,
      };
    }
    case SET_INVESTMENT_OPPORTUNITIES: {
      return {
        ...state,
        investmentOpportunities: action.payload,
      };
    }
    case SET_NEW_USER_INVESTMENT: {
      return {
        ...state,
        newUserInvestment: action.payload,
      };
    }
    case SET_NEW_USER_INVESTMENT_FORM_ACTIVE_STEP: {
      return {
        ...state,
        newUserInvestmentFormActiveStep: action.payload,
      };
    }
    case SET_NEW_USER_INVESTMENT_FORM_DATA: {
      return {
        ...state,
        newUserInvestmentFormData: {
          ...state.newUserInvestmentFormData,
          ...action.payload
        },
      };
    }
    case SET_NEW_USER_INVESTMENT: {
      return {
        ...state,
        newUserInvestment: action.payload,
      };
    }
    case SET_NEW_USER_INVESTMENT_API_RESPONSE: {
      return {
        ...state,
        newUserInvestmentApiResponse: action.payload
      }
    }
    default:
      return state;
  }
};

export default profileReducer;
