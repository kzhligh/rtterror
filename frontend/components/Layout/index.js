import PrimarySearchAppBar from "./appbar";
import CustomDrawer from "./drawer";
import styled from '../../styles/layout.module.css'

const Layout =({children}) =>{

    return (
        <div className={styled.bodyWrapper}>
            <CustomDrawer />
            <div className={styled.content}>
                <PrimarySearchAppBar  />
                <div className={styled.contentWrapper}>
                    {children}
                </div>
            </div>
        </div>
    );
}
export default Layout;