import MenuIcon from "@mui/icons-material/Menu"
import RightMenuDrawer from './MenuDrawer'
import { BackToTop } from './BackToTop'
const Menu = () => {
    return (
        <>
            <MenuIcon
                id="topMenuHook"
                sx={{
                    cursor: 'pointer',
                    position: "fixed",
                    top: "1rem",
                    right: ['1.2rem', '1.7rem', '2rem'],
                    fontSize: ['2.7rem', '2.9rem', '3.33rem'],
                    margin: 0,
                    padding: 0,
                    zIndex: "1000"

                }}>
            </MenuIcon>
            <BackToTop />
            <RightMenuDrawer />
        </>
    )
}

export default Menu