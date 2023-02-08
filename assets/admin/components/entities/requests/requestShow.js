import React from "react";
import { ChipField, DateField, FunctionField, NumberField, ReferenceField, Show, SimpleShowLayout, TextField } from "react-admin";
import { Grid } from "@mui/material";
import StatusField from "../../StatusField";

const RequestShow = (props) => (
  <Show {...props}>
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <SimpleShowLayout>
          <TextField source="id" />
          <TextField label="Client Id" source="user.@id" />
          <FunctionField
            label="Client Name"
            render={(record) =>
              `${record.user.firstName} ${record.user.lastName}`
            }
          />
          <FunctionField
            label="Amount"
            render={(record) => parseFloat(record.amount / 1000).toFixed(3)} />
          <ChipField source="type" />
          <StatusField source="status" />
          <TextField source="hashTx" label="Hash" />
          <TextField label="Duration" source="durationFormatted" />
          <ReferenceField
            label="Staking Plan"
            source="stakingPlan?.@id"
            reference="staking_plans"
          />
          <DateField source="dateCreated" />
        </SimpleShowLayout>
      </Grid>
    </Grid>
  </Show>
);

export default RequestShow;
