import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import FormBooking from "./FormBooking";
import { Box, Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import CheckIcon from '@mui/icons-material/Check';

const stripePromise = loadStripe('pk_test_51OTjURBQWp069pqTmqhKZHNNd3kMf9TTynJtLJQIJDOSYcGM7xz3DabzCzE7bTxvuYMY0IX96OHBjsysHEKIrwCK006Mu7mKw8');

export default function Payment() {
  const location = useLocation();
  const navigation = useNavigate();
  const [booking, setBooking] = useState({});

  useEffect(() => {
    if (location?.state) {
      setBooking(location.state);
    }
  }, []);

  const cancel = () => {
    console.log('data');
    navigation('/');
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      justifyContent: 'center', 
      flexDirection: 'column', 
      alignItems: 'center', 
      minHeight: 'auto'
    }}>
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
              backgroundColor: '#E5E5E5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#898989',
              fontSize: '16px',
              fontWeight: '500',
            }}
          >
            3
          </Box>
        </Box>
          <Box
          sx={{
            textAlign: 'center',
            marginBottom: '8px',
          }}
        >
          <Box
            component="h1"
            sx={{
              fontSize: { xs: '28px', md: '36px' },
              fontWeight: '600',
              color: '#152C5B',
              margin: 0,
              marginBottom: '8px',
            }}
          >
            Payment
          </Box>
          <Box
            component="p"
            sx={{
              fontSize: '18px',
              color: '#B0B0B0',
              margin: 0,
              marginBottom: '40px',
            }}
          >
            Kindly follow the instructions below
          </Box>
        </Box>
      <Box sx={{ width: '100%', maxWidth: '600px' }}>
        <Elements stripe={stripePromise}>
          <FormBooking booking={booking} />
        </Elements>
      </Box>
      <Button onClick={() => { cancel() }} sx={{ width: '300px', mt: '0.5rem', padding: '8px 28px', borderRadius: '4px', boxShadow: "0px 8px 15px 0px #ccc" }}>
        Cancel
      </Button>
    </Box>
  );
}