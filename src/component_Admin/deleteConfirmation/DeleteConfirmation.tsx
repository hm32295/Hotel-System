
import * as React from 'react';
import deleteConfirm from '../../assets/images/deleteConfirm.png'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DeleteIcon from '@mui/icons-material/Delete';
import Paper from '@mui/material/Paper';
import { Box, type PaperProps } from '@mui/material';
import Draggable from 'react-draggable';

function PaperComponent(props: PaperProps) {

  const nodeRef = React.useRef<HTMLDivElement>(null);
  return (
    <Draggable
      nodeRef={nodeRef as React.RefObject<HTMLDivElement>}
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} ref={nodeRef} />
    </Draggable>
  );
}

export default function DeleteConfirmation({data,deleteFun}) {
  const [open, setOpen] = React.useState(false);
 
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <DeleteIcon sx={{display:'flex' ,justifyContent:'center',alignItems:'center'}}  onClick={handleClickOpen} />
    
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
     
        <DialogContent>
          <DialogContentText sx={{display:'flex' , justifyContent:'center',flexDirection:'column',alignItems:'center' ,gap:'1rem', textAlign:'center'}}>
            


            {/* deleteConfirm */}
            <img src={deleteConfirm} alt="delete" style={{width:'200px'}}/>
            <Box component='span' mb={0}>Delete This {data.name} ?</Box>
            <Box component='span' mb={0}>are you sure you want to delete this item ? if you are sure just click on delete it</Box>
            
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={()=>{deleteFun(data);handleClose();}}>Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}