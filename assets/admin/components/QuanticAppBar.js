import React from "react";
import {
  AppBar,
  AppBarClasses,
  ToggleThemeButton,
  useAuthProvider,
} from "react-admin";
import { Box, Typography } from "@mui/material";

import Logo from "./Logo.js";
import { darkTheme, lightTheme } from "./themes.js";

export const QuanticAppBar = ({ classes, userMenu, ...props }) => {
  const authProvider = useAuthProvider();

  return (
    <AppBar userMenu={userMenu ?? !!authProvider} {...props}>
      <Typography
        variant="h6"
        color="inherit"
        className={AppBarClasses.title}
        id="react-admin-title"
      />
      <h6>Quantic Staking Admin</h6>
      <Box component="span" sx={{ flex: 1 }} />
      <ToggleThemeButton lightTheme={lightTheme} darkTheme={darkTheme} />
    </AppBar>
  );
};
