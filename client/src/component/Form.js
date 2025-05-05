import React, { useState, useEffect } from 'react';
import axios from 'axios';  
import '../App.css';

const App = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [filters, setFilters] = useState({
    title: '',
    location: '',
    employment_type: '',
    source: '',
    min_exp: '',
    max_exp: ''
  });

  useEffect(() => {
    axios.get('http://localhost:3001/jobs', { params: filters })
      .then(response => setJobs(response.data))
      .catch(error => console.error('Error fetching jobs:', error));
  }, [filters]);

  const handleJobClick = (job) => {
    setSelectedJob(job);
  };

  const handleSearchChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="app">
      <div className="search-bar">
        <input type="text" name="title" placeholder="Job title" value={filters.title} onChange={handleSearchChange} />
        <input type="text" name="location" placeholder="Location" value={filters.location} onChange={handleSearchChange} />
        <input type="text" name="employment_type" placeholder="Employment type" value={filters.employment_type} onChange={handleSearchChange} />
        <input type="text" name="source" placeholder="Source" value={filters.source} onChange={handleSearchChange} />
        <input type="number" name="min_exp" placeholder="Min Exp" value={filters.min_exp} onChange={handleSearchChange} />
        <input type="number" name="max_exp" placeholder="Max Exp" value={filters.max_exp} onChange={handleSearchChange} />
      </div>

      <div className="main-content">
        <div className="job-list">
          {jobs.map(job => (
            <div key={job.job_id} className="job-card" onClick={() => handleJobClick(job)}>
              <h3>{job.title}</h3>
              <p>{job.location}</p>
              <p>{job.employment_type}</p>
            </div>
          ))}
        </div>

        <div className="job-details">
          {selectedJob ? (
            <>
              <h2>{selectedJob.title}</h2>
              <p><strong>Location:</strong> {selectedJob.location}</p>
              <p><strong>Employment Type:</strong> {selectedJob.employment_type}</p>
              <p><strong>Posted:</strong> {new Date(selectedJob.postedDateTime).toLocaleDateString()}</p>
              <p><strong>Source:</strong> {selectedJob.source}</p>
              <p><strong>Experience:</strong> {selectedJob.min_exp} - {selectedJob.max_exp} years</p>
              <p><strong>Description:</strong> {selectedJob.description || "No description provided."}</p>
            </>
          ) : (
            <p>Select a job to view details</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
