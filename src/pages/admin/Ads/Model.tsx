
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import EditNoteIcon from '@mui/icons-material/EditNote';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import type { SelectChangeEvent } from '@mui/material/Select';
import { Box, TextField } from '@mui/material';
import { ADS_URL, axiosInstance, ROOMS_URL } from '../../../services/Url';
import { useForm } from 'react-hook-form';
import Progress from '../../../component_Admin/loader/Progress';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const activeName = [
  { name: 'Active', value: true, id: 11 },
  { name: 'No Active', value: false, id: 58 },
];

export default function Model({ getAds, icon, row }: { row: any, getAds: any, icon: boolean }) {
  const [open, setOpen] = useState(false);
  const { handleSubmit, register, formState: { errors }, reset } = useForm();
  const [dataRooms, setDataRooms] = useState<string[]>([]);
  const [rooms, setRooms] = useState<string>('');
  const [active, setActive] = useState<string>('false');
  const [loader , setLoader] = useState(false)
  const getRooms = async (page: number, size: number) => {
    try {
      const response = await axiosInstance(ROOMS_URL.GET, { params: { page, size } });
      setDataRooms(response.data.data.rooms);
    } catch (error:any) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRooms(1, 500);
  }, []);

  useEffect(() => {
    if (open && icon && row && dataRooms.length > 0) {
      const matchedRoom = dataRooms.find((room: any) => {
        return room.roomNumber === row.name || room._id === row.room?._id || room._id === row.room;
      });
  
      reset({
        discount: row.Discount,
        isActive: row.Active === 'Active' ? 'true' : 'false',
        room: matchedRoom ? matchedRoom._id : '',
      });
  
      setRooms(matchedRoom ? matchedRoom._id : '');
      setActive(row.Active === 'Active' ? 'true' : 'false');
    }
  }, [open, row, dataRooms]);
  
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeRooms = (event: SelectChangeEvent<typeof rooms>) => {
    setRooms(event.target.value);
  };

  const handleChangeActive = (event: SelectChangeEvent<typeof active>) => {
    setActive(event.target.value);
  };

  const setData = async (data: any) => {
  
    setLoader(true)
    try {
      const preparedData = {
        ...data,
        isActive: data.isActive === 'true',
      };
      
      let response
      if(icon && row){
        
        response =  await axiosInstance.put(ADS_URL.UPDATE(row.id),{
          discount:preparedData.discount,
          isActive:preparedData.isActive
        })
      }else{
        response = await axiosInstance.post(ADS_URL.CREATE, preparedData);
      }
      toast.success(response?.data?.data?.message || 'Ads created successfully');
      reset({
        room: '',
        discount: '',
        isActive:''
      })
      setActive('')
      setRooms('')
    } catch (error:any) {
      if(error.response){

        toast.error( error?.response?.data?.message || "sorry the discount not available ");
      }
    }finally{
      setLoader(false)
    }
    getAds();
  };


  return (
    <Box onClick={handleClickOpen}>
      
      {icon ? <EditNoteIcon sx={{display:'flex' , justifyContent:'center',alignItems:'center'}} /> : 'add new ads'}
      <BootstrapDialog
        onClick={e => e.stopPropagation()}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
         {icon? 'Edit Ads' : 'Add Ads'}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>

        <Box component="form" onSubmit={handleSubmit(setData)}>
          <DialogContent
            dividers
            sx={{
              display: 'flex',
              flexDirection: 'column',
              minWidth: '300px',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
              padding: '2rem 0',
            }}
          >
            {/* Rooms Select */}
            <FormControl sx={{ width: '100%' }}>
              <InputLabel id="rooms-label">Rooms</InputLabel>
              
              <Select
                labelId="rooms-label"
                id="rooms-select"
                {...register('room', { required: 'Required' })}
                value={rooms}
                onChange={handleChangeRooms}
                input={<OutlinedInput label="Rooms" />}
                MenuProps={MenuProps}
              >
                {/* {icon&&(
                  <MenuItem value={row.id}>{row.name}</MenuItem>
                )} */}
                {dataRooms.map((room: any) => (
                  <MenuItem key={room._id} value={room._id}>
                    {room.roomNumber}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Discount Input */}
            <TextField
              id="outlined-basic"
              {...register('discount', { required: 'Required' })}
              sx={{ width: '100%' }}
              label="Discount"
              variant="outlined"
            />

            {/* Active Select */}
            <FormControl sx={{ width: '100%' }}>
              <InputLabel id="active-label">Active</InputLabel>
              <Select
                labelId="active-label"
                id="active-select"
                {...register('isActive', { required: 'Required' })}
                value={active}
                onChange={handleChangeActive}
                input={<OutlinedInput label="Active" />}
                MenuProps={MenuProps}
              >
                {activeName.map((ele) => (
                  <MenuItem key={ele.id} value={String(ele.value)}>
                    {ele.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </DialogContent>

          <DialogActions>
            <Button
              type="submit"
              disabled={loader}
              autoFocus
              onClick={handleClose}
              sx={{ color: '#fff', background: '#3252DF' }}
            >
              {loader ? <Progress />:
              (
                icon&& row ? "edit" : 'save'

              )}
            </Button>
          </DialogActions>
        </Box>
      </BootstrapDialog>
    </Box>
  );
}
