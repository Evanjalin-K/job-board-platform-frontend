import React, { useState } from 'react';
import { companyServices } from '../services/companyServices'; 

const AddCompany = () => {
    const [formData, setFormData] = useState({
        name: '',
        location: '',
        logoUrl: ''
    });
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState('');

    const validate = () => {
        const errors = {};
        if (!formData.name) {
            errors.name = 'Company name is required';
        }
        if (!formData.location) {
            errors.location = 'Location is required';
        }
        if (!formData.logoUrl) {
            errors.logoUrl = 'Logo URL is required';
        } else if (!/^https?:\/\/.*\.(jpg|jpeg|png|gif)$/i.test(formData.logoUrl)) {
            errors.logoUrl = 'Invalid URL. Must be a valid image URL.';
        }
        return errors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        try {
            const response = await companyServices.addCompany(formData); 
            setStatus(response.data.message); 
            setFormData({ name: '', location: '', logoUrl: '' });
            setErrors({});
        } catch (error) {
            setStatus('An unexpected error occurred.');
        }
    };

    return (
        <div className="container mt-5">
            <div className='row justify-content-center'>
                <div className='col-md-6'>
                    {status && <div className={`alert ${status.includes('error') ? 'alert-danger' : 'alert-success'}`}>{status}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className='card p-4'   style={{border: 'none',  backgroundColor: 'white',
                    boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.2)' }}> 
                   
                            <div className="form-group">
                                <label htmlFor="name" className=""></label>
                                <input
                                    placeholder='Company Name'
                                    style={{ width: '100%' }}
                                    type="text"
                                    name="name"
                                    id="name"
                                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                                {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                            </div>
                            <div className="form-group mt-3">
                                <label htmlFor="location" className="sr-only"></label>
                                <input
                                    placeholder='Location'
                                    style={{ width: '100%' }}
                                    type="text"
                                    name="location"
                                    id="location"
                                    className={`form-control ${errors.location ? 'is-invalid' : ''}`}
                                    value={formData.location}
                                    onChange={handleChange}
                                />
                                {errors.location && <div className="invalid-feedback">{errors.location}</div>}
                            </div>
                            <div className="form-group mt-3">
                                <label htmlFor="logoUrl" className="sr-only"></label>
                                <input
                                    placeholder='Logo URL'
                                    style={{ width: '100%' }}
                                    type="text"
                                    name="logoUrl"
                                    id="logoUrl"
                                    className={`form-control ${errors.logoUrl ? 'is-invalid' : ''}`}
                                    value={formData.logoUrl}
                                    onChange={handleChange}
                                />
                                {errors.logoUrl && <div className="invalid-feedback">{errors.logoUrl}</div>}
                                <button type="submit" className="btn btn-primary mt-4"><strong>Add Company</strong></button>

                            </div>
                        </div>

                    </form>

                </div>
            </div>
        </div>
    );
};

export default AddCompany;
