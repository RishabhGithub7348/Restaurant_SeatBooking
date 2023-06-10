import React, { useContext, useState } from 'react';
import { UserContext } from '../context/userContext';
import emailjs from "@emailjs/browser";

import axios from 'axios';

const Form = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    telephone: "",
    numOfPersons: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
   const {
    selectedDay,
    setSelectedDay,
    selectedtime,
    setSelectedtime,
   } = useContext(UserContext)

   const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...form,
        selectedDay,
        selectedtime,
      };
      console.log(payload);

      const response = await axios.post('https://restaurant-seat-booking.onrender.com/api/submitForm', payload);

      if (response.status === 200) {
        const selectedDateTime = `I want to inform you that i booked seat on  ${selectedDay} at ${selectedtime}`;
        await emailjs.send(
          'service_63wd8ft', // Replace with your email service ID
          'template_7c9wpph', // Replace with your email template ID
          {
            from_name: form.name,
            to_name: "Rishabh Maurya",
            from_email: form.email,
            to_email: "rishabh.2024cse1106@kiet.edu",
            message: selectedDateTime,
          },
          'FSzvlBm91LxklB-Rn' // Replace with your email user ID
        );
        setLoading(false);
        console.log('Form data submitted successfully');
        alert("Thank you. Your seat is confirmed.");
        e.target.reset();
        setSelectedDay('');
        setSelectedtime('');
      } else {
        console.error('Failed to submit form data');
      }
    } catch (error) {
      setLoading(false);
      console.error('Error submitting form data:', error);
      alert("Ahh, something went wrong. Please try again.");
    }
  };
  

  return (
    <div className='flex flex-col  w-[500px] bg-white rounded-lg  p-2'>
      <div className='border-2 h-full w-2 bg-blue-500'></div>

     
     <div className=''>
        <div className='flex items-center justify-start'>
        <p className='text-2xl font-bold opacity-70'>Enter Details</p>
      </div>
      <form className='flex flex-col mt-2 gap-2 w-full' onSubmit={handleSubmit}>
        <div>
          <p className='text-base font-semibold text-slate-600'>Name:</p>
        </div>
        <div className='flex items-center'>
          <input className='flex-1 items-center outline-0  focus:border focus:ring-2  focus:ring-blue-500 focus:border-blue-500 focus:outline-none border-2 rounded-lg bg-slate-100 p-2'
          name="name"
          value={form.name}
          onChange={handleChange}
          type="text" placeholder='Enter your Name' />
        </div>
        <div>
          <p className='text-base font-semibold text-slate-600'>Email:</p>
        </div>
        <div className='flex items-center'>
          <input className='flex-1 items-center outline-0  focus:border focus:ring-2  focus:ring-blue-500 focus:border-blue-500 focus:outline-none border-2 rounded-lg bg-slate-100 p-2'
           name="email"
           value={form.email}
           onChange={handleChange}
          type="email" placeholder='Enter your Email' />
        </div>
        <div>
          <p className='text-base font-semibold text-slate-600'>Telephone:</p>
        </div>
        <div className='flex items-center'>
          <input className='flex-1 items-center outline-0  focus:border focus:ring-2  focus:ring-blue-500 focus:border-blue-500 focus:outline-none border-2 rounded-lg bg-slate-100 p-2'
          name='telephone'
          value={form.telephone}
          onChange={handleChange}
          type="tel" placeholder='Enter your Telephone' />
        </div>
        <div>
          <p className='text-base font-semibold text-slate-600'>Number of Persons:</p>
        </div>
        <div className='flex items-center'>
          <select className='flex-1 outline-0 border-2 rounded-lg bg-slate-100 p-2'
          name="numOfPersons"
          value={form.numOfPersons}
          onChange={handleChange}
          > 
          <option value="">Select number of persons</option>
            <option value="1">1 person</option>
            <option value="2">2 persons</option>
            <option value="3">3 persons</option>
            <option value="4">4 persons</option>
            <option value="5">5 persons</option>
            <option value="6">6 persons</option>
            <option value="7">7 persons</option>
            <option value="8">8 persons</option>
            <option value="9">9 persons</option>
            <option value="10">10 persons</option>
          </select>
        </div>
        <div>
          <p className='text-base font-semibold text-slate-600'>Message:</p>
        </div>
        <div className='flex items-center'>
          <textarea className='flex-1 items-center outline-0  focus:border focus:ring-2  focus:ring-blue-500 focus:border-blue-500 focus:outline-none border-2 rounded-lg bg-slate-100 p-2'
          name='message'
          value={form.message}
          onChange={handleChange}
          rows='4' placeholder='Enter your Message'></textarea>
        </div>
        <div className='flex items-center justify-start mt-3'>
        <button type="submit" className='bg-blue-500 hover:bg-blue-700 text-white w-2/5 ml-5 font-bold py-2 px-4 rounded-lg'>
        {loading ? "Submiting..." : "submit"}
        </button>
        </div>
      </form>
    </div>
      </div>
  );
};

export default Form;
