import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { selectProfessionalInfo, selectLoading, selectError, updateProfessionalInfo } from '../features/Home/professionalSlice';

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
            salaryExpectation: professionalInfo.salaryExpectation || ''
        },
        validate: values => {
            const errors = {};
            if (!values.degree) errors.degree = 'Degree is required';
            if (!values.field) errors.field = 'Field is required';
            if (!values.institution) errors.institution = 'Institution is required';
            if (!values.graduationYear) errors.graduationYear = 'Graduation Year is required';
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
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="card">
                        <div className="card-header fw-bold">Professional Information</div>
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
                                    { name: 'salaryExpectation', type: 'text' }
                                ].map(field => (
                                    <div className="mb-3" key={field.name}>
                                        <label htmlFor={field.name} className="form-label">
                                            {field.name.charAt(0).toUpperCase() + field.name.slice(1).replace(/([A-Z])/g, ' $1')}
                                        </label>
                                        <input
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
                                            <div className="text-danger">{formik.errors[field.name]}</div>
                                        ) : null}
                                    </div>
                                ))}
                                {error && <div className="text-danger mb-3">{error}</div>}
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    disabled={formik.isSubmitting || loading}
                                >
                                    {formik.isSubmitting || loading ? 'Saving...' : 'Save and Continue'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfessionalInfo;
