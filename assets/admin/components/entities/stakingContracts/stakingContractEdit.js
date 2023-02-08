import { Box } from "@mui/material";
import React from "react";
import {
  Edit,
  SaveButton,
  SelectInput,
  SimpleForm,
  TextInput,
  Toolbar,
  required,
  useNotify,
  useUpdate,
  ArrayInput,
  SimpleFormIterator,
  NumberInput,
  ReferenceInput,
  AutocompleteInput,
} from "react-admin";
import { useFormContext } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const StakingContractToolbar = (props) => {
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
          coin: data.coin["@id"],
        },
      },
      {
        onSuccess: () => {
          navigate("/staking_plans");
          notify("Staking Plan Updated");
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

const StakingContractEdit = (props) => {
  const durationChoices = [
    { id: "30", name: "30 Days" },
    { id: "60", name: "60 Days" },
    { id: "90", name: "90 Days" },
    { id: "180", name: "180 Days" },
    { id: "365", name: "180 Days" },
  ];

  return (
    <Edit {...props}>
      <SimpleForm toolbar={<StakingContractToolbar {...props} />}>
        <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
          <Box display="flex" flexDirection="column" mr={{ xs: 0, sm: "3em" }}>
            <SelectInput
              source={"status"}
              choices={[
                { id: "draft", name: "Draft" },
                { id: "live", name: "Live" },
                { id: "coming_soon", name: "Coming Soon" },
                { id: "expired", name: "Expired" },
              ]}
              defaultValue="draft"
              validate={required()}
            />
            <ArrayInput source="durations">
              <SimpleFormIterator inline>
                <SelectInput
                  source="duration"
                  choices={durationChoices}
                  validate={required()}
                />
                <NumberInput source="apr" min={0} format={value => parseFloat(value * 10)}/>
              </SimpleFormIterator>
            </ArrayInput>
            <ReferenceInput source="coin.@id" reference="coins">
              <AutocompleteInput optionText="name" />
            </ReferenceInput>
            <ArrayInput
              source="networks"
              defaultValue={[{ name: "", wallet_address: "" }]}
            >
              <SimpleFormIterator inline>
                <TextInput source="name" label="Network Name" />
                <TextInput source="wallet_address" label="Wallet" />
              </SimpleFormIterator>
            </ArrayInput>
          </Box>
        </Box>
      </SimpleForm>
    </Edit>
  );
};

export default StakingContractEdit;
