import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { userServices } from '../services/userServices';

const UpdatePassword = () => {
    const { token } = useParams();
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setMessage('Passwords do not match.');
            return;
        }
        try {
            const response = await userServices.updatePassword(newPassword, confirmPassword, token);
            console.log('Update Password response:', response);
            alert("Password updated successfully");
            setNewPassword("");
            setConfirmPassword("");

            setTimeout(() => {
                navigate('/'); 
            }, 500);
        } catch (error) {
            console.error('Error updating password:', error);

            if (error.response && error.response.status === 400) {
                setMessage('Invalid or expired reset token');
            } else {
                setMessage('Server error. Please try again later.');
            }
        }
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-8 offset-md-2 col-lg-6 offset-lg-3">
                    <div className="card">
                        <div className="card-header">
                            <h3>Reset Password</h3>
                        </div>
                        <div className="card-body mt-4">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="newPassword">New Password:</label>
                                    <input
                                        type="password"
                                        className="form-control mt-2"
                                        id="newPassword"
                                        placeholder="Enter new password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="confirmPassword">Confirm New Password:</label>
                                    <input
                                        type="password"
                                        className="form-control mt-2"
                                        id="confirmPassword"
                                        placeholder="Confirm new password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary btn-block mt-4">
                                    Update Password
                                </button>
                            </form>
                            {message && <p className="mt-3">{message}</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdatePassword;
 