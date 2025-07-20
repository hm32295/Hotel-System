import { Box, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CheckIcon from '@mui/icons-material/Check';
import bank1 from '../../../assets/images/image 4.svg';
import bank2 from '../../../assets/images/image 5.svg';
import { axiosInstance, BOOKING_URL } from '../../../services/Url';

const Index = () => {
  const location = useLocation();
  const [room, setRoom] = useState<any>({});
  const [loading, setLoading] = useState(true); // إضافة state لـ loading
  const navigation = useNavigate();

  const bookingRoom = async (room: any) => {
    if (!room) return;

    try {
      const response = await axiosInstance.post(BOOKING_URL.CREATE, room);
      const booking = response.data.data.booking;
      navigation('/masterUser/payment', { state: booking });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setLoading(true); // بدء الـ loading
    if (location?.state) {
      const roomData: any = location.state;
      // التحقق من القيم قبل الحساب
      if (
        roomData &&
        typeof roomData.price === 'number' &&
        typeof roomData.capacity === 'number' &&
        typeof roomData.discount === 'number'
      ) {
        const data = {
          startDate: roomData.createdAt,
          endDate: roomData.updatedAt,
          room: roomData._id,
          totalPrice: Math.round(
            roomData.price * roomData.capacity -
              (roomData.capacity * roomData.price * roomData.discount) / 100
          ),
        };
        setRoom(data);
      } else {
        console.error('البيانات في location.state غير صالحة أو ناقصة');
        setRoom({
          startDate: '2024-01-01',
          endDate: '2024-01-02',
          room: 'room123',
          totalPrice: 500,
        });
      }
    } else {
      setRoom({
        startDate: '2024-01-01',
        endDate: '2024-01-02',
        room: 'room123',
        totalPrice: 500,
      });
    }
    setLoading(false); // إنهاء الـ loading
  }, []);

  const cancel = () => {
    if (location?.state) {
      navigation('/MasterUser/Details', { state: location.state });
    } else {
      navigation('/');
    }
  };

  if (loading) return null; // انتظار الـ loading بدل الاعتماد على room.totalPrice بس

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#FAFBFC',
        padding: { xs: '20px', md: '40px' },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* Container */}
      <Box
        sx={{
          maxWidth: '800px',
          width: '100%',
          backgroundColor: '#FFFFFF',
          borderRadius: '15px',
          padding: { xs: '30px 20px', md: '50px 40px' },
          boxShadow: '0px 10px 40px rgba(0, 0, 0, 0.05)',
        }}
      >
        {/* Steps Progress */}
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
              backgroundColor: '#E5E5E5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#898989',
              fontSize: '16px',
              fontWeight: '500',
            }}
          >
            2
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

        {/* Title */}
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

        {/* Payment Content */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: { xs: '30px', md: '60px' },
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Left Side - Payment Details */}
          <Box
            sx={{
              width: '100%',
              maxWidth: '400px',
              margin: '0 auto',
              textAlign: 'center',
            }}
          >
            <Box
              component="h2"
              sx={{
                fontSize: '20px',
                fontWeight: '600',
                color: '#152C5B',
                margin: 0,
                marginBottom: '24px',
              }}
            >
          
            </Box>

            {/* Price Details */}
            <Box sx={{ marginBottom: '32px' }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '8px',
                  fontSize: '16px',
                  color: '#152C5B',
                }}
              >
                <span>Tax:</span>
                <span style={{ fontWeight: '500' }}>10%</span>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '8px',
                  fontSize: '16px',
                  color: '#152C5B',
                }}
              >
                <span>Sub total:</span>
                <span style={{ fontWeight: '500' }}>${room.totalPrice} USD</span>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '16px',
                  color: '#152C5B',
                  paddingTop: '8px',
                  borderTop: '1px solid #E5E5E5',
                }}
              >
                <span style={{ fontWeight: '600' }}>Total:</span>
                <span style={{ fontWeight: '600', fontSize: '18px' }}>
                  ${room.totalPrice + 0.1 * room.totalPrice} USD
                </span>
              </Box>
            </Box>

            {/* Bank Details */}
            <Box>
              {/* Bank Mandiri */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '16px',
                  marginBottom: '24px',
                  padding: '16px',
                  backgroundColor: '#F8F9FA',
                  borderRadius: '8px',
                  border: '1px solid #E5E5E5',
                }}
              >
                <Box
                  component="img"
                  src={bank1}
                  alt="Bank Mandiri"
                  sx={{
                    width: '60px',
                    height: '40px',
                    objectFit: 'contain',
                  }}
                />
                <Box>
                  <Box
                    sx={{
                      fontSize: '16px',
                      fontWeight: '600',
                      color: '#152C5B',
                      marginBottom: '4px',
                    }}
                  >
                    Bank Mandiri
                  </Box>
                  <Box
                    sx={{
                      fontSize: '14px',
                      color: '#7C8DB0',
                      marginBottom: '2px',
                    }}
                  >
                    2208 1996
                  </Box>
                  <Box
                    sx={{
                      fontSize: '14px',
                      color: '#7C8DB0',
                    }}
                  >
                    BuildWith Angga
                  </Box>
                </Box>
              </Box>

              {/* Bank Central Asia */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '16px',
                  padding: '16px',
                  backgroundColor: '#F8F9FA',
                  borderRadius: '8px',
                  border: '1px solid #E5E5E5',
                }}
              >
                <Box
                  component="img"
                  src={bank2}
                  alt="Bank Central Asia"
                  sx={{
                    width: '60px',
                    height: '40px',
                    objectFit: 'contain',
                  }}
                />
                <Box>
                  <Box
                    sx={{
                      fontSize: '16px',
                      fontWeight: '600',
                      color: '#152C5B',
                      marginBottom: '4px',
                    }}
                  >
                    Bank Central Asia
                  </Box>
                  <Box
                    sx={{
                      fontSize: '14px',
                      color: '#7C8DB0',
                      marginBottom: '2px',
                    }}
                  >
                    2208 1996
                  </Box>
                  <Box
                    sx={{
                      fontSize: '14px',
                      color: '#7C8DB0',
                    }}
                  >
                    BuildWith Angga
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Right Side - Upload Section (can be added later if needed) */}
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            {/* This space can be used for upload proof section if needed */}
          </Box>
        </Box>

        {/* Action Buttons */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: '16px',
            justifyContent: 'center',
            marginTop: '40px',
          }}
        >
          <Button
            onClick={() => {
              bookingRoom(room);
            }}
            sx={{
              width: { xs: '100%', sm: '200px' },
              backgroundColor: 'rgba(21, 44, 91, 1)',
              color: '#FFFFFF',
              padding: '14px 28px',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '500',
              textTransform: 'none',
              boxShadow: '0px 8px 15px rgba(50, 82, 223, 0.3)',
              '&:hover': {
                backgroundColor: 'rgba(21, 44, 91, 1)',
                boxShadow: '0px 12px 20px rgba(50, 82, 223, 0.4)',
              },
            }}
          >
            Booking Now
          </Button>
          <Button
            onClick={() => cancel()}
            sx={{
              width: { xs: '100%', sm: '200px' },
              backgroundColor: '#FFFFFF',
              color: '#152C5B',
              padding: '14px 28px',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '500',
              textTransform: 'none',
              border: '1px solid #E5E5E5',
              boxShadow: '0px 8px 15px rgba(204, 204, 204, 0.3)',
              '&:hover': {
                backgroundColor: '#F8F9FA',
                boxShadow: '0px 12px 20px rgba(204, 204, 204, 0.4)',
              },
            }}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Index;