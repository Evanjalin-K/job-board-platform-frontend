import { useEffect, useState } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { userServices } from "../services/userServices";

export async function loader() {
    const response = await userServices.checkAuth();
    return { response };
}

const Login = () => {
    const { response } = useLoaderData();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (response) {
            navigate("/dashboard"); 
        }
    }, []);

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

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="card" style={{
                        marginTop: '30px',
                        marginBottom: '20px',
                        backgroundColor: 'white',
                        boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.)',
                    }}>
                        <div className="card-body">
                            <form onSubmit={handleLogin}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label"></label>
                                    <input
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
                                        placeholder="Password"
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    disabled={loading}
                                >
                                    {loading ? 'Logging in...' : 'Login'}
                                </button>
                                {error && <div className="text-danger mt-3">{error}</div>}
                            </form>
                        </div>
                        <div className="card-footer" style={{ border: 'none', backgroundColor: 'white' }}>
                            <Link to={"/forgetpassword"}>Forgot Password?</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
