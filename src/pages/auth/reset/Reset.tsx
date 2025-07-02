
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Button, FormControl, IconButton, Input, InputAdornment, InputLabel, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import './reset.css';
export default  function Reset(){
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
    <div className="reset">
      
        <form action="">
          <div className='details'>
            <Typography sx={{mb:3, fontSize:30}} >Reset Password </Typography>
            <Typography sx={{fontSize:16, mb:1}}>If you already have an account register </Typography>
            <Typography sx={{fontSize:16, mb:9}}>You can   Login here !</Typography>
          </div>


          <TextField id="standard-basic" label="email" variant="standard" />
          <TextField id="standard-basic" label="otp" variant="standard" />
          {/* <FormControl fullWidth sx={{border:0, m: 1 }} >
          <InputLabel sx={{color:'#000',border:0}} htmlFor="standard-basic">Email</InputLabel>

          
          <Input
          placeholder='Please type here '
            sx={{backgroundColor:'#F5F6F8' , p:1,border:0, }}
            id="standard-adornment-amount"
            startAdornment={<InputAdornment position="start"></InputAdornment>}
          />
        </FormControl> */}

          {/* <FormControl fullWidth sx={{border:0, m: 1 }} >
          <InputLabel sx={{color:'#000',border:0}} htmlFor="standard-adornment-amount">otp</InputLabel>
          <Input
          placeholder='Please type here '
            sx={{backgroundColor:'#F5F6F8' , p:1,border:0, }}
            id="standard-adornment-amount"
            startAdornment={<InputAdornment position="start"></InputAdornment>}
          />
        </FormControl> */}


        <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
          <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
          <Input
            // sx={{backgroundColor:'#F5F6F8'}}
            id="standard-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword ? 'hide the password' : 'display the password'
                  }
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>

        <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
          <InputLabel htmlFor="standard-adornment-password">Confirm Password</InputLabel>
          <Input
          // sx={{backgroundColor:'#F5F6F8'}}
            id="standard-adornment-password"
            type={showConfirmPassword ? 'text' : 'password'}
            
            endAdornment={
              <InputAdornment position="end" >
                <IconButton
                  aria-label={
                    showPassword ? 'hide the password' : 'display the password'
                  }
                  onClick={handleClickShowConfirmPassword}
                  onMouseDown={handleMouseDownConfirmPassword}
                  onMouseUp={handleMouseUpConfirmPassword}
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>


        <Button sx={{background:"#3252DF", color:"#fff"}} variant="contained">send</Button>
        </form>
        <div className="img">

          <Typography sx={{mb:.5, fontSize:40,color:'#fff', fontWeight:'bold',lineHeight:3}} > Forgot password</Typography>
          <Typography sx={{ fontSize:20,color:'#fff'}} >Homes as unique as you.</Typography>
         
        </div>

    </div>
  )
}

