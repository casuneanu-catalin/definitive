import React from "react";
import { DatagridBody } from "react-admin";
import QuanticDatagridRow from "./QuanticDatagridRow";

const QuanticDatagridBody = (props) => (
  <DatagridBody {...props} row={<QuanticDatagridRow {...props} />} />
);

export default QuanticDatagridBody;
