import { useCallback, useEffect, useState } from "react";
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
import { Box, Menu, MenuItem, useTheme } from "@mui/material";
import { toast } from "react-toastify";
import VisibilityIcon from '@mui/icons-material/Visibility';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Header from "../../../component_Admin/header_Admin/Header";
import { Skeleton_Loader } from "../../../component_Admin/loader/Skeleton";



// HeadCell Type
type HeadCell = {
  id: string;
  label: string;
  numeric: boolean;
  disablePadding: boolean;
};
const headCells =[
        { id: "name", label: 'Facility Name', numeric: false, disablePadding: false },
        { id: "createdByUserName", label: "Created By", numeric: false, disablePadding: false },
        { id: "createdAt", label: "Creation Date", numeric: false, disablePadding: false },
        { id: "updatedAt", label: "Update Date", numeric: false, disablePadding: false },
      ]
// Delete Modal
function DeleteConfirmation({ open, onClose, onConfirm, name }) {


  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete Confirmation</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete {name}?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onConfirm} autoFocus>Delete</Button>
      </DialogActions>
    </Dialog>
  );
}

const Facilities = () => {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [openUpdate, setOpenUpdate] = useState(false);
  const [value, setValue] = useState('');
  const [itemToUpdate, setItemToUpdate] = useState<any>(null);

  const [openDelete, setOpenDelete] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<any>(null);
  const [facilities,setFacilities]=useState(0);



    const getData = async ()=>{
      setLoading(false)
          try {
            const response = await axiosInstance(FacilitesUrls.GET_ALL,{params:{page:1,size:1}});
            const totalData = response?.data?.data?.totalCount || 100;
             await fetchFacilities(1,totalData)
          } catch (error:any) {
            console.log(error);
            
          }
          finally{
            setLoading(true)
          }
        }
    const fetchFacilities = async(page:number,size:number) => {
      
        try {
          const res = await axiosInstance.get(FacilitesUrls.GET_ALL,{params:{page,size}});
        
          setFacilities(res.data.data.totalCount)
          
          const facilitiesData = res.data.data.facilities.map(facility => ({
            id: facility._id,
            name: facility.name,
            createdByUserName: facility.createdBy?.userName ?? 'N/f',
            createdAt: facility.createdAt,
            updatedAt: facility.updatedAt,
          }));
          setRows(facilitiesData);
        
          
        } catch (error:any) {
          console.log(error);
        } 
      };

  useEffect(() => {
    getData();
  }, []);

  const handleOpenUpdate = (row) => {
    setItemToUpdate(row);
    setValue(row.name);
    setOpenUpdate(true);
  };

  const handleCloseUpdate = () => {
    setOpenUpdate(false);
    setItemToUpdate(null);
    setValue('');
  };

  const handleConfirmUpdate = async () => {
    setLoading(false)
    if (itemToUpdate) {
      try {
        await axiosInstance.put(FacilitesUrls.UPDATE(itemToUpdate.id), { name: value });
        toast.success(`Updated ${itemToUpdate.name} successfully.`);
        getData();
      } catch (error:any) {
        console.error("Update Error:", error);
      }finally{
        setLoading(true)
      }
    }
    handleCloseUpdate();
  };

  const handleOpenDelete = (row) => {
    setItemToDelete(row);
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
    setItemToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (itemToDelete) {
      try {
        await axiosInstance.delete(FacilitesUrls.DELETE(itemToDelete.id));
        toast.error(`Deleted ${itemToDelete?.name} successfully.`);
        getData();
      } catch (error) {
        console.error("Delete Error:", error);
      }
    }
    handleCloseDelete();
  };
  
const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
const [selectedRow, setSelectedRow] = useState<any>(null);

const handleMenuOpen = (e: React.MouseEvent<HTMLElement>, row: any) => {
  setAnchorEl(e.currentTarget);
  setSelectedRow(row);
};

const handleMenuClose = () => {
  setAnchorEl(null);
  setSelectedRow(null);
};


  return (
    <>
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
              <Box component={'h2'} style={{ margin: 0 }}>Edit Facility</Box>
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
              <Button onClick={handleCloseUpdate} sx={{ mr: 1 }}>Cancel</Button>
              <Button variant="contained" onClick={handleConfirmUpdate}>Save</Button>
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
<div style={{display:'none'}}>
  <Header />
</div>

   {!loading ? (
    
        <Skeleton_Loader />
      ) : (
        <GenericTable
          headCells={headCells}
          title="Facilities"
          totalData={facilities}
          rows={rows}
          renderActions={(row) => (
            <>
              <IconButton
                aria-controls="action-menu"
                aria-haspopup="true"
                onClick={(e) => handleMenuOpen(e, row)}
              >
                <MoreVertIcon />
              </IconButton>

              <Menu
                id="action-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl) && selectedRow === row}
                onClose={handleMenuClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              >
                <MenuItem
                  onClick={() => {
                   
                    handleMenuClose();
                  }}
                >
                  <VisibilityIcon fontSize="small" sx={{ mr: 1 }} />
                  View
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleOpenUpdate(selectedRow);
                    handleMenuClose();
                  }}
                >
                  <EditNoteIcon fontSize="small" sx={{ mr: 1 }} />
                  Edit
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleOpenDelete(selectedRow);
                    handleMenuClose();
                  }}
                >
                  <AutoDeleteIcon fontSize="small" sx={{ mr: 1 }} />
                  Delete
                </MenuItem>
              </Menu>
            </>
          )}
        />
      )}
    </>
  );
};

export default Facilities;