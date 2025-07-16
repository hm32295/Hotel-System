// import MoreVertIcon from '@mui/icons-material/MoreVert';
import GenericTable , { type HeadCell } from "../../../component_Admin/GenericTable/GenericTable";

// import DeleteIcon from '@mui/icons-material/Delete';

import VisibilityIcon from '@mui/icons-material/Visibility';
import { Box, Button } from '@mui/material';
import { ADS_URL, axiosInstance } from '../../../services/Url';
import {  useEffect, useState } from 'react';
import Model from './Model';
import DeleteConfirmation from '../../../component_Admin/deleteConfirmation/DeleteConfirmation';
import { Skeleton_Loader } from '../../../component_Admin/loader/Skeleton';
import ViewData from "./ViewData";
import { toast } from "react-toastify";
interface Product {
  id: number;
  name: string;
  Price: number;
  Capacity : string;
  Discount: string;
  Active: string;

}

const productHeadCells: HeadCell<Product>[] = [
  { id: "name", label: 'room Name', numeric: false, disablePadding: false },
  { id: "Capacity", label: "Capacity", numeric: false, disablePadding: false },
  { id: "Discount", label: "Discount", numeric: false, disablePadding: false },
  { id: "Price", label: "Price", numeric: true, disablePadding: false },
  { id: "Active", label: "Active", numeric: true, disablePadding: false },
];

export default function Ads() {
  const [product , setProduct] = useState<Product[]>([])
  const [loader, setLoader] = useState(false)
  const [showData ,setShowData] = useState(false);
  const [row ,setRow] = useState(false);
  const [totalAds ,setTotalAds] = useState(0)
  const getData = async ()=>{
          try {
            const response = await axiosInstance(ADS_URL.GET);
            const totalData = response?.data?.data?.totalCount;
              getAds(1,totalData)
          } catch (error) {
            console.log(error);
            
          }
        }
  const getAds = async(page:number,size:number)=>{
   
    try {
        const response = await axiosInstance(ADS_URL.GET,{params:{page,size}})
        const data = response.data.data;
        setTotalAds(data.totalCount)
        setProduct(data.ads.map((product)=>{
          return {
            id: product._id,
            name: product.room.roomNumber,
            Price: product.room.price,
            Capacity : product.room.capacity,
            Discount: product.room.discount,
            Active: product.isActive ? "Active" : 'No Active',
          }
        }))
      
       
        
    } catch (error) {
        console.log(error);
        
    }
  }

  const deleteAds = async(ads)=>{
    const id =ads.id
        try {
          const response =await axiosInstance.delete(ADS_URL.DELETE(id))
          toast.success(response.data.message);
          
        } catch (error) {
          console.log(error);
          
        }

        getData()
    
  }

  useEffect(()=>{
    getData()
    
  },[])
 
  if(loader) return <Skeleton_Loader />
  return (
    <>
        <Box sx={{display:'flex',justifyContent:'flex-end'}}>
           {/* <Box component={'button'}><Model icon={false} getAds={getData}/></Box> */}
          <Button sx={{background:"#3252DF" ,color:'#fff',marginRight:'1rem'}}><Model icon={false} getAds={getData}/></Button>
      </Box>
      <GenericTable
      totalData={totalAds}
        rows={product}
        headCells={productHeadCells}
        title=""
        renderActions={(row) => (
            <>
              {/* <MoreVertIcon className='showList'/> */}
              <Box sx={{display:'flex' ,justifyContent:'center',alignItems:'center'}}>

                  <Model getAds={getData} icon={true} row={row}/>
                  <DeleteConfirmation data={row} deleteFun={deleteAds}/>
                  <VisibilityIcon onClick={()=>{setRow(row);setShowData(true)}}/>
              </Box>
            </>
    )}

  />
  {showData&&(
    <ViewData data={row} setShowData={setShowData} showData={showData}/>

  )}
     </>
  )
}



{/* <Box className='list'>

<Fragment>
  <Model getAds={getAds} icon={true} row={row}/>
</Fragment>
<Fragment>
  <DeleteConfirmation data={row} deleteFun={deleteAds}/>
</Fragment>
<Fragment >
    <Box onClick={() => console.log("view", row)}>
      <VisibilityIcon />
    </Box>
</Fragment>
</Box> */}
