
import CheckIcon from '@mui/icons-material/Check';
import image from '../../../assets/images/payment.png'
import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
export default function Completed() {
    const navigation = useNavigate()
  return (
    <Box sx={{display:'flex' , flexDirection:'column' , gap:'1.3rem',alignItems:'center', justifyContent:'center'}}>
        <Box sx={{display:'flex' , gap:'1rem' , alignItems:'center',justifyContent:'center',color:'#fff'}}>
            <Box component={'span'} sx={{background:'#1ABC9C', borderRadius:'50%', height:'30px' , width:'30px',display:'flex',justifyContent:'center', alignItems:'center'}}> <CheckIcon /> </Box>
            <Box component={'span'} sx={{background:'#1ABC9C', borderRadius:'50%', height:'30px' , width:'30px',display:'flex',justifyContent:'center', alignItems:'center'}}> <CheckIcon /> </Box>
            <Box component={'span'} sx={{background:'#1ABC9C', borderRadius:'50%', height:'30px' , width:'30px',display:'flex',justifyContent:'center', alignItems:'center'}}> <CheckIcon /> </Box>

        </Box>
        <Box component={'h2'} sx={{color:'#152C5B',fontSize:'2rem'}}>Yay! Completed</Box>
        <Box component={'img'} sx={{height:'20rem'}} src={image}></Box>
        <Box component={'p'} sx={{color:'#B0B0B0' ,fontSize:'18px'}}>We will inform you via email later once the transaction has been accepted</Box>
        <Button onClick={()=> navigation('/') } sx={{background:'#3252DF',padding: '8px 28px' , color:'#fff',borderRadius:'4px',boxShadow: "0px 8px 15px 0px #3252DF4D"}}>Back to Home</Button>
    </Box>
  )
}
// ;
