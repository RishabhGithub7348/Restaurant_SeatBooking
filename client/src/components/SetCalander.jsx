import React, { useState, useRef, useContext } from 'react';
import { useEffect } from 'react';
import { IoIosArrowBack, IoIosArrowForward, IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { UserContext } from '../context/userContext';


const SetCalander = () => {
  const { 
   setSelectedTime,
   setBox2Time,
   setBox3Time,
   selectedDay,
   setSelectedDay,
   setBox4Time, 
  } = useContext(UserContext);

   const { currentDate: globalCurrentDate, setCurrentDate: setGlobalCurrentDate } = useContext(UserContext);
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const [currentDate, setCurrentDate] = useState(new Date());
    const originalMonthRef = useRef(currentDate.getMonth());
    const [originalMonth, setOriginalMonth] = useState(currentDate.getMonth());
    const [selectedDate, setSelectedDate] = useState(null);
    const [disabledDates, setDisabledDates] = useState([]);
    
   
  
    
  
      const prevMonth = () => {
        const currentMonth = currentDate.getMonth();
        if (currentMonth === originalMonth) {
          // Disable going to a previous month
          return;
        }
        setCurrentDate(prevDate => {
          const newDate = new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, prevDate.getDate());
          setGlobalCurrentDate(newDate); 
          // Update global current date
          console.log(globalCurrentDate)
          return newDate;
        });
      };

  const nextMonth = () => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, prevDate.getDate());
      setGlobalCurrentDate(newDate); // Update global current date
      return newDate;
    });

  };

  const getMonthName = () => {
    return currentDate.toLocaleString('default', { month: 'long' });
  };

  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    return new Date(year, month, 1).getDay();
  };

  useEffect(() => {
    // Update disabled dates when current month changes
    updateDisabledDates();
  }, [currentDate]);

  const updateDisabledDates = () => {
    const disabledDates = [];
    const today = new Date();
    const isCurrentMonth = currentDate.getMonth() === today.getMonth();
    const currentDay = today.getDate();

    if (isCurrentMonth) {
      for (let i = 1; i < currentDay; i++) {
        disabledDates.push(i);
      }
    }

    setDisabledDates(disabledDates);
  }

 

  const handleDateClick = (day) => {
    if (weekdays[(getFirstDayOfMonth() + day - 1) % 7] === 'Sun') {
      setSelectedDay(`${getMonthName()} ${day}, ${currentDate.getFullYear()}`);
      setSelectedTime('12:00 ');
      setBox2Time('12:15 ');
      setBox3Time('12:30 ');
      setBox4Time('12:45 ');
      setSelectedDate(day);
      
      console.log(selectedDay);
    } else {
      setSelectedDay(`${getMonthName()} ${day}, ${currentDate.getFullYear()}`);
      setSelectedTime('18:00 ');
      setBox2Time('18:15 ');
      setBox3Time('18:30 ');
      setBox4Time('18:45 ');
      setSelectedDate(day);

    }
    console.log(`Selected date: ${getMonthName()} ${day}`);
  };
  useEffect(() => {
    console.log(selectedDay);
  }, [selectedDay]);
  


  const shiftedWeekdays = [...weekdays.slice(getFirstDayOfMonth()), ...weekdays.slice(0, getFirstDayOfMonth())];
  return (
    <div>
        
        <div className='flex items-center justify-around gap-5'>
          <IoIosArrowBack className='text-2xl cursor-pointer' onClick={prevMonth} />
          <div>
            <h1 className='   text-lg ml-3 font-semibold text-slate-600'>{getMonthName()} {currentDate.getFullYear()}</h1>
          </div>
          <IoIosArrowForward className='text-2xl cursor-pointer' onClick={nextMonth} />
        </div>
        <div className='grid grid-cols-7 grid-rows-6 gap-2 mt-5 p-3 rounded-md  bg-white'>
          {shiftedWeekdays.map((day, index) => (
            <div className='flex items-center text-center justify-center bg-white rounded-md p-2 text-base font-semibold text-slate-600' key={index}>
              {day}
            </div>
          ))}
          {[...Array(getDaysInMonth())].map((_, index) => {
  const day = index + 1;
  const isFirstWeek = Math.floor((getFirstDayOfMonth() + index) / 7) === 0;
  const isLastWeek =
    Math.ceil((getFirstDayOfMonth() + index + 1) / 7) >
    Math.ceil((getFirstDayOfMonth() + getDaysInMonth()) / 7);
  const isWeekend = shiftedWeekdays[index % 7] === 'Mon' ;
  const isCurrentDate = currentDate.getDate() === day && currentDate.getMonth() === new Date(currentDate.getFullYear(), new Date().getMonth(), 1).getMonth();
  const month = currentDate.getMonth();
  const isDisabled = disabledDates.includes(day) || (originalMonth === currentDate.getMonth() && day < new Date().getDate())||
  (shiftedWeekdays[index % 7] === 'Mon' &&
    !(
      (month === 9 && day === 3) || // October 3, 2023
      (month === 11 && day === 25) || // December 25, 2023
      (month === 0 && day === 1) || // January 1, 2024
      (month === 3 && day === 1) || // April 1, 2024
      (month === 4 && day === 20) // May 20, 2024
    ));
  const isClickable = !isDisabled;
  const isSelected = selectedDate === day;

  return (
    <div
      className={`flex relative items-center justify-center rounded-md p-2 font-semibold cursor-pointer border-2 
        
      } ${isSelected ? 'bg-green-500' : ''} ${
        isCurrentDate ? 'bg-blue-100 border-2 rounded-md text-blue-600 font-bold text-base' : ''
      } ${isDisabled && !isCurrentDate ? 'opacity-50 bg-gray-300 border-2  cursor-not-allowed' : ''}`}
      key={day}
      onClick={isClickable ? () => handleDateClick(day) : null}
    >
      {isCurrentDate && (
        <div className="absolute bottom-0 mb-[3px] ml-4 left-0 right-0 w-[6px] h-[6px] text-2xl bg-blue-700 rounded-full" />
      )}
      {day}
    </div>
  );
})}

      </div>
    </div>
      
    
  )
}

export default SetCalander