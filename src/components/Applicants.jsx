import React, { useEffect, useState } from 'react';
import { jobServices } from '../services/jobServices';

const Applicants = () => {
    const [applications, setApplications] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAppliedJobs = async () => {
            try {
                const response = await jobServices.getAppliedJobs();
                console.log('Fetched Applications:', response);

                if (!Array.isArray(response)) {
                    throw new Error('Unexpected response format. Expected an array of applications.');
                }

                setApplications(response);
            } catch (error) {
                setError(error.message);
                console.error("Error fetching applied jobs:", error);
            }
        };

        fetchAppliedJobs();
    }, []);

    const handleStatusUpdate = async (applicationId, status) => {
        try {
            const { updatedApplication } = await jobServices.updateApplicationStatus(applicationId, status);
            console.log('Updated Application:', updatedApplication);

            if (!updatedApplication || !updatedApplication.status) {
                throw new Error('Updated application does not contain status.');
            }

            setApplications((prevApps) =>
                prevApps.map((app) =>
                    app._id === applicationId ? { ...app, status: updatedApplication.status, jobId: updatedApplication.jobId } : app
                )
            );
        } catch (error) {
            setError(error.message);
            console.error("Error updating application status:", error);
        }
    };

    const handleDelete = async (appId) => {
        try {
            const response = await jobServices.deleteApplication(appId);
            if (response.status === 200) {
                setApplications((prevApps) => prevApps.filter((app) => app._id !== appId));
            } else {
                const errorText = await response.text();
                throw new Error(`Failed to delete application. Status: ${response.status}. Message: ${errorText}`);
            }
        } catch (error) {
            setError(error.message);
            console.error("Error deleting application:", error);
        }
    }
    console.log('app:', applications);


    return (
        <div className='container mt-4'>
            <h4  className='text-center text-muted'> <strong>Applications Status</strong></h4>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {applications.length === 0 ? (
                <p><strong>No applications found</strong></p>
            ) : (
                <div className='container'>
                    {applications.map((app) => (
                        <div className='card mb-4 offset-md-3' style={{ padding: '20px', width: '50%', border:'none'}} key={app._id}>
                                <div style={{backgroundColor: 'white', border:'none'}} className='card-header fw-bold'>
                               <strong> {app.jobId?.title || 'No Title Available'}</strong>
                            
                                </div>
                                <div style={{width: '100%'}} className='card-body'>

                            <img
                                style={{ width: '2rem', marginBottom: '15px' }}
                                alt={`${app.jobId?.company?.name || 'Company'} logo`}
                                src={app.jobId?.company?.logoUrl || ''}
                            />
                            <p className='text-muted'><strong>{app.jobId?.company.location || 'Description not available'}</strong></p>
                            <p><strong>Type: </strong> {app.jobId?.type || 'Type not available'}</p>
                            <p> <strong>Experience: </strong> {app.jobId?.experience || 'Experience not available'}</p>
                            <p> <strong>Salary: </strong> {app.jobId?.salary || 'Experience not available'}</p>


                            </div>
                            <div>
                                <button className='btn btn-primary' style={{marginRight: '10px'}} onClick={() => handleStatusUpdate(app._id, 'Shortlisted')}>
                                    <strong>Mark as Shortlisted</strong>
                                </button>
                                <button className='btn btn-primary' style={{marginRight: '10px'}} onClick={() => handleStatusUpdate(app._id, 'Rejected')}>
                                    <strong>Mark as Rejected</strong>
                                </button>
                                <button className='btn btn-primary' style={{marginRight: '10px'}}>
                                    <strong>{app.status}</strong>
                                </button>
                                <button className='btn btn-primary' style={{marginRight: '10px', marginTop: '10px'}} onClick={() => handleDelete(app._id)}>
                                    <strong>Withdraw</strong>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Applicants;
