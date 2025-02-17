const  { initializeDataSource }  = require("./dataSource")
require('dotenv').config()
const express = require('express')
const userRoutes = require('./routes/userRoutes')
const authRoutes = require('./routes/authRoutes')
const activityRoutes = require('./routes/activityRoutes')
const app = express()


app.use(express.json());
app.use('/api/auth' , authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/activity" , activityRoutes);
const port = 3000;
initializeDataSource()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('Error initializing data source:', err);
  });