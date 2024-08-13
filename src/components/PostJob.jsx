import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCompanies, postJob } from '../features/Home/companySlice';

const PostJob = () => {
  const dispatch = useDispatch();
  const { companies = [], loadingCompanies, error, success } = useSelector(state => state.company || {});

  useEffect(() => {
    dispatch(fetchCompanies());
  }, [dispatch]);

  const formik = useFormik({
    initialValues: {
      title: '',
      company: '',
      description: '',
      skills: '',
      experience: '',
      salary: ''
    },
    validate: values => {
      const errors = {};
      if (!values.title) errors.title = 'Job title is required';
      if (!values.company) errors.company = 'Company selection is required';
      if (!values.description) errors.description = 'Description is required';
      if (!values.skills) errors.skills = 'Skills are required';
      if (!values.experience) errors.experience = 'Experience is required';
      if (!values.salary) errors.salary = 'Salary is required';
      return errors;
    },
    onSubmit: (values, { setSubmitting, resetForm }) => {
      const jobData = {
        title: values.title,
        company: values.company,
        description: values.description,
        skills: values.skills.split(',').map(skill => skill.trim()),
        experience: values.experience,
        salary: values.salary
      };
      dispatch(postJob(jobData))
        .then(() => {
          resetForm(); 
        })
        .catch(() => {})
        .finally(() => {
          setSubmitting(false);
        });
    }
  });

  return (
    <div className="container mt-5 offset-md-3" style={{ width: '50%' }}>
      <h4 className='text-muted text-center'>Add a New Job</h4>
      {loadingCompanies && <div>Loading companies...</div>}
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label className='mb-2 mt-2' htmlFor="title"></label>
          <input
            placeholder='Job Title'
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.title && formik.errors.title ? (
            <div className="text-danger">{formik.errors.title}</div>
          ) : null}
        </div>
        <div className="form-group">
          <label className='mb-2 mt-2' htmlFor="company"></label>
          <select
            className="form-control"
            id="company"
            name="company"
            value={formik.values.company}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option className='text-muted' value="company">Select a Company</option>
            {companies.length > 0 ? (
              companies.map(company => (
                <option key={company._id} value={company._id}>
                  {company.name} - {company.location}
                </option>
              ))
            ) : (
              <option value="">No companies available</option>
            )}
          </select>
          {formik.touched.company && formik.errors.company ? (
            <div className="text-danger">{formik.errors.company}</div>
          ) : null}
        </div>
        <div className="form-group">
          <label className='mb-2 mt-2' htmlFor="description"></label>
          <textarea
            placeholder='Description'
            className="form-control"
            id="description"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.description && formik.errors.description ? (
            <div className="text-danger">{formik.errors.description}</div>
          ) : null}
        </div>
        <div className="form-group">
          <label className='mb-2 mt-2' htmlFor="skills"></label>
          <input
            placeholder='Skills (comma-separated)'
            type="text"
            className="form-control"
            id="skills"
            name="skills"
            value={formik.values.skills}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.skills && formik.errors.skills ? (
            <div className="text-danger">{formik.errors.skills}</div>
          ) : null}
        </div>
        <div className="form-group">
          <label className='mb-2 mt-2' htmlFor="experience"></label>
          <input
            placeholder='Experience'
            type="text"
            className="form-control"
            id="experience"
            name="experience"
            value={formik.values.experience}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.experience && formik.errors.experience ? (
            <div className="text-danger">{formik.errors.experience}</div>
          ) : null}
        </div>
        <div className="form-group">
          <label className='mb-2 mt-2' htmlFor="salary"></label>
          <input
            placeholder='Salary'
            type="text"
            className="form-control"
            id="salary"
            name="salary"
            value={formik.values.salary}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.salary && formik.errors.salary ? (
            <div className="text-danger">{formik.errors.salary}</div>
          ) : null}
        </div>
        <button type="submit" className="btn btn-primary mt-4" disabled={formik.isSubmitting}>
          Submit
        </button>
        {success && <div className="alert alert-success mt-3">{success}</div>}
        {error && <div className="alert alert-danger mt-3">{error}</div>}
      </form>
    </div>
  );
};

export default PostJob;
