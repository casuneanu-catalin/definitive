import React from 'react';
import { Menu } from 'react-admin';

export const QuanticMenu = () => (
    <Menu>
        <Menu.ResourceItem name="users" />
        <Menu.ResourceItem name="requests" />
        <Menu.ResourceItem name="coins" />
        <Menu.ResourceItem name="staking_plans" />
    </Menu>
);