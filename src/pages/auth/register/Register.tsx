import './register.css';
import {
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
import SignUpImage from '../../../assets/images/SignUp.png';

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

type RegisterFormData = {
  userName: string;
  phoneNumber: string;
  country: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: 'admin' | 'user';
  profileImage: FileList;
};

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loader, setLoader] = useState(false);
  const navigation = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    control,
  } = useForm<RegisterFormData>();

  const password = watch('password');

  const handelDataToForm = (data: RegisterFormData) => {
    const form = new FormData();
    form.append('userName', data.userName);
    form.append('email', data.email);
    form.append('country', data.country);
    form.append('confirmPassword', data.confirmPassword);
    form.append('password', data.password);
    form.append('phoneNumber', data.phoneNumber);
    form.append('role', data.role);

    if (data.profileImage && data.profileImage.length > 0) {
      form.append('profileImage', data.profileImage[0]);
    }

    return form;
  };

  const onSubmit = async (data: RegisterFormData) => {
    setLoader(true);
    const formData = handelDataToForm(data);

    try {
      const url = data.role === 'admin' ? ADMIN_URL.CREATE_USER : USERS_URL.CREATE_USER;
      const response = await axiosInstance.post(url, formData);
      toast.success(response?.data?.data?.message || 'User created successfully!');
      navigation('/login');
    } catch (error: any) {
      const msg = error?.response?.data?.message || 'Please check your data';
      toast.error(msg);
    } finally {
      setLoader(false);
    }
  };

  return (
    <Box
      className="register"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Left Side - Form */}
      <Box
        sx={{
          width: { xs: '100%', sm: '50%' },
          minHeight: '100vh',
          px: { xs: 2, md: 4 },
          py: { xs: 4, md: 0 },
          display: 'grid',
        }}
      >
        <Box sx={{ width: '100%', maxWidth: 500, justifySelf: 'start', alignSelf: 'center' }}>
          <Typography variant="h5" fontWeight="bold" sx={{ mt: 3, mb: 1 }}>
            Sign up
          </Typography>
          <Typography variant="body2" sx={{ mb: 3 }}>
            If you already have an account register
            <br />
            You can{' '}
            <Link to="/login" style={{ color: 'red', fontWeight: 600 }}>
              Login here!
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
                  <Select {...field} labelId="role-label" label="Type User">
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

            <Button component="label" variant="contained" tabIndex={-1} startIcon={<CloudUploadIcon />}>
              Upload profile image
              <VisuallyHiddenInput
                type="file"
                accept="image/*"
                {...register('profileImage', {
                  required: 'Please upload a profile image',
                })}
              />
            </Button>

            {errors.profileImage && (
              <Typography variant="caption" color="error">
                {errors.profileImage.message}
              </Typography>
            )}

            <Button type="submit" disabled={loader} sx={{ background: '#3252DF', color: '#fff' }} variant="contained">
              {loader ? <Progress /> : 'Send'}
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Right Side - Image */}
      <Box
        className="img"
        sx={{
          width: { xs: '100%', sm: '50%' },
          display: { xs: 'none', sm: 'flex' },
          alignItems: 'center',
          justifyContent: 'center',
          px: 2,
        }}
      >
        <Box sx={{ width: '100%', maxWidth: 600, mt: { xs: 2, md: 2 } }}>
          <img
            src={SignUpImage}
            alt="signup"
            style={{
              width: '100%',
              height: 'auto',
              objectFit: 'cover',
              borderRadius: '16px',
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}
