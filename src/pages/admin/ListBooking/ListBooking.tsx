import React, { useEffect, useState } from 'react';
import GenericTable from '../../../component_Admin/GenericTable/GenericTable';
import type { HeadCell } from '../../../component_Admin/GenericTable/GenericTable';
import { axiosInstance } from '../../../services/Url';
import { listBooking } from '../../../services/Url';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Paper,
  Divider,
  IconButton,
  Skeleton,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CloseIcon from '@mui/icons-material/Close';

interface Booking {
  id: string;
  roomNumber: string;
  totalPrice: number;
  startDate: string;
  endDate: string;
  userName: string;
}

const headCells: HeadCell<Booking>[] = [
  { id: 'roomNumber', label: 'Room Number', numeric: false, disablePadding: false },
  { id: 'totalPrice', label: 'Price', numeric: true, disablePadding: false },
  { id: 'startDate', label: 'Start Date', numeric: false, disablePadding: false },
  { id: 'endDate', label: 'End Date', numeric: false, disablePadding: false },
  { id: 'userName', label: 'User', numeric: false, disablePadding: false },
];

export default function ListBooking() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [openView, setOpenView] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);

  const [totalBooking, setTotalBooking] = useState(0);
const getData = async ()=>{
        try {
          const response = await axiosInstance(listBooking.LIST_BOOKING);
          const totalData = response?.data?.data?.totalCount;
            fetchBookings(1,totalData)
        } catch (error:any) {
          console.log(error);
          
        }
      }
      const fetchBookings = async (page:number,size:number) => {
        try {
          setLoading(true);
          const { data } = await axiosInstance.get(listBooking.LIST_BOOKING,{params:{page,size}});
          setTotalBooking(data.data.totalCount)
          
          const formattedData: Booking[] = data?.data?.booking?.map((item: any) => ({
            id: item._id,
            roomNumber: item.room?.roomNumber?.toString() || 'N/A',
            totalPrice: item.totalPrice,
            startDate: new Date(item.startDate).toLocaleDateString(),
            endDate: new Date(item.endDate).toLocaleDateString(),
            userName: item.user?.userName || 'N/A',
          })) || [];
  
          setBookings(formattedData);
        } catch (error:any) {
          console.error('Error fetching bookings:', error);
        } finally {
          setLoading(false);
        }
      };
  useEffect(() => {

    getData();
  }, []);

  const handleOpenView = (row: Booking) => {
    setSelectedBooking(row);
    setOpenView(true);
  };

  const handleCloseView = () => {
    setOpenView(false);
    setSelectedBooking(null);
  };

  // Loading component using your existing Skeleton_Loader
  const LoadingComponent = () => (
    <Box
      sx={{
        minHeight: '400px',
        padding: '20px',
        borderRadius: '8px',
        border: '1px solid #e0e0e0',
 
      }}
    >
      <Typography
        variant="h6"
        sx={{
          color: '#666',
          fontWeight: 500,
          marginBottom: '16px',
          textAlign: 'center',
 
        }}
      >
        Loading Bookings...
      </Typography>
      <Skeleton />
 
    </Box>
  );

  if (loading) {
    return (
      <Box sx={{ padding: '20px' }}>
        <Typography variant="h5" sx={{ marginBottom: '20px', fontWeight: 600 }}>
          Bookings
        </Typography>
        <LoadingComponent />
      </Box>
    );
  }

  return (
    <>
      <GenericTable<Booking>
        title="Bookings"
        rows={bookings}
        totalData={totalBooking}
        headCells={headCells}
        renderActions={(row) => (
          <Button
            variant="contained"
            size="small"
            sx={{
              backgroundColor: '#666',
              borderRadius: '8px',
              padding: '8px 16px',
              margin: '4px',
              color: 'white',
              fontWeight: 600,
              textTransform: 'none',
              boxShadow: '0 2px 4px rgba(102, 102, 102, 0.3)',
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                backgroundColor: '#555',
                boxShadow: '0 4px 8px rgba(102, 102, 102, 0.4)',
                transform: 'translateY(-1px)',
              },
            }}
            startIcon={<VisibilityIcon sx={{ color: 'white', fontSize: '18px' }} />}
            onClick={() => handleOpenView(row)}
          >
            View
          </Button>
        )}
      />

      <Dialog 
        open={openView} 
        onClose={handleCloseView}
        maxWidth="md"
        fullWidth
        sx={{
          '& .MuiDialog-paper': {
            borderRadius: '12px',
            boxShadow: '0 24px 48px rgba(0,0,0,0.15)',
          },
        }}
      >
        <DialogTitle
          sx={{
            backgroundColor: '#f5f5f5',
            borderBottom: '1px solid #e0e0e0',
            padding: '20px 24px',
            marginBottom: '24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="h6" component="div" sx={{ fontWeight: 600, color: '#333' }}>
            Booking Details
          </Typography>
          <IconButton
            onClick={handleCloseView}
            sx={{
              color: '#666',
              '&:hover': { backgroundColor: '#e0e0e0' },
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        
        <DialogContent sx={{ padding: '24px' }}>
          {selectedBooking && (
            <Paper
              elevation={0}
              sx={{
                backgroundColor: '#fafafa',
                padding: '24px',
                borderRadius: '8px',
                border: '1px solid #e0e0e0',
              }}
            >
              <Box display="flex" flexDirection="column" gap={3}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="body1" sx={{ fontWeight: 600, color: '#555' }}>
                    Room Number:
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#333', fontWeight: 500 }}>
                    {selectedBooking.roomNumber}
                  </Typography>
                </Box>
                
                <Divider />
                
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="body1" sx={{ fontWeight: 600, color: '#555' }}>
                    Total Price:
                  </Typography>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      color: '#666', 
                      fontWeight: 600,
                      fontSize: '18px'
                    }}
                  >
                    ${selectedBooking.totalPrice.toLocaleString()}
                  </Typography>
                </Box>
                
                <Divider />
                
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="body1" sx={{ fontWeight: 600, color: '#555' }}>
                    Start Date:
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#333', fontWeight: 500 }}>
                    {selectedBooking.startDate}
                  </Typography>
                </Box>
                
                <Divider />
                
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="body1" sx={{ fontWeight: 600, color: '#555' }}>
                    End Date:
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#333', fontWeight: 500 }}>
                    {selectedBooking.endDate}
                  </Typography>
                </Box>
                
                <Divider />
                
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="body1" sx={{ fontWeight: 600, color: '#555' }}>
                    User Name:
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#333', fontWeight: 500 }}>
                    {selectedBooking.userName}
                  </Typography>
                </Box>
              </Box>
            </Paper>
          )}
        </DialogContent>
        
        <DialogActions sx={{ padding: '16px 24px', backgroundColor: '#f5f5f5' }}>
          <Button
            onClick={handleCloseView}
            variant="contained"
            sx={{
              backgroundColor: '#666',
              color: 'white',
              padding: '8px 24px',
              borderRadius: '8px',
              fontWeight: 600,
              textTransform: 'none',
              '&:hover': {
                backgroundColor: '#555',
              },
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}