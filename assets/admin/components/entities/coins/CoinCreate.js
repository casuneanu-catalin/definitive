import { CreateGuesser, InputGuesser } from "@api-platform/admin";
import { Box } from "@mui/system";
import React from "react";
import { ImageField, ImageInput } from "react-admin";

const CoinCreate = (props) => (
  <CreateGuesser {...props}>
    <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
      <Box display="flex" flexDirection="column" mr={{ xs: 0, sm: "3em" }}>
        <InputGuesser source={"name"} />
      </Box>
      <Box display="flex" flexDirection="column" mr={{ xs: 0, sm: "3em" }}>
        <InputGuesser source={"token"} />
      </Box>
    </Box>
    <ImageInput source={"file"} label="Coin Icon" accept="image/*">
      <ImageField source="src" title="Coin Icon" />
    </ImageInput>
  </CreateGuesser>
);

export default CoinCreate;
