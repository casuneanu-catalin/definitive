import React from "react";
import {
  EmailField,
  FunctionField,
  ImageField,
  NumberField,
  Show,
  SimpleShowLayout,
  TextField,
} from "react-admin";
import StatusField from "../../StatusField";
import { Grid } from "@mui/material";

const UserShow = (props) => (
  <Show {...props}>
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <SimpleShowLayout>
          <EmailField source={"email"} />
          <TextField source={"firstName"} />
          <TextField source={"lastName"} />
        </SimpleShowLayout>
      </Grid>
      <Grid item xs={4}>
        <SimpleShowLayout>
          <TextField source={"addressLine"} />
          <TextField source={"addressCountry"} />
          <TextField source={"addressPostcode"} />
        </SimpleShowLayout>
      </Grid>
      <Grid item xs={4}>
        <SimpleShowLayout>
          <ImageField source={"passportPhotoPath"} />
          <StatusField source={"status"} />
        </SimpleShowLayout>
      </Grid>
    </Grid>
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <SimpleShowLayout>
          <h3>Balance</h3>
          <FunctionField label="Total" render={record => record?.balance?.total.toFixed(2) / 1000} />
          <FunctionField label="Initial" render={record => record?.balance?.initial.toFixed(2) / 1000} />
          <FunctionField label="Staked" render={record => record?.balance?.staked.toFixed(2) / 1000} />
          <FunctionField label="Withdrawable" render={record => record?.balance?.withdrawable.toFixed(2) / 1000} />
        </SimpleShowLayout>
      </Grid>
    </Grid>
  </Show>
);

export default UserShow;
