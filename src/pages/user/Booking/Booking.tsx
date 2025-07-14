import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function Booking() {
    const location = useLocation()
    useEffect(()=>{
        console.log(location.state);
        
    },[])
  return (
    <div>Booking</div>
  )
}
