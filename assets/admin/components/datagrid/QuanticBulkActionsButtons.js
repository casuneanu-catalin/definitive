import React from "react";
import { BulkDeleteWithConfirmButton, BulkExportButton } from "react-admin";

export default function QuanticBulkActionsButtons({ enableDelete = false }) {
  return (
    <React.Fragment>
      <BulkExportButton />
      {enableDelete ? <BulkDeleteWithConfirmButton /> : <></>}
    </React.Fragment>
  );
}
