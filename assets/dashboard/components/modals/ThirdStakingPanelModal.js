import React from "react";
import { API_URL } from "../../config/endpoints";
import InvestmentsContext from "../../context/investments/investmentsContext";

export default function ThirdStakingPanelModal() {
  const { updateHashTx } = React.useContext(InvestmentsContext);
  const hashTxRef = React.useRef(null);

  const handleSaveHash = async () => {
    await updateHashTx(hashTxRef.current.value);
    document.querySelector(".modal-content a").click();
  }

  return (
    <>
      <div className="col-lg-12 text-start">
        <img
          src={`${API_URL}/build/images/check-mark.49c29866.png`}
          alt=""
          className="mb-5"
        />
        <h1 className="mb-5">Congratulations!</h1>
        <p className="pb-3 fs-md">
          Thank you for contributing to this staking pool. A team member has
          already been notified of your deposit and once the funds have arrived,
          we will enable your investment.
        </p>
        <p className="pb-3 fs-md">
          To speed up the process, please provide the hash tx in the field below
          (optional).
        </p>
        <div className="link-box mb-5">
          <textarea
            placeholder="Hash tx here ..."
            name="hashtx"
            id="hashtx"
            cols="40"
            rows="3"
            ref={hashTxRef}
            className="form-control text-white fs-md"
          ></textarea>
        </div>
      </div>
      <a onClick={handleSaveHash} className="btn hero-gradient hero-btn w-100 mb-4">
        Save Hash
      </a>
    </>
  );
}
