import { useEffect, useState } from "react";
import { axiosInstance, FacilitesUrls, ROOMS_URL } from "../../../services/Url";
import { Box, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import type { SelectChangeEvent } from '@mui/material/Select';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useLocation, useNavigate } from "react-router-dom";
import Progress from "../../../component_Admin/loader/Progress";
import { toast } from "react-toastify";


interface FacilityType {
  name: string;
  id: string;
}

interface RoomFormInputs {
  roomNumber: string;
  price: string;
  discount: string;
  capacity: string;
  facilities: string[];
}

interface ProjectItemType {
  id: string;
  name: string;
  price: string;
  discount: string;
  capacity: string;
  facilities: { _id: string; name: string }[];
}

const RoomData = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const projectItem = location.state as ProjectItemType | null;

  const [facilities, setFacilities] = useState<FacilityType[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loader, setLoader] = useState(false);
  const [personName, setPersonName] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<RoomFormInputs>({
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
        const formattedFacilities = data.facilities.map((ele: any): FacilityType => ({
          name: ele.name,
          id: ele._id,
        }));
        setFacilities(formattedFacilities);
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
        facilities: projectItem.facilities?.map((f) => f._id) || [],
      });
      setPersonName(projectItem.facilities?.map((f) => f._id) || []);
    }
  }, [projectItem, reset]);

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    const newValue = typeof value === "string" ? value.split(",") : value;
    setPersonName(newValue);
    setValue("facilities", newValue);
  };

  const handelDataToForm = (data: RoomFormInputs): FormData => {
    const form = new FormData();
    form.append("roomNumber", data.roomNumber);
    form.append("price", data.price);
    form.append("discount", data.discount);
    form.append("capacity", data.capacity);
    data.facilities.forEach((id) => {
      form.append("facilities", id);
    });
    if (selectedFile) form.append("imgs", selectedFile);
    return form;
  };

  const setRoom = async (data: RoomFormInputs) => {
    setLoader(true);
    const finalForm = handelDataToForm(data);
    try {
      const response = projectItem
        ? await axiosInstance.put(ROOMS_URL.UPDATE(projectItem.id), finalForm)
        : await axiosInstance.post(ROOMS_URL.CREATE, finalForm);
      toast.success(response?.data?.data?.message || "Room saved successfully");
      reset();
      setPersonName([]);
      navigate("/MasterAdmin/rooms");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Error occurred");
    } finally {
      setLoader(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(setRoom)}
      sx={{ p: 4, display: "flex", flexDirection: "column", gap: 2 }}
    >
      <TextField
        label="Room Number"
        {...register("roomNumber", { required: "Room number is required" })}
      />
      {errors.roomNumber && <Box sx={{ color: "red" }}>{errors.roomNumber.message}</Box>}

      <Box sx={{ display: "flex", gap: 2 }}>
        <TextField
          fullWidth
          label="Price"
          {...register("price", { required: "Price is required" })}
        />
        <TextField
          fullWidth
          label="Capacity"
          {...register("capacity", { required: "Capacity is required" })}
        />
      </Box>
      {errors.price && <Box sx={{ color: "red" }}>{errors.price.message}</Box>}
      {errors.capacity && <Box sx={{ color: "red" }}>{errors.capacity.message}</Box>}

      <Box sx={{ display: "flex", gap: 2 }}>
        <TextField
          fullWidth
          label="Discount"
          {...register("discount", { required: "Discount is required" })}
        />
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
              <MenuItem
                key={item.id}
                value={item.id}
                style={getStyles(item.name, personName, theme)}
              >
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      {errors.facilities && <Box sx={{ color: "red" }}>{errors.facilities.message}</Box>}

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

      <Button
        type="submit"
        variant="contained"
        disabled={loader}
        sx={{ bgcolor: "#3252DF", color: "#fff" }}
      >
        {loader ? <Progress /> : projectItem ? "Edit" : "Save"}
      </Button>
      <Button
        onClick={() => navigate("/MasterAdmin/rooms")}
        variant="outlined"
        sx={{ color: "#3252DF" }}
      >
        Cancel
      </Button>
    </Box>
  );
};

export default RoomData;
