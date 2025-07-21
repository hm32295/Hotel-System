
import axios from "axios";

const baseURL = 'https://upskilling-egypt.com:3000/api/v0';

export const axiosInstance = axios.create({
    baseURL,
    headers:{
        Authorization: localStorage.getItem('token'),
    }
});

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `${token}`;
    }
    return config;
});


export const ADMIN_URL ={
    GET_ALL_USERS: '/admin/users?page=1&size=10',
    RESET_PASSWORD : '/admin/users/reset-password',
    FORGET_PASSWORD: '/admin/users/forgot-password',
    CREATE_USER : '/admin/users',
    LOGIN : '/admin/users/login',
    CHANGE_PASSWORD : '/admin/users/change-password'
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
    DETAILS: (id:string)=> `/admin/rooms/${id}`
}

// user Comments

export const ROOM_COMMENT_URL ={
    GET : (id:string)=>`/portal/room-comments/${id}`,
    CREATE:'/portal/room-comments',
    DELETE: (id:string)=> `/portal/room-comments/${id}`,
    UPDATE: (id:string)=> `/portal/room-comments/${id}`,
}
export const ROOM_REVIEW_URL ={
    GET:(id:string)=> `/portal/room-reviews/${id}`,
    CREATE:`/portal/room-reviews`,
    UPDATE:(id:string)=> `/portal/room-comments/${id}`,
}

// Get Rooms User 
// /portal/rooms/available
export const ROOMS_USER_URL ={
    GET : '/portal/rooms/available',
    GET_DETAILS :(id:string)=>`/portal/rooms/${id}`
}

//  /portal/favorite-rooms
export const FAVORITE_URL ={
    CREATE: '/portal/favorite-rooms/',
    GET: '/portal/favorite-rooms',
    DELETE: (id:string)=>`/portal/favorite-rooms/${id}`
}
export const  PORTAL_URLS={
    AVAILABLE_ROOMS:'/portal/rooms/'
}

export const BOOKING_URL ={
    CREATE:"/portal/booking", // the Body :{"startDate": "2023-01-20","endDate":"2023-01-30","room": "65a1b57341ab48a30d06375f", "totalPrice": 2000}
    PAY:(id:string)=> `/portal/booking/${id}/pay`, // the body {"token": "tok_1OaH1DBQWp069pqTZ4RzPl0x"}
    GET_MY_BOOKING:'/portal/booking/my', // 
    GET_BOOKING_DETAILS :(id:string)=> `/portal/booking/${id}` 
}