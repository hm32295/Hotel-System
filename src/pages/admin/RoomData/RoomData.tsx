import { useEffect, useState } from "react";
import { axiosInstance, FacilitesUrls, ROOMS_URL } from "../../../services/Url";
import { Box, TextField } from "@mui/material";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { useForm, Controller } from "react-hook-form";
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import type { Theme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import type { SelectChangeEvent } from '@mui/material/Select';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useLocation, useNavigate } from "react-router-dom";
import Progress from "../../../component_Admin/loader/Progress";
import { toast } from "react-toastify";

type FacilityType = { name: string; id: string };

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

function getStyles(name: string, personName: string[], theme: Theme) {
  return {
    fontWeight: personName.includes(name)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}

const RoomData = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const projectItem = location.state;

  const [facilities, setFacilities] = useState<FacilityType[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loader, setLoader] = useState(false);
  const [personName, setPersonName] = useState<string[]>([]);

  const { control, register, handleSubmit, reset, setValue, formState: { errors } } = useForm({
    defaultValues: {
      roomNumber: "",
      price: "",
      discount: "",
      capacity: "",
      facilities: [],
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance(FacilitesUrls.GET_ALL);
        const data = response.data.data;
        setFacilities(data.facilities.map((ele: any) => ({ name: ele.name, id: ele._id })));
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
    if (projectItem) {
      reset({
        roomNumber: projectItem.name || "",
        price: projectItem.price || "",
        discount: projectItem.discount || "",
        capacity: projectItem.capacity || "",
        facilities: projectItem.facilities?.map((f: any) => f._id) || [],
      });
      setPersonName(projectItem.facilities?.map((f: any) => f._id) || []);
    }
  }, [projectItem, reset]);

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    setPersonName(typeof value === 'string' ? value.split(',') : value);
    setValue('facilities', typeof value === 'string' ? value.split(',') : value);
  };

  const handelDataToForm = (data: any) => {
    const form = new FormData();
    form.append('roomNumber', data.roomNumber);
    form.append('price', data.price);
    form.append('discount', data.discount);
    form.append('capacity', data.capacity);
    data.facilities.forEach((id: string) => {
      form.append('facilities', id);
    });
    if (selectedFile) form.append('imgs', selectedFile);
    return form;
  };

  const setRoom = async (data: any) => {
    setLoader(true);
    const finalForm = handelDataToForm(data);
    try {
      const response = projectItem
        ? await axiosInstance.put(ROOMS_URL.UPDATE(projectItem.id), finalForm)
        : await axiosInstance.post(ROOMS_URL.CREATE, finalForm);
      toast.success(response?.data?.data?.message || "Room saved successfully");
      reset();
      setPersonName([]);
      navigate('/MasterAdmin/rooms');
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Error occurred");
    } finally {
      setLoader(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(setRoom)} sx={{ p: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField label="Room Number" {...register("roomNumber", { required: "Room number is required" })} />
      {errors.roomNumber && <Box sx={{ color: 'red' }}>{errors.roomNumber.message}</Box>}

      <Box sx={{ display: 'flex', gap: 2 }}>
        <TextField fullWidth label="Price" {...register("price", { required: "Price is required" })} />
        <TextField fullWidth label="Capacity" {...register("capacity", { required: "Capacity is required" })} />
      </Box>
      {errors.price && <Box sx={{ color: 'red' }}>{errors.price.message}</Box>}
      {errors.capacity && <Box sx={{ color: 'red' }}>{errors.capacity.message}</Box>}

      <Box sx={{ display: 'flex', gap: 2 }}>
        <TextField fullWidth label="Discount" {...register("discount", { required: "Discount is required" })} />
        <FormControl fullWidth>
          <InputLabel>Facilities</InputLabel>
          <Select
            multiple
            value={personName}
            onChange={handleChange}
            input={<OutlinedInput label="Facilities" />}
            MenuProps={MenuProps}
          >
            {facilities.map((item) => (
              <MenuItem key={item.id} value={item.id} style={getStyles(item.name, personName, theme)}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      {errors.facilities && <Box sx={{ color: 'red' }}>{errors.facilities.message}</Box>}

      <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
        Upload File
        <VisuallyHiddenInput
          type="file"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              setSelectedFile(e.target.files[0]);
            }
          }}
        />
      </Button>

      <Button type="submit" variant="contained" disabled={loader} sx={{ bgcolor: '#3252DF', color: '#fff' }}>
        {loader ? <Progress /> : projectItem ? "Edit" : "Save"}
      </Button>
      <Button onClick={() => navigate('/MasterAdmin/rooms')} variant="outlined" sx={{ color: "#3252DF" }}>
        Cancel
      </Button>
    </Box>
  );
};

export default RoomData;
