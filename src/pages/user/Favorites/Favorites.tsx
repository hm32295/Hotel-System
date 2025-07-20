import { useContext, useEffect, useRef, useState } from 'react';
import '../Home/CoMPO_Home/ExPlore/explore.css';


import { toast } from 'react-toastify';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
import PeopleIcon from '@mui/icons-material/People';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonIcon from '@mui/icons-material/Person';
import img1 from '../../../assets/images/Rectangle 3 (1).svg';
import img2 from '../../../assets/images/Rectangle 3 (2).svg';
import img3 from '../../../assets/images/Rectangle 3 (3).svg';
import img4 from '../../../assets/images/Rectangle 3 (4).svg';
import img5 from '../../../assets/images/Rectangle 3 (5).svg';
import { axiosInstance, FAVORITE_URL } from '../../../services/Url';
import { Skeleton_Loader } from '../Home/review/Skeleton';
import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Favourits = () => {
  const navigation = useNavigate()
  const defaultImages = [img1, img2, img3, img4, img5];
  const[loader , setLoader] = useState(false)
  const fallbackImg = useRef(defaultImages[Math.floor(Math.random() * defaultImages.length)]);
  let [data_Kollow, setdata_Kollow] = useState([]);
 const FUN_GET_DATA_DETAILS = async () => {
  setLoader(true)
  try {
      const  response = await axiosInstance.get(FAVORITE_URL.GET);
      setdata_Kollow( response.data.data.favoriteRooms);
    
  } catch (error) {
    toast.error("Error in Showing Data");
  }finally{
    setLoader(false)
  }
};
  useEffect(() => {
    FUN_GET_DATA_DETAILS();
  }, []);

const FAV_Delete = async (roomId:any) => {
   setLoader(true)
  try {
   
      let response = await axiosInstance.delete( FAVORITE_URL.DELETE(roomId),{ data: { roomId } });
     
      FUN_GET_DATA_DETAILS()
       toast.success('Product deleted successfully');


  } catch (err) {
      console.log('DELETE error  :', err?.status, err?.data);
    toast.error('Error removing item')
  }finally{ setLoader(false)}
}
const roomsToDisplay = data_Kollow[0]?.rooms || [];
if(loader) return <Skeleton_Loader />
  return (
    <div className="explore-container">
      <h2>Your Favorites</h2>
      {roomsToDisplay.length > 0 ? (
    <div className="rooms-grid">
  {roomsToDisplay.map((room, idx) => ( 
    <div key={room._id} className="room-card">
      <div className="room-image-container">
        {room.images && room.images.length > 0 ? (
          <img
            src={room.images?.[0] || defaultImages[idx % defaultImages.length]}
            alt={`Room ${room.roomNumber}`}
            className="room-image"
          />
        ) : (
          <img
            src={fallbackImg.current}
            alt="Room placeholder"
            className="room-image"
          />
        )}
        <div className="price-badge">${room.price}</div>
        {room.discount > 0 && (
          <div className="discount-badge">-{room.discount}%</div>
        )}
      </div>

      <div className="room-content">
        <h3 className="room-title">Room {room.roomNumber}</h3>
        <div className="room-details">
          <div className="room-detail-item">
            <PeopleIcon className="room-detail-icon" />
            <span>Capacity: {room.capacity}</span>
          </div>
          <div className="room-detail-item">
            <PeopleIcon className="room-detail-icon" />
            <span>Discount: {room.discount}%</span>
          </div>
        </div>

        <div className="facilities-container">
          <div className="facilities-title">remove on Favourite:</div>
          <span
            onClick={() => FAV_Delete(room._id)}
            className="facility-tag"
          >
            <HeartBrokenIcon />
          </span>
        </div>

        <div className="room-meta">
          <div className="meta-item">
            <PeopleIcon className="room-detail-icon" style={{ display: 'inline', marginRight: '4px' }} />
            <span className="meta-label">Created by:</span> {room.createdBy.userName}
          </div>
          <div className="meta-item">
            <CalendarTodayIcon className="room-detail-icon" style={{ display: 'inline', marginRight: '4px' }} />
            {new Date(room.createdAt).toLocaleDateString()}
          </div>
          <div className="meta-item">
            <PersonIcon className="room-detail-icon" style={{ display: 'inline', marginRight: '4px' }} />
            <span className="meta-label">Updated:</span> {new Date(room.updatedAt).toLocaleDateString()}
          </div>
        </div>
      </div>

      <Box sx={{display:'flex',justifyContent:'center',padding:'.5rem'}}>
        <Button onClick={()=>{navigation('/MasterUser/Details',{state:room})}}>Details</Button>

      </Box>
    </div>
  ))}
</div>
      ) : (
        <div className="no-rooms-message">
          <p>No rooms available at the moment</p>
        </div>
      )}
    
    </div>
  );
};

export default Favourits;