import { useEffect, useState } from "react";
import {
  Box,
  Button,
  MenuItem,
  TextField,
  Typography,
  Select,
  FormControl,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { axiosInstance, FacilitesUrls, ROOMS_URL } from "../../../services/Url";
import { useNavigate, useParams } from "react-router-dom";

interface Facility {
  id: string;
  name: string;
}

interface RoomFormData {
  roomNumber: string;
  price: string;
  discount: string;
  capacity: string;
  facilities: string[];
}

export default function RoomData() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm<RoomFormData>({
    defaultValues: {
      roomNumber: "",
      price: "",
      discount: "",
      capacity: "",
      facilities: [],
    },
  });

  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [projectItem, setProjectItem] = useState<any>(null);

  const getFacilities = async () => {
    try {
      const res = await axiosInstance.get(FacilitesUrls.GET_ALL);
      setFacilities(res.data.data);
    } catch (err) {
      console.error("Error fetching facilities:", err);
    }
  };

  const getSingleRoom = async () => {
    try {
      const res = await axiosInstance.get(`${ROOMS_URL.DETAILS(id)}`);
      const data = res.data.data;
      setProjectItem(data);
    } catch (err) {
      console.error("Error fetching room data:", err);
    }
  };

  useEffect(() => {
    getFacilities();
    if (id) getSingleRoom();
  }, [id]);

  useEffect(() => {
    if (projectItem) {
      reset({
        roomNumber: projectItem.name || "",
        price: projectItem.price || "",
        discount: projectItem.discount || "",
        capacity: projectItem.capacity || "",
        facilities: projectItem.facilities?.map((f: any) => f._id) || [],
      });
    }
  }, [projectItem, reset]);

  const onSubmit = async (data: RoomFormData) => {
    try {
      if (id) {
        await axiosInstance.put(`${ROOMS_URL.UPDATE(id)}`, data);
      } else {
        await axiosInstance.post(ROOMS_URL.CREATE, data);
      }
      navigate("/rooms");
    } catch (error) {
      console.error("Error saving room:", error);
    }
  };

  return (
    <Box p={4}>
      <Typography variant="h5" mb={3}>
        {id ? "Edit Room" : "Add New Room"}
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Box mb={2}>
          <TextField
            label="Room Number"
            fullWidth
            {...register("roomNumber", { required: "Room number is required" })}
            error={!!errors.roomNumber}
            helperText={errors.roomNumber?.message}
          />
        </Box>

        <Box mb={2}>
          <TextField
            label="Price"
            fullWidth
            type="number"
            {...register("price", { required: "Price is required" })}
            error={!!errors.price}
            helperText={errors.price?.message}
          />
        </Box>

        <Box mb={2}>
          <TextField
            label="Discount (%)"
            fullWidth
            type="number"
            {...register("discount")}
          />
        </Box>

        <Box mb={2}>
          <TextField
            label="Capacity"
            fullWidth
            type="number"
            {...register("capacity", { required: "Capacity is required" })}
            error={!!errors.capacity}
            helperText={errors.capacity?.message}
          />
        </Box>

        <Box mb={2}>
          <Controller
            name="facilities"
            control={control}
            rules={{ required: "Please select at least one facility" }}
            render={({ field }) => (
              <FormControl fullWidth>
                <InputLabel id="facilities-label">Facilities</InputLabel>
                <Select
                  labelId="facilities-label"
                  multiple
                  value={field.value || []}
                  onChange={field.onChange}
                  input={<OutlinedInput label="Facilities" />}
                  renderValue={(selected) =>
                    facilities
                      .filter((f) => selected.includes(f.id))
                      .map((f) => f.name)
                      .join(", ")
                  }
                >
                  {facilities.map((f) => (
                    <MenuItem key={f.id} value={f.id}>
                      {f.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          />
          {errors.facilities && (
            <Typography color="error" mt={1}>
              {errors.facilities.message}
            </Typography>
          )}
        </Box>

        <Box>
          <Button variant="contained" type="submit">
            {id ? "Update" : "Create"}
          </Button>
        </Box>
      </form>
    </Box>
  );
}
