import { Box, Button } from '@mui/material';
import GenericTable, { type HeadCell } from "../../../component_Admin/GenericTable/GenericTable";
import EditNoteIcon from '@mui/icons-material/EditNote';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { axiosInstance, ROOMS_URL } from '../../../services/Url';
import { useEffect, useState, type JSX } from 'react';
import './rooms.css';
import DeleteConfirmation from '../../../component_Admin/deleteConfirmation/DeleteConfirmation';
import { useNavigate } from 'react-router-dom';
import { Skeleton_Loader } from '../../../component_Admin/loader/Skeleton';
import ViewData from '../ViewData/ViewData';

interface Product {
  id: string;
  name: string;
  image: JSX.Element;
  price: string;
  capacity: string;
  discount: string;
}

const productHeadCells: HeadCell<Product>[] = [
  { id: "name", label: 'room Number', numeric: false, disablePadding: false },
  { id: "image", label: "Image", numeric: false, disablePadding: false, renderCell: (value) => value },
  { id: "price", label: "Price", numeric: false, disablePadding: false },
  { id: "capacity", label: "Capacity", numeric: false, disablePadding: false },
  { id: "discount", label: "Discount", numeric: true, disablePadding: false },
];

export default function Rooms() {
  const [product, setProduct] = useState<Product[]>([]);
  const navigation = useNavigate();
  const [loader, setLoader] = useState(false);
  const [showData, setShowData] = useState(false);
  const [row, setRow] = useState<Product | null>(null);
  const [totalRooms, setTotalRooms] = useState(0);

  const getData = async () => {
    setLoader(true);
    try {
      const response = await axiosInstance(ROOMS_URL.GET);
      const totalData = response?.data?.data?.totalCount;
      await getRooms(1, totalData);
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  const getRooms = async (page: number, size: number) => {
    try {
      const response = await axiosInstance(ROOMS_URL.GET, { params: { page, size } });
      const data = response?.data?.data;

      setTotalRooms(data.totalCount);
      setProduct(
        data.rooms.map((ele: any) => {
          const imageUrl = Array.isArray(ele.images) && ele.images.length > 0
            ? ele.images[0]
            : ele.images || '';

          return {
            capacity: ele.capacity,
            discount: ele.discount,
            price: ele.price,
            name: ele.roomNumber,
            image: (
              <img
                src={imageUrl}
                alt="room"
                style={{ width: 60, height: 40, objectFit: 'cover', borderRadius: 6 }}
              />
            ),
            id: ele._id,
          };
        })
      );
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const deleteRoom = async (data: Product) => {
    try {
      const response = await axiosInstance.delete(ROOMS_URL.DELETE(data.id));
      console.log(response);
    } catch (error: any) {
      console.log(error);
    } finally {
      getData();
    }
  };

  const handleView = (row: Product) => {
    const { image, ...cleanRow } = row;
    navigation('/MasterAdmin/rooms-data', { state: cleanRow });
  };

  if (loader) return <Skeleton_Loader />;

  return (
    <Box className="rooms">
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          onClick={() => navigation('/MasterAdmin/rooms-data')}
          sx={{ background: "#3252DF", color: '#fff', marginRight: '1rem' }}
        >
          Add New Room
        </Button>
      </Box>

      <GenericTable
        rows={product}
        headCells={productHeadCells}
        title="Room List"
        totalData={totalRooms}
        renderActions={(row) => (
          <Box sx={{ display: 'flex', gap: '.1rem', justifyContent: 'center', alignItems: 'center' }}>
            <EditNoteIcon onClick={() => handleView(row)} />
            <VisibilityIcon onClick={() => { setShowData(true); setRow(row); }} />
            <DeleteConfirmation data={row} deleteFun={deleteRoom} />
          </Box>
        )}
      />

      {showData && row && (
        <Box
          onClick={() => setShowData(false)}
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: '#00000042',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <ViewData setShowData={setShowData} showData={showData} data={row} />
        </Box>
      )}
    </Box>
  );
}
