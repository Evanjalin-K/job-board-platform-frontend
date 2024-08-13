import { Link, Outlet, useLoaderData, useNavigate } from "react-router-dom";
import { userServices } from "../services/userServices";
import { useEffect } from "react";
export async function loader() {
    const user = await userServices.getProfile();
    return { user };
}

const UserToPostJob = () => {
    
    const { user } = useLoaderData();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    const profileAvatar = 'https://www.gravatar.com/avatar/?d=mp';

    const profilePictureUrl = user && user.data.user && user.data.user.profilePicture
        ? `http://localhost:3000/${user.data.user.profilePicture}`
        : profileAvatar;

    const userName = user && user.data.user
        ? `${user.data.user.fname} ${user.data.user.lname}`
        : 'Profile';


    return (
        <div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col">
                        <nav className="navbar navbar-expand-lg navbar-light bg-primary">
                            <div className="container-fluid">
                                <div>
                                    <img
                                        src="https://st2.depositphotos.com/5142301/7711/v/450/depositphotos_77110131-stock-illustration-j-letter-one-line-colorful.jpg"
                                        alt="logo"
                                        style={{ width: '20px', height: '20px', marginRight: '10px', marginBottom: '5px', marginLeft: "60px" }}
                                    />
                                    <Link className="navbar-brand fw-bold" to={"/"}>Jobee</Link>
                                </div>
                                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon"></span>
                                </button>
                                <div className="collapse navbar-collapse" id="navbarNav">
                                    <ul className="navbar-nav me-auto">
                                        <li className="nav-item">
                                            <Link className="nav-link active fw-bold" aria-current="page" to={"/"}>Home</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link active fw-bold" aria-current="page" to={"jobs"}> Jobs</Link>
                                        </li>
                                        
                                    </ul>
                                    <ul className="navbar-nav" style={{ marginRight: '60px' }}>
                                        <li className="nav-item d-flex align-items-center">
                                        <Link className="nav-link active fw-bold"  to={"profile"}>{userName}</Link>
                                            <img
                                                src={profilePictureUrl}
                                                alt="Profile"
                                                style={{ width: '30px', height: '30px', borderRadius: '50%', marginRight: '10px' }}
                                            />
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link fw-bold"  to={"applicants"}>Application Status</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link fw-bold"  to={"/postUser"}>Post Jobs</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link fw-bold"  to={"addcompany"}>Add Company</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link fw-bold"  to={"deleteJob"}>Delete Job</Link>
                                        </li> 
                                    </ul>
                                </div>
                            </div>
                        </nav> 
                    </div>
                </div>
                <Outlet />
            </div>   
        </div>
    );
};

export default UserToPostJob;
