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

    const [formData, setFormData] = useState({
        degree: professional?.degree || '',
        field: professional?.field || '',
        institution: professional?.institution || '',
        graduationYear: professional?.graduationYear || '',
        certifications: professional?.certifications?.join(', ') || '',
        skills: professional?.skills?.join(', ') || '',
        preferredLocations: professional?.preferredLocations?.join(', ') || '',
        desiresIndustries: professional?.desiresIndustries?.join(', ') || '',
        employmentType: professional?.employmentType || '',
        currentJob: professional?.currentJob || '',
        salaryExpectation: professional?.salaryExpectation || '',
        experience: professional?.experience || '',
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (professional) {
            setFormData({
                degree: professional.degree || '',
                field: professional.field || '',
                institution: professional.institution || '',
                graduationYear: professional.graduationYear || '',
                certifications: professional.certifications?.join(', ') || '',
                skills: professional.skills?.join(', ') || '',
                preferredLocations: professional.preferredLocations?.join(', ') || '',
                desiresIndustries: professional.desiresIndustries?.join(', ') || '',
                employmentType: professional.employmentType || '',
                currentJob: professional.currentJob || '',
                salaryExpectation: professional.salaryExpectation || '',
                experience: professional.experience || '',
            });
        }
    }, [professional]);

    const validate = () => {
        const errors = {};
        if (!formData.degree) errors.degree = 'Degree is required';
        if (!formData.field) errors.field = 'Field is required';
        if (!formData.institution) errors.institution = 'Institution is required';
        if (!formData.graduationYear) errors.graduationYear = 'Graduation Year is required';
        return errors;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const validationErrors = validate();
        if (Object.keys(validationErrors).length) {
            setErrors(validationErrors);
            return;
        }

        setLoading(true);
        setApiError(null);

        try {
            await userServices.updateProfessionalInfo(formData);
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
                    <div className="card" style={{ border: 'none' }}>
                        <div className="card-header fw-bold" style={{ border: 'none', backgroundColor: 'white' }}>
                            {isEditing ? 'Edit Professional Information' : 'View Professional Information'}
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                {[
                                    { label: 'Degree', key: 'degree' },
                                    { label: 'Field', key: 'field' },
                                    { label: 'Institution', key: 'institution' },
                                    { label: 'Graduation Year', key: 'graduationYear', type: 'number' },
                                    { label: 'Certifications', key: 'certifications' },
                                    { label: 'Skills', key: 'skills' },
                                    { label: 'Preferred Locations', key: 'preferredLocations' },
                                    { label: 'Desires Industries', key: 'desiresIndustries' },
                                    { label: 'Employment Type', key: 'employmentType' },
                                    { label: 'Current Job', key: 'currentJob' },
                                    { label: 'Salary Expectation', key: 'salaryExpectation' },
                                    { label: 'Experience', key: 'experience' }
                                ].map(({ label, key, type = 'text' }) => (
                                    <div className="mb-3" key={key}>
                                        <input
                                            type={type}
                                            className="form-control"
                                            id={key}
                                            name={key}
                                            value={formData[key] || ''}
                                            onChange={e => setFormData({ ...formData, [key]: e.target.value })}
                                            placeholder={`Enter your ${label.toLowerCase()}`}
                                            disabled={!isEditing}
                                            style={{ width: '50%' }} 
                                        />
                                        {errors[key] && (
                                            <div className="text-danger">{errors[key]}</div>
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
