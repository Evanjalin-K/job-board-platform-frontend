import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { userServices } from '../services/userServices';

const ForgotPassword = () => {

    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

            userServices.forgotPassword(email)
            .then(response => {
                alert('Password Reset link has send')

                setEmail("")
            })

           .catch (error => {
            alert("Link not send")
        })
    }

    return (
        <div className="container mt-5">
        <div className="row">
            <div className="col-md-8 offset-md-2 col-lg-6 offset-lg-3">
                <div className="card p-2" style={{
                    backgroundColor: 'white',
                    boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.2)',
                  }}>
                    <div className="card-header">
                        <h4 className='text-muted'>Forget Password?</h4>
                    </div>
                    <div className="card-body mt-4">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <input
                                    type="email"
                                    className="form-control mt-2"
                                    id="email"
                                    placeholder="Enter your email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                </div>
                            <button type="submit" className="btn btn-primary btn-block mt-4">
                                Submit
                            </button>
                        </form>
                        <div id="message" className="mt-3">
                        </div>
                    </div>
                    <div className="card-footer">
                        <Link to="/">Back to login</Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
};

export default ForgotPassword;
