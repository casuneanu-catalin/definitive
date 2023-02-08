import React from "react";
import {
  ImageField,
  Show,
  SimpleShowLayout,
  TextField,
} from "react-admin";
import { Grid } from "@mui/material";

const CoinShow = (props) => (
  <Show {...props}>
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <SimpleShowLayout>
          <TextField source={"name"} />
          <TextField source={"token"} />
          <ImageField source={"imagePath"} />
        </SimpleShowLayout>
      </Grid>
    </Grid>
  </Show>
);

export default CoinShow;
