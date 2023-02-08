import React from "react";
import { ArrayField, BulkExportButton, ChipField, DateField, EmailField, FunctionField, ImageField, List, NumberField, SingleFieldList, TextField } from 'react-admin';
import QuanticDatagrid from "../../datagrid/QuanticDatagrid";
import { StringToLabelObject } from "../../../helpers/StringToLabelObject";
import QuanticDatagridActions from "../../datagrid/QuanticDatagridActions";
import StatusField from "../../StatusField";
import { Box, Typography } from "@mui/material";

const Empty = () => (
  <Box textAlign="center" m={1}>
      <Typography variant="h4" paragraph>
          No Users available
      </Typography>
  </Box>
);


const UsersList = (props) => (
  <List {...props} actions={<QuanticDatagridActions/>} empty={<Empty/>}>
    <QuanticDatagrid enableDelete>
      <TextField source="id" />
      <TextField source="firstName" />
      <TextField source="lastName" />
      <EmailField source="email" />
      <ArrayField source="roles">
        <SingleFieldList>
          <StringToLabelObject>
              <ChipField source="label" /> 
          </StringToLabelObject>
        </SingleFieldList>
      </ArrayField>
      <StatusField source="status" />
      <FunctionField label="Balance" render={record => record?.balance?.total.toFixed(2) / 1000} />
      <TextField source="addressLine" />
      <TextField source="addressPostcode" />
      <TextField source="addressCountry" />
      <ImageField label="Passport Photo" source="passportPhotoPath" />
      <DateField source="dateCreated" />
    </QuanticDatagrid>
  </List>
);

export default UsersList;
