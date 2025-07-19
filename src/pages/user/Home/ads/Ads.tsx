
import { useEffect, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import image1 from '../../../../assets/images/slider/slider1.png'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import './ads.css';

// import required modules
import { Autoplay, Pagination } from 'swiper/modules';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { ADS_URL, axiosInstance } from '../../../../services/Url';
import { useNavigate } from 'react-router-dom';
import { Skeleton_Loader } from '../review/Skeleton';



export default function Ads() {
    const [ads, setAds] = useState([]);
    const [loader , setLoader] = useState(false)
    const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.down('sm'));
    const isSm = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    const isLg = useMediaQuery(theme.breakpoints.up('lg'));
    
    const navigation = useNavigate()
    const getAds = async()=>{
          setLoader(true)
        try {
            const response = await axiosInstance(ADS_URL.GET)
            setAds(response?.data?.data?.ads)
            
            
        } catch (error:any) {
            console.log(error);
            
        }finally{
          setLoader(false)
        }
    }
    useEffect(()=>{
        getAds()
    },[])
    if(loader) return (
      <Box sx={{display:'flex' , justifyContent:'space-between' ,gap:'0rem' ,alignItems:'center',width:'100%'}}>
    
        {Array.from({ length: ( isLg? 4 : (isSm? 2 : (isXs ? 1 : 3)) ) }).map((_, i) => (
          <Box key={i} width={'100%'}>
            <Skeleton_Loader />
          </Box>
            
          ))}  
      
      </Box>
      )
  return (
    <Box className='review' sx={{padding:'1rem'}}>
        {/* {console.log(ads) } */}
      <Swiper
        slidesPerView={isLg? 4 : (isSm? 2 : (isXs ? 1 : 3))}
        spaceBetween={5}
        pagination={{
          clickable: true,
        }}
        loop={true}
        autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          modules={[Pagination, Autoplay]}
        className="mySwiper"
      >

        {ads.length?(
            ads.map((ads:any)=>{
                return(
                    <SwiperSlide key={ads._id} onClick={()=>{navigation('/MasterUser/Details',{state:ads.room})}}>
                        <img src={ads?.room?.images[0] || image1} alt="imgs" />
                        <Box component={'p'} sx={{
                            color:'#FFF',background:'#FF498B',position:'absolute',top:'0', right:'0',
                            padding:'8px 15px',
                            borderTopRightRadius:'1rem',
                            borderBottomLeftRadius:'1rem',
                            
                            }}>{ads?.room?.discount}% Off</Box>

                            <Box sx={{display:'flex' , justifyContent:'start',alignItems:'start',flexDirection:'column' ,width:"100%", padding:'.3rem'}}>
                                <Box>{ads.room?.roomNumber}</Box>
                                <Box sx={{color:'#B0B0B0'}}>Depok, Indonesia</Box>
                            </Box> 
                    </SwiperSlide>
                )
            })
        ):null}
  
      </Swiper>
    </Box>
  );
}
