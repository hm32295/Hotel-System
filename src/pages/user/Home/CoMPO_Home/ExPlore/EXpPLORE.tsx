import { useContext, useEffect, useRef, useState } from 'react';
import './explore.css';
import { axiosInstance, PORTAL_URLS } from '../../../../../services/Url';
import { toast } from 'react-toastify';
import { AuthContext } from '../../../../../context/context';
import PeopleIcon from '@mui/icons-material/People';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonIcon from '@mui/icons-material/Person';
import img1 from '../../../../../assets/images/Rectangle 3 (1).svg';
import img2 from '../../../../../assets/images/Rectangle 3 (2).svg';
import img3 from '../../../../../assets/images/Rectangle 3 (3).svg';
import img4 from '../../../../../assets/images/Rectangle 3 (4).svg';
import img5 from '../../../../../assets/images/Rectangle 3 (5).svg';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { Skeleton_Loader } from '../../review/Skeleton';
import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const EXpPLORE = () => {
  const defaultImages = [img1, img2, img3, img4, img5];
  const navigation = useNavigate()
  const fallbackImg = useRef(
    defaultImages[Math.floor(Math.random() * defaultImages.length)]
  );

  const [loader , setLoader] =useState(false)
  const [currentPage, setCurrentPage] = useState(1); 
  const [totalCount, setTotalCount] = useState(0); 
  const { BookingData ,loginData} = useContext(AuthContext);
  let [data_Mohada, setdata_Mohada] = useState([]);
  let [data_Kollow, setdata_Kollow] = useState([]);
  const size = 8; 

  const FUN_GET_DATA_DETAILS = async (page, size) => {
    setLoader(true)
    try {
      if (BookingData?.startDate && BookingData?.endDate) {
        const res = await axiosInstance.get(
          `${PORTAL_URLS.AVAILABLE_ROOMS}/available?page=${page}&size=${size}`,
          {
            params: {
              startDate: BookingData.startDate,
              endDate: BookingData.endDate,
              capacity: BookingData.capacity,
            },
          }
        );
        setdata_Mohada(res.data);
        setTotalCount(res.data.totalCount);
      } else {
        try {
          const res = await axiosInstance.get(
            `${PORTAL_URLS.AVAILABLE_ROOMS}/available?page=${page}&size=${size}`
          );
          setdata_Kollow(res.data);
          setTotalCount(res.data.totalCount);
        } catch (error:any) {
            if(error.response){
              toast.error("Error in Showing Data");
            }
        }
      }
    } catch (error:any) {
      if(error.response){
        toast.error("Error");
      }
    }finally{
      setLoader(false)
    }
  };

  useEffect(() => {
    FUN_GET_DATA_DETAILS(1, 8);
  }, [BookingData]);

  const roomsToDisplay = data_Mohada?.data?.rooms || data_Kollow?.data?.rooms || [];
  const totalPages = Math.ceil(totalCount / size);
  if(loader) return <Skeleton_Loader />
  return (
    <div className="explore-container">
      <h2>Explore ALL Rooms</h2>
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

                {room.facilities && room.facilities.length > 0 && (
                  <div className="facilities-container">
                    <div className="facilities-title">Facilities:</div>
                    <div className="facilities-list">
                      {room.facilities.map((facility, index) => (
                        <span key={index} className="facility-tag">
                          {facility.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="room-meta">
                  <div className="meta-item">
                    <PeopleIcon
                      className="room-detail-icon"
                      style={{ display: 'inline', marginRight: '4px' }}
                    />
                    <span className="meta-label">Created by:</span> {room.createdBy.userName}
                  </div>
                  <div className="meta-item">
                    <CalendarTodayIcon
                      className="room-detail-icon"
                      style={{ display: 'inline', marginRight: '4px' }}
                    />
                    {new Date(room.createdAt).toLocaleDateString()}
                  </div>
                  <div className="meta-item">
                    <PersonIcon
                      className="room-detail-icon"
                      style={{ display: 'inline', marginRight: '4px' }}
                    />
                    <span className="meta-label">Updated:</span>{' '}
                    {new Date(room.updatedAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
              {loginData?.role || localStorage.getItem('token') ?(

                  <Box sx={{display:'flex',justifyContent:'center',padding:'.5rem'}}>
                    <Button onClick={()=>{navigation('/MasterUser/Details',{state:room})}}>Details</Button>

                  </Box>
              ):null}
            </div>
          ))}

          
        </div>
      ) : (
        <div className="no-rooms-message">
          <p>No rooms available at the moment</p>
        </div>
      )}
      <Stack
        spacing={2}
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{ height: '20vh' }}
      >
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(event, value) => {
            setCurrentPage(value);
            FUN_GET_DATA_DETAILS(value, size); 
          }}
          variant="outlined"
          color="primary"
        />
      </Stack>
    </div>
  );
};

export default EXpPLORE;