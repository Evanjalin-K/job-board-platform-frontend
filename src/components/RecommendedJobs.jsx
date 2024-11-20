import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchJobs,
  fetchAppliedJobs,
  applyJob,
  setSearchTerm,
  setFilteredJobs,
} from "../features/Home/jobSlice";
import Search from "./Search";

const RecommendedJobs = () => {
  const dispatch = useDispatch();
  const { jobs, recommendedJobs, filteredJobs, appliedJobs, searchTerm, loading, error, noRecommendedJobsMessage } = useSelector(state => state.jobs);

  const [message, setMessage] = useState(""); 
  const [messageType, setMessageType] = useState(""); 
  const [filterTerm, setFilterTerm] = useState(""); 

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

      const searchLower = filterTerm.toLowerCase();

      return fields.some(field => field.includes(searchLower));
    });

    dispatch(setFilteredJobs(filtered));
  }, [jobs, filterTerm, dispatch]);

  const handleApplyJob = async (jobId) => {
    if (appliedJobs.includes(jobId)) {
      setMessage("You have already applied for this job.");
      setMessageType("error");
      return;
    }

    try {
      const action = await dispatch(applyJob(jobId));
      const { message: responseMessage } = action.payload;

      if (responseMessage.includes('already applied')) {
        setMessage(responseMessage);
        setMessageType("error");
      } else {
        setMessage("Job applied successfully");
        setMessageType("success");
        dispatch(fetchAppliedJobs()); 
      }
    } catch (error) {
      console.error("Error applying for the job:", error);
      setMessage("Error applying for the job.");
      setMessageType("error");
    }
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-danger">{error}</div>;
  }

  // Show message if professional info is missing
  if (noRecommendedJobsMessage) {
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-12 mt-2">
            <div className="alert alert-warning alert-dismissible fade show" role="alert">
              {noRecommendedJobsMessage}
              <button type="button" className="btn-close" aria-label="Close" onClick={() => { setMessage(""); setMessageType(""); }}></button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const filteredRecommendedJobs = recommendedJobs.filter((job) => {
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

    const filterLower = filterTerm.toLowerCase();

    return fields.some(field => field.includes(filterLower));
  });

  return (
    <div className="container mt-5">
      <Search setSearchTerm={(term) => setFilterTerm(term)} />
      <div className="row">
        <div className="col-md-12 mt-2"> 
          {message && (
            <div className={`alert alert-${messageType === "success" ? "success" : "danger"} alert-dismissible fade show`} role="alert">
              {message}
              <button type="button" className="btn-close" aria-label="Close" onClick={() => { setMessage(""); setMessageType(""); }}></button>
            </div>
          )}

          <h4 style={{marginLeft:'10px'}} className="text-muted"><strong>Jobs recommended for you</strong></h4>

          <div className="row mt-4">
            {filteredRecommendedJobs && filteredRecommendedJobs.length > 0 ? (
              filteredRecommendedJobs.map((job) => (
                <div key={job._id} className="col-12 mb-4">
                  <div className="card" style={{ border: 'none', width: '100%' }}> 
                    <div style={{border: 'none', backgroundColor: 'white'}} className="card-header"><strong>{job.title}</strong></div>
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
                      <p className="card-text">{job.description}</p>
                      <p><strong>Skills: </strong>{job.skills.join(", ")}</p>
                      <p><strong>Company: </strong>{job.company?.name}</p>
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
              <p style={{marginLeft: '10px'}}>No recommended jobs available at the moment.</p>
            )}
          </div>

          <div className="row">
            <h4 style={{marginLeft:'10px'}} className="text-muted"><strong>All Jobs</strong></h4>
            {filteredJobs && filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <div key={job._id} className="col-12 mb-4">
                  <div className="card" style={{ border: 'none', width: '100%' }}> 
                      <div className="card-header fw-bold" style={{border: 'none', backgroundColor:'white'}}>{job.title}</div>
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
                      <p className="card-text">{job.description}</p>
                      <p><strong>Skills: </strong>{job.skills.join(", ")}</p>
                      <p><strong>Company: </strong>{job.company?.name}</p>
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

export default RecommendedJobs;
