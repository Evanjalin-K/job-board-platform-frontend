import { Link, Outlet, useLoaderData, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { userServices } from "../services/userServices";

export async function loader() {
    try {
        const user = await userServices.getProfile();
        return { user };
    } catch (error) {
        return { user: null }; 
    }
}
const Dashboard = () => {
    const navigate = useNavigate();
    const { user } = useLoaderData();
    const [loading, setLoading] = useState(true); 
    console.log('User:', user);
    
    useEffect(() => {
        if (loading) {
            if (!user) {
                navigate('/login');
            } else {
                setLoading(false);
                if (user.data?.user?.role === 'admin') {
                    navigate('/postUser');
                }
            }
        }
    }, [user, loading, navigate]);

    const handleLogout = async () => {
        try {
            await userServices.logout();
            alert('Logout successful');
            navigate('/');
        } catch (error) {
            alert('Logout failed: ' + (error.response?.data?.message || error.message));
        }
    };

    const profileAvatar = 'https://www.gravatar.com/avatar/?d=mp';
    const profilePictureUrl = user?.data?.user?.profilePicture
        ? `https://job-board-platform-backend-hw9v.onrender.com/${user.data.user.profilePicture}`
        : profileAvatar;

    const userName = user?.data?.user
        ? `${user.data.user.fname} ${user.data.user.lname}`
        : 'Profile';

    if (loading) {
        return <div className="text-center">Loading...</div>;
    }

    const isAdmin = user && user.data.user && user.data.user.role === 'admin';

    return (
        <div className="container-fluid">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <Link className="navbar-brand d-flex align-items-center" to="/">
                        <img
                            src="https://st2.depositphotos.com/5142301/7711/v/450/depositphotos_77110131-stock-illustration-j-letter-one-line-colorful.jpg"
                            alt="logo"
                            style={{ width: '20px', height: '20px', marginRight: '10px', marginBottom: '5px', marginLeft: "60px" }}
                        />
                    </Link>
                    
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item">
                                <Link className="nav-link active fw-bold" to={"/"}>Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active fw-bold" to={"jobs"}>All Jobs</Link>
                            </li>
                        </ul>
                        <ul className="navbar-nav" style={{ marginRight: '60px' }}>
                            <li className="nav-item d-flex align-items-center">
                                <Link className="nav-link active fw-bold" to={"profile"}>{userName}</Link>
                                <img
                                    src={profilePictureUrl}
                                    alt="Profile"
                                    style={{ width: '30px', height: '30px', borderRadius: '50%', marginRight: '10px' }}
                                />
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link fw-bold" to={"application"}>Application Status</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link fw-bold" onClick={handleLogout} style={{ cursor: 'pointer' }}>Logout</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <Outlet />
        </div>
    );
};

export default Dashboard;
