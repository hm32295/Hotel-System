
import { Box } from '@mui/material'

import GenericTable , { type HeadCell } from "../../../component_Admin/GenericTable/GenericTable";
import EditNoteIcon from '@mui/icons-material/EditNote';

import { ADMIN_URL, axiosInstance } from '../../../services/Url';
import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { Skeleton_Loader } from '../../../component_Admin/loader/Skeleton';
import ViewData from '../ViewData/ViewData';
interface Product {
  id: number;
  name : string;
  country : string;
  createdAt : string;
  updatedAt : string;
  phoneNumber : string;
  email : string;
  userName : string;
}

// // Head Table Data
const productHeadCells: HeadCell<Product>[] = [
  { id: "userName", label: "User", numeric: true, disablePadding: false },
  { id: "country", label: "country", numeric: false, disablePadding: false },
  { id: "phoneNumber", label: "Phone Number", numeric: false, disablePadding: false },
  { id: "createdAt", label: "Start Date", numeric: false, disablePadding: false },
  { id: "email", label: "email", numeric: false, disablePadding: false },
  { id: "updatedAt", label: "End Date", numeric: false, disablePadding: false },
];


export default function usersList() {
    const [product,setProduct] = useState<Product[]>([])
    const [loader ,setLoader] = useState(false)
    const [row ,setRow] = useState([])
    const [showData ,setShowData] = useState(false)

    const getAllUser = async(page , size)=>{
      setLoader(true)
      try {
          const response = await axiosInstance(ADMIN_URL.GET_ALL_USER,{params:{page,size}})
          const data = response.data.data.users;

          setProduct(data.map((user)=>{
            return{
              id: user._id,
              country : user.country,
              createdAt : user.createdAt,
              updatedAt : user.updatedAt,
              phoneNumber : user.phoneNumber,
              email : user.email,
              userName : user.userName,
            }
          }))
      } catch (error) {
        console.log(error);
        
      }finally{
        setLoader(false)
      }
    }
    useEffect(()=>{
      getAllUser(1,10)
    },[])
  if(loader) return <Skeleton_Loader />
  return (
    <Box className='rooms'>
      
        <GenericTable
                rows={product}
                headCells={productHeadCells}
                title="Room List"
                renderActions={(row) => (
                    <>
                        <EditNoteIcon onClick={()=>{setRow(row); setShowData(true)}}/>
                    </>
            )}
            />
            {showData && <Box 
            onClick={()=>{setShowData(false)}}
              sx={{position:'fixed' , top:'0' ,left:'0' , width:'100%', height:'100%', background:'#00000042', display:'flex' , justifyContent:'center',alignItems:'center'}}
            >
              <ViewData title={productHeadCells} setShowData={setShowData} data={row}/>
          </Box>} 
    </Box>
  )
}
