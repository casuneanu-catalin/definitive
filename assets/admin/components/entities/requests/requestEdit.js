import { Box, Typography } from "@mui/material";
import React from "react";
import {
  Edit,
  SaveButton,
  SelectInput,
  SimpleForm,
  Toolbar,
  required,
  useNotify,
  useRecordContext,
  useRedirect,
  useUpdate,
} from "react-admin";
import { useFormContext } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Aside = () => {
  const record = useRecordContext();

  if (!record) return;

  return (
    <Box sx={{ width: "50%", margin: "1em" }}>
      <Typography variant="h6">Status: {record.status} </Typography>
      <Typography variant="h6">ID: {record.id}</Typography>
      <Typography variant="h6">Client ID: {record.user["@id"]}</Typography>
      <Typography variant="h6">
        Client Name: {`${record.user.firstName} ${record.user.lastName}`}
      </Typography>
      <Typography variant="h6">Amount: {parseFloat(record.amount / 1000).toFixed(3)}</Typography>
      <Typography variant="h6">Type: {record.type}</Typography>
      <Typography variant="h6">Hash: {record.hashTx}</Typography>
      <Typography variant="h6">Duration: {record.duration}</Typography>
      <Typography variant="h6">
        Staking Plan: {record.stakingPlan ? record.stakingPlan["@id"] : null}
      </Typography>
      <Typography variant="h6">Date Created: {record.dateCreated}</Typography>
    </Box>
  );
};

const RequestEditToolbar = (props) => {
  const [update] = useUpdate();
  const { getValues, reset } = useFormContext();
  const navigate = useNavigate();
  const notify = useNotify();

  const handleClick = (e) => {
    e.preventDefault();
    const { id, ...data } = getValues();
    update(
      "requests",
      {
        id,
        data: {
          ...data,
          user: data.user["@id"],
          stakingPlan: data.stakingPlan ? data.stakingPlan["@id"] : null,
        },
      },
      {
        onSuccess: () => {
          navigate("/requests")
          notify("Request Status Updated");
          reset();
        },
      }
    );
  };
  return (
    <Toolbar {...props}>
      <SaveButton {...props} onClick={handleClick} label="Save" />
    </Toolbar>
  );
};

const RequestEdit = (props) => (
  <Edit {...props} aside={<Aside />}>
    <SimpleForm
      toolbar={<RequestEditToolbar {...props} />}
    >
      <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
        <Box display="flex" flexDirection="column" mr={{ xs: 0, sm: "3em" }}>
          <SelectInput
            source={"status"}
            choices={[
              { id: "approved", name: "Approved" },
              { id: "pending", name: "Pending" },
              { id: "rejected", name: "Rejected" },
              { id: "completed", name: "Completed" },
            ]}
            validate={required()}
             
          />
        </Box>
      </Box>
    </SimpleForm>
  </Edit>
);

export default RequestEdit;
