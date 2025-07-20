import { useEffect, useState } from "react";
import { axiosInstance, FacilitesUrls, ROOMS_URL } from "../../../services/Url";
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  OutlinedInput,
  Button,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useTheme } from "@mui/material/styles";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Progress from "../../../component_Admin/loader/Progress";
import type { SelectChangeEvent } from "@mui/material/Select";

// Hidden input for file upload
const VisuallyHiddenInput = (props: any) => (
  <input
    style={{
      clip: "rect(0 0 0 0)",
      clipPath: "inset(50%)",
      height: 1,
      overflow: "hidden",
      position: "absolute",
      bottom: 0,
      left: 0,
      whiteSpace: "nowrap",
      width: 1,
    }}
    {...props}
  />
);

// Styles for multiple select
const getStyles = (name: string, selected: string[], theme: any) => ({
  fontWeight:
    selected.indexOf(name) === -1
      ? theme.typography.fontWeightRegular
      : theme.typography.fontWeightMedium,
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

// ----------- Types -----------
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

// ----------- Component -----------
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

  // Get all facilities and prefill form if editing
  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        const res = await axiosInstance(FacilitesUrls.GET_ALL);
        const data = res.data.data?.facilities || [];
        const formatted = data.map((f: any): FacilityType => ({
          id: f._id,
          name: f.name,
        }));
        setFacilities(formatted);
      } catch (err) {
        console.error("Error fetching facilities", err);
      }
    };

    fetchFacilities();

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

  // Handle facilities change
  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const value = typeof event.target.value === "string"
      ? event.target.value.split(",")
      : event.target.value;
    setPersonName(value);
    setValue("facilities", value);
  };

  // Create FormData
  const prepareFormData = (data: RoomFormInputs): FormData => {
    const form = new FormData();
    form.append("roomNumber", data.roomNumber);
    form.append("price", data.price);
    form.append("discount", data.discount);
    form.append("capacity", data.capacity);
    data.facilities.forEach((id) => form.append("facilities", id));
    if (selectedFile) form.append("imgs", selectedFile);
    return form;
  };

  // Submit data
  const onSubmit = async (data: RoomFormInputs) => {
    setLoader(true);
    const formData = prepareFormData(data);
    try {
      const res = projectItem
        ? await axiosInstance.put(ROOMS_URL.UPDATE(projectItem.id), formData)
        : await axiosInstance.post(ROOMS_URL.CREATE, formData);
      toast.success(res?.data?.data?.message || "Room saved successfully");
      reset();
      setPersonName([]);
      navigate("/MasterAdmin/rooms");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoader(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ p: 4, display: "flex", flexDirection: "column", gap: 2 }}
    >
      {/* Room Number */}
      <TextField
        label="Room Number"
        {...register("roomNumber", { required: "Room number is required" })}
      />
      {errors.roomNumber && <Box sx={{ color: "red" }}>{errors.roomNumber.message}</Box>}

      {/* Price & Capacity */}
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

      {/* Discount & Facilities */}
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
            {facilities.map((f) => (
              <MenuItem
                key={f.id}
                value={f.id}
                style={getStyles(f.name, personName, theme)}
              >
                {f.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      {errors.facilities && <Box sx={{ color: "red" }}>{errors.facilities.message}</Box>}

      {/* Upload */}
      <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
        Upload File
        <VisuallyHiddenInput
          type="file"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) setSelectedFile(file);
          }}
        />
      </Button>

      {/* Submit & Cancel */}
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
