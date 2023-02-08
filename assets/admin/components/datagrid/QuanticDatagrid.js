import * as React from "react";
import {
  Datagrid,
} from "react-admin";
import QuanticDatagridBody from "./QuanticDatagridBody";
import QuanticDatagridHeader from "./QuanticDatagridHeader";
import QuanticBulkActionsButtons from "./QuanticBulkActionsButtons";

const QuanticDatagrid = (props) => {
  return (
    <Datagrid 
      bulkActionButtons={<QuanticBulkActionsButtons enableDelete={props.enableDelete}/>}
      {...props}
      body={<QuanticDatagridBody />}
      header={<QuanticDatagridHeader />}
    />
  );
};

export default QuanticDatagrid;
