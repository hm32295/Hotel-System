
import CheckIcon from '@mui/icons-material/Check';
import image from '../../../assets/images/payment.png'
import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
export default function Completed() {
    const navigation = useNavigate()
  return (
    <Box sx={{display:'flex' , flexDirection:'column' , gap:'1.3rem',alignItems:'center', justifyContent:'center'}}>
         <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '40px',
          }}
        >
          <Box
            sx={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: '#1ABC9C',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
            }}
          >
            <CheckIcon sx={{ fontSize: '20px' }} />
          </Box>
          <Box
            sx={{
              width: '40px',
              height: '2px',
              backgroundColor: '#E5E5E5',
            }}
          />
        <Box
            sx={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: '#1ABC9C',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
            }}
          >
            <CheckIcon sx={{ fontSize: '20px' }} />
          </Box>
          <Box
            sx={{
              width: '40px',
              height: '2px',
              backgroundColor: '#E5E5E5',
            }}
          />
         <Box
            sx={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: '#1ABC9C',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
            }}
          >
            <CheckIcon sx={{ fontSize: '20px' }} />
          </Box>
        </Box>
        <Box component={'h2'} sx={{color:'#152C5B',fontSize:'2rem'}}>Yay! Completed</Box>
        <Box component={'img'} sx={{height:'20rem'}} src={image}></Box>
        <Button onClick={()=> navigation('/') } sx={{background:'rgba(21, 44, 91, 1)',padding: '8px 28px' , color:'#fff',borderRadius:'4px',boxShadow: "0px 8px 15px 0px #3252DF4D"}}>Back to Home</Button>
    </Box>
  )
}
// ;
