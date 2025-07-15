import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Box, useMediaQuery, useTheme } from '@mui/material';

import Checkbox from '@mui/material/Checkbox';
import './PopularAds.css'
import FavoriteIcon from '@mui/icons-material/Favorite';
import Favorite from '@mui/icons-material/Favorite';
import { axiosInstance, FAVORITE_URL, ROOMS_USER_URL } from '../../../../services/Url';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Skeleton_Loader } from '../review/Skeleton';


function srcset(image: string, width: number, height: number, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${width * cols}&h=${
      height * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}



export default function PopularAds() {
    const navigation = useNavigate()
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const[rooms, setRooms]= useState([]);
    const [loader , setLoader] = useState(false)

      const theme = useTheme();
      const isXs = useMediaQuery(theme.breakpoints.down('sm'));
      const isSm = useMediaQuery(theme.breakpoints.between('sm', 'md'));
      const isLg = useMediaQuery(theme.breakpoints.up('lg'));

      const addFavorite = async(roomId, isChecked)=>{
        
        try {
            let response;
            if(isChecked){
                 response = await axiosInstance.post(FAVORITE_URL.CREATE, {roomId:roomId})
            }else{
                response = await axiosInstance.delete(FAVORITE_URL.DELETE(roomId), {
                    data: { roomId }
                    });
            }
            console.log(response);
            
        } catch (error) {
            console.log(error);
            
        }
      }
    
    const getRooms = async() =>{
        setLoader(true)
        try {
            const response = await axiosInstance(ROOMS_USER_URL.GET,{params:{page:1,size:5}})
            setRooms(response.data.data.rooms)
            ;
            console.log(response.data.data.rooms);
            
        } catch (error) {
                console.log(error);
                
        }finally{
            setLoader(false)
        }
    }
    useEffect(()=>{
        getRooms();

    },[])
  
    const widthImages= ()=>{
        
        if(isLg){
            return '1200px'
        }
        
        return '100%'
    }
   if (loader) return( <Skeleton_Loader/>)
  return (
    <Box sx={{display:'flex', justifyContent:'center', flexWrap:'wrap'}}>
            <Box component={'h2'} sx={{textAlign:'center',width:'100%',textTransform:'capitalize'}} mb={1} >Most popular ads</Box>
            <ImageList
            sx={{
                width: widthImages(),
                maxWidth:'1670px',
                padding :'1rem',
                height : isLg? 500 :'auto',
                transform: 'translateZ(0)',
            }}
            rowHeight={200}
            cols={4}
            >
            {
         rooms.length&&
         (      
            rooms.map((room,index) => {
                let cols = 1
                let rows = 1;
                if(!index){
                    rows = 2
                    cols = 2
                    if(isXs || isSm){
                        cols = 4
                        rows = 2
                    }
                }
                if((index && isXs)|| (index && isSm)){
                    rows = 2
                    cols = 4
                }
                return (
                <ImageListItem key={room._id} cols={cols} rows={rows}>
                    <img
                        {...srcset(itemData[index].img, 250, 200, rows, cols)}
                        alt={room.roomNumber}
                        loading="lazy"
                        style={{borderRadius:'1rem',position:'relative'}}
                    />
                    <ImageListItemBar
                    sx={{
                        background:'transparent',
                        borderRadius:'1rem'
                    }}
                    position="top"
                    
                    actionIcon={
                        <IconButton
                                sx={{ color: 'white',background:'#FF498B' ,borderRadius:0,
                                        borderTopRightRadius:'1rem',
                                        borderBottomLeftRadius:'1rem',

                                }}
                        >
                                {`${room.price} per night`}
                        </IconButton>
                    }
                    actionPosition="right"
                    />



                    <ImageListItemBar
                    sx={{
                        background:'transparent',
                        borderRadius:'1rem'
                    }}
                    position="bottom"
                    
                    actionIcon={
                        <IconButton
                        sx={{ color: 'white',background:'transparent' ,borderRadius:0,
                            display:'flex',
                            justifyContent:'center',
                            flexDirection:'column',
                            margin :'1.5rem'

                        }}
                        >
                            <Box>

                                {`${itemData[index].title}`}
                                
                            </Box>
                        </IconButton>
                    }
                    actionPosition="left"
                    />




                    <ImageListItemBar
                    
                        className='icons-show'
                    sx={{
                        background:'transparent',
                        borderRadius:'1rem',
                        position:'absolute',
                        top:'50%',
                        left:'50%',
                        transform:'translate(-50%, -50%)'
                    }}
                    
                    actionIcon={
                        <IconButton
                        sx={{ color: 'white',background:'transparent' ,borderRadius:0,
                            display:'flex', alignItems:'center',justifyContent:'center'
                        
                        }}
                        >
                            <Box sx={{display:'flex',alignItems:'center', justifyContent:'center'}}>
                                
                                    <Checkbox 
                                        onChange={(event)=>{
                                            const isChecked = event.target.checked;
                                            addFavorite(room._id,isChecked)
                                            
                                        }}
                                    {...label} icon={
                                    <FavoriteIcon 
                                        sx={{fontSize:'2rem',color:'#fff' }}/>} checkedIcon={
                                    <Favorite 
                                        sx={{fontSize:'2rem' }} />} />
                            
                                    < VisibilityIcon  sx={{fontSize:'2rem' }} onClick={()=>{ navigation('/MasterUser/Details/',{state:room})}}/>
                            
                            </Box>
                        </IconButton>
                    }
                    actionPosition="right"
                    />





                </ImageListItem>
                );
            })
            
        )
            }
            </ImageList>
    </Box>
  );
}

const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'London',
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Paris',
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Barcelona',
  },
  {
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    title: 'Dubai',
  },
  {
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    title: 'Istanbul',
  },
 
];