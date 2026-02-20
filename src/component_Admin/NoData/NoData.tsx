
import { Box, Typography } from '@mui/material';

const NoData = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#F5F6F8',
        minHeight: '50vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2,
        textAlign: 'center',
        borderRadius: 2,
      }}
    >
     

      <Typography variant="h6" sx={{ color: '#152C5B', mb: 2 }}>
        No data available
      </Typography>

    </Box>
  );
};

export default NoData;
