import React, { useEffect, useState } from 'react';
import GenericTable from '../../../component_Admin/GenericTable/GenericTable';
import type { HeadCell } from '../../../component_Admin/GenericTable/GenericTable';
import { axiosInstance, ADMIN_URL } from '../../../services/Url';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Typography, Box, Paper, Divider, IconButton, Skeleton, Avatar
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CloseIcon from '@mui/icons-material/Close';

interface User {
  id: string;
  userName: string;
  email: string;
  phoneNumber: string;
  country: string;
  role: string;
  verified: boolean;
  createdAt: string;
  profileImage?: string;
}

const headCells: HeadCell<User>[] = [
  { id: 'userName', label: 'Username', numeric: false, disablePadding: false },
  { id: 'email', label: 'Email', numeric: false, disablePadding: false },
  { id: 'phoneNumber', label: 'Phone', numeric: false, disablePadding: false },
  { id: 'country', label: 'Country', numeric: false, disablePadding: false },
  { id: 'role', label: 'Role', numeric: false, disablePadding: false },
];

const DetailRow = ({ label, value }: { label: string; value: string | number | boolean }) => (
  <>
    <Box display="flex" justifyContent="space-between">
      <Typography fontWeight={600} sx={{ color: '#555' }}>{label}:</Typography>
      <Typography sx={{ color: '#333', fontWeight: 500 }}>{String(value)}</Typography>
    </Box>
    <Divider />
  </>
);

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [openView, setOpenView] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const [totalUsers,setTotalUsers] = useState(0)
const getData = async ()=>{
        try {
          const response = await axiosInstance(ADMIN_URL.GET_ALL_USERS);
          const totalData = response?.data?.data?.totalCount;
            fetchUsers(1,totalData)
        } catch (error) {
          console.log(error);
          
        }
      }
      const fetchUsers = async (page:number, size:number) => {
        try {
          setLoading(true);
          const { data } = await axiosInstance.get(ADMIN_URL.GET_ALL_USERS,{params:{page,size}});
          const formattedUsers: User[] = data?.data?.users?.map((item: any) => ({
            id: item._id,
            userName: item.userName,
            email: item.email,
            phoneNumber: item.phoneNumber?.toString() || 'N/A',
            country: item.country || 'N/A',
            role: item.role || 'N/A',
            verified: item.verified,
            createdAt: new Date(item.createdAt).toLocaleDateString(),
            profileImage: item.profileImage,
          })) || [];
          setTotalUsers(data.data.totalCount);
          
          setUsers(formattedUsers);
        } catch (error) {
          console.error('Error fetching users:', error);
        } finally {
          setLoading(false);
        }
      };
  useEffect(() => {

    getData();
  }, []);

  const handleOpenView = (row: User) => {
    setSelectedUser(row);
    setOpenView(true);
  };

  const handleCloseView = () => {
    setOpenView(false);
    setSelectedUser(null);
  };

  const LoadingComponent = () => (
    <Box sx={{ minHeight: '400px', padding: '20px', borderRadius: '8px', border: '1px solid #e0e0e0' }}>
      <Typography variant="h6" sx={{ color: '#666', fontWeight: 500, marginBottom: '16px', textAlign: 'center' }}>
        Loading Users...
      </Typography>
      <Skeleton />
    </Box>
  );

  if (loading) {
    return (
      <Box sx={{ padding: '20px' }}>
        <Typography variant="h5" sx={{ marginBottom: '20px', fontWeight: 600 }}>
          Users
        </Typography>
        <LoadingComponent />
      </Box>
    );
  }

  return (
    <>
      <GenericTable<User>
        title="Users"
        rows={users}
        totalData= {totalUsers}
        headCells={headCells}
        renderActions={(row) => (
          <Button
            variant="contained"
            size="small"
            sx={{
              backgroundColor: '#666',
              borderRadius: '8px',
              padding: '8px 16px',
              margin: '4px',
              color: 'white',
              fontWeight: 600,
              textTransform: 'none',
              boxShadow: '0 2px 4px rgba(102, 102, 102, 0.3)',
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                backgroundColor: '#555',
                boxShadow: '0 4px 8px rgba(102, 102, 102, 0.4)',
                transform: 'translateY(-1px)',
              },
            }}
            startIcon={<VisibilityIcon sx={{ color: 'white', fontSize: '18px' }} />}
            onClick={() => handleOpenView(row)}
          >
            View
          </Button>
        )}
      />

      <Dialog open={openView} onClose={handleCloseView} maxWidth="sm" fullWidth>
        <DialogTitle sx={{
          backgroundColor: '#f5f5f5',
          borderBottom: '1px solid #e0e0e0',
          padding: '20px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <Typography variant="h6" sx={{ fontWeight: 600, color: '#333' }}>User Details</Typography>
          <IconButton onClick={handleCloseView}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent  sx={{ padding: '24px', mt: '24px' }}>
          {selectedUser && (
            <Paper elevation={0} sx={{
              backgroundColor: '#fafafa',
              padding: '24px',
              borderRadius: '8px',
              border: '1px solid #e0e0e0',
            }}>
              <Box display="flex" flexDirection="column" alignItems="center" gap={3}>
                {selectedUser.profileImage && (
                  <Avatar
                    src={selectedUser.profileImage}
                    alt={selectedUser.userName}
                    sx={{ width: 100, height: 100, border: '2px solid #ccc' }}
                  />
                )}
                <Box width="100%" display="flex" flexDirection="column" gap={3}>
                  <DetailRow label="Username" value={selectedUser.userName} />
                  <DetailRow label="Email" value={selectedUser.email} />
                  <DetailRow label="Phone" value={selectedUser.phoneNumber} />
                  <DetailRow label="Country" value={selectedUser.country} />
                  <DetailRow label="Role" value={selectedUser.role} />
                  <DetailRow label="Verified" value={selectedUser.verified ? 'Yes' : 'No'} />
                  <DetailRow label="Created At" value={selectedUser.createdAt} />
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
      </Dialog>
    </>
  );
}
