import React from "react";
import InvestmentsContext from "../context/investments/investmentsContext";
import { API_URL } from "../config/endpoints";
import { RequestStatusEnum } from "../config/RequestStatusEnum";

export default function MyInvestments() {
  const { userInvestments } = React.useContext(InvestmentsContext);
  return (
    <div className="accordion mb-4" id="accordionPanelsStayOpenExample">
      <div className="accordion-item">
        <h2
          className="accordion-header text-white"
          id="panelsStayOpen-headingOne"
        >
          <button
            className="accordion-button p-0 mb-3"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#panelsStayOpen-collapseOne"
            aria-expanded="true"
            aria-controls="panelsStayOpen-collapseOne"
          >
            Active Stakes ({userInvestments?.length})
          </button>
        </h2>
        <div
          id="panelsStayOpen-collapseOne"
          className="accordion-collapse collapse show"
          aria-labelledby="panelsStayOpen-headingOne"
        >
          <div className="accordion-body p-0">
            <table className="table table-borderless pb-5">
              <thead className="table-row fs-sm">
                <tr>
                  <th scope="col">Coin</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Total APR</th>
                  <th scope="col">APR to Date</th>
                  <th scope="col">Initial Locked Time</th>
                  <th scope="col">Remaining Time</th>
                  <th scope="col">Status</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody className="table-row">
                {userInvestments?.length ? (
                  userInvestments.map((userInvestment, idx) => (
                    <tr key={idx}>
                      <th scope="row">
                        <img
                          src={userInvestment?.stakingPlan?.coin?.imagePath}
                          alt=""
                        />
                        &nbsp;{userInvestment?.stakingPlan?.coin?.name}
                      </th>
                      <td>{parseFloat(userInvestment?.amount / 1000) || 0.000}&nbsp;{userInvestment?.stakingPlan?.coin?.token}</td>
                      <td>{parseFloat(userInvestment?.totalRoi)}</td>
                      <td>{parseFloat(userInvestment?.roiToDate)}</td>
                      <td>{userInvestment?.durationFormatted}</td>
                      <td>{userInvestment?.remainingTime}</td>
                      <td className="dash-btn-w">
                        <span
                          href=""
                          className={`dash-btn dash-btn-sm btn-sm-${
                            RequestStatusEnum[userInvestment?.status]?.color
                          } center ms-0`}
                        >
                          {RequestStatusEnum[userInvestment?.status]?.name}
                        </span>
                      </td>
                      <td className="dash-btn-w">
                        {userInvestment?.status === 'completed'
                        ? <div className="dropdown show">
                        <a
                          className="btn dash-btn clear-btn mx-3 dropdown-toggle"
                          type="button"
                          id="dropdownMenuLink"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          Actions
                        </a>
                        <div
                          className="dropdown-menu"
                          aria-labelledby="dropdownMenuLink"
                        >
                          <a className="dropdown-item">
                            Action
                          </a>
                          <a className="dropdown-item">
                            Another action
                          </a>
                          <a className="dropdown-item">
                            Something else here
                          </a>
                        </div>
                      </div>
                      : <></>}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
