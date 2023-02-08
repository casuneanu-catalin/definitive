import React from "react";
import ProfileContext from "../context/profile/profileContext";

export const ActiveBalance = () => {
  const {profile} = React.useContext(ProfileContext);

  return (
    <div className="dropdown">
      <a
        className="btn dash-btn clear-btn mx-3 dropdown-toggle"
        type="button"
        id="dropdownMenuButton2"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Balance: ${parseFloat(profile?.balance?.total / 1000).toFixed(3)}
      </a>
      <ul className="dropdown-menu w-auto" aria-labelledby="dropdownMenuButton2">
        <li className="dropdown-item">Staked Balance: ${parseFloat(profile?.balance?.staked / 1000).toFixed(3)}</li>
        <li className="dropdown-item">Initial Balance: ${parseFloat(profile?.balance?.initial / 1000).toFixed(3)}</li>
        <li>
          <button
            disabled={profile?.balance <= 0 }
            role="button"
            className={`dropdown-item text-${profile?.balance <= 0 ? "gray" : "black"}`}
            data-bs-toggle="modal"
            data-bs-target="#withdrawModal"
          >
            Balance Available to Withdraw: ${parseFloat(profile?.balance?.withdrawable / 1000).toFixed(3)}
          </button>
        </li>
      </ul>
    </div>
  );
};
