import React from "react";
import Modal from "./Modal";
import { WithdrawPanel } from "../WithdrawPanel";

export const WithdrawModal = () => {
  return <Modal id="withdrawModal" content={<WithdrawPanel />} />;
};
