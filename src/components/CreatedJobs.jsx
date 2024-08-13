import React, { useEffect, useState } from 'react';
import { jobServices } from '../services/jobServices';
import { userServices } from '../services/userServices'; 

const CreatedJobs = () => {
    const [jobs, setJobs] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 
    const [userId, setUserId] = useState(null); 

    useEffect(() => {
        const fetchUserIdAndJobs = async () => {
            try {
                const userResponse = await userServices.getProfile();
                setUserId(userResponse._id);

                const jobsResponse = await jobServices.getCreatedJobByUser(userResponse._id);
                
                if (jobsResponse.jobs) {
                    setJobs(jobsResponse.jobs);
                } else {
                    setError('No jobs found.');
                }
            } catch (error) {
                console.error('Failed to fetch jobs', error);
                setError('Failed to fetch jobs');
            } finally {
                setLoading(false);
            }
        };

        fetchUserIdAndJobs();
    }, []); 

    const deleteJob = async (jobId) => {
        try {
            const response = await jobServices.deleteJobByUser(jobId, userId);
            alert(response.message);
            setJobs(prevJobs => prevJobs.filter(job => job._id !== jobId));
        } catch (err) {
            alert("Error deleting job: " + err.message);
        }
    };

    return (
        <div className="container mt-5">
            <h4 className='mb-4 mt-4 text-center text-muted'>Jobs Created by You</h4>
            <div className="row">
                {loading && <p>Loading...</p>}
                {error && <p className="error">{error}</p>}
                {jobs.length > 0 ? (
                    jobs.map((job) => (
                        <div key={job._id} className="col-12 mb-4">
                            <div className="card" style={{ border: 'none', width: '100%' }}>
                                <div style={{ border: 'none', backgroundColor: 'white' }} className="card-header fw-bold">
                                    {job.title}
                                </div>

                                <div className="card-body">
                                <p className="text-muted">{job.company?.location || 'Location not available'}</p>
                               { job.company?.logoUrl && (
                        <h6 className="card-subtitle mb-2 text-muted">
                          <img
                            src={job.company.logoUrl || 'default-logo.png'}
                            className="card-img-top"
                            style={{ width: '2rem', marginBottom: '5px', marginTop: '5px' }}
                            alt={job.company?.name || 'Company Logo'}
                          />
                        </h6>
                      )}

                                    <p>{job.description}</p>
                                    <p><strong>Skills:</strong> {job.skills.join(', ')}</p>
                                    <p><strong>Experience:</strong> {job.experience}</p>
                                    <p><strong>Salary:</strong> {job.salary}</p>
                                    <p><strong>Status:</strong> {job.status}</p>
                                    <button className="btn btn-danger btn-sm" onClick={() => deleteJob(job._id)}>Delete Job</button>

                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    !loading && <p>No jobs found.</p>
                )}
            </div>
        </div>
    );
};

export default CreatedJobs;
