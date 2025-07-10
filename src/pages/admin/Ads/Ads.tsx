// import MoreVertIcon from '@mui/icons-material/MoreVert';
import GenericTable , { type HeadCell } from "../../../component_Admin/GenericTable/GenericTable";

// import DeleteIcon from '@mui/icons-material/Delete';

import VisibilityIcon from '@mui/icons-material/Visibility';
import { Box } from '@mui/material';
import { ADS_URL, axiosInstance } from '../../../services/Url';
import { Fragment, useEffect, useState } from 'react';
import Model from './Model';
import DeleteConfirmation from '../../../component_Admin/deleteConfirmation/DeleteConfirmation';
import { Variants } from '../../../component_Admin/loader/loder';
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
  const getAds = async()=>{
    setLoader(true)
    try {
        const response = await axiosInstance(ADS_URL.GET)
        const data = response.data.data.ads;
      
        setProduct(data.map((product)=>{
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
        
    }finally{
      setLoader(false)
    }
  }

  const deleteAds = async(ads)=>{
    const id =ads.id
    
        try {
          const response =await axiosInstance.delete(ADS_URL.DELETE(id))
          console.log(response);
          
        } catch (error) {
          console.log(error);
          
        }

        getAds()
    
  }
  useEffect(()=>{
    getAds()
    
  },[])
 
 

 if(loader) return <Variants />
  return (
    <>
      <Box component={'button'}><Model icon={false} getAds={getAds}/></Box>
      <GenericTable
      rows={product}
        headCells={productHeadCells}
        title=""
        renderActions={(row) => (
            <>
              {/* <MoreVertIcon className='showList'/> */}
              <Box sx={{display:'flex' ,justifyContent:'center',alignItems:'center'}}>

                  <Model getAds={getAds} icon={true} row={row}/>
                  <DeleteConfirmation data={row} deleteFun={deleteAds}/>
                  <VisibilityIcon />
              </Box>
            </>
    )}
  />
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
