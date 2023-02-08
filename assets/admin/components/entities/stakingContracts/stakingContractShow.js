import React from "react";
import {
  ArrayField,
  ChipField,
  Show,
  SimpleShowLayout,
  SingleFieldList,
  TextField,
} from "react-admin";
import { Grid } from "@mui/material";
import StatusField from "../../StatusField";

const StakingContractShow = (props) => (
  <Show {...props}>
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <SimpleShowLayout>
          <TextField source="id" />
          <StatusField source="status" />
          <TextField label="Coin" source="coin.name" />
          <TextField label="Lock Times" source="formattedDurations" />
        </SimpleShowLayout>
      </Grid>
      <Grid item xs={4}>
        <SimpleShowLayout>
          <TextField label="APR Range" source="formattedAprs" />
          <ArrayField label="Network Name" source="networks">
            <SingleFieldList>
              <ChipField source="name" />
            </SingleFieldList>
          </ArrayField>
        </SimpleShowLayout>
      </Grid>
    </Grid>
  </Show>
);

export default StakingContractShow;
