const mongoose = require('mongoose');
const Job = require('../model');
const jobsRaw = require('../data/Mployee.me Task Data.json');

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('Connected to MongoDB');

    const transformJob = (job) => ({
      job_id: job["Job ID (Numeric)"]?.$numberLong || String(job["Job ID (Numeric)"] || ''),
      title: job.title || '',
      company: job.company || '',
      location: job.location || '',
      job_link: job.job_link || '',
      seniority_level: job.seniority_level || '',
      employment_type: job.employment_type || '',
      source: job.source || '',
      experience: job.experience || '',
      company_url: typeof job.company_url === 'object' && job.company_url?.$numberDouble
        ? job.company_url.$numberDouble
        : typeof job.company_url === 'string'
        ? job.company_url
        : '',
      companyImageUrl: typeof job.companyImageUrl === 'object' && job.companyImageUrl?.$numberDouble
        ? job.companyImageUrl.$numberDouble
        : typeof job.companyImageUrl === 'string'
        ? job.companyImageUrl
        : '',
      postedDateTime: job.postedDateTime?.$date || null,
      min_exp: job.min_exp || '',
      max_exp: job.max_exp || '',
      country: job.country || '',
      companytype: job.companytype || ''
    });

    const jobs = jobsRaw.map(transformJob);

    await Job.deleteMany();
    await Job.insertMany(jobs);

    console.log('Jobs imported successfully!');
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('Error importing jobs:', err);
  });
