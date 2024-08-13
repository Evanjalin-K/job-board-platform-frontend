import React, { useEffect, useState } from 'react';
import { jobServices } from '../services/jobServices';

const AdminApplication = () => {
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
                    app._id === applicationId ? { ...app, status: updatedApplication.status } : app
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
    

    return (
        <div>
            <h1>Applied Jobs</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {applications.length === 0 ? (
                <p>No applications found.</p>
            ) : (
                <div className='container'>
                    {applications.map((app) => (
                        <div className='card' style={{padding: '20px'}} key={app._id}>
                            <h2>{app.jobId?.title || 'No Title Available'}</h2>
                            <img
                                style={{ width: '2rem', marginBottom: '5px', marginTop: '5px' }}
                                alt={`${app.jobId?.company?.name || 'Company'} logo`}
                                src={app.jobId?.company?.logoUrl || ''}
                            />
                            <p>{app.jobId?.company?.location || 'Location not available'}</p>
                            <p>Status: {app.status || 'Status not available'}</p>
                            <div>
                                <button onClick={() => handleStatusUpdate(app._id, 'Shortlisted')}>
                                    Mark as Shortlisted
                                </button>
                                <button onClick={() => handleStatusUpdate(app._id, 'Rejected')}>
                                    Mark as Rejected
                                </button>
                                <button >
                                    {app.status}
                                </button>
                                <button onClick={() => handleDelete(app._id)}>
                                    Withdraw
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminApplication;
