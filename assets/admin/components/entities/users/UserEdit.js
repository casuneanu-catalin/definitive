import { InputGuesser } from "@api-platform/admin";
import { Box, Typography } from "@mui/material";
import React from "react";
import {
  Edit,
  ImageField,
  NumberInput,
  SaveButton,
  SelectArrayInput,
  SelectInput,
  SimpleForm,
  Toolbar,
  required,
  useRecordContext,
} from "react-admin";

const Aside = () => {
  const record = useRecordContext();

  if (!record) return;

  return (
    <Box sx={{ width: "500px", margin: "1em" }}>
      <Typography variant="h6">Status: {record.status} </Typography>
      <Typography variant="h6">Passport Photo</Typography>
      <img src={record.passportPhotoPath} alt="passport photo" />
    </Box>
  );
};

const UserCreateToolbar = () => {
  return (
    <Toolbar>
      <SaveButton />
    </Toolbar>
  );
};

const UserEdit = (props) => (
  <Edit {...props} aside={<Aside />}>
    <SimpleForm warnWhenUnsavedChanges toolbar={<UserCreateToolbar />}>
      <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
        <Box display="flex" flexDirection="column" mr={{ xs: 0, sm: "3em" }}>
          <InputGuesser source={"email"} />
          <InputGuesser source={"firstName"} />
          <InputGuesser source={"lastName"} />
        </Box>
        <Box display="flex" flexDirection="column" mr={{ xs: 0, sm: "3em" }}>
          <InputGuesser source={"addressLine"} />
          <InputGuesser source={"addressCountry"} />
          <InputGuesser source={"addressPostcode"} />
        </Box>
        <Box display="flex" flexDirection="column" mr={{ xs: 0, sm: "3em" }}>
          <SelectArrayInput
            source={"roles"}
            choices={[
              { id: "ROLE_USER", name: "User" },
              { id: "ROLE_ADMIN", name: "Admin" },
              { id: "ROLE_EDITOR", name: "Editor" },
            ]}
            validate={required()}
          />

          <SelectInput
            source={"status"}
            choices={[
              { id: "approved", name: "Approved" },
              { id: "pending", name: "Pending" },
              { id: "failed", name: "Failed" },
            ]}
            validate={required()}
          />

          <NumberInput
            source="balance.initial"
            label="Initial Balance"
            format={(v) => parseFloat(v) / 1000}
            parse={(v) => v * 100}
          />
        </Box>
      </Box>
    </SimpleForm>
  </Edit>
);

export default UserEdit;
