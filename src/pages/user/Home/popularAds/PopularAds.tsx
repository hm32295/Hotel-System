import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import './PopularAds.css';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Favorite from '@mui/icons-material/Favorite';
import { axiosInstance, FAVORITE_URL, ROOMS_USER_URL } from '../../../../services/Url';
import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Skeleton_Loader } from '../review/Skeleton';
import img1 from '../../../../assets/images/adsPopular/1.png';
import img2 from '../../../../assets/images/adsPopular/2.png';
import img3 from '../../../../assets/images/adsPopular/3.png';
import img4 from '../../../../assets/images/adsPopular/4.png';
import img5 from '../../../../assets/images/adsPopular/5.png';
import { AuthContext } from '../../../../context/context';

interface Room {
  _id: string;
  roomNumber: string;
  price: number;
}

function srcset(image: string, width: number, height: number, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format&dpr=2 2x`,
  };
}

interface ItemData {
  img: string;
  title: string;
}

export default function PopularAds() {
  const { loginData } = useContext(AuthContext);
  const navigation = useNavigate();
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loader, setLoader] = useState<boolean>(false);
  const [favorite, setFavorite] = useState<Room[]>([]);

  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('sm'));
  const isSm = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isLg = useMediaQuery(theme.breakpoints.up('lg'));
  const isSmall1024 = useMediaQuery('(max-width:1024px)');

  const addFavorite = async (room: Room, isChecked: boolean) => {
    try {
      if (isChecked) {
        await axiosInstance.post(FAVORITE_URL.CREATE, { roomId: room._id });
        setFavorite((prev) => [...prev, room]); 
        navigation('/MasterUser/Favorites'); 
      } else {
        await axiosInstance.delete(FAVORITE_URL.DELETE(room._id)); 
        setFavorite((prev) => prev.filter((favRoom) => favRoom._id !== room._id));
      }
    } catch (error) {
      console.log('Favorite error:', error);
    }
  };

  const getFavorite = async () => {
    try {
      const response = await axiosInstance(FAVORITE_URL.GET);
      setFavorite(response?.data?.data?.favoriteRooms[0]?.rooms || []);
    } catch (error) {
      console.log(error);
    }
  };

  const getRooms = async () => {
    setLoader(true);
    try {
      const response = await axiosInstance(ROOMS_USER_URL.GET, { params: { page: 1, size: 5 } });
      setRooms(response.data.data.rooms || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    getRooms();
    getFavorite();
  }, []);

  const widthImages = () => {
    if (isLg) return '1200px';
    return '100%';
  };

  if (loader) return <Skeleton_Loader />;

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', marginTop: '20px' }}>
      <Box
        component="h2"
        sx={{
          textAlign: 'center',
          width: '100%',
          textTransform: 'capitalize',
          color: 'rgba(21, 44, 91, 1)',
        }}
        mb={5}
      >
        Most popular ads
      </Box>
      <ImageList
        className="popular-ads"
        sx={{
          width: widthImages(),
          maxWidth: '1670px',
          padding: '1rem',
          height: isLg ? 500 : 'auto',
          transform: 'translateZ(0)',
        }}
        rowHeight={200}
        cols={isSmall1024 ? 2 : 4}
      >
        {rooms.length ? (
          rooms.map((room: Room, index: number) => {
            let cols = 1;
            let rows = 1;

            if (isSmall1024) {
              cols = index === rooms.length - 1 ? 2 : 1;
              rows = 1;
            } else {
              if (index === 0) {
                cols = 2;
                rows = 2;
              }
            }

            return (
              <ImageListItem key={room._id} cols={cols} rows={rows}>
                <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
                  <img
                    {...srcset(itemData[index]?.img, 250, 200, rows, cols)}
                    alt={room?.roomNumber}
                    loading="lazy"
                    style={{ borderRadius: '1rem', width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      bgcolor: '#203FC736',
                      opacity: 0,
                      transition: 'opacity 0.3s ease-in-out',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '1rem',
                      zIndex: 1,
                      '&:hover': { opacity: 1 },
                    }}
                  >
                    <Box sx={{ mb: 2, fontSize: '1.2rem', fontWeight: 'bold', color: '#fff' }}>
                      {itemData[index]?.title}
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Checkbox
                        onChange={(e) => addFavorite(room, e.target.checked)}
                        checked={favorite.some((favRoom) => favRoom._id === room._id)}
                        {...label}
                        icon={<FavoriteIcon sx={{ fontSize: '2.5rem', color: '#fff' }} />}
                        checkedIcon={<Favorite sx={{ fontSize: '2.5rem', color: '#ff1744' }} />}
                      />
                      <IconButton
                        onClick={() => navigation('/MasterUser/Details/', { state: room })}
                        sx={{
                          color: '#fff',
                          backgroundColor: 'transparent',
                          '&:hover': { color: '#90caf9' },
                        }}
                      >
                        <VisibilityIcon sx={{ fontSize: '2.5rem' }} />
                      </IconButton>
                    </Box>
                  </Box>
                  <ImageListItemBar
                    sx={{ background: 'transparent', borderRadius: '1rem' }}
                    position="top"
                    actionIcon={
                      <IconButton
                        sx={{
                          color: 'white',
                          background: '#FF498B',
                          borderRadius: 0,
                          borderTopRightRadius: '1rem',
                          borderBottomLeftRadius: '1rem',
                        }}
                      >
                        {`${room.price} per night`}
                      </IconButton>
                    }
                    actionPosition="right"
                  />
                </Box>
              </ImageListItem>
            );
          })
        ) : 'Not  Found'}
      </ImageList>
    </Box>
  );
}

const itemData: ItemData[] = [
  { img: img1, title: 'London' },
  { img: img2, title: 'Paris' },
  { img: img3, title: 'Barcelona' },
  { img: img4, title: 'Dubai' },
  { img: img5, title: 'Istanbul' },
];