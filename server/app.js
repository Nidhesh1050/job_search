const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jobModel = require('./model')
require('dotenv').config();


const app = express();
app.use(cors());
app.use(express.json());




app.get('/jobs', async (req, res) => {
    try {
      const { title, location, employment_type, postedDateTime, min_exp, max_exp, source } = req.query;
      let filter = {};
  
      if (title) {
        filter.title = new RegExp(title, 'i');
      }
      if (location) {
        filter.location = new RegExp(location, 'i');
      }
      if (employment_type) {
        filter.employment_type = new RegExp(employment_type, 'i');
      }
      if (postedDateTime) {
        filter.postedDateTime = { $gte: new Date(postedDateTime) };
      }
  
      if (min_exp || max_exp) {
        filter.experience = {};
        if (min_exp) {
          filter.experience.$gte = min_exp;
        }
        if (max_exp) {
          filter.experience.$lte = max_exp;
        }
      }
  
      if (source) {
        filter.source = new RegExp(source, 'i');
      }
        
      const jobs = await jobModel.find(filter).limit(100);
      res.json(jobs);
    } catch (err) {
      res.status(500).json({ error: 'Error fetching jobs' });
    }
  });
  

  
const PORT = process.env.PORT || 3001;

// Database connection
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

// Server start 
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})
