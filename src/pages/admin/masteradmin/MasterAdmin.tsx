import React from "react"
import { Outlet } from "react-router-dom"

const MasterAdmin = () => {
  return (
    <React.Fragment>
        <Outlet/>
    </React.Fragment>
  )
}

export default MasterAdmin