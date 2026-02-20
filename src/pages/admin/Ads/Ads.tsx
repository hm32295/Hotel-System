import GenericTable, { type HeadCell } from "../../../component_Admin/GenericTable/GenericTable";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Box, Button, IconButton, Menu, MenuItem } from '@mui/material';
import { ADS_URL, axiosInstance } from '../../../services/Url';
import { useEffect, useState } from 'react';
import Model from './Model';
import DeleteConfirmation from '../../../component_Admin/deleteConfirmation/DeleteConfirmation';
import { Skeleton_Loader } from '../../../component_Admin/loader/Skeleton';
import ViewData from "./ViewData";
import { toast } from "react-toastify";

import MoreVertIcon from '@mui/icons-material/MoreVert';
interface Product {
  id: string;
  name: string;
  Price: number;
  Capacity: number;
  Discount: number;
  Active: string;
}

const productHeadCells: HeadCell<Product>[] = [
  { id: "name", label: 'Room Name', numeric: false, disablePadding: false },
  { id: "Capacity", label: "Capacity", numeric: true, disablePadding: false },
  { id: "Discount", label: "Discount", numeric: true, disablePadding: false },
  { id: "Price", label: "Price", numeric: true, disablePadding: false },
  { id: "Active", label: "Active", numeric: false, disablePadding: false },
];

export default function Ads() {
  const [product, setProduct] = useState<Product[]>([]);
  const [loader, setLoader] = useState(false);
  const [showData, setShowData] = useState(false);
  const [row, setRow] = useState<Product | null>(null);
  const [totalAds, setTotalAds] = useState(0);

  const getData = async () => {
    setLoader(true);
    try {
      const response = await axiosInstance(ADS_URL.GET);
      const totalData = response?.data?.data?.totalCount;
      await getAds(1, totalData);
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  const getAds = async (page: number, size: number) => {
    try {
      const response = await axiosInstance(ADS_URL.GET, { params: { page, size } });
      const data = response.data.data;
      setTotalAds(data.totalCount);
      setProduct(
        data.ads.map((product: any) => ({
          id: product._id,
          name: product.room.roomNumber,
          Price: Number(product.room.price),
          Capacity: Number(product.room.capacity),
          Discount: Number(product.room.discount),
          Active: product.isActive ? "Active" : "No Active",
        }))
      );
    } catch (error: any) {
      console.log(error);
    }
  };

  const deleteAds = async (ads: Product) => {
    const id = ads.id;
    try {
      const response = await axiosInstance.delete(ADS_URL.DELETE(id));
      toast.success(response.data.message);
      getData();
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);


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

  if (loader) return <Skeleton_Loader />;

  return (
    <>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button sx={{ background: "#3252DF", color: '#fff', marginRight: '1rem' }}>
          <Model icon={false} getAds={getData} row={{} as Product} />
        </Button>

      </Box>

      <GenericTable
        totalData={totalAds}
        rows={product}
        headCells={productHeadCells}
        title=""
        renderActions={(row) => (

          <>
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                
              </Box>
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
                    setShowData(true); setRow(row);
                    handleMenuClose();
                  }}
                >
                  <Box sx={{display:'flex' ,justifyContent:'flex-start',alignItems:'center',gap:'.4rem'}}>
                    <VisibilityIcon  />
                      <Box component={'span'}>View</Box>
                  </Box>
                </MenuItem>
                <MenuItem
                  
                >
                  <Model getAds={getData} icon={true} row={row} />
                 
                </MenuItem>
                <MenuItem >
                  <DeleteConfirmation data={row} deleteFun={deleteAds} />
               
                </MenuItem>
              </Menu>
            </>
          </>
        )}
      />


      {showData && row && (
        <ViewData data={row} setShowData={setShowData} showData={showData} />
      )}
    </>
  );

}
