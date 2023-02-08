import React from "react";
import ProfileContext from "../context/profile/profileContext";
import InvestmentsContext from "../context/investments/investmentsContext";

export const WithdrawPanel = () => {
  const { profile } = React.useContext(ProfileContext);
  const { createWithdrawRequest } =
    React.useContext(InvestmentsContext);

  if(!profile?.balance?.withdrawable) return (
    <div>
        <h2 className="pb-4">Not enough funds to submit a Withdraw Request</h2>
    </div>
  )

  const handleWithdrawRequest = () => {
    console.log("here")
    createWithdrawRequest()
  }
  
  return (
    <div>
      <h2 className="pb-4">Withdraw Panel</h2>
      <h3 className="pt-5 pb-4">Amasdasdount</h3>
      <div className="input-group form-box p-3 w-50 mb-5">
        <h3 className="form-control text-white fs-md">
          {profile?.balance?.withdrawable}
        </h3>
      </div>
      <button className="btn hero-gradient hero-btn w-100 mt-2" onClick={handleWithdrawRequest}>
        Submit Withdraw Request
      </button>
    </div>
  );
};
