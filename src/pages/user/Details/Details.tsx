import { Box } from "@mui/material"

import TitleDetails from "./TitleDetails/TitleDetails"
import Gallery from "./Gallery/Gallery"
import DescriptionAndFacilities from "./DescriptionAndFacilities/DescriptionAndFacilities"
import ToBooking from "./ToBooking/ToBooking"
import Rate from "./Rate/Rate"
import Comment from "./Comment/Comment"

import './details.css'
import { useLocation } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../../context/context"



const Details = () => {
    const location = useLocation();
    const [data,setData] = useState(null);
    const{loginData} = useContext(AuthContext)
    useEffect(()=>{
        setData(location.state)     
    },[data])
    if(!data) return
  return (
    <Box sx={{padding:'1rem'}}>
        <Gallery data={data}/>
        {/* Added Colume in Here -Yousef-  if you want return here done  */}
        <Box sx={{display:'flex' ,gap:'1.5rem',marginTop:'60px',flexWrap:'wrap',flexDirection:'column'}}>
            <DescriptionAndFacilities data={data}/>
            <ToBooking data={data} isLogged={loginData?.role}/>
          
        </Box>
        {loginData?.role === 'user'|| localStorage.getItem('token') ?(
       <Box
   sx={{
    mt: '4rem',
   
    p: '8px',
    display: 'flex',
    flexWrap: 'wrap',
    
  
    flexDirection: { xs: 'column', md: 'row' },
    alignItems: 'flex-start',
    justifyContent: 'center',
    gap: '2rem',
  }}

>
  <Box sx={{ flex: '1 1 45%', minWidth: 0, width: { xs: '100%', md: '45%' } }}>
    <Rate id={data?._id} />
  </Box>
  <Box
    className='border-comment'
    sx={{ width: '1px', background: '#203FC7', height: '180px' }}
  />
  <Box sx={{ flex: '1 1 45%', minWidth: 0, width: { xs: '100%', md: '45%' } }}>
    <Comment id={data?._id} />
  </Box>
</Box>
 ):null}
    </Box>
  )
}

export default Details