import {Drawer, List, ListItem, ListItemIcon, ListItemText} from "@mui/material";
import Link from "next/link";
import * as React from "react";
import styled from '../../styles/layout.module.css'
import {AddCircleOutlineOutlined, SubjectOutlined} from "@mui/icons-material";

const CustomDrawer =() =>{
    const menuItems = [
        {
            text: 'Customer',
            icon: <SubjectOutlined color="secondary" />,
            path: '/customer'
        },
        {
            text: 'Service',
            icon: <AddCircleOutlineOutlined color="secondary" />,
            path: '/service'
        },
        {
            text: 'Appointment',
            icon: <AddCircleOutlineOutlined color="secondary" />,
            path: '/appointment'
        }
    ];
    return (
        <Drawer
            className={styled.drawer}
            variant='permanent'
            anchor='left'
            classes={{paper: styled.drawerPaper}}
        >
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
        </Drawer>
    );
}
export default CustomDrawer;