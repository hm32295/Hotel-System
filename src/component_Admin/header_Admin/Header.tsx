import './header.css'
const Header = () => {
    let  location=window.location.pathname
  return (
    <div className="Header" >
        <div className="Header_Container " style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <div className="Header_Left" style={{display: 'flex', alignItems: 'center',flexDirection: 'column'}}>
              {location==='/MasterAdmin/Facilities'?
              <h3>Facilities Table Details</h3> : location==='/MasterAdmin/Ads'
              ? <h3>ADS Table Details </h3> :location==='/MasterAdmin/Explore'?<h3>Explore Table Details</h3>
              :location==='/MasterAdmin/ListBooking'?<h3>Booking Table Details </h3>
              :location==='/MasterAdmin/Rooms'?<h3>Rooms Table Details </h3>:null

              
          }
          {location!='/MasterAdmin/HomeAdmin' ?  <h4>You can check all details</h4>:null}
        

            </div>
             <div className="Header_Right">
                {location==='/MasterAdmin/Facilities'?
             <button>Add New Facility</button>: location==='/MasterAdmin/Ads'
              ?<button>Add New Ads</button>:location==='/MasterAdmin/Explore'?<button>Add New Explore</button>
              :location==='/MasterAdmin/ListBooking'?null
              :location==='/MasterAdmin/Rooms'?<button>Add New Room</button>:null

              
          }
                
             </div>
        </div>



    </div>
  )
}

export default Header