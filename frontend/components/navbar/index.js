import { Box, List } from '@mui/material';


// function NavItem(props) {
//     const {text}=props
//     return (
//         <h1>{text}</h1>
//     );
// }

function NavSection() {
    const navList = ["dashboard","service","appointment"];
    return (
        <Box >
            <List disablePadding>
                {navList.map((item) => (
                    <h1>{item}</h1>
                ))}
            </List>
        </Box>
    );
}
export default NavSection;