import React, { createContext, useState, useEffect } from 'react';

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
  const [box3Time, setBox3Time] = useState('18:30 ');
  const [box4Time, setBox4Time] = useState('18:45');
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedtime, setSelectedtime] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  
  
  const timeRange = {
    startTime: '18:00 ',
    endTime: '23:00',
  };
 
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
        timeRange,
        currentDate,
        setCurrentDate,
        
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
