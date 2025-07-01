import React from 'react'
import { BrowserRouter as Router, Routes, Route, createBrowserRouter, RouterProvider } from 'react-router-dom';
// import { Button } from '@mui/material';
// import { ToastContainer, toast } from 'react-toastify';
// import axios from 'axios';  
// import { useForm } from 'react-hook-form';
import 'react-pro-sidebar/dist/css/styles.css';
// import { ClipLoader } from 'react-spinners';
import 'antd/dist/reset.css';   
import 'react-toastify/dist/ReactToastify.css';
import { Login,Register,Reset,Change_pass,Forget,Verifi,Home,Favorits,Explore,Details,MasterUser,MasterAdmin,HomeAdmin,Ads,Facilites } from './pages/index';
const App = () => {
  const routes=createBrowserRouter(
    [
      {
        path:'/',
        element:<Login/>,
        children:[
          {index:true,element:<Login/>},
          {path:'login',element:<Login/>},
          {path:'Register',element:<Register/>},
          {path:'Reset',element:<Reset/>},
          {path:'Change_pass',element:<Change_pass/>},
          {path:'Forget',element:<Forget/>},
          {path:'Verifi',element:<Verifi/>},
        ]
      },{
        path:'/MasterUser',
        element:<MasterUser/>,
        children:[
          {index:true,element:<Home/>},
          {path:'Home',element:<Home/>},
          {path:'Favorits',element:<Favorits/>},
           {path:'Explore',element:<Explore/>},
           {path:'Details',element:<Details/>},
        ]
      }
      ,{
        path:'/MasterAdmin',
        element:<MasterAdmin/>,
        children:[
          {index:true,element:<HomeAdmin/>},
          {path:'HomeAdmin',element:<HomeAdmin/>},
          {path:'Ads',element:<Ads/>},
           {path:'Facilites',element:<Facilites/>},
           {path:'Explore',element:<Explore/>},
        ]
      }
    ]
  )
  return (
    <React.Fragment>
      <RouterProvider router={routes}>
      </RouterProvider>
    </React.Fragment>
  )
}
export default App
