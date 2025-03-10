const express = require('express')
const cors = require('cors')
const router = require('./routes/routes.js')
const mongoose = require('mongoose')
const { middleware } = require("./middleware/auth.js")
const app = express()

const port = 3001

const hosted_server = 'https://capstone-project-sand-gamma.vercel.app'
const local_domain = 'http://localhost:3000'

mongoose.connect('mongodb+srv://romnick:1234@romnickdb.e14diyv.mongodb.net/capstone')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.use(cors({
  origin: hosted_server,
  methods: ['POST', 'DELETE', 'PUT', 'GET'],
  credentials: true
}));

// Apply middleware globally, but exclude specific routes
app.use((req, res, next) => {
  const openRoutes = ["/admin/create", "/admin/login"]; // Add routes that should be public
  if (openRoutes.includes(req.path)) {
      return next(); // Skip authentication for these routes
  }
  middleware(req, res, next);
});
app.use(express.json()); // Ensure this line is included
app.use('/', router)


// app.get('/', (req, res) => {
//     res.send('hello world')
// })


app.listen(port, () => {
  console.log('server is running')
})