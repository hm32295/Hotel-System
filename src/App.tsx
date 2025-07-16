import React from 'react'
import {createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'react-pro-sidebar/dist/css/styles.css';
import 'antd/dist/antd.css';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { SnackbarProvider } from 'notistack';
import { Login,Register,Reset,Forget,Verify,Home,Favorites,Explore,Details,MasterUser,MasterAdmin,Ads,Facilities, UsersList, Dashboard, RoomData, Rooms, ChangePassword, Booking, NotFound } from './pages/index';
import ListBooking from './pages/admin/ListBooking/ListBooking';
import EXpPLORE from './pages/user/Home/CoMPO_Home/ExPlore/EXpPLORE';
import ProtectedRoute from './services/Protected_route';
import RedirectIfLoggedIn from './services/RedirectIfLoggedIn';
const App = () => {
  const routes=createBrowserRouter(
    [
      {
        path:'',
        children:[
          { index: true,element : <RedirectIfLoggedIn> < Login/></RedirectIfLoggedIn> },
          {path:'login',element:<RedirectIfLoggedIn> < Login/></RedirectIfLoggedIn>},
          {path:'Register',element:<RedirectIfLoggedIn><Register/></RedirectIfLoggedIn>},
          {path:'Reset',element:<RedirectIfLoggedIn><Reset/></RedirectIfLoggedIn>},
          {path:'Forget',element:<RedirectIfLoggedIn><Forget/></RedirectIfLoggedIn>},
          {path:'Verify',element:<RedirectIfLoggedIn><Verify/></RedirectIfLoggedIn>},
        ]
      },{
        path:'/MasterUser',
        element:<ProtectedRoute allowedRole ={'user'}><MasterUser/></ProtectedRoute>,
        children:[
          {index:true,element:<Home/>},
          {path:'Home',element:<Home/>},
          {path:'Explore',element:<Explore/>},
          {path:'Favorites',element:<Favorites/>},
          
          {path:'booking',element:<Booking/>},
          {path:'Explore_USER',element:<EXpPLORE/>},
          {path:'Details',element:<Details/>},

      
        ]
      }
      ,{
        path:'/MasterAdmin',
        element: <ProtectedRoute allowedRole ='admin'> <MasterAdmin/></ProtectedRoute> ,
        children:[

          {index:true,element:<Dashboard/> },
          {path:'dashboard',element:<Dashboard/>},
          {path:'change-password',element:<ChangePassword/>},
          {path:'Ads',element:<Ads/>},
          {path:'rooms',element:<Rooms/>},
          {path:'rooms-data',element:<RoomData/>},
          {path:'users-list',element:<UsersList/>},
          {path:'list-booking',element:<ListBooking/>},

          {path:'Facilities',element:<Facilities/>},
          {path:'Explore',element:<Explore/>},
        ]
      },{path :'*',element:<NotFound />}
    ]
  )
  return (
    <SnackbarProvider>

        <React.Fragment>
          <RouterProvider router={routes}>
          </RouterProvider>
        </React.Fragment>
    </SnackbarProvider>

  )
}
export default App
