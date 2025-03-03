import { useEffect, useState } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { userServices } from "../services/userServices";

export async function loader() {
    const response = await userServices.checkAuth();
    return response
}

const Login = () => {
    
    const { response } = useLoaderData();
    console.log(response);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [isHovered, setIsHovered] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (response) {
            navigate("/login");
        }
    }, [response, navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await userServices.login(email, password);
            alert("Login successful");

            setEmail("");
            setPassword("");
            
            navigate("/dashboard");

        } catch (error) {
            setError("Login failed: " + (error.response?.data?.message || error.message));
        } finally {
            setLoading(false);
        }
    };

    if (response) {
        return <div>Redirecting...</div>;
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
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <div className="card" style={{
                            marginTop: '30px',
                            marginBottom: '20px',
                            backgroundColor: 'transparent',
                            border: 'none',
                
                        }}>
                            <div className="card-body" style={{marginTop: '100px'}}>
                                <form onSubmit={handleLogin}>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label"></label>
                                        <input
                                            style={{   borderRadius: "10px" }}
                                            placeholder="Email"
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label"></label>
                                        <input
                                             style={{   borderRadius: "10px" }}
                                            placeholder="Password"
                                            type="password"
                                            className="form-control"
                                            id="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="text-center">
                                    
                                    <button
                                    style={buttonStyle}
                                   type="submit"
                                   onMouseEnter={() => setIsHovered(true)}
                                    onMouseLeave={() => setIsHovered(false)}
                                       disabled={loading}
                                         >
                                     {loading ? 'Logging in...' : 'Login'}
                                     
                                     </button>
                                     </div>
                                    {error && <div className="text-danger mt-3">{error}</div>}
                                </form>
                            </div>
                            <div className="card-footer text-center hover-text" style={{ border: 'none', backgroundColor: 'transparent' }}>
                                <Link style={{color:'black', textDecoration: 'none'}} to={"/forgetpassword"}> <strong>Forgot Password?</strong> </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
};

export default Login;
