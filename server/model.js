const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  job_id: {
    type: String,
    required: true
  },
  title: String,
  company: String,
  location: String,
  job_link: String,
  seniority_level: String,
  employment_type: String,
  source: String,
  experience: String,
  company_url: String,
  companyImageUrl: String,
  postedDateTime: {
    type: Date
  },
  min_exp: Number,
  max_exp: Number,
  country: String,
  companytype: String
});

module.exports = mongoose.model('Job', jobSchema);
