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
  // أضف أي خصائص أخرى حسب الحاجة
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
      <Box sx={{ mb: '2rem', display: 'flex', gap: '1rem', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
        <Box component={'span'} sx={{ background: '#1ABC9C', borderRadius: '50%', height: '30px', width: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <CheckIcon />
        </Box>
        <Box component={'span'} sx={{ background: '#1ABC9C', borderRadius: '50%', height: '30px', width: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <CheckIcon />
        </Box>
        <Box component={'span'} sx={{
          background: '#E5E5E5', borderRadius: '50%', height: '30px', width: '30px',
          display: 'flex', justifyContent: 'center', color: '#898989', alignItems: 'center',
          border: '1px solid #E5E5E5'
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