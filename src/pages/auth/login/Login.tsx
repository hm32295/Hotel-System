
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Box, Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from '@mui/material';
import { useContext, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {useForm} from 'react-hook-form';
import { Link } from '@mui/material';
import { EMAIL_VALIDATION } from '../../../services/Validation';
import { ADMIN_URL, axiosInstance } from '../../../services/Url';
import type { resetPassword } from '../../../services/interface';
import Progress from '../../../component_Admin/loader/Progress';
import { AuthContext } from '../../../context/context';
import { toast } from 'react-toastify';
export default  function Login(){
  const [loader, setLoader] = useState(false)
  const navigation = useNavigate();
  const {register, formState:{errors}, handleSubmit,reset} =  useForm<resetPassword>();
  const { saveLoginData } = useContext(AuthContext);
  const sendData = async(data:resetPassword)=>{
   setLoader(true)
   
    try {
      const response= await axiosInstance.post(ADMIN_URL.LOGIN,data) 
      localStorage.setItem('token', response?.data?.data?.token)
      localStorage.setItem('role',  response?.data?.data?.user?.role)
      
      saveLoginData();
      reset(
       { email: "",
        password:'',
        }
      )
      if(response?.data?.data?.user?.role === 'admin'){
        navigation('/MasterAdmin')
      }else if(response?.data?.data?.user?.role === 'user'){
        navigation('/MasterUser')

      }
      
      toast.success(response?.data?.message || 'Welcome ' + response?.data?.user?.userName)
    } catch (error:any) {
      if(error.response){
        toast.error(error?.response?.data?.message || 'check your data')
      }
        
    }finally{
      setLoader(false)
      
    }
    
  }



  /// Handel Show Password And Hide

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <>
    <Box className="reset">
      
        <Box component="form"  onSubmit={handleSubmit(sendData)} sx={{display:'flex',gap:"1rem", flexDirection:'column'}}>
          <Box className='details'>
            <Typography sx={{mb:3, fontSize:30}} >Login</Typography>
            <Typography sx={{fontSize:16, mb:1}}>If you already have an account register </Typography>
            <Typography sx={{fontSize:16, mb:9}}>
              You can  
              <Link sx={{color:'red' ,cursor:'pointer', textDecoration:'none'}} component={RouterLink} to='/register'> register here !</Link>
            </Typography>
          </Box>

            <Box>
                <TextField
                    label="Email"
                    multiline
                    maxRows={4}
                    {...register("email",EMAIL_VALIDATION)}

                  />
                  {errors.email&&<Typography sx={{color:'red',textTransform:'capitalize'}}>{errors?.email?.message}</Typography>}

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

        

         
        <Link sx={{textDecoration:'none' , color:'#3252DF'}} to='/Forget' component={RouterLink}>Forget Password</Link>

         <Button type='submit' disabled={loader} sx={{background:"#3252DF", color:"#fff"}} variant="contained">
                  {loader ?<Progress /> : 'send' }   
          </Button>
                              
        </Box>
        <Box className="img">

          <Typography sx={{mb:.5, fontSize:40,color:'#fff', fontWeight:'bold',lineHeight:3}} > Forgot password</Typography>
          <Typography sx={{ fontSize:20,color:'#fff'}} >Homes as unique as you.</Typography>
         
        </Box>

    </Box>
    </>
  )
}

