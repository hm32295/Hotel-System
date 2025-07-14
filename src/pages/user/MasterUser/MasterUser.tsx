import { Outlet } from "react-router-dom"
import Footer_User from "../../../component_User/footer_User/Footer_User"
import Nav_User from "../../../component_User/nav_user/Nav_User"

const MasterUser = () => {
  return (
    <>
    <Nav_User/>
        <main>
        <Outlet/>
    </main>
    <Footer_User/>
    </>

  )
}

export default MasterUser