import React from "react";
import { Layout } from "react-admin";
import { QuanticAppBar } from "./QuanticAppBar";
import { QuanticMenu } from "./QuanticMenu";

export const QuanticLayout = (props) => (
  <Layout
    {...props}
    appBar={QuanticAppBar}
    menu={QuanticMenu}
    style={{ marginTop: "2rem" }}
  />
);
