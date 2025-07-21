import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import image1 from '../../../../assets/images/room1 (1).png';
import image2 from '../../../../assets/images/room2.png';
import image3 from '../../../../assets/images/room3.png';
import { useMediaQuery, useTheme } from '@mui/material';
import Box from '@mui/material/Box';

function srcset(image: string, size: number, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

export default function Gallery({ data }) {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('sm'));
  const isSm = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isMd = useMediaQuery(theme.breakpoints.between('md', 'lg'));

  const getCols = () => {
    if (isXs) return 2;
    if (isSm) return 4;
    if (isMd) return 4;
    return 4;
  };

  const itemData = [
    { img: image1, title: 'Breakfast', rows: 2, cols: 2 },
    { img: image2, title: 'Burger',    rows: 1, cols: 2 },
    { img: image3, title: 'Camera',    rows: 1, cols: 2 },
  ];

  const containerHeight = isXs ? 'auto' : 400;

  const selectedImageStyle: React.CSSProperties = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  display: "block",
};

  return (
    <Box sx={{ width: '100%', height: containerHeight, overflow: isXs ? 'visible' : 'hidden' }}>
      {data?.images?.length > 0 ? (
        <img
          src={data.images[0]}
          alt="Selected Image"
          style={selectedImageStyle}
        />
      ) : (
        <ImageList
          sx={{ width: '100%', height: getCols() === 4 ? 400 : 800 }}
          variant="quilted"
          rowHeight={195}
          cols={4}
        >
          {itemData.map((item) => (
            <ImageListItem key={item.img} cols={item.cols} rows={item.rows}>
              <img
                {...srcset(item.img, 121, item.rows, item.cols)}
                alt={item.title}
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </ImageListItem>
          ))}
        </ImageList>
      )}
    </Box>
  );
}