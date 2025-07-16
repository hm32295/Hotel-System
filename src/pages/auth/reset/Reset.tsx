
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Box, Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import './reset.css';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {useForm} from 'react-hook-form';
import { Link } from '@mui/material';
import { EMAIL_VALIDATION } from '../../../services/Validation';
import { ADMIN_URL, axiosInstance, USERS_URL } from '../../../services/Url';
import type { resetPassword } from '../../../services/interface';
import Progress from '../../../component_Admin/loader/Progress';
import { toast } from 'react-toastify';
export default  function Reset(){
  const [loader, setLoader] = useState(false)
  const navigation = useNavigate();
  const {register, formState:{errors}, handleSubmit, watch ,reset} =  useForm<resetPassword>();
  const sendData = async(data:resetPassword)=>{
    const loginData = 'admin';
   setLoader(true)
    try {
      let response;
      if(loginData === 'admin'){
        response = await axiosInstance.post(ADMIN_URL.RESET_PASSWORD,data);
      }else if(loginData === 'user'){
        response = await axiosInstance.post(USERS_URL.RESET_PASSWORD,data);
      }
      reset(
       { email: "",
        seed:'',
        password:'',
        confirmPassword: ''}
      )
      navigation('/login');
      toast.success(response?.data?.message || 'Please Log in with new password')
    } catch (error) {
        toast.error(error?.response?.data?.message || 'check your data');
   
    }finally{
      setLoader(false)
      
    }
    
  }

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

  const handleMouseDownConfirmPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleMouseUpConfirmPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  return (
    <Box className="reset">
      
        <Box component="form"  onSubmit={handleSubmit(sendData)} sx={{display:'flex',gap:"1rem", flexDirection:'column'}}>
          <Box className='details'>
            <Typography sx={{mb:3, fontSize:30}} >Reset Password </Typography>
            <Typography sx={{fontSize:16, mb:1}}>If you already have an account register </Typography>
            <Typography sx={{fontSize:16, mb:9}}>
              You can  
              <Link sx={{color:'red' ,cursor:'pointer', textDecoration:'none'}} component={RouterLink} to='/login'> Login here !</Link>
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

            <Box>

                  <TextField
                      // id="outlined-multiline-flexible"
                      label="OTP"
                      multiline
                      maxRows={4}
                      {...register('seed' ,{required:'The field Is Required'})}
                    />
                    {errors.seed&&<Typography sx={{color:'red',textTransform:'capitalize'}}>{errors?.seed?.message}</Typography>}
            </Box>


            <Box>

                  <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                  <OutlinedInput
                              // id="outlined-adornment-password"
                              type={showPassword ? 'text' : 'password'}
                              endAdornment={
                                <InputAdornment position="end">
                                  <IconButton
                                    aria-label={
                                      showPassword ? 'hide the password' : 'display the password'
                                    }
                                    sx={{display:'flex', alignItems:'center'}}
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    onMouseUp={handleMouseUpPassword}
                                    edge="end"
                                  >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                  </IconButton>
                                </InputAdornment>
                              }

                              label="Password"
                              {...register('password' , {required:'The field Is Required'})}
                            />
                  </FormControl>
                  {errors.password&&<Typography sx={{color:'red',textTransform:'capitalize'}}>{errors?.password?.message}</Typography>}
            </Box>

        

            <Box>
              <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
              <OutlinedInput
                          // id="outlined-adornment-password"
                          type={showConfirmPassword ? 'text' : 'password'}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label={
                                  showConfirmPassword ? 'hide the password' : 'display the password'
                                }
                                sx={{display:'flex', alignItems:'center'}}
                                onClick={handleClickShowConfirmPassword}
                                onMouseDown={handleMouseDownConfirmPassword}
                                onMouseUp={handleMouseUpConfirmPassword}
                                edge="end"
                              >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          }
                          label="Password"
                          {...register('confirmPassword' , 
                            {required:'The field Is Required',
                              validate: (value) => value === watch("password") || "Passwords do not match"

                            }
                          )}
                        />
              </FormControl>
              {errors.confirmPassword&&<Typography sx={{color:'red',textTransform:'capitalize'}}>{errors?.confirmPassword?.message}</Typography>}
            </Box>
        

          <Button type='submit' disabled={loader} sx={{background:"#3252DF", color:"#fff"}} variant="contained">
                {loader ?<Progress /> : 'send' }  
            
          </Button>
        </Box>
        <Box className="img">

          <Typography sx={{mb:.5, fontSize:40,color:'#fff', fontWeight:'bold',lineHeight:3}} > Forgot password</Typography>
          <Typography sx={{ fontSize:20,color:'#fff'}} >Homes as unique as you.</Typography>
         
        </Box>

    </Box>
  )
}

