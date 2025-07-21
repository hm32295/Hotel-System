import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import FormBooking from "./FormBooking";
import { Box, Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import CheckIcon from '@mui/icons-material/Check';

const stripePromise = loadStripe('pk_test_51OTjURBQWp069pqTmqhKZHNNd3kMf9TTynJtLJQIJDOSYcGM7xz3DabzCzE7bTxvuYMY0IX96OHBjsysHEKIrwCK006Mu7mKw8');

interface Booking {
  _id: string;
  
}

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();

  const [booking, setBooking] = useState<Booking | null>(null);

  useEffect(() => {
    if (location?.state && '_id' in location.state) {
      setBooking(location.state as Booking);
    }
  }, [location]);

  const cancel = () => {
    navigate('/');
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
         <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '40px',
          position: 'relative'
        }}>
          {/* Step 1 */}
          <Box sx={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: '#1ABC9C',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF',
            position: 'relative',
            zIndex: 2
          }}>
            <CheckIcon sx={{ fontSize: '20px' }} />
          </Box>
          
          {/* Line 1 */}
          <Box sx={{
            width: '80px',
            height: '2px',
            backgroundColor: '#E5E5E5',
            position: 'relative'
          }} />
          
          {/* Step 2 */}
      <Box sx={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: '#1ABC9C',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF',
            position: 'relative',
            zIndex: 2
          }}>
            <CheckIcon sx={{ fontSize: '20px' }} />
          </Box>
          
          {/* Line 2 */}
          <Box sx={{
            width: '80px',
            height: '2px',
            backgroundColor: '#E5E5E5',
            position: 'relative'
          }} />
          
          {/* Step 3 */}
          <Box sx={{
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
            position: 'relative',
            zIndex: 2
          }}>
            3
          </Box>
        </Box>

      <Box>
        {booking && (
          <Elements stripe={stripePromise}>
            <FormBooking booking={booking} />
          </Elements>
        )}
      </Box>

      <Button
        onClick={cancel}
        sx={{
          width: '300px', mt: '1rem', padding: '8px 28px',
          borderRadius: '4px', boxShadow: "0px 8px 15px 0px #ccc"
        }}
      >
        Cancel
      </Button>
    </Box>
  );
}