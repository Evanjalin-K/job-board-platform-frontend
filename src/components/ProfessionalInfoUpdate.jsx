import React, { useState, useEffect } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { userServices } from '../services/userServices';

export async function loader() {
    const professional = await userServices.getProfessionalInfo();
    console.log('External:', professional);
    return { professional };
}

const ProfessionalInfoUpdate = () => {
    const { professional } = useLoaderData() || {};
    console.log('Internal:', professional);

    const navigate = useNavigate();

    const [degree, setDegree] = useState(professional?.degree || '');
    const [field, setField] = useState(professional?.field || '');
    const [institution, setInstitution] = useState(professional?.institution || '');
    const [graduationYear, setGraduationYear] = useState(professional?.graduationYear || '');
    const [certifications, setCertifications] = useState(professional?.certifications?.join(', ') || '');
    const [skills, setSkills] = useState(professional?.skills?.join(', ') || '');
    const [preferredLocations, setPreferredLocations] = useState(professional?.preferredLocations?.join(', ') || '');
    const [desiresIndustries, setDesiresIndustries] = useState(professional?.desiresIndustries?.join(', ') || '');
    const [employmentType, setEmploymentType] = useState(professional?.employmentType || '');
    const [currentJob, setCurrentJob] = useState(professional?.currentJob || '');
    const [salaryExpectation, setSalaryExpectation] = useState(professional?.salaryExpectation || '');
    const [experience, setExperience] = useState(professional?.experience || '');

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (professional) {
            setDegree(professional.degree || '');
            setField(professional.field || '');
            setInstitution(professional.institution || '');
            setGraduationYear(professional.graduationYear || '');
            setCertifications(professional.certifications?.join(', ') || '');
            setSkills(professional.skills?.join(', ') || '');
            setPreferredLocations(professional.preferredLocations?.join(', ') || '');
            setDesiresIndustries(professional.desiresIndustries?.join(', ') || '');
            setEmploymentType(professional.employmentType || '');
            setCurrentJob(professional.currentJob || '');
            setSalaryExpectation(professional.salaryExpectation || '');
            setExperience(professional.experience || '');
        }
    }, [professional]);

    const validate = () => {
        const errors = {};
        if (!degree) errors.degree = 'Degree is required';
        if (!field) errors.field = 'Field is required';
        if (!institution) errors.institution = 'Institution is required';
        if (!graduationYear) errors.graduationYear = 'Graduation Year is required';
        return errors;
    };

    const handleSubmit = async event => {
        event.preventDefault();

        const validationErrors = validate();
        if (Object.keys(validationErrors).length) {
            setErrors(validationErrors);
            return;
        }

        setLoading(true);
        setApiError(null);

        try {
            await userServices.updateProfessionalInfo({
                degree,
                field,
                institution,
                graduationYear,
                certifications,
                skills,
                preferredLocations,
                desiresIndustries,
                employmentType,
                salaryExpectation,
                currentJob,
                experience
            });
            setIsEditing(false);
            navigate('/dashboard/profile');
        } catch (error) {
            console.error('Update failed:', error);
            setApiError('Failed to update professional information');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-8 offset-md-4">
                    <div className="card" style={{border: 'none'}} >
                        <div className="card-header fw-bold" style={{border: 'none', backgroundColor: 'white'}}>
                            {isEditing ? 'Edit Professional Information' : 'View Professional Information'}
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                {[
                                    { label: 'Degree', value: degree, setter: setDegree },
                                    { label: 'Field', value: field, setter: setField },
                                    { label: 'Institution', value: institution, setter: setInstitution },
                                    { label: 'Graduation Year', value: graduationYear, setter: setGraduationYear, type: 'number' },
                                    { label: 'Certifications', value: certifications, setter: setCertifications },
                                    { label: 'Skills', value: skills, setter: setSkills },
                                    { label: 'Preferred Locations', value: preferredLocations, setter: setPreferredLocations },
                                    { label: 'Desires Industries', value: desiresIndustries, setter: setDesiresIndustries },
                                    { label: 'Employment Type', value: employmentType, setter: setEmploymentType },
                                    { label: 'Current Job', value: currentJob, setter: setCurrentJob },
                                    { label: 'Salary Expectation', value: salaryExpectation, setter: setSalaryExpectation },
                                    { label: 'Experience', value: experience, setter: setExperience }
                                ].map(({ label, value, setter, type = 'text' }) => (
                                    <div className="mb-3" key={label}>
                                        <label htmlFor={label.toLowerCase().replace(/ /g, '-')} className="form-label">
                                            {label}
                                        </label>
                                        <input
                                            type={type}
                                            className="form-control"
                                            id={label.toLowerCase().replace(/ /g, '-')}
                                            name={label.toLowerCase().replace(/ /g, '-')}
                                            value={value || ''}
                                            onChange={e => setter(e.target.value)}
                                            placeholder={`Enter your ${label.toLowerCase()}`}
                                            disabled={!isEditing}
                                            style={{ width: '50%',}} 
                                        />
                                        {errors[label.toLowerCase()] && (
                                            <div className="text-danger">{errors[label.toLowerCase()]}</div>
                                        )}
                                    </div>
                                ))}
                                {apiError && <div className="text-danger mb-3">{apiError}</div>}
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    disabled={loading || !isEditing}
                                >
                                    {loading ? 'Saving...' : 'Save Changes'}
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-secondary ms-2"
                                    onClick={() => setIsEditing(!isEditing)}
                                >
                                    {isEditing ? 'Cancel' : 'Edit'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfessionalInfoUpdate;
