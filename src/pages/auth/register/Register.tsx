
import './register.css'
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
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Progress from '../../../component_Admin/loader/Progress';
import { toast } from 'react-toastify';
import { useState } from 'react';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loader, setLoader] = useState(false)
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
   
    setLoader(true)
    const handelData = handelDataToForm(data);
    
    try {
      let response;
      if(data.role === 'admin'){
        response = await axiosInstance.post(ADMIN_URL.CREATE_USER,handelData)
      }else if(data.role === 'user'){
        response = await axiosInstance.post(USERS_URL.CREATE_USER,handelData)
      }
      toast.success(response?.data?.data?.message || 'Success Create User Please Log in ')
     
      navigation('/login')
    } catch (error) {
     
      toast.error(error.response.data.message || 'please check your data')
      
    }finally{
      setLoader(false)
      
    }
  };

  const password = watch('password');

  return (
    <Grid container className="register" sx={{ minHeight: '100vh' }} alignItems="center" justifyContent="center">
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

              <Button
                  component="label"
                  
                  role={undefined}
                  variant="contained"
                  tabIndex={-1}
                  startIcon={<CloudUploadIcon />}
                >
                  Upload files
                  <VisuallyHiddenInput
                    type="file"
                    {...register('profileImage', {
                      required: 'Please add profile image',
                    
                    })}
                    onChange={(event) => console.log(event.target.files)}
                    multiple
                  />
                </Button>
            
            <Button type='submit' disabled={loader} sx={{background:"#3252DF", color:"#fff"}} variant="contained">
                    {loader ?<Progress /> : 'send' }   
            </Button>
          </Box>
        </Box>
      </Grid>

      {/* Right Side  */}
      <Grid
        className="img"
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