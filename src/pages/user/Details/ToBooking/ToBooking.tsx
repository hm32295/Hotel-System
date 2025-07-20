import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  IconButton,
  Collapse,
  TextField,
  Typography
} from '@mui/material';
import FreeCancellationIcon from '@mui/icons-material/FreeCancellation';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { format } from 'date-fns';
import Backdrop from '@mui/material/Backdrop';

import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


export default function ToBooking({ data, isLogged }) {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [capacity, setCapacity] = useState(1);
  const [openDates, setOpenDates] = useState(false);

  const increment = () => setCapacity(prev => prev + 1);
  const decrement = () => setCapacity(prev => Math.max(1, prev - 1));

  const formatDateRange = () => {
    if (startDate && endDate) {
      const from = format(new Date(startDate), 'dd MMM');
      const to = format(new Date(endDate), 'dd MMM');
      return `${from} - ${to}`;
    } else if (startDate) {
      return format(new Date(startDate), 'dd MMM yyyy');
    }
    return 'Select dates';
  };

  const handleExplore = () => {
    navigate('/MasterUser/Explore_USER', { state: { startDate, endDate, capacity } });
  };
// MODAL THINGS


  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box
      sx={{
        flex: 1,
        minWidth: 300,
        border: '1px solid #E5E7EB',
        borderRadius: '1rem',
       
        p: { xs: 4, lg: 2 },
        display: 'flex',
        flexDirection: 'column',
        gap: { xs: 2, lg: 2 },
        alignItems: 'center',
        bgcolor: 'background.paper'
      }}
    >
      <div>
    
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Text in a modal
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
      
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h6" sx={{ color: 'rgba(21,44,91,1)', fontWeight: 600, mb: 1 }}>
          Start Booking
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'baseline', mb: 1 }}>
          <Typography sx={{ color: '#1ABC9C', fontSize: 25, fontWeight: 600 }}>
            {data.price}$
          </Typography>
          <Typography sx={{ fontSize: 25, fontWeight: 600, color: '#B0B0B0', ml: 1 }}>
            per night
          </Typography>
        </Box>
        <Typography sx={{ color: '#FF1612', fontSize: 18, fontWeight: 500 }}>
          Discount {data.discount}% Off
        </Typography>
      </Box>

      
      <Box sx={{ width: { xs: '100%', lg: '50%' } }}>
        <Typography sx={{ mb: 1, fontWeight: 500, color: '#6B7280' }}>Pick a Date</Typography>
        <Button
          variant="contained"
          startIcon={<FreeCancellationIcon />}
          fullWidth
          sx={{
            bgcolor: 'rgba(21,44,91,1)',
            '&:hover': { bgcolor: 'rgba(21,44,91,0.8)' }
          }}
          onClick={() => setOpenDates(prev => !prev)}
        >
          {formatDateRange()}
        </Button>
        <Collapse in={openDates} sx={{ mt: 2, border: '1px solid #E5E7EB', borderRadius: 1, p: 2 }}>
          <TextField
            label="Start Date"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="End Date"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={endDate}
            onChange={e => setEndDate(e.target.value)}
          />
        </Collapse>
      </Box>

     
      <Box sx={{ width: { xs: '100%', lg: '50%' } }}>
        <Typography sx={{ mb: 1, fontWeight: 500, color: '#6B7280' }}>Capacity</Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            border: '1px solid #E5E7EB',
            borderRadius: 1,
            p: 1
          }}
        >
          <IconButton onClick={decrement} sx={{ bgcolor: 'rgba(231,76,60,1)', color: '#fff', '&:hover': { bgcolor: 'rgba(231,76,60,0.8)' } }}>
            <PersonRemoveIcon />
          </IconButton>
          <Typography sx={{ flexGrow: 1, textAlign: 'center', fontWeight: 600, color: '#000' }}>
            {capacity} {capacity !== 1 ? 'persons' : 'person'}
          </Typography>
          <IconButton onClick={increment} sx={{ bgcolor: 'rgba(26,188,156,1)', color: '#fff', '&:hover': { bgcolor: 'rgba(26,188,156,0.8)' } }}>
            <PersonAddAltIcon />
          </IconButton>
        </Box>
      </Box>

    
  

      {/* Summary */}
      <Box sx={{ display: 'flex', gap: 0.5, mt: 2 }}>
        <Typography sx={{ color: '#B0B0B0' }}>You will pay</Typography>
        <Typography sx={{ color: '#152C5B' ,fontWeight:'600'}}>
          ${data.price * capacity}USD
        </Typography>
        <Typography sx={{ color: '#B0B0B0' }}>per</Typography>
        <Typography sx={{ color: '#152C5B' }}>{capacity} Person</Typography>
      </Box>

     
     {/* HOOONE */}
        <Box sx={{ width: '100%', textAlign: 'center', mt: 2 }}>
           {isLogged || localStorage.getItem('token') ? (
          <Button
            onClick={() => navigate('/MasterUser/booking', { state: data })}
            variant="contained"
            sx={{
              bgcolor: 'rgba(21, 44, 91, 1)',
              fontSize: 17,
              p: '8px 20px',
              color: '#fff',
              boxShadow: '0 8px 15px rgba(50,82,223,0.3)',
              '&:hover': { bgcolor: '#274BB5' }
            }}
          >
            Continue Book
          </Button>
            ) :  
             <Button
          onClick={handleOpen}
            variant="contained"
            sx={{
              bgcolor: 'rgba(21, 44, 91, 1)',
              fontSize: 17,
              p: '8px 20px',
              color: '#fff',
              boxShadow: '0 8px 15px rgba(50,82,223,0.3)',
              '&:hover': { bgcolor: '#274BB5' }
            }}
          >
            Continue Book
          </Button>}
        </Box>
    
    </Box>
  );
}
