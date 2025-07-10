import { useEffect, useState } from "react";
import GenericTable from "../../../component_Admin/GenericTable/GenericTable";
import { axiosInstance, FacilitesUrls } from "../../../services/Url";
import AutoDeleteIcon from '@mui/icons-material/AutoDelete';
import EditNoteIcon from '@mui/icons-material/EditNote';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box } from "@mui/material";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import App from "../../../App";

// Define the type for headCells
type HeadCell = {
  id: string;
  label: string;
  numeric: boolean;
  disablePadding: boolean;
};

// مكون مودال تأكيد الحذف
function DeleteConfirmation({ open, onClose, onConfirm, name }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Delete Confirmation"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
         Are you sure you want to delete?{name}؟
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onConfirm} autoFocus>
         Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const Facilities = () => {
  const [rows, setRows] = useState<any[]>([]);
  const [headCells, setHeadCells] = useState<HeadCell[]>([]);
  const [loading, setLoading] = useState(true);
  const [openDelete, setOpenDelete] = useState(false);
  const fetchFacilities = async () => {
    try {
      const res = await axiosInstance(FacilitesUrls.Get_All_Data);
      const facilitiesData = res.data.data.facilities.map(facility => ({
        id: facility._id, 
        name: facility.name,
        createdByUserName: facility.createdBy.userName,
        createdAt: facility.createdAt,
        updatedAt: facility.updatedAt,
      }));
      setRows(facilitiesData);
      setHeadCells([
        { id: "name", label: 'Facility Name', numeric: false, disablePadding: false },
        { id: "createdByUserName", label:"Created By", numeric: false, disablePadding: false },
        { id: "createdAt", label:"Creation Date", numeric: false, disablePadding: false },
        { id: "updatedAt", label: "Update Date", numeric: false, disablePadding: false },
      ]);
    } catch (error) {
      console.log("Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchFacilities();
  }, [fetchFacilities]);
  const [itemToUpdate, setItemToUpdate] = useState(null);
const [openUpdate, setOpenUpdate] = useState(false);
  const [value, setValue] = useState('');
//  Modal Edit 
  const handleOpenUpdate = (row) => {
    setItemToUpdate(row);
    setValue(row.name);
    console.log(row)
    setOpenUpdate(true);
    setnum_id(row)
  };

  const handleCloseUpdate = () => {
    setOpenUpdate(false);
    setItemToUpdate(null);
    setValue('');
  };
  const handleConfirmUpdate = async () => {
    if (itemToUpdate) {
      try {
        await axiosInstance.put(`${FacilitesUrls.Delete_Data}/${itemToUpdate.id}`,  { name: value });
         toast.success(`Update ${itemToUpdate.name} successfully.`)
        fetchFacilities(); 
      
       
      } catch (error) {
        console.error('Delete Error:', error);
        
      }
    }
    handleCloseUpdate();
  };
  

 const [itemToDelete, setItemToDelete] = useState(null);
  const handleOpenDelete = (row:any) => {
    setItemToDelete(row);
    setOpenDelete(true);
    console.log(row)
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
    setItemToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (itemToDelete) {
      try {
        await axiosInstance.delete(`${FacilitesUrls.Delete_Data}/${itemToDelete.id}`);
         toast.error(`Deleted ${itemToDelete.name} successfully.`)
        fetchFacilities(); 
      
       
      } catch (error) {
        console.error('Delete Error:', error);
        
      }
    }
    handleCloseDelete();
  };
  return (
    <>
      {/* Modal Update*/}
      <Modal
        open={openUpdate}
        onClose={handleCloseUpdate}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{ backdrop: { timeout: 500 } }}
      >
        <Fade in={openUpdate}>
          <Box sx={{ 
            position: 'absolute', 
            top: '50%', 
            left: '50%', 
            transform: 'translate(-50%, -50%)', 
            bgcolor: 'background.paper', 
            boxShadow: 24, 
            p: 4, 
            width: 400 
          }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <h2 style={{ margin: 0 }}>Edit Facility</h2>
              <IconButton size="small" onClick={handleCloseUpdate}>
                <CloseIcon />
              </IconButton>
            </Box>
            <TextField
              fullWidth
              variant="outlined"
              label="Name"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <Box mt={3} display="flex" justifyContent="flex-end">
              <Button onClick={handleCloseUpdate} sx={{ mr: 1 }}>
               Cancel
              </Button>
              <Button variant="contained" onClick={handleConfirmUpdate} >
               Save
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal> 
      <DeleteConfirmation
        open={openDelete}
        onClose={handleCloseDelete}
        onConfirm={handleConfirmDelete}
        name={itemToDelete ? itemToDelete.name : ''}
      />
      {loading ? (
        <div>Loading…</div>
      ) : (
        <GenericTable
          headCells={headCells}
          rows={rows}
          renderActions={(row) => (
            <>
              <Button onClick={() => handleOpenUpdate(row)}><EditNoteIcon /></Button>
              <Button onClick={() => handleOpenDelete(row)}><AutoDeleteIcon /></Button>
            </>
          )}
        />
      )}
    </>
  );
};
export default Facilities;