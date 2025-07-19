import { PieChart } from '@mui/x-charts/PieChart';

import { axiosInstance, DASHBOARD_URL } from '../../../services/Url';
import {  useEffect, useState } from 'react';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import { Box } from '@mui/material';
import './Dashboard.css';

const size = {
  width: 200,
  height: 200,
};

const styleBox ={
    display:'flex', 
    padding:'1rem' ,
    borderRadius:'.75rem',
    backgroundColor:'#1A1B1E',
    justifyContent:'space-between',
    alignItems:'center',
    gap:'2rem',
    width : '170px'

  }

  const styleDetails ={
    display: 'flex',
    justifyContent:'center',
    gap: '2rem',
    backgroundColor:'transparent',
    color:'#fff',
    marginBottom: "2rem",
    flexWrap:'wrap'

  }
  const styleBoxDetails ={mb:0, display:'flex' , justifyContent:'center', flexDirection:'column', gap:'.2rem', alignItems:'center'}
  const styleUsers ={flex:'1',gap:'2rem' ,borderRadius:'.5rem' ,padding:'1rem', minWidth: '200px', display:'flex' , justifyContent:'center', alignItems:'center', flexWrap:'wrap', flexDirection:'column'}
export default function Dashboard() {
    const [allData , setAllData] = useState([]);

    const [dataCharts, setDataCharts] = useState([
            { value: 0, label: 'users',color : '' },
            { value: 0, label: 'admin' ,color:''},
        ]);
    const [data, setData] = useState([
        { value: 0, label: 'completed' ,color:''},
        { value: 0, label: 'pending' ,color: ''},
    ]);

  const getData = async () => {
    try {
      const response = await axiosInstance(DASHBOARD_URL.CHARTS);
      const adminAndUsers = response?.data?.data
      setAllData(adminAndUsers);
      if(adminAndUsers){
        setDataCharts([
            { value: adminAndUsers?.users?.user, label: 'users',color:'#54D14D' },
            { value: adminAndUsers?.users?.admin, label: 'admin' ,color:'#35C2FD'},
        ])
      }
      const booking = adminAndUsers?.bookings;
        
      if (booking) {
        setData([
          { value: booking.completed, label: 'completed',color:'#9D57D5' },
          { value: booking.pending, label: 'pending' ,color:'#5368F0'},
        ]);
      }
    } catch (error:any) {
      console.log('Error loading chart data:', error);
    }
  };

  useEffect(() => {
    getData(); 
  }, []);



  return (

    <Box className='dashboard' >
        <Box className="details" sx={styleDetails}>
            <Box sx={styleBox}>
                <Box component={'p'} sx={styleBoxDetails}>
                    <Box component={'span'}>{allData?.rooms}</Box>
                    <Box component={'span'}>Rooms</Box>

                </Box>  
                <Box sx={{padding:'1rem', background:'#203FC733', borderRadius:'50%'}}>
                    <WorkOutlineIcon sx={{color:'#203FC7'}}/>  
                </Box>
            </Box>
            <Box sx={styleBox}>
                <Box component={'p'} sx={styleBoxDetails}>
                    <Box component={'span'}>{allData?.ads}</Box>
                    <Box component={'span'}>ads</Box>

                </Box>  
                <Box sx={{padding:'1rem', background:'#203FC733', borderRadius:'50%'}}>
                    <WorkOutlineIcon sx={{color:'#203FC7'}}/>  
                </Box>
            </Box>
            <Box sx={styleBox}>
                <Box component={'p'} sx={styleBoxDetails}>
                    <Box component={'span'}>{allData?.facilities}</Box>
                    <Box component={'span'}>facilities</Box>

                </Box>  
                <Box sx={{padding:'1rem', background:'#203FC733', borderRadius:'50%'}}>
                    <WorkOutlineIcon sx={{color:'#203FC7'}}/>  
                </Box>
            </Box>
           
        </Box>

        <Box sx={{display:'flex' ,gap : '1rem' ,justifyContent:'center', alignItems:'center',flexWrap:'wrap'}}>
            <PieChart sx={{width:'200px !important'}} series={[{ data , innerRadius: 30 }]} {...size}></PieChart>
            <Box className='users' sx={styleUsers}>
                <PieChart sx={{width:'200px !important'}} series={[{ data:dataCharts, innerRadius: 70 }]} {...size}></PieChart>
                <Box sx={{width:'100%'}}>
                        <Box sx={{display:'flex' , justifyContent:'space-between' , marginBottom:'1rem'}}>
                            <Box component={'span'} sx={{display:'flex' , gap: '.5rem' ,alignItems:'center'}}>
                                <Box sx={{width:'.75rem' , height:'.75rem' , borderRadius: '50%' , background:'#54D14D'}}></Box>
                                <Box sx={{textTransform:'capitalize'}}>users</Box>
                            </Box>
                            <Box component={'span'}>{allData?.users?.user}</Box>
                        </Box>

                        
                        <Box sx={{display:'flex' , justifyContent:'space-between' , marginBottom:'.5rem'}}>
                            <Box component={'span'} sx={{display:'flex' , gap: '.5rem' ,alignItems:'center'}}>
                                <Box sx={{width:'.75rem' , height:'.75rem' , borderRadius: '50%' , background:'#35C2FD'}}></Box>
                                <Box sx={{textTransform:'capitalize'}}>admin</Box>
                            </Box>
                            <Box component={'span'}>{allData?.users?.admin}</Box>
                        </Box>
                </Box>
            </Box>
        </Box>
    </Box>
  );
}
