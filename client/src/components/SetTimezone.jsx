import React, { useState, useEffect, useContext } from 'react';
import moment from 'moment-timezone';
import { UserContext } from '../context/userContext';

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

const SetTimezone = () => {
  const [selectedCountry, setSelectedCountry] = useState('Germany');
  const [selectedTimezone, setSelectedTimezone] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const { country, setCountry, timezone, setTimezone } = useContext(UserContext);

  // console.log(timezone)

  const handleCountryChange = (event) => {
    const country = event.target.value;
    const timezone = getTimezoneByCountry(country);
   

    setSelectedCountry(country);
    setSelectedTimezone(timezone);
    setCountry(country);
    setTimezone(timezone);
    // console.log(country);
    // console.log(timezone);
  };

  useEffect(() => {
    const timezone = getTimezoneByCountry(selectedCountry);
    setSelectedTimezone(timezone);

    const timer = setInterval(() => {
      const time = moment().tz(timezone).format('hh:mm A');
      setCurrentTime(time);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [selectedCountry]);

  
  return (
    <div className="flex flex-col  items-center w-[450px] rounded-md px-3 p-1">
      <div className="flex items-center gap-4
      ">
        <select
          className="bg-white outline-0 rounded px-4 py-2"
          id="country"
          value={selectedCountry}
          onChange={handleCountryChange}
        >
          <option value="United States">United States</option>
          <option value="United Kingdom">United Kingdom</option>
          <option value="India">India</option>
          
          <option value="Japan">Japan</option>
          <option value="Australia">Australia</option>
         
          <option value="Germany">Germany</option>
          
          {/* Add more country options as needed */}
        </select>
      

      {selectedCountry && (
        <div className="text-center mt-1 flex items-center">
          <p className=" mb-1 text-base ml-3 font-semibold text-slate-600">Timezone: {selectedTimezone}</p>
          <p className=" text-gray-800 font-semibold text-base  ">{currentTime}</p>
        </div>
      )}
      </div>
    </div>

  );
};

export default SetTimezone;
