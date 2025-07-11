
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { Box, Button, CardActions } from '@mui/material';


interface ViewDataProps {
  setShowData: (value: boolean) => void;
  data: {
    name: string;
    price: string;
    capacity: string;
    discount: string;
    image: {
      props :{
        src : string | [],
        alt:string
      }
    }; 
    
  };
}
export default function ViewData({setShowData ,data}:ViewDataProps) {

  return (
    <Card sx={{ maxWidth:345 }} onClick={(e)=>{e.stopPropagation()}}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={data?.image?.props?.src || data?.image?.props?.src[0]}
          alt={data?.image?.props?.alt}
        />
        <CardContent>
          <Typography sx={{gap:'.5rem',textTransform:"capitalize", display:'flex' , justifyContent:'space-between'}} gutterBottom variant="h5" component="div">
            <Box component={'span'}>Room Number</Box> <Box component={'span'}>{data.name}</Box>
          </Typography>
          <Typography sx={{gap:'.5rem',textTransform:"capitalize", display:'flex' , justifyContent:'space-between'}} gutterBottom variant="h5" component="div">
          <Box component={'span'}>price</Box><Box component={'span'}>{data.price}</Box>
          </Typography>
          <Typography sx={{gap:'.5rem',textTransform:"capitalize", display:'flex' , justifyContent:'space-between'}} gutterBottom variant="h5" component="div">
             <Box component={'span'}>discount</Box><Box component={'span'}>{data.discount}</Box>
          </Typography>
          <Typography sx={{gap:'.5rem',textTransform:"capitalize", display:'flex' , justifyContent:'space-between'}} gutterBottom variant="h5" component="div">
              <Box component={'span'}>capacity</Box><Box component={'span'}>{data.capacity}</Box>
          </Typography>
         
        </CardContent>
        <CardActions>
            <Button onClick={()=> setShowData(false)} size="small">Ok</Button>
        </CardActions>
      </CardActionArea>
    </Card>
  );
}