import React, { useEffect, useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';

import './review.css';

// import required modules
import { Autoplay, EffectCards, Pagination } from 'swiper/modules';
import { Box, Rating } from '@mui/material';
import {  axiosInstance, ROOM_REVIEW_URL, ROOMS_USER_URL } from '../../../../services/Url';
import { Skeleton_Loader } from './Skeleton';


export default function Review() {
  const [roomsWithReviews, setRoomsWithReviews] = useState([]);
  const [loader , setLoader] = useState(false)
  
  const getRooms = async () => {
    setLoader(true)
    try {
      const response = await axiosInstance(ROOMS_USER_URL.GET);
      const rooms = response?.data?.data?.rooms;

      const roomsWithReviewsPromises = rooms.map(async (room) => {
        const reviews = await getReviews(room._id);
        return { id: room._id, reviews };
      });

      const results = await Promise.all(roomsWithReviewsPromises);
      setRoomsWithReviews(results);
    } catch (error) {
      console.log(error);
    }finally{
      setLoader(false)
    }
  };

  const getReviews = async(id)=>{
    let data =[];
    try {
        const response = await axiosInstance(ROOM_REVIEW_URL.GET(id))
        
        data = response?.data?.data?.roomReviews;
        
        
    } catch (error) {
        console.log(error);
        
    }
    return data
  }

  useEffect(()=>{getRooms()},[])

  if(loader) return <Box maxWidth={1000} mx={"auto"} p={2} > <Skeleton_Loader /></Box>
  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto', p: 2 ,overflow:'hidden'}} className='ads'>
            <Swiper
              effect={'cards'}
              grabCursor={true}
              className="mySwiper"
              loop={true}
              autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                modules={[EffectCards, Autoplay]}
            >
              {roomsWithReviews.flatMap((room) =>
                  room.reviews.map((rev, idx) => (
                    <SwiperSlide key={`${room.id}-${idx}`}>
                      <Box
                      className="review_Box"
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          height: '100%',
                          boxShadow: 'inset 0px -1px 20px 14px #eee',
                          width: '100%',
                        }}
                      >
                        <img
                          src={rev.user.profileImage}
                          alt={rev?.user?.userName}
                          style={{ borderBottomRightRadius: '5rem' }}
                        />
                        <Box sx={{ flex: '1', padding: '1.5rem' }}>
                          <Box
                            component={'h3'}
                            sx={{
                              mb: '2rem',
                              fontSize: '24px',
                              textTransform: 'capitalize',
                            }}
                          >
                            {rev?.user?.userName}
                          </Box>
                          <Rating
                            name="simple-controlled"
                            value={rev?.rating}
                            readOnly
                            sx={{ mb: '.5rem' }}
                          />
                          <Box
                            className='description'
                            sx={{
                              fontSize: '1.8rem',
                              textTransform: 'capitalize',
                              lineHeight: '1.1',
                              fontWeight: '400',
                            }}
                          >
                            {rev?.review}
                          </Box>
                          <Box
                            component={'p'}
                            sx={{
                              color: '#B0B0B0',
                              fontSize: 'capitalize',
                              fontWeight: '300',
                              mt: 1,
                            }}
                          >
                            Angga, Product Designer
                          </Box>
                        </Box>
                      </Box>
                    </SwiperSlide>
                  ))
                )
                }
            </Swiper>


    </Box>
  );
}