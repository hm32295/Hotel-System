
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { Box, Button, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {useForm} from 'react-hook-form';
import { Link } from '@mui/material';
import { EMAIL_VALIDATION } from '../../../services/Validation';
import { ADMIN_URL, axiosInstance, USERS_URL } from '../../../services/Url';
import type { resetPassword } from '../../../services/interface';
import Progress from '../../../component_Admin/loader/Progress';
export default  function Forget(){
  const [loader , setLoader]= useState(false)
  const navigation = useNavigate();
  const {register, formState:{errors}, handleSubmit,reset} =  useForm<resetPassword>();
  const sendData = async(data:resetPassword)=>{
    const loginData = 'admin';
   setLoader(true)
    try {
      let response;
      if(loginData === 'admin'){
        response = await axiosInstance.post(ADMIN_URL.FORGET_PASSWORD,data);
      }else if(loginData === 'portal'){

        response = await axiosInstance.post(USERS_URL.FORGET_PASSWORD,data);
      }
      console.log(response);
      
      reset(
       { email: "",
        password:'',
        }
      )
      navigation('/reset')
    } catch (error) {
        console.log(error);
        
    }finally{
      setLoader(false)
      
    }
    
  }

  return (
    <Box className="reset">
      
        <Box component="form"  onSubmit={handleSubmit(sendData)} sx={{display:'flex',gap:"1rem", flexDirection:'column'}}>
          <Box className='details'>
            <Typography sx={{mb:3, fontSize:30}} >Forget Password</Typography>
            <Typography sx={{fontSize:16, mb:1}}>If you already have an account register </Typography>
            <Typography sx={{fontSize:16, mb:9}}>
              You can  
              <Link sx={{color:'red' ,cursor:'pointer', textDecoration:'none'}} component={RouterLink} to='/register'> register here !</Link>
            </Typography>
          </Box>

            <Box>
                <TextField
                    // id="outlined-multiline-flexible"
                    label="Email"
                    multiline
                    maxRows={4}
                    {...register("email",EMAIL_VALIDATION)}

                  />
                  {errors.email&&<Typography sx={{color:'red',textTransform:'capitalize'}}>{errors?.email?.message}</Typography>}

            </Box> 

         
        <Button type='submit' disabled={loader} sx={{background:"#3252DF", color:"#fff"}} variant="contained">
                {loader ?<Progress /> : 'send' }   
        </Button>
        </Box>
        <Box className="img">

          <Typography sx={{mb:.5, fontSize:40,color:'#fff', fontWeight:'bold',lineHeight:3}} >Forget Password</Typography>
          <Typography sx={{ fontSize:20,color:'#fff'}} >Homes as unique as you.</Typography>
         
        </Box>

    </Box>
  )
}

