import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchJobs,
  fetchAppliedJobs,
  applyJob,
  setSearchTerm,
  setFilteredJobs,
  clearMessage
} from "../features/Home/jobSlice";
import Search from "./Search";

const Jobs = () => {
  const dispatch = useDispatch();
  const { jobs, filteredJobs, appliedJobs, searchTerm, loading, error, message, messageType } = useSelector(state => state.jobs);

  useEffect(() => {
    dispatch(fetchJobs());
    dispatch(fetchAppliedJobs());
  }, [dispatch]);

  useEffect(() => {
    const filtered = jobs.filter((job) => {
      const safeToLowerCase = (value) => (value ? value.toLowerCase() : '');
      const fields = [
        safeToLowerCase(job.title),
        safeToLowerCase(job.description),
        safeToLowerCase(job.skills.join(", ")),
        safeToLowerCase(job.location),
        safeToLowerCase(job.company?.name),
        safeToLowerCase(job.company?.location),
        safeToLowerCase(job.status),
        safeToLowerCase(job.type),
        safeToLowerCase(job.experience),
        safeToLowerCase(job.salary)
      ];
      const searchLower = searchTerm.toLowerCase();
      return fields.some(field => field.includes(searchLower));
    });
    dispatch(setFilteredJobs(filtered));
  }, [jobs, searchTerm, dispatch]);

  const handleApplyJob = async (jobId) => {
    if (appliedJobs.includes(jobId)) {
      dispatch(clearMessage());
      return;
    }

    try {
      const result = await dispatch(applyJob(jobId)).unwrap(); 
      dispatch(fetchAppliedJobs()); 
      dispatch(clearMessage());
    } catch (error) {
      console.error("Error applying for the job:", error);
      dispatch(clearMessage());
    }
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-danger">{error}</div>;
  }

  return (
    <div className="container mt-5">
      <Search setSearchTerm={(term) => dispatch(setSearchTerm(term))} />
      <div className="row">
        <div className="col-md-12 mt-2"> 
          {message && (
            <div className={`alert alert-${messageType === "success" ? "success" : "danger"} alert-dismissible fade show`} role="alert">
              {message}
              <button type="button" className="btn-close" aria-label="Close" onClick={() => dispatch(clearMessage())}></button>
            </div>
          )}
          <div className="row">
            {filteredJobs && filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <div key={job._id} className="col-12 mb-4">
                  <div className="card" style={{ border: 'none', width: '100%' }}> 
                    <div className="card-header fw-bold" style={{ backgroundColor: 'white', border: 'none' }}>
                      {job.title}
                    </div>
                    <div className="card-body">
                      <p className="text-muted">{job.company?.location || 'Location not available'}</p>
                      {job.company?.logoUrl && (
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
                      <p><strong>Skills: </strong>{job.skills.join(", ")}</p>
                      <p><strong>Status: </strong>{job.status}</p>
                      <p><strong>Type: </strong>{job.type}</p>
                      <p><strong>Experience: </strong>{job.experience}</p>
                      <p><strong>Salary: </strong>{job.salary}</p>
                      <button
                        className="btn btn-primary"
                        onClick={() => handleApplyJob(job._id)}
                        disabled={appliedJobs.includes(job._id)} 
                      >
                        {appliedJobs.includes(job._id) ? "Applied" : "Apply"}
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No jobs available at the moment.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
