import React from "react"
import Menu from "./Menu"
import MenuDrawer from './MenuDrawer'

const MenuAppBar = () => {
  return (
    <React.Fragment>
      <MenuDrawer />
      <Menu />
    </React.Fragment>
  );
}

export default MenuAppBar