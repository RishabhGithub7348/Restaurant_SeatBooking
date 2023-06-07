const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
// const cron = require('node-cron');
const moment = require('moment');



require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;




mongoose.connect('mongodb+srv://rishabhmaurya7654:Rishabh9876@cluster0.fjxekgy.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.log(err);
});


// Create a schema for the user
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  
  telephone: { type: Number, required: true },
  numOfPersons: { type: Number, required: true },
  message: { type: String },
  selectedDay: { type: String, required: true },
  selectedtime: { type: String, required: true },
}, { timestamps: true });



const adminSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const Admin = mongoose.model('Admin', adminSchema);
// Create a model for the user
const Reservation = mongoose.model('Reservation', userSchema);

app.use(cors());

// Handle JSON data
app.use(express.json());

app.use(cookieParser());


// Handle form data
app.use(express.urlencoded({ extended: true }));

// Handle static files
app.use(express.static('public'));




// cron.schedule('* * * * *', async () => {
//   try {
//     // Get the current date and time
//     const currentDate = moment().format('MMMM D, YYYY');
//     const currentTime = moment().format('HH:mm ');

//     // Calculate the current time plus 2 hours
//     const twoHoursLater = moment().add(2, 'hours');

//     // Query the database to check if there is a reservation within the next 2 hours
//     const reservationByDay = await Reservation.findOne({ selectedDay: currentDate }).exec();
//     const reservationByTime = await Reservation.findOne({ selectedtime: twoHoursLater }).exec();
    
//     if (reservationByDay && reservationByTime) {
//       // Match found based on selectedDay and selectedtime
//       console.log('Reservation found based on both selectedDay and selectedtime:', reservationByDay, reservationByTime);
//       // Handle the result
//     } else if (reservationByDay) {
//       // Match found based on selectedDay, but no match for selectedtime
//       console.log('Reservation found based on selectedDay only:', reservationByDay);
//       // Handle the case
//     } else if (reservationByTime) {
//       // Match found based on selectedtime, but no match for selectedDay
//       console.log('Reservation found based on selectedtime only:', reservationByTime);
//       // Handle the case
//     } else {
//       // No match found for selectedDay and selectedtime
//       console.log('No reservation found for the selectedDay and selectedtime');
//       // Handle the case
//     }
    
//     console.log(`Scheduler is running every minute. Current time: ${moment().format('HH:mm')} date: ${moment().format('MMMM D, YYYY')}`);
//   } catch (error) {
//     console.error('Error checking database:', error);
//   }
// });






// Function to send the automatic message using Twilio




// function sendMessage() {

//   client.messages
//     .create({
//       body: 'Your appointment is coming up on May 13, 2023 at 18:00',
//       from: 'whatsapp:+14155238886',
//       to: `whatsapp:+917348318373`
//     })
//     .then(message => console.log(message.sid))
//     .catch(err => console.error(err));
// }

const auth = (req, res, next) => {
 
  try {
    // Verify the token
    let token = req.headers.authorization;
    if(token){
      token = token.split(' ')[1];
      let user = jwt.verify(token, 'secret_key');
      req.userId = user.id;
    }
    else{
      res.status(401).json({message: 'Unauthorized'});
    }
    

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};



app.post('/api/admin-login', async (req, res) => {
  const { username, password } = req.body;

  try{
    const user = await Admin.findOne({username: username});
    if(!user){
        return res.status(401).json({message: 'Invalid Credentials'});
    }
    if(user.password == password){
        const token = jwt.sign({username : user.username, id: user._id}, 'secret_key', {expiresIn: '1h'});
        return res.status(200).json({user: user, token: token});
    }
  }

  catch(err){
      console.log(err);
      res.status(500).json({message: 'Something went wrong'});
  }
});

app.post('/api/admin-logout', (req, res) => {
  // Perform any necessary logout logic here
  res.send('Logout successful');
});

app.get('/api/admin/profile', auth, async (req, res) => {
  try {
    const user = await Admin.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Send the user's data in the response
    res.json({ username: user.username });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
});


app.post('/api/submitForm',  (req, res) => {
  console.log(req.body);

  const reservationData = req.body;

  // Create a new Reservation instance using Mongoose
  const reservation = new Reservation(reservationData);

  // Save the reservation to the database
  reservation.save()
    .then((result) => {
      console.log('Reservation saved successfully:', result);
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error('Error saving reservation:', err);
      res.status(500).send('Failed to save reservation');
    });
});


app.get('/api/getAllData',  async (req, res) => {
  
  try {
    const reservation = await Reservation.find({})
    res.json(reservation)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Internal server error',
    })
  }

});

app.delete('/api/deleteSeat/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Find the reservation by its ID and delete it
    await Reservation.findByIdAndDelete(id);

    console.log('Reservation seat deleted successfully');

    res.sendStatus(200);
  } catch (error) {
    console.error('Error deleting reservation seat:', error);
    res.status(500).send('Failed to delete reservation seat');
  }
});


app.get('/api/getReservation/:id', async (req, res) => {
  const reservationId = req.params.id;

  try {
    const reservation = await Reservation.findById(reservationId);
    
    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }

    res.json(reservation);
  } catch (error) {
    console.error('Error retrieving reservation:', error);
    res.status(500).json({ message: 'Failed to retrieve reservation' });
  }
});

// Assuming you have the required dependencies and setup for Express

// Define the route handler for updating the seat records
app.patch('/api/editseat/:id', async (req, res) => {
  const recordId = req.params.id;
  const updatedRecordData = req.body;

  try {
    // Find the record by ID and update it
    const updatedRecord = await Reservation.findOneAndUpdate(
      { _id: recordId },
      {
        $set: {
          name: updatedRecordData.name,
          email: updatedRecordData.email,
          telephone: updatedRecordData.telephone,
          numOfPersons: updatedRecordData.numOfPersons,
          selectedDay: updatedRecordData.selectedDay,
          selectedtime: updatedRecordData.selectedtime,
        },
      },
      { new: true }
    );

    if (updatedRecord) {
      // Return a success response with the updated record
      res.status(200).json({ message: 'Record updated successfully', record: updatedRecord });
    } else {
      // Return an error response if the record was not found
      res.status(404).json({ error: 'Record not found' });
    }
  } catch (error) {
    // Handle any errors that occur during the update process
    console.error(error);
    res.status(500).json({ error: 'An internal server error occurred' });
  }
});





app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});