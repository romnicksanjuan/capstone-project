const express = require('express')
const cors = require('cors')
const router = require('./routes/routes.js')
const mongoose = require('mongoose')
const cookieParser = require("cookie-parser")
const { middleware } = require("./middleware/auth.js")
const app = express()

const port = 3001

const hosted_domain = 'https://capstone-project-sand-gamma.vercel.app'
const local_domain = 'http://localhost:3000'

mongoose.connect('mongodb+srv://romnick:1234@romnickdb.e14diyv.mongodb.net/capstone')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

  
app.use(express.json()); // Ensure this line is included
app.use(cookieParser())
app.use(cors({
  origin: local_domain,
  methods: ['POST', 'DELETE', 'PUT', 'GET'],
  credentials: true
}));
app.use('/', router)


// app.get('/', (req, res) => {
//     res.send('hello world')
// })


app.listen(port, () => {
  console.log('server is running')
})