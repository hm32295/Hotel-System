import { useEffect, useState } from "react";
import { axiosInstance, FacilitesUrls, ROOMS_URL } from "../../../services/Url";
import { Box, TextField } from "@mui/material";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { useForm } from "react-hook-form";
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import type { Theme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import  type { SelectChangeEvent } from '@mui/material/Select';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useLocation, useNavigate } from "react-router-dom";
import Progress from "../../../component_Admin/loader/Progress";
import { toast } from "react-toastify";

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
function getStyles(name: string, personName: string[], theme: Theme) {
    return {
      fontWeight: personName.includes(name)
        ? theme.typography.fontWeightMedium
        : theme.typography.fontWeightRegular,
    };
  }
  

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



const RoomData = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const [personName, setPersonName] = useState<string[]>([]);
    const [facilities, setFacilities] = useState([]);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const[loader ,setLoader] =useState(false)
    const { register, handleSubmit ,reset,formState: { errors },} = useForm();
    const location = useLocation();
    const projectItem = location.state;
    
    const dataToEdit = (projectItem, reset)=>{
      
      if(projectItem){
        reset({
          roomNumber:projectItem.name,
          capacity:projectItem.capacity,
          discount:projectItem.discount,
          price:projectItem.price,
        })
      }
    }

  
    const handleChange = (event: SelectChangeEvent<typeof personName>) => {
      const {
        target: { value },
      } = event;
      setPersonName(typeof value === 'string' ? value.split(',') : value);
    };
  
    const getFacilities = async () => {
      try {
        const response = await axiosInstance(FacilitesUrls.GET_ALL);
        const data = response.data.data;
        setFacilities(data.facilities.map((ele) => ({ name: ele.name, id: ele._id })));
      } catch (error:any) {
        console.log(error);
      }
    };
  
    useEffect(() => {
      getFacilities();
      dataToEdit(projectItem, reset)
    }, []);
  
    const handelDataToForm = (data: any) => {
      const registerForm = new FormData();
      registerForm.append('capacity', data.capacity);
      registerForm.append('discount', data.discount);
      registerForm.append('price', data.price);
      registerForm.append('roomNumber', data.roomNumber);
      personName.forEach((id) => {
        registerForm.append('facilities', id);
      });
  
      if (selectedFile) {
        registerForm.append('imgs', selectedFile);
      }
  
      return registerForm;
    };
  
    const setRoom = async (data: any) => {
      const handelData = handelDataToForm(data);
      setLoader(true)
      try {
        let response;
        if(projectItem){
          
          response = await axiosInstance.put(ROOMS_URL.UPDATE(projectItem.id), handelData);
        }else{
          response = await axiosInstance.post(ROOMS_URL.CREATE, handelData);
        }
        toast.success(response?.data?.data?.message || 'Room created successfully');
        
        reset();
        setPersonName([])
        navigate('/MasterAdmin/rooms')
      } catch (error:any) {
        if(error.response){

          toast.error(error?.response?.data?.message || 'price must be a number')
        }
      }finally{
        setLoader(false)
      }
    };
  
    return (
      <Box sx={{padding:'2rem', flexDirection: 'row-reverse', display: 'flex', flexWrap: 'wrap', gap: '1rem' }} component={'form'} onSubmit={handleSubmit(setRoom)}>
        <TextField sx={{ width: '100%' }} label="Room Number" {...register("roomNumber", { required: 'required' })} />
        {errors.roomNumber&&<Box sx={{color:'red',textTransform:'capitalize',width:'100%'}}>{errors?.roomNumber?.message}</Box>}
        <Box sx={{ gap: '1rem', width: '100%', display: 'flex' }}>
            <Box sx={{ flex:'1'}}>
                <TextField sx={{width: '100%'}} label="price" {...register("price", { required: 'required' })} />
                {errors.price&&<Box sx={{color:'red',textTransform:'capitalize'}}>{errors?.price?.message}</Box>}
            </Box>
            <Box sx={{ flex: '1' }}>
                <TextField sx={{width: '100%'}} label="capacity" {...register("capacity", { required: 'required' })} />
                {errors.capacity&&<Box sx={{color:'red',textTransform:'capitalize'}}>{errors?.capacity?.message}</Box>}
            </Box>
        </Box>
        <Box sx={{ gap: '1rem', width: '100%', display: 'flex' }}>
          <TextField sx={{ flex: '1' }} label="discount" {...register("discount", { required: 'required' })} />
          {errors.discount&&<Box sx={{color:'red',textTransform:'capitalize'}}>{errors?.discount?.message}</Box>}
          <FormControl sx={{ width: 300, flex: '1' }}>
            <InputLabel id="demo-multiple-name-label">facilities</InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              multiple
              {...register('facilities',{required: 'required'})}
              value={personName}
              onChange={handleChange}
              input={<OutlinedInput label="facilities" />}
              MenuProps={MenuProps}
            >
              {facilities.map((item) => (
                <MenuItem key={item.id} value={item.id} style={getStyles(item.name, personName, theme)}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {errors.facilities&&<Box sx={{color:'red',textTransform:'capitalize'}}>{errors?.facilities?.message}</Box>}
        </Box>
        <Button sx={{ width: '100%' }} component="label" role={undefined} variant="contained" tabIndex={-1} startIcon={<CloudUploadIcon />}>
          Upload files
          <VisuallyHiddenInput
            type="file"
            onChange={(event) => {
              if (event.target.files && event.target.files[0]) {
                setSelectedFile(event.target.files[0]);
              }
            }}
          />
        </Button>
        <Button disabled={loader} type='submit' sx={{ background: "#3252DF", color: "#fff" }} variant="contained">
           {loader ? <Progress />:(
              projectItem? "Edit" :'Save'
           )}
        </Button>
        <Button onClick={() => navigate('/MasterAdmin/rooms')} sx={{ background: "#fff", color: "#3252DF" }} variant="contained">Cancel</Button>
      </Box>
    );
  };
  
  export default RoomData;
  