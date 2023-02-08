import React, { createContext, useReducer } from "react";
import InvestmentsReducer from "./investmentsReducer";
import axios from "axios";
import {
  REQUEST_ENTRYPOINT,
  STAKING_PLAN_ENTRYPOINT,
} from "../../config/endpoints";
import ProfileContext from "../profile/profileContext";
import { setInvestmentOpportunities, setNewUserInvestmentApiResponse, setUserInvestments } from "./investmentsActions";
import { patchHeader } from "../../config/axios";
import { RequestTypeEnum } from "../../config/RequestTypeEnum";

const InvestmentsContext = createContext();

export const initialState = {
  userInvestments: [],
  investmentOpportunities: [],
  newUserInvestment: {},
  newUserInvestmentFormActiveStep: 1,
  newUserInvestmentFormData: {
    "amount": 0,
    "type": "",
    "status": "",
    "hashTx": "",
    "duration": 0,
    "user": "",
    "stakingPlan": "",
    "dateCreated": ""
  }, 
  newUserInvestmentApiResponse: {}
};

export const InvestmentsProvider = ({ children }) => {

  const [state, dispatch] = useReducer(InvestmentsReducer, initialState);
  const { profile } = React.useContext(ProfileContext);

  const getRequestsByUserId = async () => {
    const requests = await axios
      .get(`${REQUEST_ENTRYPOINT}?user=${profile["@id"]}`)
      .then((response) => response.data)
      .catch((e) => console.log(`[GET_REQUESTS] ${e.message}`));

    if (requests["hydra:member"].length)
      dispatch(setUserInvestments(requests["hydra:member"]));
  };

  const getStakingPlans = async () => {
    const request = await axios
      .get(STAKING_PLAN_ENTRYPOINT)
      .then((response) => response.data)
      .catch((e) => console.log(`[GET_STAKING_PLANS] ${e.message}`));

    if (request["hydra:member"].length)
      dispatch(setInvestmentOpportunities(request["hydra:member"]));
  };

  const createDepositRequest = async () => {
    await axios
      .post(REQUEST_ENTRYPOINT, {
        ...state.newUserInvestmentFormData,
        amount: +state.newUserInvestmentFormData.amount * 1000,
        type: RequestTypeEnum.deposit.name,
        status: "pending",
        user: profile["@id"],
        stakingPlan: state.newUserInvestment["@id"],
        dateCreated: new Date().toJSON()
      })
      .catch(e => console.log({e: e.message}))
      .then((response) => dispatch(setNewUserInvestmentApiResponse(response.data)))
  }

  const createWithdrawRequest = async () => {
    await axios
    .post(REQUEST_ENTRYPOINT, {
      amount: profile?.balance?.withdrawable,
      type: RequestTypeEnum.withdraw.name,
      status: "pending",
      user: profile["@id"],
      dateCreated: new Date().toJSON()
    })
    .catch(e => console.log({e: e.message}))
    .then((response) => dispatch(setNewUserInvestmentApiResponse(response.data)))
  }

  const updateHashTx = async (hashTx) => {
    await axios
      .patch(`${REQUEST_ENTRYPOINT}/${state.newUserInvestmentApiResponse.id}`, {
        hashTx 
      }, patchHeader)
      .catch(e => console.log(e))
      .then(() => getRequestsByUserId())
  }

  React.useEffect(() => {
    if (!profile) return;

    getRequestsByUserId();
    getStakingPlans();

  }, [profile]);

  return (
    <InvestmentsContext.Provider
      value={{
        dispatch,
        userInvestments: state.userInvestments,
        investmentOpportunities: state.investmentOpportunities,
        newUserInvestment: state.newUserInvestment,
        newUserInvestmentFormActiveStep: state.newUserInvestmentFormActiveStep,
        newUserInvestmentFormData: state.newUserInvestmentFormData,
        createDepositRequest,
        createWithdrawRequest,
        updateHashTx
      }}
    >
      {children}
    </InvestmentsContext.Provider>
  );
};

export default InvestmentsContext;
