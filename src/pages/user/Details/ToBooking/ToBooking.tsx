import { Box, Button } from "@mui/material";
import NewspaperIcon from '@mui/icons-material/Newspaper';
import { useNavigate } from "react-router-dom";

export default function ToBooking({data,isLogged}) {
  const navigation = useNavigate()
  return (
    <Box sx={{flex:"1", border:'solid #E5E5E5 1px',minWidth:'300px', borderRadius:'1rem', padding:'2rem' ,

      display:'flex',
      justifyContent:'flex-start',
      alignItems:'center',
      gap:'3rem',
      flexDirection:'column'
    }}>
      
        <Box>
          <Box component={'p'} sx={{fontSize:"20px", color:'#152C5B' ,mb:'14px'}}>Start Booking</Box>
          <Box sx={{mb:'5px'}} >
            <Box component={'span'} sx={{color:'#1ABC9C' ,fontSize:'36px'}}>{data.price}$</Box>
            <Box component={'span'} sx={{fontSize:'36px' ,color:'#B0B0B0'}}>per night</Box>
          </Box>
          <Box sx={{color:'#FF1612' ,fontSize:'1rem'}}>Discount {data.discount}% Off </Box>
        </Box>


        <Box>
          <Box component={'h3'} sx={{marginBottom:'.5rem'}}>Pick a Date</Box>
          <Box sx={{background:'#F5F6F8',display:'flex',alignItems:'center'}}>
            <Box sx={{flex:'l',p:'.2rem',height:'100%',background:'#152C5B',color:'#fff', borderRadius:'.3rem'}}>
              <NewspaperIcon sx={{fontSize:'2.5rem'}} />
            </Box>
            <Box sx={{flex:'1', p:'1rem',}}>{new Date(data.createdAt).toLocaleDateString("en-GB")} - {new Date(data.updatedAt).toLocaleDateString("en-GB")}</Box>
          </Box>

          <Box sx={{mt:'1.5rem',display:'flex', gap:'.4rem'}}>
                <Box component={'span'} sx={{color:'#B0B0B0' , fontSize:'1rem'}}>You will pay</Box>
                <Box component={'span'} sx={{color:'#152C5B' ,fontSize:'1rem'}}>${data.price - data.price*(data.discount/100)} USD</Box>
                <Box component={'span'} sx={{color:'#B0B0B0' , fontSize:'1rem'}}>per</Box>
                <Box component={'span'} sx={{color:'#152C5B' ,fontSize:'1rem'}}>{data.capacity} Person</Box>
          </Box>
          {isLogged || localStorage.getItem('token')?(

              <Box sx={{mt:'20px', display:'flex', justifyContent:'center'}} >

                <Button onClick={()=>{navigation('/MasterUser/booking', {state:data._id})}} sx={{background:"#3252DF",fontSize:'18px',padding:'10px 20px', color:"#fff",boxShadow: '0px 8px 15px 0px #3252DF4D'}} variant="contained">
                      Continue Book 
              </Button>
              </Box>
          ):null}
        </Box>
    </Box>
  )
}
