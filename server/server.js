const express = require('express')
const cors = require('cors')
const router = require('./routes/routes.js')
const mongoose = require('mongoose')
const app = express()

const port = 3001



mongoose.connect('mongodb+srv://romnick:1234@romnickdb.e14diyv.mongodb.net/capstone')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.use(cors());
app.use(express.json()); // Ensure this line is included
app.use('/', router)

// app.get('/', (req, res) => {
//     res.send('hello world')
// })


app.listen(port, () => {
    console.log('server is running')
})