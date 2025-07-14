import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { Box } from '@mui/material';
import { useLocation , Link as RouterLink } from 'react-router-dom';
import { useEffect } from 'react';


function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}
export default function TitleDetails({data}) {

  const location = useLocation();

  const pathnames = location.pathname.split('/').filter((x) => x);
  

  return (
    <Box className='TitleDetails' sx={{display:'flex' , justifyContent:'space-between',flexDirection:'column',alignItems:'center',flexWrap:'wrap', marginBottom:'2rem'}}>
      <Box role="presentation" onClick={handleClick}>
   
  <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" component={RouterLink} to="/">
          Home
        </Link>

        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;

          return isLast ? (
            <Typography color="text.primary" key={name}>
              {decodeURIComponent(name)}
            </Typography>
          ) : (
            <Link
              underline="hover"
              color="inherit"
              component={RouterLink}
              to={routeTo}
              key={name}
            >
              {decodeURIComponent(name)}
            </Link>
          );
        })}
      </Breadcrumbs>



      </Box>
      <Box className="title" sx={{display:'flex',flexDirection:'column',flexWrap:'wrap',textAlign:'center' ,width:'100%'}}>
        <Box className='village' sx={{fontSize:'3rem', fontWeight:'bold',textAlign:'center'}}>Village Angga</Box>
        <Box sx={{color:'#B0B0B0', fontSize:'18px',textAlign:'center'}}>Bogor, Indonesia</Box>
      </Box>
    </Box>
  )
}

