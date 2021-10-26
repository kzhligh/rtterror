import {Drawer, List, ListItem, ListItemIcon} from "@mui/material";
import Link from "next/link";
import * as React from "react";
import {AddCircleOutlineOutlined, SubjectOutlined} from "@mui/icons-material";

const CustomDrawer =() =>{
    const menuItems = [
        {
            text: 'Appointment',
            icon: <SubjectOutlined color="secondary" />,
            path: '/appointment'
        },
        {
            text: 'Patient',
            icon: <AddCircleOutlineOutlined color="secondary" />,
            path: '/patient'
        },
        {
            text: 'Service',
            icon: <AddCircleOutlineOutlined color="secondary" />,
            path: '/service'
        },
        {
            text: 'Employee',
            icon: <SubjectOutlined color="secondary" />,
            path: '/employee'
        },
        {
            text: 'Schedule',
            icon: <AddCircleOutlineOutlined color="secondary" />,
            path: '/schedule'
        },
        {
            text: 'Product',
            icon: <AddCircleOutlineOutlined color="secondary" />,
            path: '/product'
        },
        {
            text: 'Invoice',
            icon: <AddCircleOutlineOutlined color="secondary" />,
            path: '/invoice'
        }
    ];
    return (

                <List>
                    {menuItems.map((item) => (
                        <ListItem
                            button
                            key={item.text}
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