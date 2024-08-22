import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { userServices } from '../services/userServices';

const ForgotPassword = () => {

    const [email, setEmail] = useState('');
    const [bgImage, setBgImage] = useState("https://images.unsplash.com/photo-1432821596592-e2c18b78144f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
    const [isHovered, setIsHovered] = useState(false);


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

    const buttonStyle = {
        backgroundColor: 'transparent',
        border: 'none',
        cursor: 'pointer',
        padding: '10px 20px',
        borderRadius: '5px',
        transition: 'background-color 0.3s ease, transform 0.3s ease',
        fontSize: '16px',
        transform: isHovered ? 'scale(1.1)' : 'scale(1)',
        fontWeight: 'bold', 
    };

    return (
        <div style={{ backgroundImage: `url(${bgImage})`, height: "100vh"}}>
        <div className="container">
        <div className="row">
            <div className="col-md-8 offset-md-2 col-lg-6 offset-lg-3">
                <div className="card" style={{
                    marginTop:"100px",
                    backgroundColor: 'transparent',
                    border:'none'
                  }}>
                    <div className="card-header" style={{border:'none'}}>
                        <h4 className='text-center'><strong>Forget Password?</strong></h4>
                    </div>
                    <div className="card-body mt-2">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <input
                                    style={{borderRadius:"10px", backgroundColor:'seashell'}}
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    placeholder="Enter your email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                </div>
                                <div className='text-center'>
                                <button style={buttonStyle} type="submit" className="mt-3" onMouseEnter={() => setIsHovered(true)}
                                    onMouseLeave={() => setIsHovered(false)}>
                                <strong>Submit</strong>
                            </button>
                                </div>
                            
                        </form>
                        <div id="message" className="">
                        </div>
                    </div>
                    <div className="card-footer text-center" style={{border:'none'}}>
                        <Link style={{textDecoration:'none'}} to="/"><strong style={{color:'black'}}>Back to login</strong></Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
    );
};

export default ForgotPassword;
