const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
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
  message: { type: String, required: true },
  selectedDay: { type: String, required: true },
  selectedtime: { type: String, required: true },
}, { timestamps: true });

// Create a model for the user
const Reservation = mongoose.model('User', userSchema);

app.use(cors());

// Handle JSON data
app.use(express.json());

// Handle form data
app.use(express.urlencoded({ extended: true }));

// Handle static files
app.use(express.static('public'));

app.post('/api/submitForm', (req, res) => {
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
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});