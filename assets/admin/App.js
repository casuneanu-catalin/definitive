import React from "react";
import { HydraAdmin, ResourceGuesser } from "@api-platform/admin";
import authProvider from "./authProvider";
import { ENTRYPOINT } from "./config/entrypoint";
import { QuanticLayout } from "./components/QuanticLayout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import SendIcon from "@mui/icons-material/Send";
import LayersIcon from "@mui/icons-material/Layers";
import UsersList from "./components/entities/users/UsersList";
import UserShow from "./components/entities/users/UserShow";
import UserEdit from "./components/entities/users/UserEdit";
import CoinCreate from "./components/entities/coins/CoinCreate";
import CoinsList from "./components/entities/coins/CoinsList";
import CoinShow from "./components/entities/coins/CoinShow";
import CoinEdit from "./components/entities/coins/CoinEdit";
import StakingContractCreate from "./components/entities/stakingContracts/stakingContractCreate";
import StakingContractsList from "./components/entities/stakingContracts/stakingContractsList";
import RequestsList from "./components/entities/requests/requestsList";
import RequestEdit from "./components/entities/requests/requestEdit";
import RequestShow from "./components/entities/requests/requestShow";
import StakingContractShow from "./components/entities/stakingContracts/stakingContractShow";
import StakingContractEdit from "./components/entities/stakingContracts/stakingContractEdit";

export default () => (
  <HydraAdmin
    authProvider={authProvider}
    entrypoint={ENTRYPOINT}
    layout={QuanticLayout}
  >
    <ResourceGuesser
      name="users"
      icon={AccountCircleIcon}
      list={UsersList}
      show={UserShow}
      edit={UserEdit}
    />
    <ResourceGuesser
      name="requests"
      icon={SendIcon}
      list={RequestsList}
      show={RequestShow}
      edit={RequestEdit}
    />
    <ResourceGuesser
      name="coins"
      icon={MonetizationOnIcon}
      list={CoinsList}
      show={CoinShow}
      edit={CoinEdit}
      create={CoinCreate}
    />
    <ResourceGuesser
      name="staking_plans"
      icon={LayersIcon}
      list={StakingContractsList}
      show={StakingContractShow}
      edit={StakingContractEdit}
      create={StakingContractCreate}
    />
  </HydraAdmin>
);
