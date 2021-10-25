import {Box, Container, Drawer, IconButton, List, Toolbar} from '@mui/material';
import {useState} from "react";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';


// function NavItem(props) {
//     const {text}=props
//     return (
//         <h1>{text}</h1>
//     );
// }

function NavSection() {
    const [open, setOpen] = useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };
    const navList = ["dashboard","service","appointment"];
    return (
        <Drawer open={open}>
            <Toolbar>
                <IconButton onClick={toggleDrawer}>
                    <ChevronLeftIcon />
                </IconButton>
            </Toolbar>
            <Container >

            </Container>
            <List disablePadding>
                {navList.map((item) => (
                    <h1>{item}</h1>
                ))}
            </List>
        </Drawer>
    );
}
export default NavSection;