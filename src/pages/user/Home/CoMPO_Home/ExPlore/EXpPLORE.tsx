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

type FacilityType = {
  _id: string;
  name: string;
};

type CreatedByType = {
  _id: string;
  userName: string;
};

type RoomType = {
  _id: string;
  roomNumber: string;
  images: string[];
  price: number;
  capacity: number;
  discount: number;
  facilities: FacilityType[];
  createdBy: CreatedByType;
  createdAt: string;
  updatedAt: string;
};

type RoomResponseType = {
  data: {
    rooms: RoomType[];
    totalCount: number;
  };
};

type BookingDataType = {
  startDate?: string;
  endDate?: string;
  capacity?: number;
};

const Explore = () => {
  const defaultImages = [img1, img2, img3, img4, img5];
  const navigate = useNavigate();
  const fallbackImg = useRef<string>(
    defaultImages[Math.floor(Math.random() * defaultImages.length)]
  );

  const [loader, setLoader] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);

  const { BookingData, loginData } = useContext(AuthContext) as {
    BookingData: BookingDataType;
    loginData: { role?: string };
  };

  const [roomData, setRoomData] = useState<RoomType[]>([]);
  const size = 8;

  const fetchRooms = async (page: number) => {
    setLoader(true);
    try {
      const params: any = {
        page,
        size,
        ...(BookingData?.startDate && {
          startDate: BookingData.startDate,
          endDate: BookingData.endDate,
          capacity: BookingData.capacity,
        }),
      };

      const endpoint =
        BookingData?.startDate && BookingData?.endDate
          ? `${PORTAL_URLS.AVAILABLE_ROOMS}/available`
          : `${PORTAL_URLS.AVAILABLE_ROOMS}/available`;

      const response = await axiosInstance.get<RoomResponseType>(endpoint, { params });
      setRoomData(response.data.data.rooms);
      setTotalCount(response.data.data.totalCount);
    } catch (error) {
      toast.error('Error fetching rooms');
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchRooms(1);
  }, [BookingData]);

  const totalPages = Math.ceil(totalCount / size);

  if (loader) return <Skeleton_Loader />;

  return (
    <div className="explore-container">
      <h2>Explore All Rooms</h2>
      {roomData.length > 0 ? (
        <div className="rooms-grid">
          {roomData.map((room, idx) => (
            <div key={room._id} className="room-card">
              <div className="room-image-container">
                <img
                  src={
                    room.images?.[0] || defaultImages[idx % defaultImages.length] || fallbackImg.current
                  }
                  alt={`Room ${room.roomNumber}`}
                  className="room-image"
                />
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

                {room.facilities?.length > 0 && (
                  <div className="facilities-container">
                    <div className="facilities-title">Facilities:</div>
                    <div className="facilities-list">
                      {room.facilities.map((facility) => (
                        <span key={facility._id} className="facility-tag">
                          {facility.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="room-meta">
                  <div className="meta-item">
                    <PeopleIcon className="room-detail-icon" />
                    <span className="meta-label">Created by:</span> {room.createdBy.userName}
                  </div>
                  <div className="meta-item">
                    <CalendarTodayIcon className="room-detail-icon" />
                    {new Date(room.createdAt).toLocaleDateString()}
                  </div>
                  <div className="meta-item">
                    <PersonIcon className="room-detail-icon" />
                    <span className="meta-label">Updated:</span>{' '}
                    {new Date(room.updatedAt).toLocaleDateString()}
                  </div>
                </div>
              </div>

              {(loginData?.role || localStorage.getItem('token')) && (
                <Box sx={{ display: 'flex', justifyContent: 'center', padding: '.5rem' }}>
                  <Button
                    onClick={() => navigate('/MasterUser/Details', { state: room })}
                  >
                    Details
                  </Button>
                </Box>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="no-rooms-message">
          <p>No rooms available at the moment</p>
        </div>
      )}

      <Stack spacing={2} direction="row" justifyContent="center" alignItems="center" sx={{ height: '20vh' }}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(event, value) => {
            setCurrentPage(value);
            fetchRooms(value);
          }}
          variant="outlined"
          color="primary"
        />
      </Stack>
    </div>
  );
};

export default Explore;
