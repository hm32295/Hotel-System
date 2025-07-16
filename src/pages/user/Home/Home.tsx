

import { Explore } from "@mui/icons-material"

import Interface from "./CoMPO_Home/Interface_Home/Interface"
import PopularAds from "./popularAds/PopularAds"
import PopularChoice from "./CoMPO_Home/PopularChoice/PopularChoice"
import AdsDiscounts from "./CoMPO_Home/AdsDiscounts/AdsDiscounts"
import Ads from "./ads/Ads"
import Review from "./review/Review"
import { Box } from "@mui/material"

const Home = () => {
  
  
  return (
    <Box sx={{display:'flex' , flexDirection:'column',gap:'1rem'}}>
 


     
  <Interface/>
  <PopularAds />
  <PopularChoice/>
  <AdsDiscounts/>
  <Ads/>
  <Review/>


  

  </Box>
  )
}

export default Home