import React, { useState, useEffect } from 'react';
import moment from 'moment-timezone';

const Time = () => {
  const [selectedTime, setSelectedTime] = useState('10:00 AM');
  const [timezone, setTimezone] = useState('Asia/Kolkata');

  const handleTimezoneChange = (event) => {
    const selectedTimezone = event.target.value;
    setTimezone(selectedTimezone);
  };

  useEffect(() => {
    const currentTime = moment(selectedTime, 'hh:mm A').tz(timezone).format('hh:mm A');
    setSelectedTime(currentTime);
  }, [ timezone]);

  return (
    <div>
      <select value={timezone} onChange={handleTimezoneChange}>
        <option value="Asia/Kolkata">India</option>
        <option value="America/New_York">USA</option>
        {/* Add more country options here */}
      </select>

      <div>
        <h1>Selected Time:</h1>
        <h2>{selectedTime}</h2>
      </div>
    </div>
  );
};

export default Time;
