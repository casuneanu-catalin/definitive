import { InputGuesser } from "@api-platform/admin";
import { Box } from "@mui/material";
import React from "react";
import { Edit, ImageField, ImageInput, SimpleForm } from "react-admin";

const CoinEdit = (props) => (
  <Edit {...props}>
    <SimpleForm warnWhenUnsavedChanges>
      <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
        <Box display="flex" flexDirection="column" mr={{ xs: 0, sm: "3em" }}>
          <InputGuesser source={"name"} />
          <InputGuesser source={"token"} />
          <ImageInput source={"file"} label="Coin Icon" accept="image/*">
            <ImageField source="src" title="Coin Icon" />
          </ImageInput>
        </Box>
      </Box>
    </SimpleForm>
  </Edit>
);

export default CoinEdit;
