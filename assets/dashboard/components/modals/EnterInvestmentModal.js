import React from "react";
import {
  Modal,
  FirstStakingPanelModal,
  SecondStakingPanelModal,
  ThirdStakingPanelModal,
} from "./index";
import InvestmentsContext from "../../context/investments/investmentsContext";
import { setNewUserInvestmentFormActiveStep } from "../../context/investments/investmentsActions";

export default function EnterInvestmentModal() {
  const { newUserInvestmentFormActiveStep, dispatch } =
    React.useContext(InvestmentsContext);

  const handlSetModalContent = () => {
    switch (newUserInvestmentFormActiveStep) {
      case 1:
        return <FirstStakingPanelModal />;
        break;
      case 2:
        return <SecondStakingPanelModal />;
      case 3:
        return <ThirdStakingPanelModal />;
      default:
        return <FirstStakingPanelModal />;
        break;
    }
  };

  const dismissAction = () => dispatch(setNewUserInvestmentFormActiveStep(1));

  return <Modal id="staticBackdrop" content={handlSetModalContent()} dismissAction={dismissAction} />;
}
