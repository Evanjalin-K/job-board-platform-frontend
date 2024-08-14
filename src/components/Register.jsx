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
            role: 'user', 
        },
        validate: values => {
            const errors = {};
            if (!values.fname) errors.fname = 'First name is required';
            if (!values.lname) errors.lname = 'Last name is required';
            if (!values.email) {
                errors.email = 'Email is required';
            } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(values.email)) {
                errors.email = 'Email must be a valid format';
            }
            if (!values.password) errors.password = 'Password is required';
            return errors;
        },
        onSubmit: async (values, { setSubmitting }) => {
            try {
                const action = await dispatch(registerUser(values));
                if (registerUser.fulfilled.match(action)) {
                    alert('Registration successful');
                    formik.resetForm();
                    if (values.role === 'admin') {
                        navigate('/basic'); 
                    } else {
                        navigate('/basic'); 
                    }
                } else {
                    alert('Registration failed: ' + (action.payload || 'Unknown error'));
                }
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
                        <div style={{ backgroundColor: 'white' }} className="card-header fw-bold">New to Jobeee ??? Register</div>
                        <div className="card-body">
                            {loading ? (
                                <div>Loading...</div>
                            ) : (
                                <form onSubmit={formik.handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="fname" className="form-label"></label>
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
                                        <label htmlFor="lname" className="form-label"></label>
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
                                        <label htmlFor="email" className="form-label"></label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="email"
                                            name="email"
                                            value={formik.values.email}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            placeholder="Enter your email (e.g., user123@example.com)"
                                        />
                                        {formik.touched.email && formik.errors.email ? (
                                            <div className="text-danger">{formik.errors.email}</div>
                                        ) : null}
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label"></label>
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
                                    <div className="mb-3">
                                        <label htmlFor="role" className="form-label"></label>
                                        <select
                                            id="role"
                                            name="role"
                                            className="form-control"
                                            value={formik.values.role}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        >
                                            <option value="user">User</option>
                                            <option value="admin">Admin</option>
                                        </select>
                                        {formik.touched.role && formik.errors.role ? (
                                            <div className="text-danger">{formik.errors.role}</div>
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
