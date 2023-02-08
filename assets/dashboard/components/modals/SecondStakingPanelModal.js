import React from "react";
import { setNewUserInvestmentFormActiveStep } from "../../context/investments/investmentsActions";
import InvestmentsContext from "../../context/investments/investmentsContext";
import CopyToClipboard from "react-copy-to-clipboard";

export default function SecondStakingPanelModal() {
  const { dispatch, newUserInvestmentFormData, newUserInvestment, createDepositRequest } =
    React.useContext(InvestmentsContext);
  const handleNextStepClick = () =>{
    createDepositRequest();
    dispatch(setNewUserInvestmentFormActiveStep(3));
  }

  const [selectedNetworkIdx, setSelectedNetworkIdx] = React.useState(null);
  const handleNetworkSelect = (idx) => {
    setSelectedNetworkIdx(idx);
  };

  console.log({newUserInvestmentFormData})

  return (
    <div>
      <h2 className="pb-4">Staking Panel</h2>
      <div className="pb-5">
        <img src="/build/images/multiversx.png" alt="" className="w-40 me-3" />
        <span className="fs-md">
          {" "}
          {newUserInvestment?.coin?.name}{" "}
          {`(${newUserInvestment?.coin?.token})`}
        </span>
      </div>
      <h3 className="mb-3">
        Strategy:
        <span className="text-tertiary">
          {newUserInvestmentFormData?.duration} days
        </span>{" "}
        at{" "}
        <span className="text-tertiary">
          {parseFloat(newUserInvestmentFormData?.apr * 10)}% APR
        </span>
      </h3>
      <h3 className="pb-4">
        Amount:{" "}
        <span className="text-tertiary">
          {newUserInvestmentFormData?.amount}{" "}
          {newUserInvestment?.coin?.token}
        </span>
      </h3>

      <div className="model-info-box mb-5">
        <p className="fs-sm">
          To start earning rewards, please transfer the{" "}
          {newUserInvestmentFormData?.amount}{" "}
          {newUserInvestment?.coin?.token} in the wallet provide below.
          Please pay attention as transfers on the wrong networks or wallets
          cannot be reimbursed.
        </p>
        <div className="dropdown mb-4">
          <a
            className="btn btn-secondary dropdown-toggle w-100 modal-dropdown-btn text-start"
            type="button"
            id="dropdownMenuButton2"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {selectedNetworkIdx !== null
              ? newUserInvestment?.networks[selectedNetworkIdx]?.name
              : "Choose Network"}
          </a>
          <ul
            className="dropdown-menu w-100"
            aria-labelledby="dropdownMenuButton2"
          >
            {newUserInvestment?.networks?.map((network, idx) => (
              <li key={idx}>
                <a
                  className="dropdown-item"
                  onClick={() => handleNetworkSelect(idx)}
                >
                  {network.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
        {selectedNetworkIdx !== null ? (
          <>
            <p className="fs-sm">
              Send
              <span className="text-tertiary">
                &nbsp;{newUserInvestmentFormData?.amount}
                &nbsp;{newUserInvestment?.coin?.token}
              </span>
              &nbsp;to the following wallet
            </p>
            <div className="link-box">
              <p id="sample" className="text-white">
                {
                  newUserInvestment?.networks[selectedNetworkIdx]
                    ?.wallet_address
                }
              </p>
              <CopyToClipboard
                text={
                  newUserInvestment?.networks[selectedNetworkIdx]
                    ?.wallet_address || ""
                }
              >
                <span role="button" className="d-flex justify-content-end">
                  <a>
                    <i className="fa-regular fa-copy fa-2x"></i>
                  </a>
                </span>
              </CopyToClipboard>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>

      <button
        onClick={handleNextStepClick}
        role="button"
        className="btn hero-gradient hero-btn w-100"
      >
        Mark As Paid
      </button>
      {/* <!-- DISABLED BUTTON --> */}
      {/* <!-- <a href="" className="btn hero-btn w-100 modal-btn-disabled">Mark As Paid</a> --> */}
    </div>
  );
}
