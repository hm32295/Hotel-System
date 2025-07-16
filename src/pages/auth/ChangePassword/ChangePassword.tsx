import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Box, Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {useForm} from 'react-hook-form';
import { Link } from '@mui/material';
import { ADMIN_URL, axiosInstance, USERS_URL } from '../../../services/Url';
import type { changePassword } from '../../../services/interface';
import Progress from '../../../component_Admin/loader/Progress';
import { toast } from 'react-toastify';


export default  function ChangePassword(){
  const [loader, setLoader] = useState(false)
  const navigation = useNavigate();
  const {register, formState:{errors}, handleSubmit, watch ,reset} =  useForm<changePassword>();
  const sendData = async(data:changePassword)=>{
    const loginData = 'admin';
   setLoader(true)
    try {
      let response;
      if(loginData === 'admin'){
        response = await axiosInstance.post(ADMIN_URL.CHANGE_PASSWORD,data);
      }else if(loginData === 'user'){
        response = await axiosInstance.post(USERS_URL.CHANGE_PASSWORD,data);
      }
      reset(
       { 
        oldPassword:'',
        newPassword:'',
        confirmPassword: ''
      }
      )
      
      toast.success(response?.data?.data?.message || 'Password changed successfully')
      
    } catch (error) {
        toast.error(error?.response?.data.message || 'please make sure old password is correct!');
        
    }finally{
      setLoader(false)
      
    }
    
  }


  /// old Password
  const [showOldPassword, setShowOldPassword] = useState(false);
  const handleClickShowOldPassword = () => setShowOldPassword((show) => !show);
    const handleMouseDownOldPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleMouseUpOldPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  // new Password
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  // Confirm password
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
            <Typography sx={{mb:3, fontSize:30}} >Change Password </Typography>
          </Box>
            <Box>

                  <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">old Password</InputLabel>
                  <OutlinedInput
                              // id="outlined-adornment-password"
                              type={showOldPassword ? 'text' : 'password'}
                              endAdornment={
                                <InputAdornment position="end">
                                  <IconButton
                                    aria-label={
                                      showPassword ? 'hide the password' : 'display the password'
                                    }
                                    sx={{display:'flex', alignItems:'center'}}
                                    onClick={handleClickShowOldPassword}
                                    onMouseDown={handleMouseDownOldPassword}
                                    onMouseUp={handleMouseUpOldPassword}
                                    edge="end"
                                  >
                                    {showOldPassword ? <VisibilityOff /> : <Visibility />}
                                  </IconButton>
                                </InputAdornment>
                              }

                              label="Password"
                              {...register('oldPassword' , {required:'The field Is Required'})}
                            />
                  </FormControl>
                  {errors.oldPassword&&<Typography sx={{color:'red',textTransform:'capitalize'}}>{errors?.oldPassword?.message}</Typography>}
            </Box>
        
            <Box>

                  <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">new Password</InputLabel>
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
                              {...register('newPassword' , {required:'The field Is Required'})}
                            />
                  </FormControl>
                  {errors.newPassword&&<Typography sx={{color:'red',textTransform:'capitalize'}}>{errors?.newPassword?.message}</Typography>}
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
                              validate: (value) => value === watch("newPassword") || "Passwords do not match"

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

