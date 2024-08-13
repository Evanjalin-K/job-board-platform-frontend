import React, { useState, useEffect } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { userServices } from '../services/userServices';

export async function loader() {

        const basic = await userServices.getBasicInfo();
        console.log('External:', basic);
        
        return { basic }
}
        

const BasicInfoUpdate = () => {

    const { basic } = useLoaderData();
    
    console.log("Internal:", basic);

    const navigate = useNavigate();

    const [phone, setPhone] = useState(basic?.phone || '');
    const [city, setCity] = useState(basic?.city || '');
    const [state, setState] = useState(basic?.state || '');
    const [country, setCountry] = useState(basic?.country || '');
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        console.log('Updating state with response:', basic); 
        if (basic) {
            setPhone(basic.phone || '');
            setCity(basic.city || '');
            setState(basic.state || '');
            setCountry(basic.country || '');
        }
    }, [basic]);

    const validate = () => {
        const errors = {};
        if (!phone) errors.phone = 'Phone number is required';
        if (!city) errors.city = 'City is required';
        if (!state) errors.state = 'State is required';
        if (!country) errors.country = 'Country is required';
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
            await userServices.updateBasicInfo(phone, city, state, country);
            setIsEditing(false); 
            navigate('/dashboard/profile');
        } catch (error) {
            console.error('Update failed:', error);
            setApiError('Failed to update basic information');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-4">
                    <div className="card" style={{border: 'none'}}>
                        <div className="card-header fw-bold" style={{border: 'none', backgroundColor: 'white'}}>
                            {isEditing ? 'Edit Basic Information' : 'View Basic Information'}
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="phone" className="form-label">Phone</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="phone"
                                        name="phone"
                                        value={phone}
                                        onChange={e => setPhone(e.target.value)}
                                        placeholder="Enter your phone number"
                                        disabled={!isEditing}
                                        style={{ width: 'auto' }}

                                    />
                                    {errors.phone && (
                                        <div className="text-danger">{errors.phone}</div>
                                    )}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="city" className="form-label">City</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="city"
                                        name="city"
                                        value={city}
                                        onChange={e => setCity(e.target.value)}
                                        placeholder="Enter your city"
                                        disabled={!isEditing}
                                        style={{ width: 'auto' }}

                                    />
                                    {errors.city && (
                                        <div className="text-danger">{errors.city}</div>
                                    )}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="state" className="form-label">State</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="state"
                                        name="state"
                                        value={state}
                                        onChange={e => setState(e.target.value)}
                                        placeholder="Enter your state"
                                        disabled={!isEditing}
                                        style={{ width: 'auto' }}

                                    />
                                    {errors.state && (
                                        <div className="text-danger">{errors.state}</div>
                                    )}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="country" className="form-label">Country</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="country"
                                        name="country"
                                        value={country}
                                        onChange={e => setCountry(e.target.value)}
                                        placeholder="Enter your country"
                                        disabled={!isEditing}
                                        style={{ width: 'auto' }}

                                    />
                                    {errors.country && (
                                        <div className="text-danger">{errors.country}</div>
                                    )}
                                </div>
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

export default BasicInfoUpdate;
