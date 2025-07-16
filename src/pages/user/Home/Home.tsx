
import PopularAds from "./popularAds/popularAds"

import Interface from "./CoMPO_Home/Interface_Home/Interface"
import Ads from "./ads/Ads"
import Review from "./review/Review"

const Home = () => {


  return (
    <div>

      <Interface />
      <PopularAds />
      <Ads />
      <Review />

</div>
  )
}

export default Home