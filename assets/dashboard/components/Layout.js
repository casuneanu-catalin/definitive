import React from "react";
import Header from "./Header";
import { EnterInvestmentModal } from "../components/modals";
import ProfileModal from "../components/modals/ProfileModal";
import { WithdrawModal } from "./modals/WithdrawModal";

export default function Layout({ children }) {
  return (
    <div className="dash-gradient vh-100">
      <Header />
      <div className="section">
        <div className="container">
          {children}
          <EnterInvestmentModal />
          <ProfileModal />
          <WithdrawModal />
        </div>
      </div>
    </div>
  );
}
