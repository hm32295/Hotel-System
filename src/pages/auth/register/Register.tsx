import * as React from 'react';
import {
  Grid,
  Box,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Typography,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  FormHelperText,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { ADMIN_URL, axiosInstance, USERS_URL } from '../../../services/Url';
import { EMAIL_VALIDATION } from '../../../services/Validation';

export default function Register() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirm, setShowConfirm] = React.useState(false);
  const navigation = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    control
  } = useForm();

  const handelDataToForm = (data:any) =>{
  
    const registerForm = new FormData();
    registerForm.append('userName', data.userName)
    registerForm.append('email', data.email)
    registerForm.append('country', data.country)
    registerForm.append('confirmPassword', data.confirmPassword)
    registerForm.append('password', data.password)
    registerForm.append('phoneNumber', data.phoneNumber)
    registerForm.append('profileImage', data.profileImage[0])
    registerForm.append('role' ,data.role)
   
    return registerForm
  
  }


  const onSubmit =async (data : any) => {
   
    
    const handelData = handelDataToForm(data);
    
    try {
      let response;
      if(data.role === 'admin'){
        response = await axiosInstance.post(ADMIN_URL.CREATE_USER,handelData)
      }else if(data.role === 'user'){
        response = await axiosInstance.post(USERS_URL.CREATE_USER,handelData)
      }
      console.log(response?.data?.data?.message);
      navigation('/login')
    } catch (error) {
      console.log(error.response.data.message);
      
    }finally{
      console.log('hee');
      
    }
  };

  const password = watch('password');

  return (
    <Grid container sx={{ minHeight: '100vh' }} alignItems="center" justifyContent="center">
      {/*  Left Side (Form) */}
      <Grid
        item
        xs={12}
        sm={6}
        md={6}
        sx={{
        display: 'grid',
          minHeight: '100vh',
          px: { xs: 2, md: 4 },
          py: { xs: 4, md: 0 },
        }}
      >
        <Box sx={{
          width: '100%', maxWidth: 500,
          justifySelf: 'start',
          alignSelf: 'center',
        }}>

          <Typography variant="h5" fontWeight="bold" sx={{ mt: 3, mb: 1 }}>
            Sign up
          </Typography>
          <Typography variant="body2" sx={{ mb: 3 }}>
            If you already have an account register
            <br />
            You can{' '}
            <Link to="/login" style={{ color: 'red', fontWeight: 600 }}>
              Login here !
            </Link>
          </Typography>

          <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="User Name"
              fullWidth
              {...register('userName', { required: 'Username is required' })}
              error={!!errors.userName}
              helperText={errors.userName?.message}
            />
            <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
              <TextField
                label="Phone Number"
                fullWidth
                {...register('phoneNumber', { required: 'Phone is required' })}
                error={!!errors.phoneNumber}
                helperText={errors.phoneNumber?.message}
              />
              <TextField
                label="Country"
                fullWidth
                {...register('country', { required: 'Country is required' })}
                error={!!errors.country}
                helperText={errors.country?.message}
              />
            </Box>
           
            <FormControl fullWidth error={!!errors.role}>
            <InputLabel id="role-label">Type User</InputLabel>
            <Controller
              name="role"
              control={control}
              rules={{ required: 'User type is required' }}
              render={({ field }) => (
                <Select
                  {...field}
                  labelId="role-label"
                  label="Type User"
                >
                  <MenuItem value="admin">Admin</MenuItem>
                  <MenuItem value="user">User</MenuItem>
                </Select>
              )}
            />
            <FormHelperText>{errors.role?.message}</FormHelperText>
          </FormControl>
           

            <TextField
              label="Email Address"
              type="email"
              fullWidth
              {...register('email', EMAIL_VALIDATION)}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <TextField
              label="Password"
              type={showPassword ? 'text' : 'password'}
              fullWidth
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 6, message: 'At least 6 characters' },
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Confirm Password"
              type={showConfirm ? 'text' : 'password'}
              fullWidth
              {...register('confirmPassword', {
                required: 'Please confirm your password',
                validate: value => value === password || 'Passwords do not match',
              })}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowConfirm(!showConfirm)} edge="end">
                      {showConfirm ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Profile Image"
              type={'file'}
              fullWidth
              {...register('profileImage', {
                required: 'Please add profile image',
               
              })}
              error={!!errors.profileImage}
              helperText={errors.profileImage?.message}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                py: 1.5,
                mt: 1,
                backgroundColor: '#3252DF',
                boxShadow: '0 8px 15px 0 rgba(50, 82, 223, 0.3)',
              }}
            >
              Sign up
            </Button>
          </Box>
        </Box>
      </Grid>

      {/* Right Side  */}
      <Grid
        item
        xs={12}
        sm={6}
        md={6}
        sx={{
          display: { xs: 'none', sm: 'flex' },
          alignItems: 'center',
          justifyContent: 'center',
          px: 2,
        }}
      >
        <Box sx={{ width: '100%', maxWidth: 600, mt: { xs: 2, md: 2 } }}>
          <img
            src="/src/assets/images/SignUp.png"
            alt="signup"
            style={{
              width: '100%',
              height: 'auto',
              objectFit: 'cover',
              borderRadius: '16px',
            }}
          />
        </Box>
      </Grid>
    </Grid>
  );
}