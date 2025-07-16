import { toast } from 'react-toastify';
import './header.css'
import { axiosInstance, FacilitesUrls } from '../../services/Url';
import { useState } from 'react';
import { Box, Button, Fade, IconButton, Modal, TextField, useColorScheme} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Backdrop from '@mui/material/Backdrop';
import { useNavigate } from 'react-router-dom';
const Header = () => {
    let  location=window.location.pathname
    // Start With Add Facilites
  const [itemToUpdate, setItemToUpdate] = useState(null);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [value, setValue] = useState('');
//  Modal Edit 
  const handleOpenUpdate = (row) => {
    setItemToUpdate(row);
    setValue(row.name);
    setOpenUpdate(true);
    
  };

  const handleCloseUpdate = () => {
    setOpenUpdate(false);
    setItemToUpdate(null);
    setValue('');
  };
 
  const handleConfirmAdd = async () => {
    
    if (itemToUpdate) {
      try {
       
        await axiosInstance.post(`${FacilitesUrls.CREATE}`, { name: value });
         toast.success(`Added  successfully.`)
        } catch (error) {
        toast.error(error?.response?.data?.message || 'Sorry Check your data')
        
      }
    }
    handleCloseUpdate();
  };
    // End With Add Facilites
 const { mode } = useColorScheme();
  const isDarkMode = mode === 'dark';
let navigation=useNavigate()
  return (
    <div className="Header" >
         <Modal
              open={openUpdate}
              onClose={handleCloseUpdate}
              closeAfterTransition
              slots={{ backdrop: Backdrop }}
              slotProps={{ backdrop: { timeout: 500 } }}
            >
              <Fade in={openUpdate}>
                <Box sx={{ 
                  position: 'absolute', 
                  top: '50%', 
                  left: '50%', 
                  transform: 'translate(-50%, -50%)', 
                  bgcolor: 'background.paper', 
                  boxShadow: 24, 
                  p: 4, 
                  width: 400 
                }}>
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <h2 style={{ margin: 0 }}>Add Facility</h2>
                    <IconButton size="small" onClick={handleCloseUpdate}>
                      <CloseIcon />
                    </IconButton>
                  </Box>
                  
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Name"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                  />
                  <Box mt={3} display="flex" justifyContent="flex-end">
                    <Button onClick={handleCloseUpdate} sx={{ mr: 1 }}>
                     Cancel
                    </Button>
                    <Button variant="contained" onClick={handleConfirmAdd} >
                     Save
                    </Button>
                  </Box>
                </Box>
              </Fade>
            </Modal>
            {/* End Model Add Facilites */}
            <div className="Header_Container " style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center',color:'#fff'}}>
            <div className={isDarkMode?'indark' :'Header_Left'} style={{display: 'flex', alignItems: 'center',flexDirection: 'column',color:'#fff'}} >
              {location==='/MasterAdmin/Facilities'?
              <h3 >Facilities Table Details</h3> : location==='/MasterAdmin/Ads'
              ? <h3 >ADS Table Details </h3> :location==='/MasterAdmin/Explore'?<h3>Explore Table Details</h3>
              :location==='/MasterAdmin/ListBooking'?<h3>Booking Table Details </h3>
              :location==='/MasterAdmin/Rooms'?<h3 >Rooms Table Details </h3>:null

              
          }


            </div>
             <div className="Header_Right">
                {location==='/MasterAdmin/Facilities'?
             <Button sx={{background:'#3252DF !important'}} onClick={handleOpenUpdate}>Add New Facility</Button>:location==='/MasterAdmin/Explore'?<Button>Add New Explore</Button>
              :location==='/MasterAdmin/ListBooking'&&null
              

              
          }
                
             </div>
       
        </div>



    </div>
  )
}

export default Header