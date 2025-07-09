import React from 'react'
import { BrowserRouter as Router, Routes, Route, createBrowserRouter, RouterProvider } from 'react-router-dom';

import 'react-pro-sidebar/dist/css/styles.css';
import 'antd/dist/reset.css';   
import 'react-toastify/dist/ReactToastify.css';
import { Login,Register,Reset,Change_pass,Forget,Verify,Home,Favorites,Explore,Details,MasterUser,MasterAdmin,HomeAdmin,Ads,Facilities } from './pages/index';
import ListBooking from './pages/admin/ListBooking/ListBooking';
import Rooms from './pages/admin/Rooms/Rooms';
const App = () => {
const routes = createBrowserRouter([
  { path: '/', element: <Login /> },
  { path: '/login', element: <Login /> },
  { path: '/Register', element: <Register /> },
  { path: '/Reset', element: <Reset /> },
  { path: '/Change_pass', element: <Change_pass /> },
  { path: '/Forget', element: <Forget /> },
  { path: '/Verify', element: <Verify /> },

  {
    path: '/MasterUser',
    element: <MasterUser />,
    children: [
      { index: true, element: <Home /> },
      { path: 'Home', element: <Home /> },
      { path: 'Favorites', element: <Favorites /> },
      { path: 'Explore', element: <Explore /> },
      { path: 'Details', element: <Details /> },
    ],
  },

  {
    path: '/MasterAdmin',
    element: <MasterAdmin />,
    children: [
      { index: true, element: <HomeAdmin /> },
      { path: 'HomeAdmin', element: <HomeAdmin /> },
      { path: 'Ads', element: <Ads /> },
      { path: 'Facilities', element: <Facilities /> },
      { path: 'Explore', element: <Explore /> },
      
       { path: 'ListBooking', element: <ListBooking /> },
        { path: 'Rooms', element: <Rooms/> },
    ],
  },
]);

  return (
    <React.Fragment>
      <RouterProvider router={routes}>
      </RouterProvider>
    </React.Fragment>
  )
}
export default App
