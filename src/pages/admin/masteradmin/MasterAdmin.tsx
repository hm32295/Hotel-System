import React from "react"
import { Outlet } from "react-router-dom"
import Nav_Admin from "../../../component_Admin/navAdmin/Nav_Admin"
import SideBar_Admin from "../../../component_Admin/sideBar_Admin/SideBar_Admin"

const MasterAdmin = () => {
  return (
    <React.Fragment>
      <Nav_Admin />
        <Outlet/>

        <SideBar_Admin />
    </React.Fragment>
  )
}

export default MasterAdmin

