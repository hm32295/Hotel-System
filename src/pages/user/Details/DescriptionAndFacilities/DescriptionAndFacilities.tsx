import { Box } from '@mui/material'
import WifiIcon from '@mui/icons-material/Wifi';
import bathroom from '../../../../assets/images/roomDetails/bathroom.png'
import bedroom from '../../../../assets/images/roomDetails/bedroom.png'
import dining from '../../../../assets/images/roomDetails/dining room.png'
import living from '../../../../assets/images/roomDetails/living room.png'
import refigrator from '../../../../assets/images/roomDetails/refigrator.png'
import mbps from '../../../../assets/images/roomDetails/mbps.png'
import television from '../../../../assets/images/roomDetails/television.png'
import readym from '../../../../assets/images/roomDetails/unit ready.png';
import { useEffect } from 'react';

let facilities = [
  { img : bathroom,title:'bathroom'},
  { img : bedroom,title:'bedroom'},
  { img : dining ,title:'dining'},
  { img : living ,title:'living'},
  { img : refigrator ,title:'refigrator'},
  { img : mbps ,title:'mbps'},
  { img : television ,title:'television'},
  { img : readym ,title:'readym'},
]


export default function DescriptionAndFacilities({data}) {
  useEffect(()=>{
      facilities.length = data.facilities.length
  },[])
  return (
    <Box sx={{flex:'1',minWidth:'300px'}}>
        <Box component={"p"} sx={{lineHeight:'1.7', color:'#B0B0B0' , fontSize:'16px'}}>
            <Box component={'span'} sx={{display:'block'}}>
              Minimal techno is a minimalist subgenre of techno music. It is characterized by a stripped-down aesthetic that exploits the use of repetition and understated development. Minimal techno is thought to have been originally developed in the early 1990s by Detroit-based producers Robert Hood and Daniel Bell.
            </Box>
            <Box component={'span'} sx={{display:'block' ,mt:'1rem' ,mb:'1rem'}}>
              Minimal techno is a minimalist subgenre of techno music. It is characterized by a stripped-down aesthetic that exploits the use of repetition and understated development. Minimal techno is thought to have been originally developed in the early 1990s by Detroit-based producers Robert Hood and Daniel Bell.
            </Box>
        </Box>

        <Box sx={{display:'flex',mt:'30px' , justifyContent:'space-between', flexWrap:'wrap' ,gap:'1rem'}}>
            {facilities.map((item)=>{
              return(

                <Box key={item.title} sx={{width:'90px', display:'flex' , gap:'.5rem', flexDirection:'column'}}>
                  <img style={{width:'40px', height:'40px'}} src={item.img} alt={item.title} />
                  <Box component={'span'}>{item.title}</Box>
                </Box>
              )
            })}
        </Box>
    </Box>
  )
}
