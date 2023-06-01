import React, { useContext , useEffect, useState} from 'react'
import { BiBell} from "react-icons/bi";
import Avatar from '@mui/material/Avatar';
import { AiOutlineSearch , AiOutlineDelete,AiOutlineDown,AiOutlinePlus, AiTwotoneBell, AiOutlineRight,AiFillPrinter} from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";
import { UserContext } from '../context/userContext';
import axios from 'axios';
import UpdateSeatModal from './UpdateSeatModal';


function stringToColor(string) {
    let hash = 0;
    let i;
  
    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let color = '#';
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */
  
    return color;
  }
 
  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }


const Admin = () => {
   const {reservations,
    setReservations}  = useContext(UserContext);
    const [updateseat, setUpdateseat] = useState({});
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    // console.log(reservations);

   

    
 

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    // Function to update the filtered reservations whenever the search term changes
    const updateFilteredReservations = () => {
      if (searchTerm === '') {
        setReservations(reservations);
      } else {
        const filteredReservations = reservations.filter((reservation) => {
          const nameMatch = reservation.name.toLowerCase().includes(searchTerm.toLowerCase());
          const emailMatch = reservation.email.toLowerCase().includes(searchTerm.toLowerCase());
          const dateMatch = new Date(reservation.selectedDay)
            .toLocaleDateString('en-US', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
          const timeMatch = reservation.selectedtime.toLowerCase().includes(searchTerm.toLowerCase());
  
          return nameMatch || emailMatch || dateMatch || timeMatch;
        });
  
        setReservations(filteredReservations);
      }
    };
    // console.log(reservations);
  
    // Call the updateFilteredReservations function whenever the search term changes
    updateFilteredReservations();
  }, [searchTerm]);
  

    const UpdateSeat = async (reservationId) => { 
      try {
        const response = await axios.get(`http://localhost:3001/api/getReservation/${reservationId}`);
        setUpdateseat(response.data);
        
        setIsModalVisible(true);
      } catch (error) {
        console.error(error);
      } 
    };
    // console.log(updateseat)

    const deleteSeat = async (reservationId) => {
      try {
        // Make an HTTP DELETE request to delete the reservation seat from the database
        await axios.delete(`http://localhost:3001/api/deleteSeat/${reservationId}`);
  
        // Update the reservations state by removing the deleted reservation
        setReservations((prevReservations) =>
          prevReservations.filter((prevReservation) => prevReservation._id !== reservationId)
        );
  
        console.log('Reservation seat deleted successfully');
      } catch (error) {
        console.error('Error deleting reservation seat:', error);
      }
    };

  return (
    
    <>
    {isModalVisible &&  (
            <UpdateSeatModal
              visible ={isModalVisible}
              onClose={() => setIsModalVisible(false)}
              onCancel={() => setIsModalVisible(false)}
              Updateseat={updateseat}
              id ={updateseat._id}
          
            />
          )}
          
    <div className='flex flex-col bg-[#f9fafe] w-full h-screen '>
      <div className='flex items-center justify-between mt-3 ml-3 mr-3'>
     <div className='flex items-center ml-9 '>
       <h1 className='text-xl font-bold text-gray-700'>Customer</h1>
     </div>
     <div className='flex items-center gap-9 justify-around'>
         <div className='flex items-center justify-center '>
            <div className='p-2 outline-0 bg-white border-2 rounded-r-full flex items-center  rounded-l-full w-full '>
                <AiOutlineSearch className='text-2xl text-gray-400'/>
            <input type=" text" className='bg-transparent outline-0' placeholder='Search here'
            
            value={searchTerm}
            onChange={handleSearch}
            />
            </div>
          
         </div>
         <div className='p-2 bg-white rounded-full border flex items-center'>
           <BiBell className='text-2xl '/>
         </div>
         <div className='p-3'>
         <Avatar {...stringAvatar('Kent Dodds')} />
         </div>
     </div>
      </div>
      <div className='w-full h-px mt-2  bg-slate-200' />
      <div className=''>
  <div className='flex items-center justify-between gap-2 mt-6 ml-10 mr-10'>
    <div className='  w-[180px] text-center'>
      <p className='text-slate-600 font-semibold text-base' >Name</p>
    </div>
    <div className='  w-[150px]  text-center'>
      <p className='text-slate-600 font-semibold text-base'>Email</p>
    </div>
    <div className='  w-[150px] text-center'>
      <p className='text-slate-600 font-semibold text-base'>Phone</p>
    </div>
    <div className='  w-[90px] text-center '>
      <p className='text-slate-600 font-semibold text-base'>No. of seats</p>
    </div>
    <div className='  w-[150px]  text-center'>
      <p className='text-slate-600 font-semibold text-base'>Date of Reservation</p>
    </div>
    <div>
      <p className='  w-[70px] text-center text-slate-600 font-semibold text-base'>Timing</p>
    </div>
    <div>
      <p className='  w-[70px] text-center text-slate-600 font-semibold text-base'>Edit Seat</p>
    </div>
    <div className='  w-[90px]  text-center'>
      <p className='  w-[90px] text-center text-slate-600 font-semibold text-base'>Delete Seat</p>
    </div>
  </div>
  {reservations.map((reservation) => (
          <div
            key={reservation._id}
            className='flex items-center mt-5 bg-white   rounded-2xl border-2 p-3 justify-between gap-2 ml-10 mr-10'
          >
            <div className='w-[180px] flex items-center gap-3 justify-center'>
              <span className='text-center'>
              <Avatar {...stringAvatar(reservation.name)} />
              </span>
              <p className='text-base'>{reservation.name}</p>
            </div>
            <div className='w-[150px] text-center'>
            <p className='text-base'>{reservation.email.length > 15 ? `${reservation.email.slice(0, 16)}...` : reservation.email}</p>
            </div>
            <div className='w-[150px] text-center'>
              <p className='text-base'>{reservation.telephone}</p>
            </div>
            <div className='w-[90px] text-center'>
              <p className='text-base'>{reservation.numOfPersons}</p>
            </div>
            <div className='w-[150px] text-center'>
              <p className='text-base' >
              {new Date(reservation.selectedDay).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })}
              </p>
            </div>
            <div className='w-[70px] text-center'>
              <p className='text-base'>{reservation.selectedtime}</p>
            </div>
             <div className='  w-[70px] text-center '>
    
        <AiFillEdit className='text-2xl text-gray-600 cursor-pointer  w-[100px]  text-center'  onClick={() => UpdateSeat(reservation._id)}/>
      
    </div>
    <div className='  w-[90px] text-center '>
     
      <AiOutlineDelete className='text-2xl cursor-pointer  w-[100px] text-center text-gray-600'  onClick={() => deleteSeat(reservation._id)}/>
     
    </div>
          </div>
        ))}
</div>

    </div>
    </>
  )
}

export default Admin
