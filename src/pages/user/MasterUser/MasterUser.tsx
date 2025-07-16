import { Outlet } from "react-router-dom";
import Footer_User from "../../../component_User/footer_User/Footer_User";
import Nav_User from "../../../component_User/nav_user/Nav_User";
import { Container, Box } from "@mui/material";

const MasterUser = () => {
  return (
    <>
<<<<<<< Updated upstream
    <Nav_User/>
        <main>
        <Outlet/>
    </main>
    <Footer_User/>
=======
      <Nav_User />

      <Box sx={{ backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Outlet />
        </Container>
      </Box>

      <Footer_User />
>>>>>>> Stashed changes
    </>
  );
};

export default MasterUser;
