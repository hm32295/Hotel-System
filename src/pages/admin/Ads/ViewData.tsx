
import Typography from '@mui/material/Typography';
import { Box, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import {

  Dialog, DialogTitle, DialogContent, DialogActions,
   Paper, Divider, IconButton, Avatar
} from '@mui/material';


interface ViewDataProps {
  setShowData: (value: boolean) => void;
  showData: boolean
  data: {
    name: string;
    Active: string;
    id: string;
    Price: number;
    Capacity : number;
    Discount: number
  };
}
const DetailRow = ({ label, value }: { label: string; value: string | number | boolean }) => (
  <>
    <Box display="flex" justifyContent="space-between">
      <Typography fontWeight={600} sx={{ color: '#555' }}>{label}:</Typography>
      <Typography sx={{ color: '#333', fontWeight: 500 }}>{String(value)}</Typography>
    </Box>
    <Divider />
  </>
);

export default function ViewData({setShowData,showData ,data}:ViewDataProps) {
  

  const handleCloseView = () => {
    setShowData(false);
  };
  return (
    <>
        <Dialog open={showData} onClose={handleCloseView} maxWidth="sm" fullWidth>
          <Box onClick={(e)=>{e.stopPropagation()}}>

              <DialogTitle sx={{
                backgroundColor: '#f5f5f5',
                borderBottom: '1px solid #e0e0e0',
                padding: '20px 24px',
                display: 'flex',
                justifyContent: 'space-between', 
                alignItems: 'center',
              }}>
                <Typography variant="h6" sx={{ fontWeight: 600, color: '#333' }}>Ads Details</Typography>
                <IconButton onClick={handleCloseView}>
                  <CloseIcon />
                </IconButton>
              </DialogTitle>

              <DialogContent  sx={{ padding: '24px', mt: '24px' }}>
                {data && (
                  <Paper elevation={0} sx={{
                    backgroundColor: '#fafafa',
                    padding: '24px',
                    borderRadius: '8px',
                    border: '1px solid #e0e0e0',
                  }}>
                    <Box display="flex" flexDirection="column" alignItems="center" gap={3}>
                     
                      <Box width="100%" display="flex" flexDirection="column" gap={3}>
                        <DetailRow label="Name" value={data.name} />
                        <DetailRow label="Active" value={data.Active} />
                        <DetailRow label="Capacity" value={data.Capacity} />
                        <DetailRow label="Discount" value={data.Discount} />
                        <DetailRow label="Price" value={data.Price} />
                  
                      </Box>
                    </Box>
                  </Paper>
                )}
              </DialogContent>

              <DialogActions sx={{ padding: '16px 24px', backgroundColor: '#f5f5f5' }}>
                <Button
                  onClick={handleCloseView}
                  variant="contained"
                  sx={{
                    backgroundColor: '#666',
                    color: 'white',
                    padding: '8px 24px',
                    borderRadius: '8px',
                    fontWeight: 600,
                    textTransform: 'none',
                    '&:hover': {
                      backgroundColor: '#555',
                    },
                  }}
                >
                  Close
                </Button>
              </DialogActions>
          </Box>
        </Dialog>
    </>
  );
}

