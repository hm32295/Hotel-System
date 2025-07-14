
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import image1 from '../../../../assets/images/room1 (1).png'
import image2 from '../../../../assets/images/room2.png'
import image3 from '../../../../assets/images/room3.png'

import { useMediaQuery, useTheme } from '@mui/material';
function srcset(image: string, size: number, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

export default function Gallery({data}) {
   const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('sm'));
  const isSm = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isMd = useMediaQuery(theme.breakpoints.between('md', 'lg'));

  const getCols = () => {
   
    if (isXs) return 2
    if (isSm) return 4;
    if (isMd) return 4;
    return 4; 
  };

  const itemData = [
  {
    img: image1,
    title: 'Breakfast',
    rows: 2,
    cols:!isXs ? 2: 4,
  },
  {
    img:image2,
    title: 'Burger',
    cols:isXs? 4 : 2,
    rows:1
  },
  {
    img:image3,
    title: 'Camera',
    cols:isXs? 4 : 2,
    rows: 1
  },
]

const heightGallery =(img,getCols)=>{
  if(img){
    return getCols() === 4? 800:1200
  }
    return  getCols() === 4 ? 400:800
}
  return (
    <ImageList
      sx={{ width: "100%", height:heightGallery(data?.images[0] ,getCols)  }}
      variant="quilted"
      rowHeight={195}
      
      cols={4}
    >
       {data?.images.length?

      (<ImageListItem key={data?.images[0]} cols={ 4} rows={ 2}> 
          <img
            {...srcset(data?.images[0], 121, 4, /**getCols() */ 4)}
            alt={data?.images[0]}
            loading="lazy"
            // style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </ImageListItem>
      ):null}
      {itemData?.map((item) => (
        <ImageListItem key={item.img} cols={item.cols || 4} rows={item.rows || 2}>
          <img
            {...srcset(item.img, 121, item.rows, item.cols)}
            alt={item.title}
            loading="lazy"
          />
        </ImageListItem>
      ))}
     
    </ImageList>
  );
}

const itemData = [
  {
    img: image1,
    title: 'Breakfast',
    rows: 2,
    cols: 2,
  },
  {
    img:image2,
    title: 'Burger',
    cols:2,
    rows:1
  },
  {
    img:image3,
    title: 'Camera',
    cols:2,
    rows: 1
  },
  // {
  //   img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
  //   title: 'Coffee',
  //   cols: 1,
  // },
  // {
  //   img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
  //   title: 'Hats',
  //   cols: 1,
  // },
  // {
  //   img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
  //   title: 'Honey',
  //   author: '@arwinneil',
  //   rows: 2,
  //   cols: 2,
  // },
  // {
  //   img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
  //   title: 'Basketball',
  // },
  // {
  //   img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
  //   title: 'Fern',
  // },
  // {
  //   img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
  //   title: 'Mushrooms',
  //   rows: 2,
  //   cols: 2,
  // },
  // {
  //   img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
  //   title: 'Tomato basil',
  // },
  // {
  //   img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
  //   title: 'Sea star',
  // },
  // {
  //   img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
  //   title: 'Bike',
  //   cols: 2,
  // },
];