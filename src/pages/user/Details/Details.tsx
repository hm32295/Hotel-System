import { Box } from "@mui/material"
import TitleDetails from "./TitleDetails/TitleDetails"
import Gallery from "./Gallery/Gallery"
import DescriptionAndFacilities from "./DescriptionAndFacilities/DescriptionAndFacilities"
import ToBooking from "./ToBooking/ToBooking"
import Rate from "./Rate/Rate"
import Comment from "./Comment/Comment"

import './details.css'
import { useLocation } from "react-router-dom"
import { useEffect, useState } from "react"



const Details = () => {
    const location = useLocation();
    const [data,setData] = useState(null);
    useEffect(()=>{
        setData(location.state)
        
    },[data])
    if(!data) return
  return (
    <Box sx={{padding:'1rem'}}>
        <TitleDetails data={data}/>
        <Gallery data={data}/>
        <Box sx={{display:'flex' ,gap:'1.5rem',mt:'60px',flexWrap:'wrap'}}>
            <DescriptionAndFacilities data={data}/>
            <ToBooking data={data}/>
          
        </Box>
        <Box sx={{mt:'2rem',border:' 1px solid #E5E5E5',p:'8px' , display:'flex',flexWrap:'wrap' ,alignItems:'center' ,justifyContent:'center',gap:'2rem'}}>
            <Rate id={data._id} />
            <Box className='border-comment' sx={{width:'1px' , background:'#203FC7', height:'180px'}}></Box>
            <Comment id={data._id} />
        </Box>
    </Box>
  )
}

export default Details