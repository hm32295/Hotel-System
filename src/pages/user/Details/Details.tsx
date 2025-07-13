import { Box } from "@mui/material"
import TitleDetails from "./TitleDetails/TitleDetails"
import Gallery from "./Gallery/Gallery"
import DescriptionAndFacilities from "./DescriptionAndFacilities/DescriptionAndFacilities"
import ToBooking from "./ToBooking/ToBooking"
import Rate from "./Rate/Rate"
import Comment from "./Comment/Comment"

import './details.css'

const data ={
    "_id": "6873a575ccc448ef859ee1ad",
    "roomNumber": "1000",
    "price": 1015,
    "capacity": 2,
    "discount": 2,
    "facilities": [
        {
            "_id": "68729f80ccc448ef859ebb0e",
            "name": "TWINZz"
        },
        {
            "_id": "6872479bccc448ef859eb567",
            "name": "edit"
        },
        {
            "_id": "68724571ccc448ef859eb481",
            "name": "test"
        },
        {
            "_id": "687247c9ccc448ef859eb56a",
            "name": "Name"
        }
    ],
    "createdBy": "68656751ccc448ef859d40df",
    "images": [
        "http://res.cloudinary.com/dpa4yqvdv/image/upload/v1752409460/rooms/wc5fj1kjwrjmqniudsnb.png"
    ],
    "createdAt": "2025-07-13T12:24:21.085Z",
    "updatedAt": "2025-07-13T12:24:21.085Z",
    "isBooked": false
}








const Details = () => {
 
  return (
    <Box sx={{padding:'1rem'}}>
        <TitleDetails data={data}/>
        <Gallery data={data}/>
        <Box sx={{display:'flex' ,gap:'1.5rem',mt:'60px',flexWrap:'wrap'}}>
            <DescriptionAndFacilities data={data}/>
            <ToBooking data={data}/>
          
        </Box>
        <Box sx={{mt:'2rem',border:' 1px solid #E5E5E5',p:'40px' , display:'flex',flexWrap:'wrap' ,alignItems:'center' ,justifyContent:'center',gap:'2rem'}}>
            <Rate id={data._id} />
            <Box className='border-comment' sx={{width:'1px' , background:'#203FC7', height:'180px'}}></Box>
            <Comment id={data._id} />
        </Box>
    </Box>
  )
}

export default Details