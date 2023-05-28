import React, { useState, useRef, useContext } from 'react';
import { useEffect } from 'react';
import { IoIosArrowBack, IoIosArrowForward, IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { UserContext } from '../context/userContext';
import moment from 'moment-timezone';






const SetTime = () => {
    // const [selectedTimezone, setSelectedTimezone] = useState('Europe/Berlin'); // Default timezone
    const [isButtonDisabled, setButtonDisabled] = useState(false);
  const { 
    selectedTime,
    setSelectedTime,
    box2Time,
    setBox2Time,
    box3Time,
    setBox3Time,
    box4Time,
    setBox4Time,
    selectedtime,
    setSelectedtime,
    setShowForm, 
     timeRange ,
  } = useContext(UserContext);
  const [expandedBox, setExpandedBox] = useState(null);
//   const [timezone, setTimezone] = useState('America/New_York');

const currentDate = new Date();
const formattedDate = currentDate.toLocaleDateString('en-US', {
  weekday: 'long',
  month: 'long',
  day: 'numeric',
});

const handleTimeUp = () => {
  const timeParts = selectedTime.split(' ');
  const [hour, minutes] = timeParts[0].split(':');
  const period = timeParts[1];

  let newHour = parseInt(hour, 10);
  let newMinutes = parseInt(minutes, 10);

  newMinutes += 60;

  if (newMinutes >= 60) {
    newHour += Math.floor(newMinutes / 60);
    newMinutes %= 60;
  }

  if (newHour >= 24) {
    newHour %= 24;
  }

  const newTime = `${newHour.toString().padStart(2, '0')}:${newMinutes.toString().padStart(2, '0')}`;
  setSelectedTime(newTime);

  const box2NewMinutes = newMinutes + 15;
  let box2NewHour = newHour + Math.floor(box2NewMinutes / 60);

  if (box2NewHour >= 24) {
    box2NewHour %= 24;
  }

  const box2NewTime = `${box2NewHour.toString().padStart(2, '0')}:${(box2NewMinutes % 60).toString().padStart(2, '0')}`;
  setBox2Time(box2NewTime);

  const box3NewMinutes = box2NewMinutes + 15;
  let box3NewHour = box2NewHour + Math.floor(box3NewMinutes / 60);

  if (box3NewHour >= 24) {
    box3NewHour %= 24;
  }

  const box3NewTime = `${box3NewHour.toString().padStart(2, '0')}:${(box3NewMinutes % 60).toString().padStart(2, '0')}`;
  setBox3Time(box3NewTime);

  const box4NewMinutes = box3NewMinutes + 15;
  let box4NewHour = box3NewHour + Math.floor(box4NewMinutes / 60);

  if (box4NewHour >= 24) {
    box4NewHour %= 24;
  }

  const box4NewTime = `${box4NewHour.toString().padStart(2, '0')}:${(box4NewMinutes % 60).toString().padStart(2, '0')}`;
  setBox4Time(box4NewTime);

  const startTime = moment(timeRange.start, 'HH:mm');
  const endTime = moment(timeRange.end, 'HH:mm');
  const newSelectedTime = moment(newTime, 'HH:mm');

  if (newSelectedTime.isBefore(endTime)) {
    setButtonDisabled(true);
  } else {
    setButtonDisabled(false);
  }
};

   
const handleTimeDown = () => {
  if (isButtonDisabled) {
    return; // Skip the function execution when the button is disabled
  }
  const timeParts = selectedTime.split(' ');
  const [hour, minutes] = timeParts[0].split(':');
  const period = timeParts[1];

  let newHour = parseInt(hour, 10);
  let newMinutes = parseInt(minutes, 10);

  newHour -= 1; // Decrease the hour by 1

  if (newHour < 0) {
    newHour = 23; // Wrap around to 23 when hour becomes negative
  }

  const newTime = `${newHour.toString().padStart(2, '0')}:${newMinutes.toString().padStart(2, '0')} `;
  setSelectedTime(newTime);

  const box2NewMinutes = newMinutes + 15;
  const box2NewHour = newHour + Math.floor(box2NewMinutes / 60);
  const box2NewTime = `${(box2NewHour % 24).toString().padStart(2, '0')}:${(box2NewMinutes % 60).toString().padStart(2, '0')} `;
  setBox2Time(box2NewTime);

  const box3NewMinutes = box2NewMinutes + 15;
  const box3NewHour = box2NewHour + Math.floor(box3NewMinutes / 60);
  const box3NewTime = `${(box3NewHour % 24).toString().padStart(2, '0')}:${(box3NewMinutes % 60).toString().padStart(2, '0')} `;
  setBox3Time(box3NewTime);

  const box4NewMinutes = box3NewMinutes + 15;
  const box4NewHour = box3NewHour + Math.floor(box4NewMinutes / 60);
  const box4NewTime = `${(box4NewHour % 24).toString().padStart(2, '0')}:${(box4NewMinutes % 60).toString().padStart(2, '0')}`;
  setBox4Time(box4NewTime);

  const startTime = moment(timeRange.start, 'HH:mm');
  const endTime = moment(timeRange.end, 'HH:mm');
  const newSelectedTime = moment(newTime, 'HH:mm');

  if (newSelectedTime.isAfter(startTime)) {
    setButtonDisabled(true);
  } else {
    setButtonDisabled(false);
  }
};



// useEffect(() => {
//   const currentTime = moment(selectedTime, 'hh:mm A').tz(timezone).format('HH:mm');
//   const box2ConvertedTime = moment(box2Time, 'hh:mm A').tz(timezone).format('HH:mm');
//   const box3ConvertedTime = moment(box3Time, 'hh:mm A').tz(timezone).format('HH:mm');
//   const box4ConvertedTime = moment(box4Time, 'hh:mm A').tz(timezone).format('HH:mm');

//   setSelectedTime(currentTime);
//   setBox2Time(box2ConvertedTime);
//   setBox3Time(box3ConvertedTime);
//   setBox4Time(box4ConvertedTime);
// }, [timezone]);


  const handleBoxClick = (boxTime) => {
    setExpandedBox(boxTime);
    setSelectedtime(boxTime);
    // console.log(selectedtime)
  };

  const handleNextButtonClick = () => {
    // Show the form and hide the calendar
    setShowForm(true);
  };
  useEffect(()=> {
    // console.log(selectedtime);
  })

  const renderBox = (time) => {
    if (time === expandedBox) {
      return (
        <div className='grid grid-cols-4 gap-4 '>
          <div className='col-span-2'>
            <div className="flex items-center text-center flex-col text-xl cursor-pointer w-[120px] bg-blue-900 text-white font-bold rounded-md border-2 p-2">
              {time}
            </div>
          </div>
          <div className='col-span-2'>
            <div className="flex items-center text-center flex-col text-xl cursor-pointer w-[120px] bg-black  text-white font-bold rounded-md border-2 p-2" onClick={handleNextButtonClick}>
              Next
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="flex items-center text-center flex-col text-xl w-[250px] border-blue-300 text-blue-600 font-bold rounded-md border-2 p-2 cursor-pointer hover:bg-blue-200" onClick={() => handleBoxClick(time)}>
          {time}
        </div>
      );
    }
  };
  

  return (
    <div className="flex items-center justify-around -mt-24 h-screen">
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center text-center flex-col  w-[320px] p-2 text-lg ml-3 font-semibold text-slate-600">
          {formattedDate}
        </div>
        <IoIosArrowUp  className={`text-2xl cursor-pointer ${
            isButtonDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
          }`}  onClick={handleTimeDown} />
        {renderBox(selectedTime)}
        {renderBox(box2Time)}
        {renderBox(box3Time)}
        {renderBox(box4Time)}
        <IoIosArrowDown className={`text-2xl cursor-pointer ${
            isButtonDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
          }`}         
          onClick={handleTimeUp}
 />
      </div>
    </div>
    
  )
}

export default SetTime

