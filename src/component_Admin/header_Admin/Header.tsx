import './header.css'
const Header = () => {
    let  location=window.location.pathname
  return (
    <div className="Header" >
        <div className="Header_Container " style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <div className="Header_Left" style={{display: 'flex', alignItems: 'center',flexDirection: 'column'}}>
                <h3>Facilities Table Details</h3>
                <h4>You can check all details</h4>

            </div>
             <div className="Header_Right">
                <button>Add New Facility</button>
             </div>
        </div>



    </div>
  )
}

export default Header