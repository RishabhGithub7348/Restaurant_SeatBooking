import React, { useContext , useState} from 'react';
import { Navbar, Button, Link, Text } from '@nextui-org/react';
import { IoEarthSharp } from 'react-icons/io5';
import { Modal,  Input, Row, Checkbox } from "@nextui-org/react";
import { Mail } from "./Mail";
import { Password } from "./Password";
import { UserContext } from '../context/userContext';
import axios from 'axios';
import {  useNavigate } from 'react-router-dom'
import { BiWindowOpen } from 'react-icons/bi';


const NavBar = () => {
 
  const [visible, setVisible] = React.useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {isAuth, setIsAuth} = useContext(UserContext);
  const navigate = useNavigate();
  console.log(username);
  console.log(password)
  

  const isDark = false;
  const handler = () => setVisible(true);

  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };
  console.log(isAuth);

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/admin-login', {
        username,
        password
      });
  
      // Check if the response data exists
      if (response && response.data) {
        // Handle successful login
       
        localStorage.setItem('token', response.data.token);
       
  
        console.log(response.data);
        
  
        // Reset the username and password
        setUsername('');
        setPassword('');
        setIsAuth(true);
  
        // Redirect or perform any necessary actions upon successful login
        // For example, you can navigate to a protected route
        setVisible(false);

        // Navigate to "/admin"
        navigate('/admin');
      } else {
        // Handle error case where response data is undefined
        console.error('Invalid response data');
      }
    } catch (error) {
      // Handle error case
      
      console.error(error);
    }
  };
  

  const handleLogout = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/admin-logout');
  
      // Check if the response data exists
      if (response && response.data) {
        localStorage.removeItem('token');
        setIsAuth(false);
      
        console.log(response.data);
        navigate('/');
      } else {
        // Handle error case where response data is undefined
        console.error('Invalid response data');
      }
    } catch (error) {
      // Handle error case
      console.error(error);
    }
  }

 
  
  return (
    <>
     <Modal
        closeButton
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Welcome to{" "}
            <Text b size={18}>
              Restaurant XYZ
            </Text>
          </Text>
        </Modal.Header>
        <Modal.Body>
        <Input
    clearable
    bordered
    fullWidth
    color="primary"
    size="lg"
    placeholder="Username"
    contentLeft={<Mail fill="currentColor" />}
    name="username"
    value={username}
    onChange={(e) => setUsername(e.target.value)}
    aria-label="UserName Input"
  />
  <Input
    clearable
    bordered
    fullWidth
    color="primary"
    size="lg"
    placeholder="Password"
    contentLeft={<Password fill="currentColor" />}
    name="password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    aria-label="Password input"
  />
          <Row justify="space-between">
            <Checkbox>
              <Text size={14}>Remember me</Text>
            </Checkbox>
            <Text size={14}>Forgot password?</Text>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onPress={closeHandler}>
            Close
          </Button>
          <Button auto className='bg-blue-400 rounded-md hover:bg-blue-600 shadow-inner text-white ' onPress={handleLogin}>
            Sign in
          </Button>
        </Modal.Footer>
      </Modal>
    <div>
      <Navbar isBordered={isDark} variant="sticky" className="sticky top-0">
        <Navbar.Brand>
          <IoEarthSharp />
          <Text b color="inherit" hideIn="xs">
            ACME
          </Text>
        </Navbar.Brand>
        <Navbar.Content enableCursorHighlight hideIn="xs" variant="underline" className=' gap-20'>
        <Navbar.Link   href="/">
            Home
          </Navbar.Link>
          <Navbar.Link href="/">Booking</Navbar.Link>
          
          <Navbar.Link  href="/">
            Menu
          </Navbar.Link>
          <Navbar.Link href="/">
            Feature
          </Navbar.Link>
        </Navbar.Content>
        <Navbar.Content>
          
        <Navbar.Item>
      {isAuth ? (
        <Button className='bg-blue-500 text-white text-xl font-semibold' auto shadow onPress={handleLogout}>
          LogOut
        </Button>
      ) : (
        <Button className='bg-blue-500 text-white text-xl font-semibold' auto shadow onPress={handler}>
          LogIn
        </Button>
      )}
    </Navbar.Item>

        </Navbar.Content>
      </Navbar>
    </div>
    </>
  );
};

export default NavBar;
