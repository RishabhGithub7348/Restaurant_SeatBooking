import { useContext, useState } from 'react';
import React from 'react';
import { Modal, Button, Input } from 'antd';
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// import { LocalizationProvider } from '@mui/x-date-pickers';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { TimePicker } from '@mui/x-date-pickers/TimePicker';

import { DatePicker, Space } from 'antd';
import moment from 'moment';
import { TimePicker } from 'antd';
import dayjs from 'dayjs';
import axios from 'axios';
import { UserContext } from '../context/userContext';



const UpdateSeatModal = ({ visible, onClose, id, Updateseat }) => {
    const [updateSeat, setUpdateSeat] = useState(Updateseat);
    const {setUpdate} = useContext(UserContext);
    
    const format = 'HH:mm';

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUpdateSeat((prevUpdateSeat) => ({
            ...prevUpdateSeat,
            [name]: value,
        }));
    };

    


    const handleSave = async (id) => {
        try {
          // Prepare the data to be sent in the request
          const data = {
            name: updateSeat.name,
            email: updateSeat.email,
            telephone: updateSeat.telephone,
            numOfPersons: updateSeat.numOfPersons,
            selectedDay: updateSeat.selectedDay ? dayjs(updateSeat.selectedDay).format("DD MMM, YYYY") : null,
            selectedtime: dayjs(updateSeat.selectedtime, "HH:mm").format("HH:mm"),
          };
      
          // Send a PUT request to update the seat details
          const response = await axios.patch(`https://restaurant-seat-booking.onrender.com/api/editseat/${id}`, data);
          
      
          // Handle the response
          console.log(response.data);
          setUpdate(true);
          onClose();
        } catch (error) {

          console.error(error);
        }
      };
      


    return (
        <Modal
            open={visible}
            
            onCancel={onClose}
            footer={[
                <Button key="cancel" className='border-2 rounded-md' onClick={onClose}>Cancel</Button>,
                <Button key="save" className='bg-blue-700 text-white border-3 rounded-md' onClick={() => handleSave(id)}>Save</Button>
            ]}
        >
            <div className='flex flex-col '>
                <div>
                    <h1 className=' text-slate-700 font-semibold text-base'>Name:</h1>
                </div>
                <div className='mt-3 border-2 border-slate-500 rounded-md'>
                    <Input
                        placeholder=" Name"
                        name="name"
                        value={updateSeat.name}
                        onChange={handleChange}
                        className=' text-slate-800  font-medium text-base'
                    />
                </div>

            </div>
            <div className='flex mt-3 flex-col'>
                <div>
                    <h1 className=' text-slate-700 font-semibold text-base'>Email:</h1>
                </div>
                <div className='mt-3 border-2 border-slate-500 rounded-md'>
                    <Input
                        name="email"
                        placeholder="Email"
                        value={updateSeat.email}
                        onChange={handleChange}
                        className=' text-slate-800  font-medium text-base'
                    />
                </div>
            </div>

            <div className='flex mt-3 flex-col'>
                <div>
                    <h1 className=' text-slate-700 font-semibold text-base'>Phone Number:</h1>
                </div>
                <div className='mt-3 border-2 border-slate-500 rounded-md  '>
                    <Input
                        name="telephone"
                        placeholder="Phone Number"
                        value={updateSeat.telephone
                        }
                        onChange={handleChange}
                        className=' text-slate-800  font-medium text-base'
                    />
                </div>
            </div>

            <div className='flex mt-3 flex-col'>
                <div>
                    <h1 className=' text-slate-700 font-semibold text-base'>Number of seats:</h1>
                </div>
                <div className='mt-3 border-2 border-slate-500 rounded-md'>
                    <Input
                        placeholder= "Number of Persons"
                        name="numOfPersons"
                        value={updateSeat.numOfPersons
                        }
                        onChange={handleChange}
                        className=' text-slate-800  font-medium text-base'
                    />
                </div>
            </div>

            <div className='flex items-center justify-between space-x-3 mt-3'>
                <div>
                    {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker', 'DatePicker']}>
                            <DatePicker
                                className='border-2 rounded-md border-slate-500'
                                placeholder="Date Selected"
                                label="Selected Date"
                                value={updateSeat.selectedDay
                                    ? dayjs(updateSeat.selectedDay
                                    ) : null}
                                name="selectedDay
                " // added name prop
                                onChange={(date) =>
                                    setUpdateSeat({
                                        ...updateSeat,
                                        selectedDay
                                            : date ? dayjs(date).format("YYYY-MM-DD") : null,
                                    })
                                }

                            />
                        </DemoContainer>
                    </LocalizationProvider> */}
                    <DatePicker value={updateSeat.selectedDay
                                    ? dayjs(updateSeat.selectedDay
                                    ) : null}
                                    className='p-2 border-2 text-slate-800  font-medium text-base  border-slate-500 rounded-md'
                                name="selectedDay"
                          onChange={(date) =>
                            setUpdateSeat({
                                ...updateSeat,
                                selectedDay
                                    : date 
                                    
                            })
                        } />
                       
                </div>
                <div>
                    {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['TimePicker', 'TimePicker']}>
                            <TimePicker
                                className='border-2 border-blue-400 rounded-md'
                                label="Selected Time"
                                format="HH:mm"
                                
                                value={updateSeat.selectedtime
                                    ? updateSeat.selectedtime
                                    : null}
                                name="selectedtime
                " // added name prop
                                onChange={(time) =>
                                    setUpdateSeat({
                                        ...updateSeat,
                                        selectedtime
                                            : time ? time : null,
                                    })
                                }

                            />
                        </DemoContainer>
                    </LocalizationProvider> */}

{/* <TimePicker
  value={updateSeat.selectedtime ? moment(updateSeat.selectedtime, 'HH:mm') : null}
  name="selectedtime"
  
  minuteStep={15}
  onChange={handleTimeChange()}
  className='p-2 border-2 text-slate-800 font-medium text-base border-slate-500 rounded-md'

/> */}
                  
<TimePicker defaultValue={dayjs(updateSeat.selectedtime, format)} format={format}
                          className='p-2 border-2 text-slate-800  font-medium text-base  border-slate-500 rounded-md'
                          name="selectedtime"
                          minuteStep={15}
                          onChange={(time) =>
                            setUpdateSeat({
                                ...updateSeat,
                                selectedtime
                                    : time ? time : null,
                            })
                        }
                        />

                </div>
            </div>
        </Modal>

    );
};

export default UpdateSeatModal;