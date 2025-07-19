import { Box, Button } from '@mui/material';
import { axiosInstance, BOOKING_URL } from '../../../services/Url';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CheckIcon from '@mui/icons-material/Check';
import bank1 from '../../../assets/images/bank1.png';
import bank2 from '../../../assets/images/bank2.png';

interface RoomType {
  _id: string;
  price: number;
  capacity: number;
  discount: number;
  createdAt: string;
  updatedAt: string;
}

interface BookingPayload {
  startDate: string;
  endDate: string;
  room: string;
  totalPrice: number;
}

export default function Booking() {
  const location = useLocation();
  const navigate = useNavigate();

  const [roomData, setRoomData] = useState<BookingPayload | null>(null);

  const bookingRoom = async (room: BookingPayload) => {
    if (!room) return;

    try {
      const response = await axiosInstance.post(BOOKING_URL.CREATE, room);
      const booking = response.data.data.booking;
      navigate('/masterUser/payment', { state: booking });
    } catch (error: any) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (location?.state) {
      const room = location.state as RoomType;
      const totalPrice = Math.round(
        room.price * room.capacity - (room.capacity * room.price * room.discount) / 100
      );

      const data: BookingPayload = {
        startDate: room.createdAt,
        endDate: room.updatedAt,
        room: room._id,
        totalPrice,
      };
      setRoomData(data);
    }
  }, [location?.state]);

  const handleCancel = () => {
    if (location?.state) {
      navigate('/MasterUser/Details', { state: location?.state });
    } else {
      navigate('/');
    }
  };

  if (!roomData) return null;

  const totalWithTax = roomData.totalPrice + 0.1 * roomData.totalPrice;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box sx={{ display: 'flex', gap: '1rem', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
        <Box
          component={'span'}
          sx={{
            background: '#1ABC9C',
            borderRadius: '50%',
            height: '30px',
            width: '30px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CheckIcon />
        </Box>
        <Box
          component={'span'}
          sx={{
            background: '#E5E5E5',
            borderRadius: '50%',
            height: '30px',
            width: '30px',
            display: 'flex',
            justifyContent: 'center',
            color: '#898989',
            alignItems: 'center',
            border: '1px solid #E5E5E5',
          }}
        >
          2
        </Box>
        <Box
          component={'span'}
          sx={{
            background: '#E5E5E5',
            borderRadius: '50%',
            height: '30px',
            width: '30px',
            display: 'flex',
            justifyContent: 'center',
            color: '#898989',
            alignItems: 'center',
            border: '1px solid #E5E5E5',
          }}
        >
          3
        </Box>
      </Box>

      <Box component={'h2'} sx={{ color: '#152C5B', fontSize: '2rem' }}>
        Payment
      </Box>
      <Box component={'p'} sx={{ color: '#B0B0B0', fontSize: '18px' }}>
        Kindly follow the instructions below
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
        <Box sx={{ color: '#152C5B', fontSize: '1rem' }}>
          <Box component={'h2'} sx={{ mb: '1rem' }}>
            Transfer Pembayaran:
          </Box>
          <Box component={'p'}>
            Tax:{' '}
            <Box component={'span'} sx={{ fontWeight: '500' }}>
              10%
            </Box>
          </Box>
          <Box component={'p'}>
            Sub total:{' '}
            <Box component={'span'} sx={{ fontWeight: '500' }}>
              ${roomData.totalPrice} USD
            </Box>
          </Box>
          <Box component={'p'}>
            Total:{' '}
            <Box component={'span'} sx={{ fontWeight: '500' }}>
              ${totalWithTax.toFixed(2)} USD
            </Box>
          </Box>

          <Box sx={{ color: '#152C5B', display: 'flex', justifyContent: 'flex-start', gap: '.5rem', alignItems: 'flex-start' }}>
            <Box component={'img'} sx={{ width: '60px' }} src={bank1} alt='Bank Mandiri' />
            <Box sx={{ paddingTop: '.5rem' }}>
              <Box>Bank Mandiri</Box>
              <Box>2208 1996</Box>
              <Box>BuildWith Angga</Box>
            </Box>
          </Box>

          <Box sx={{ mt: '1rem', color: '#152C5B', display: 'flex', justifyContent: 'flex-start', gap: '.5rem', alignItems: 'flex-start' }}>
            <Box component={'img'} sx={{ width: '60px' }} src={bank2} alt='Bank Central Asia' />
            <Box>
              <Box>Bank Central Asia</Box>
              <Box>2208 1996</Box>
              <Box>BuildWith Angga</Box>
            </Box>
          </Box>
        </Box>
        <Box></Box>
      </Box>

      <Button
        onClick={() => bookingRoom(roomData)}
        sx={{
          mt: '2rem',
          width: '200px',
          background: '#3252DF',
          padding: '8px 28px',
          color: '#fff',
          borderRadius: '4px',
          boxShadow: '0px 8px 15px 0px #3252DF4D',
        }}
      >
        Booking Now
      </Button>
      <Button
        onClick={handleCancel}
        sx={{
          width: '200px',
          padding: '8px 28px',
          borderRadius: '4px',
          boxShadow: '0px 8px 15px 0px #ccc',
        }}
      >
        Cancel
      </Button>
    </Box>
  );
}
