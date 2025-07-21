

import { Explore } from "@mui/icons-material"

import Interface from "./CoMPO_Home/Interface_Home/Interface"
import PopularAds from "./popularAds/PopularAds"
import PopularChoice from "./CoMPO_Home/PopularChoice/PopularChoice"
import AdsDiscounts from "./CoMPO_Home/AdsDiscounts/AdsDiscounts"
import Ads from "./ads/Ads"
import Review from "./review/Review"
import { Box } from "@mui/material"
import Nav_User from "../../../component_User/nav_user/Nav_User"

const Home = ({isLogged}) => {
  
  
  return (
    <Box sx={{display:'flex' , flexDirection:'column',gap:'1rem'}}>
 {(!isLogged || !localStorage.getItem('token')) ? (
  <>
 <Nav_User/>
  </>
) : null}


     
        <Interface/>
        <PopularAds />
        <PopularChoice/>
        <AdsDiscounts/>
       {(isLogged || localStorage.getItem('token')) ? (
  <>
    <Ads />
    <Review />
  </>
) : null}

      


  

  </Box>
  )
}

export default Home