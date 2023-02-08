import React from "react";
import {
  ArrayField,
  ChipField,
  DateField,
  FunctionField,
  List,
  NumberField,
  ReferenceField,
  SingleFieldList,
  TextField,
} from "react-admin";
import QuanticDatagrid from "../../datagrid/QuanticDatagrid";
import StatusField from "../../StatusField";
import QuanticDatagridActions from "../../datagrid/QuanticDatagridActions";
import { Box, Typography } from "@mui/material";

const Empty = () => (
  <Box textAlign="center" m={1}>
      <Typography variant="h4" paragraph>
          No Requests available
      </Typography>
  </Box>
);

const RequestsList = (props) => (
  <List {...props} actions={<QuanticDatagridActions/>} empty={<Empty />}>
    <QuanticDatagrid>
      <TextField source="id" />
      <TextField label="Client Id" source="user.@id" />
      <FunctionField label="Client Name" render={record => `${record.user.firstName} ${record.user.lastName}`}/>
      <FunctionField
            label="Amount"
            render={(record) => parseFloat(record.amount / 1000).toFixed(3)} />      
      <ChipField source="type" />
      <StatusField source="status" />
      <TextField source="hashTx" label="Hash" />
      <TextField label="Duration" source="durationFormatted" />
      <ReferenceField label="Staking Plan" source="stakingPlan.@id" reference="staking_plans" />
      <DateField source="dateCreated" />
    </QuanticDatagrid>
  </List>
);

export default RequestsList;
