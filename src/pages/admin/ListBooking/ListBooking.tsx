import React, { useEffect, useState } from 'react';
import GenericTable from '../../../component_Admin/GenericTable/GenericTable';
import type { HeadCell } from '../../../component_Admin/GenericTable/GenericTable';
import { axiosInstance } from '../../../services/Url';
import { listBooking } from '../../../services/Url';

interface Booking {
  id: string;
  roomNumber: string;
  totalPrice: number;
  startDate: string;
  endDate: string;
  userName: string;
}

const headCells: HeadCell<Booking>[] = [
  { id: 'roomNumber', label: 'Room Number', numeric: false, disablePadding: false },
  { id: 'totalPrice', label: 'Price', numeric: true, disablePadding: false },
  { id: 'startDate', label: 'Start Date', numeric: false, disablePadding: false },
  { id: 'endDate', label: 'End Date', numeric: false, disablePadding: false },
  { id: 'userName', label: 'User', numeric: false, disablePadding: false },
];

export default function ListBooking() {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const { data } = await axiosInstance.get(listBooking.LIST_BOOKING);

        const formattedData: Booking[] = data?.data?.booking?.map((item: any) => ({
          id: item._id,
          roomNumber: item.room?.roomNumber?.toString() || 'N/A',
          totalPrice: item.totalPrice,
          startDate: new Date(item.startDate).toLocaleDateString(),
          endDate: new Date(item.endDate).toLocaleDateString(),
          userName: item.user?.userName || 'N/A',
        })) || [];

        setBookings(formattedData);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, []);

  return (
    <GenericTable<Booking>
      title="Bookings"
      rows={bookings}
      headCells={headCells}
      renderActions={(row) => (
        <button onClick={() => alert(`Viewing booking ${row.id}`)}>View</button>
      )}
    />
  );
}
