import React from "react";
import {
  ArrayField,
  ChipField,
  List,
  ReferenceField,
  SingleFieldList,
  TextField,
} from "react-admin";
import QuanticDatagrid from "../../datagrid/QuanticDatagrid";
import StatusField from "../../StatusField";

const StakingContractsList = (props) => (
  <List {...props}>
    <QuanticDatagrid enableDelete>
      <TextField source="id" />
      <StatusField source="status" />
      <TextField label="Coin" source="coin.name" />
      <TextField label="Lock Times" source="formattedDurations" />
      <TextField label="APR Range" source="formattedAprs" />
      <ArrayField label="Network Name" source="networks">
        <SingleFieldList>
          <ChipField source="name" />
        </SingleFieldList>
      </ArrayField>
    </QuanticDatagrid>
  </List>
);

export default StakingContractsList;
