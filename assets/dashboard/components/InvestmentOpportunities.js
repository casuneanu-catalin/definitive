import React from "react";
import InvestmentsContext from "../context/investments/investmentsContext";
import { setNewUserInvestment } from "../context/investments/investmentsActions";
import { StakingContractsStatusEnum } from "../config/StakingContractsStatusEnum";

export default function InvestmentOpportunities() {
  const { investmentOpportunities, dispatch } =
    React.useContext(InvestmentsContext);

  const handleSetNewUserInvestment = (opportunity) => {
    if(opportunity?.status !== 'live') return;
    dispatch(setNewUserInvestment(opportunity));
  };

  return (
    <>
      <div className="row pb-3">
        <div className="col-lg-12">
          <h2 className="text-white">
            Staking Contracts ({investmentOpportunities?.length})
          </h2>
        </div>
      </div>
      <table className="table table-borderless">
        <thead className="table-row fs-sm">
          <tr>
            <th scope="col">Coin</th>
            <th scope="col">APR</th>
            <th scope="col">LOCK TIME</th>
            <th scope="col">STATUS</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody className="table-row">
          {investmentOpportunities?.length ? (
            investmentOpportunities.filter(opportunity => opportunity?.status !== 'draft').map((opportunity, idx) => (
              <tr key={idx}>
                <th scope="row">
                  <img
                    src={opportunity?.coin?.imagePath}
                    alt=""
                  />
                  &nbsp;{opportunity?.coin?.name}
                </th>
                <td>{opportunity?.formattedAprs}</td>
                <td>{opportunity?.formattedDurations}</td>
                <td className="dash-btn-w">{opportunity?.status?.toUpperCase().replaceAll("_", " ")}</td>
                <td className="dash-btn-w">
                  <button
                    type="button"
                    data-bs-toggle={opportunity?.status === 'live' ? "modal" : ""}
                    data-bs-target="#staticBackdrop"
                    onClick={() => handleSetNewUserInvestment(opportunity)}
                    className={`btn dash-btn ${StakingContractsStatusEnum[opportunity?.status]?.color}-gradient center mx-3 ms-0`}
                  >
                    {StakingContractsStatusEnum[opportunity?.status]?.name}
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr></tr>
          )}
        </tbody>
      </table>
    </>
  );
}
