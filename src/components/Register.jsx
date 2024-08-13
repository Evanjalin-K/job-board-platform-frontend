import React from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../features/Home/authSlice'; 

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const authState = useSelector(state => state.auth || { loading: false, error: null });
    const { loading, error } = authState;

    const formik = useFormik({
        initialValues: {
            fname: '',
            lname: '',
            email: '',
            password: '',
        },
        validate: values => {
            const errors = {};
            if (!values.fname) errors.fname = 'First name is required';
            if (!values.lname) errors.lname = 'Last name is required';
            if (!values.email) {
                errors.email = 'Email is required';
            } else if (!/\S+@\S+\.\S+/.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) errors.password = 'Password is required';
            return errors;
        },
        onSubmit: async (values, { setSubmitting }) => {
            try {
                await dispatch(registerUser(values));
                alert('Registration successful');
                formik.resetForm();
                setTimeout(() => navigate('/basic'), 500);
            } catch (error) {
                alert('Registration failed: ' + (error.message || 'Unknown error'));
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
                        <div className="card-header fw-bold">Register</div>
                        <div className="card-body">
                            {loading ? (
                                <div>Loading...</div>
                            ) : (
                                <form onSubmit={formik.handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="fname" className="form-label">First Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="fname"
                                            name="fname"
                                            value={formik.values.fname}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            placeholder="Enter your first name"
                                        />
                                        {formik.touched.fname && formik.errors.fname ? (
                                            <div className="text-danger">{formik.errors.fname}</div>
                                        ) : null}
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="lname" className="form-label">Last Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="lname"
                                            name="lname"
                                            value={formik.values.lname}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            placeholder="Enter your last name"
                                        />
                                        {formik.touched.lname && formik.errors.lname ? (
                                            <div className="text-danger">{formik.errors.lname}</div>
                                        ) : null}
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            name="email"
                                            value={formik.values.email}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            placeholder="Enter your email"
                                        />
                                        {formik.touched.email && formik.errors.email ? (
                                            <div className="text-danger">{formik.errors.email}</div>
                                        ) : null}
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label">Password</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="password"
                                            name="password"
                                            value={formik.values.password}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            placeholder="Enter your password"
                                        />
                                        {formik.touched.password && formik.errors.password ? (
                                            <div className="text-danger">{formik.errors.password}</div>
                                        ) : null}
                                    </div>
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        disabled={formik.isSubmitting || loading}
                                    >
                                        {formik.isSubmitting || loading ? 'Registering...' : 'Register'}
                                    </button>
                                    {error && <div className="text-danger mt-3">{error}</div>}
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
