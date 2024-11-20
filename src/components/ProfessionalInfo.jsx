import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { selectProfessionalInfo, selectLoading, selectError, updateProfessionalInfo } from '../features/Home/professionalSlice';
import { useState } from 'react';

const ProfessionalInfo = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const professionalInfo = useSelector(selectProfessionalInfo) || {};
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);

    const formik = useFormik({
        initialValues: {
            degree: professionalInfo.degree || '',
            field: professionalInfo.field || '',
            institution: professionalInfo.institution || '',
            graduationYear: professionalInfo.graduationYear || '',
            certifications: professionalInfo.certifications.join(', ') || '',
            skills: professionalInfo.skills.join(', ') || '',
            preferredLocations: professionalInfo.preferredLocations.join(', ') || '',
            desiresIndustries: professionalInfo.desiresIndustries.join(', ') || '',
            employmentType: professionalInfo.employmentType || '',
            currentJob: professionalInfo.currentJob || '',
            salaryExpectation: professionalInfo.salaryExpectation || '',
            experience: professionalInfo.experience || '',
        },
        validate: values => {
            const errors = {};
            if (!values.degree) errors.degree = 'Degree is required';
            if (!values.field) errors.field = 'Field is required';
            if (!values.institution) errors.institution = 'Institution is required';
            if (!values.graduationYear) errors.graduationYear = 'Graduation Year is required';
            if (!values.certifications) errors.certifications = 'Certification is required'; 
            if (!values.skills) errors.skills = 'Skills is required'; 
            if (!values.preferredLocations) errors.preferredLocations = 'Preferred Locations is required'; 
            if (!values.desiresIndustries) errors.desiresIndustries = 'Desires Industries is required'; 
            if (!values.employmentType) errors.employmentType = 'Employment Type is required'; 
            if (!values.currentJob) errors.currentJob = 'Current Job is required'; 
            if (!values.salaryExpectation) errors.salaryExpectation = 'Salary Expectation is required'; 
            if (!values.experience) errors.experience = 'Experience is required'; 

            return errors;
        },
        onSubmit: async (values, { setSubmitting }) => {
            try {
                const updatedValues = {
                    ...values,
                    certifications: values.certifications.split(',').map(item => item.trim()),
                    skills: values.skills.split(',').map(item => item.trim()),
                    preferredLocations: values.preferredLocations.split(',').map(item => item.trim()),
                    desiresIndustries: values.desiresIndustries.split(',').map(item => item.trim())
                };

                await dispatch(updateProfessionalInfo(updatedValues)).unwrap();
                formik.resetForm();
                navigate('/dashboard');
            } catch (error) {
                console.error('Update failed:', error);
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="card" style={{ backgroundColor: 'transparent', border: 'none' }}>
                        <h3 style={{ marginTop: '50px' }} className="fw-bold text-center mt-5"><strong>Professional Information</strong></h3>
                        <div className="card-body">
                            <form onSubmit={formik.handleSubmit}>
                                {[
                                    { name: 'degree', type: 'text' },
                                    { name: 'field', type: 'text' },
                                    { name: 'institution', type: 'text' },
                                    { name: 'graduationYear', type: 'number' },
                                    { name: 'certifications', type: 'text' },
                                    { name: 'skills', type: 'text' },
                                    { name: 'preferredLocations', type: 'text' },
                                    { name: 'desiresIndustries', type: 'text' },
                                    { name: 'employmentType', type: 'text' },
                                    { name: 'currentJob', type: 'text' },
                                    { name: 'salaryExpectation', type: 'text' },
                                    { name: 'experience', type: 'text' } 
                                ].map(field => (
                                    <div className="mb-3" key={field.name}>
                                        <input  
                                            style={{ borderRadius: '10px' }}
                                            type={field.type}
                                            className="form-control"
                                            id={field.name}
                                            name={field.name}
                                            value={formik.values[field.name]}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            placeholder={`Enter your ${field.name.replace(/([A-Z])/g, ' $1')}`}
                                        />
                                        {formik.touched[field.name] && formik.errors[field.name] ? (
                                            <div className="text-light">{formik.errors[field.name]}</div>
                                        ) : null}
                                    </div>
                                ))}
                                {error && (
                                    <div className="text-light mb-3">
                                        {typeof error === 'string' ? error : error.message || 'An unexpected error occurred.'}
                                    </div>
                                )}
                                <div className='text-center' style={{ marginTop: '50px' }}>
                                    <button
                                        style={{ backgroundColor: 'transparent', border: 'none' }}
                                        type="submit"
                                        disabled={formik.isSubmitting || loading}
                                    >
                                        <strong>{formik.isSubmitting || loading ? 'Saving...' : 'Save and Continue'}</strong>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfessionalInfo;
