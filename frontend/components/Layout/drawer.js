import { List, ListItem, ListItemIcon} from "@mui/material";
import styled from '../../styles/layout.module.css'
import Link from "next/link";
import * as React from "react";
import {
    AccessTime,
    AccountCircle,
    AddBox, Event,
    Healing, Receipt,
    Work
} from "@mui/icons-material";

const CustomDrawer =() =>{
    const menuItems = [
        {
            text: 'Appointment',
            icon: <AccessTime />,
            path: '/appointment'
        },
        {
            text: 'Patient',
            icon: <AccountCircle  />,
            path: '/patient'
        },
        {
            text: 'Service',
            icon: <AddBox />,
            path: '/service'
        },
        {
            text: 'Employee',
            icon: <Work />,
            path: '/employee'
        },
        {
            text: 'Schedule',
            icon: <Event />,
            path: '/schedule'
        },
        {
            text: 'Product',
            icon: <Healing  />,
            path: '/product'
        },
        {
            text: 'Invoice',
            icon: <Receipt />,
            path: '/invoice'
        }
    ];
    return (

                <List>
                    {menuItems.map((item) => (
                        <ListItem
                            button
                            key={item.text}
                            className={styled.drawerWrapper}
                        >
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <Link href={item.path}>
                                <a>
                                    {item.text}
                                </a>
                            </Link>
                        </ListItem>
                    ))}
                </List>
    );
}
export default CustomDrawer;