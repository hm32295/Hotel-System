// End Points for the application Apis && Any thinge 

// https://upskilling-egypt.com:3000

import axios from "axios";

const baseURL = 'https://upskilling-egypt.com:3000/api/v0';

export const axiosInstance = axios.create({
    baseURL,
    headers:{
        Authorization: localStorage.getItem('token'),
    }
});
const tokenTest = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODY1Njc1MWNjYzQ0OGVmODU5ZDQwZGYiLCJyb2xlIjoiYWRtaW4iLCJ2ZXJpZmllZCI6ZmFsc2UsImlhdCI6MTc1MTY0MTMxMywiZXhwIjoxNzUyODUwOTEzfQ.ytN3chDu9gM8Yr1kbbjst81y5jV33ZbbGp2ySWyZZJQ'
// chat
axiosInstance.interceptors.request.use((config) => {
    const token = tokenTest;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});


export const ADMIN_URL ={
    RESET_PASSWORD : '/admin/users/reset-password',
    FORGET_PASSWORD: '/admin/users/forgot-password',
    CREATE_USER : '/admin/users',
    LOGIN : '/admin/users/login',
    CHANGE_PASSWORD : '/admin/users/change-password',
    GET_ALL_USER : 'admin/users/',
}
export const USERS_URL ={
    RESET_PASSWORD : '/portal/users/reset-password',
    FORGET_PASSWORD: '/portal/users/forgot-password',
    CREATE_USER : '/portal/users',
    LOGIN : '/portal/users/login',
    CHANGE_PASSWORD : '/portal/users/change-password',
    LOGIN_GOOGLE : '/portal/users/auth/google',
    LOGIN_FACEBOOK : '/portal/users/auth/facebook'
}

export const DASHBOARD_URL ={
    CHARTS : '/admin/dashboard'
}
export const listBooking = {
    LIST_BOOKING: '/admin/booking?page=1&size=10',
}
export const FacilitesUrls = {
  CREATE: '/admin/room-facilities',
  GET_ALL: '/admin/room-facilities',
  GET_DETAILS: (id: string) => `/admin/room-facilities/${id}`,
  DELETE: (id: string) => `/admin/room-facilities/${id}`,
  UPDATE: (id: string) => `/admin/room-facilities/${id}`,
};


export const ADS_URL = {
    GET : '/admin/ads',
    CREATE : '/admin/ads',
    DELETE : (id:string)=> `/admin/ads/${id}`,
    VIEW : (id:string)=> `/admin/ads/${id}`,
    UPDATE : (id:string)=> `/admin/ads/${id}`,
}

///admin/rooms
export const ROOMS_URL ={
    GET : '/admin/rooms',
    CREATE : '/admin/rooms',
    UPDATE: (id:string)=> `/admin/rooms/${id}`,
    DELETE: (id:string)=> `/admin/rooms/${id}`,
    DETAILS: (id:string)=> `/admin/rooms/${id}`,
}
