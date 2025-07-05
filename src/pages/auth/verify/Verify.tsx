import * as React from 'react';
import {
  Grid,
  Box,
  TextField,
  Button,
  Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export default function Verify() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      console.log('Verification Code:', data.code);
      toast.success('Verification successful!');
      // await axios.post('');
    } catch (err) {
      toast.error('Invalid code');
    }
  };

  return (
    <Grid container sx={{ minHeight: '100vh' }} alignItems="center" justifyContent="center">
      {/* Left Side (Logo + Form) */}
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
        {/* ✅ Form - في الوسط */}
        <Box
          sx={{
            width: '100%',
            maxWidth: 500,
            justifySelf: 'start',
            alignSelf: 'center',
          }}
        >
          <Typography variant="h5" fontWeight="bold" sx={{ mb: 1 }}>
            Verify Account
          </Typography>
          <Typography variant="body2" sx={{ mb: 3 }}>
            Please enter the code sent to your email to verify your account.
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            <TextField
              label="Verification Code"
              fullWidth
              {...register('code', { required: 'Code is required' })}
              error={!!errors.code}
              helperText={errors.code?.message}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={isSubmitting}
              sx={{
                py: 1.5,
                mt: 1,
                backgroundColor: '#3252DF',
                boxShadow: '0 8px 15px 0 rgba(50, 82, 223, 0.3)',
              }}
            >
              Verify
            </Button>
          </Box>
        </Box>
        <Box />
      </Grid>

      {/* Right Side (Image) */}
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
            src="/src/assets/images/Rectangle 7 (1).svg"
            alt="verify"
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