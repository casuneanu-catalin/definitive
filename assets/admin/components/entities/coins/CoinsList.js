import { FieldGuesser } from "@api-platform/admin";
import React from "react";
import { ImageField, List } from "react-admin";
import QuanticDatagrid from "../../datagrid/QuanticDatagrid";

const CoinsList = (props) => (
  <List {...props}>
    <QuanticDatagrid enableDelete>
      <FieldGuesser source={"name"} />
      <FieldGuesser source={"token"} />
      <ImageField label="Icon" source={"imagePath"} />
    </QuanticDatagrid>
  </List>
);

export default CoinsList;
