import { CreateGuesser, InputGuesser } from "@api-platform/admin";
import { Box } from "@mui/system";
import React from "react";
import {
  ArrayInput,
  AutocompleteInput,
  NumberInput,
  ReferenceInput,
  SelectInput,
  SimpleFormIterator,
  TextInput,
  required,
} from "react-admin";

const StakingContractCreate = (props) => {
  const durationChoices = [
    { id: "30", name: "30 Days" },
    { id: "60", name: "60 Days" },
    { id: "90", name: "90 Days" },
    { id: "180", name: "180 Days" },
    { id: "365", name: "180 Days" },
  ];

  return (
    <CreateGuesser {...props}>
      <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
        <Box display="flex" flexDirection="column" mr={{ xs: 0, sm: "3em" }}>
          <ReferenceInput source="coin" reference="coins">
            <AutocompleteInput optionText="name" validate={required()} />
          </ReferenceInput>
          <SelectInput
            source={"status"}
            choices={[
              { id: "draft", name: "Draft" },
              { id: "live", name: "Live" },
              { id: "comingSoon", name: "Coming Soon" },
              { id: "expired", name: "Expired" },
            ]}
            defaultValue="draft"
            validate={required()}
             
          />
          <ArrayInput
            source="durations"
            defaultValue={[{ duration: durationChoices[0], apr: 0 }]}
          >
            <SimpleFormIterator inline>
              <SelectInput
                source={"duration"}
                choices={durationChoices}
                validate={required()}
                 
              />
              <NumberInput source="apr" min={0} />
            </SimpleFormIterator>
          </ArrayInput>
          <ArrayInput source="networks" defaultValue={[{ name: "", wallet_address: ""}]}>
            <SimpleFormIterator inline>
              <TextInput source="name" label="Network Name"/>
              <TextInput source="wallet_address" label="Wallet" />
            </SimpleFormIterator>
          </ArrayInput>
        </Box>
      </Box>
    </CreateGuesser>
  );
};

export default StakingContractCreate;
