import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import {
    updateBasicInfo,
    selectBasicInfo,
    selectLoading,
    selectError,
} from '../features/Home/authSlice';
import { useState } from 'react';

const BasicInfo = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [bgImage, setBgImage] = useState("https://t4.ftcdn.net/jpg/04/04/40/49/240_F_404404954_WGYZtTwswIrXnJl6qVeEFK5UWPFflVB8.jpg");



    const basicInfo = useSelector(selectBasicInfo) || {};
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);

    const formik = useFormik({
        initialValues: {
            phone: basicInfo.phone || '',
            city: basicInfo.city || '',
            state: basicInfo.state || '',
            country: basicInfo.country || '',
        },
        validate: values => {
            const errors = {};
            if (!values.phone) {
                errors.phone = 'Phone number is required';
            } else if (!/^\d{10}$/.test(values.phone)) { 
                errors.phone = 'Phone number must be exactly 10 digits';
            }
            if (!values.city) errors.city = 'City is required';
            if (!values.state) errors.state = 'State is required';
            if (!values.country) errors.country = 'Country is required';
            return errors;
        },
        onSubmit: async (values, { setSubmitting }) => {
            try {
                await dispatch(updateBasicInfo(values)).unwrap();
                formik.resetForm();
                navigate('/professional');
            } catch (error) {
                console.error('Update failed:', error);
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <div style={{backgroundImage:`url(${bgImage})`}}>
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="card" style={{backgroundColor: 'transparent', height:'110vh', marginTop: '20px' , border:'none'}} >
                    <h3 className="card-header fw-bold text-center mt-5" style={{border: 'none'}}> <strong style={{color: 'white'}}>Basic Information</strong> </h3>
                        <div className="card-body">
                            <form onSubmit={formik.handleSubmit}>
                                {[
                                    { name: 'phone', type: 'tel', placeholder: 'Enter your 10-digit phone number' },
                                    { name: 'city', type: 'text', placeholder: 'Enter your city' },
                                    { name: 'state', type: 'text', placeholder: 'Enter your state' },
                                    { name: 'country', type: 'text', placeholder: 'Enter your country' }
                                ].map(field => (
                                    <div className="mb-3" key={field.name}>
                                        <label  className="form-label">
                                        </label>
                                        <input
                                            type={field.type}
                                            className="form-control"
                                            id={field.name}
                                            name={field.name}
                                            value={formik.values[field.name]}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            placeholder={field.placeholder}
                                        />
                                        {formik.touched[field.name] && formik.errors[field.name] ? (
                                            <div className="text-light">{formik.errors[field.name]}</div>
                                        ) : null}
                                    </div>
                                ))}
                                {error && <div className="text-light mb-3">{error}</div>}
                                <div className='text-center'  style={{marginTop:'50px'}}>
                                <button
                                 style={{color:'white', fontSize:'larger', border:'none', backgroundColor:'transparent'}}

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
        </div>
    );
};

export default BasicInfo;
