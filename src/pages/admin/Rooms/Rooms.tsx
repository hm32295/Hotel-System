import { Box } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import GenericTable , { type HeadCell } from "../../../component_Admin/GenericTable/GenericTable";
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { axiosInstance, ROOMS_URL } from '../../../services/Url';
import { useEffect, useState, type JSX } from 'react';
import './rooms.css'
import DeleteConfirmation from '../../../component_Admin/deleteConfirmation/DeleteConfirmation';
import { useNavigate } from 'react-router-dom';
interface Product {
  id: number;
  name : string;
  image:  JSX.Element;
  price: string;
  // Category: string;
  capacity: string;
  discount: string;
}

// // Head Table Data
const productHeadCells: HeadCell<Product>[] = [
  { id: "name", label: 'room Number', numeric: false, disablePadding: false },
  { id: "image", label: "Image", numeric: false, disablePadding: false ,renderCell: (value) => value  },
  { id: "price", label: "Price", numeric: false, disablePadding: false },
  { id: "capacity", label: "Capacity", numeric: false, disablePadding: false },
  // { id: "Category", label: "Category", numeric: false, disablePadding: false },
  { id: "discount", label: "Discount", numeric: true, disablePadding: false },
];


export default function Rooms() {
    const [product,setProduct] =useState<Product[]>([])
    const navigation = useNavigate()
    const getRooms = async () =>{
      try {
        const response = await axiosInstance(ROOMS_URL.GET)
        const data = response.data.data.rooms
        
        setProduct(data.map((ele)=>{
          const imageUrl = Array.isArray(ele.images) && ele.images.length > 0
          ? ele.images[0]
          : ele.images || '';
          return {
            capacity: ele.capacity,
            discount:ele.discount,
            price:ele.price,
            name:ele.roomNumber,
            image:<img src={imageUrl} alt='room' style={{ width: 60, height: 40, objectFit: 'cover', borderRadius: 6 }} />,
            id : ele._id
          }
        }))
        
        
      } catch (error) {
        console.log(error);
        
      }
    }
    useEffect(()=>{
      getRooms()
    },[])

  const deleteRoom =async (data)=>{

    try {
      const response = await axiosInstance.delete(ROOMS_URL.DELETE(data.id))
      console.log(response);
      
    } catch (error) {
      console.log(error);
      
    }
    finally{
      getRooms()
    }
  }


  const handleView = (row: Product) => {
    const { image, ...cleanRow } = row;
    navigation('/MasterAdmin/rooms-data', { state: cleanRow });
  };
  return (
    <Box className='rooms'>
      
        <GenericTable
                rows={product}
                headCells={productHeadCells}
                title="Room List"
                renderActions={(row) => (
                    <>
                    <Box sx={{display:'flex' ,gap:'.1rem' ,justifyContent:'center',alignItems:'center'}}>
                        <EditNoteIcon onClick={()=>{handleView(row)}}/>
                        <VisibilityIcon onClick={()=>{console.log(row)}}/>
                        <DeleteConfirmation data={row} deleteFun={deleteRoom}/>
                       
                    </Box>
                      
                      
                    </>
            )}
          />
    </Box>
  )
}
