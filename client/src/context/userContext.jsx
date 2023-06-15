import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const getTimezoneByCountry = (country) => {
  const timezoneMap = {
    'United States': 'America/New_York',
    'United Kingdom': 'Europe/London',
    'India': 'Asia/Kolkata',
    'Australia': 'Australia/Sydney',
    'Japan': 'Asia/Tokyo',
    'Germany': 'Europe/Berlin'
    
    // Add more country-timezone mappings as needed
  };

  return timezoneMap[country] || 'UTC';
};

export const UserContext = createContext({});
 
export function UserContextProvider({ children }) {
  const [country, setCountry] = useState('Germany');
  const [timezone, setTimezone] = useState('Europe/Berlin');
  const [showCalendar, setShowCalendar] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedTime, setSelectedTime] = useState('18:00');
  const [box2Time, setBox2Time] = useState('18:15');
  const [box3Time, setBox3Time] = useState('18:30');
  const [box4Time, setBox4Time] = useState('18:45');
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedtime, setSelectedtime] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [reservations, setReservations] = useState([]);
  const [update, setUpdate] = useState(false)
  const [isAuth, setIsAuth] = useState(false);
  const [profile, setProfile] = useState(null);
  const [bookedDates, setBookedDates] = useState([]);
  const [bookedTimes, setBookedTimes] = useState([]);
  const [userData, setUserData] = useState('');
 
  
  
  

  const fetchReservations = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/getAllData', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = response.data;
      setReservations(data);
    } catch (error) {
      console.error('Error fetching reservations:', error);
    }
  };
  

  useEffect(() => {
    fetchReservations();
  }, [setUpdate, update, isAuth ]);

  const updateReservation = (reservationId, updatedData) => {
    setReservations(prevReservations => {
      return prevReservations.map(reservation => {
        if (reservation._id === reservationId) {
          // Update the reservation with the modified data
          const updatedReservation = { ...reservation, ...updatedData };
          setUpdate(true);
          return updatedReservation;
        }
        return reservation;
      });
    });
  };

  const deleteReservation = (reservationId) => {
    setReservations(prevReservations => {
      const updatedReservations = prevReservations.filter(reservation => reservation._id !== reservationId);
      setUpdate(true);
      return updatedReservations;
    });
  };
  
  
// Assuming you have stored the token in localStorage

useEffect(() => {
  const fetchUserData = async () => {
    try {
      // include the JWT token in the request headers
      const token = localStorage.getItem('token');
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      // send the GET request to fetch the user's data
      const response = await axios.get('http://localhost:3001/api/admin/profile', config);
      setUserData(response.data);
      setIsAuth(true);
    } catch (error) {
      console.log(error);
    }
  };

  fetchUserData();
}, [setIsAuth, ]);





// console.log(userData);

const filterReservationsByDay = (reservations, day) => {
  const filteredReservations = reservations.filter(reservation => {
    const reservationDate = reservation.selectedDay;
    const reservationDay = reservationDate;
    return reservationDay === day;
  });

  return filteredReservations;
};

useEffect(() => {
  const filtered = filterReservationsByDay(reservations, selectedDay);
  setBookedDates(filtered);
}, [selectedDay, reservations]);

// console.log(bookedDates);



useEffect(() => {
  const extractedTime = bookedDates.map(reservation => reservation.selectedtime);
  setBookedTimes(extractedTime);
}, [bookedDates]);

console.log(bookedTimes);





  

  



 
  return (
    <UserContext.Provider
      value={{
        country,
        setCountry,
        timezone,
        setTimezone,
        showCalendar,
        setShowCalendar,
        showForm,
        setShowForm,
        selectedTime,
        setSelectedTime,
        box2Time,
        setBox2Time,
        box3Time,
        setBox3Time,
        box4Time,
        setBox4Time,
        selectedDay,
        setSelectedDay,
        selectedtime,
        setSelectedtime,
        currentDate,
        setCurrentDate,
        reservations,
        setReservations,
        update,
        setUpdate,
        isAuth,
        setIsAuth,
        bookedTimes,
        updateReservation,
        deleteReservation,
        
        
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
