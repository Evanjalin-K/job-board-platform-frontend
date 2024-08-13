import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile, updateProfile, setProfilePicture, setEdit, updateField } from "../features/Home/profileSlice";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
    const dispatch = useDispatch();
    const { user, edit } = useSelector(state => state.profile);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchProfile());
    }, [dispatch]);

    const handleEditToggle = () => {
        dispatch(setEdit(!edit));
    };

    const saveProfile = async () => {
        if (!user) return; 

        const profileData = {
            fname: user.fname,
            lname: user.lname,
            email: user.email
        };

        try {
            await dispatch(updateProfile(profileData)).unwrap();
            alert("Profile updated successfully");
        } catch (error) {
            console.error("Failed to update profile:", error);
            alert("Failed to update profile");
        }
    };

    const handleEditProfile = () => {
        if (edit) {
            saveProfile();
        }
        handleEditToggle();
    };

    const updateProfilePicture = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('profilePicture', file);

        try {
            await dispatch(setProfilePicture(formData)).unwrap();
            alert("Profile picture updated successfully");
        } catch (error) {
            console.error("Failed to update profile picture:", error);
            alert("Failed to update profile picture");
        }
    };

    const handleChange = (field) => (e) => {
        dispatch(updateField({ field, value: e.target.value }));
    };

    const handleBasicInfo = () => {
        navigate("/basic/update");
    };
    const handleProfessionalInfo = () => {
        navigate("/professional/update")
    }

    return (
        <div className="offset-md-4 mt-5">
            <div className="profile mb-3">
                <img
                    src={user?.profilePicture ? `http://localhost:3000/${user.profilePicture}` : 'https://www.gravatar.com/avatar/'}
                    alt="Profile"
                    style={{ width: '150px', height: '150px', borderRadius: '50%' }}
                />
            </div>
            <div className="mb-3">
                <input
                    type="file"
                    id="profile"
                    accept="image/*"
                    onChange={updateProfilePicture}
                    disabled={!edit}
                    className="form-control"
                    style={{ width: 'auto' }}

                />
            </div>
            <div className="mb-3">
                <label htmlFor="fname" className="form-label">First Name</label>
                <input
                    type="text"
                    className="form-control"
                    id="fname"
                    disabled={!edit}
                    value={user?.fname || ''}
                    onChange={handleChange('fname')}
                    style={{ width: 'auto' }}

                />
            </div>
            <div className="mb-3">
                <label htmlFor="lname" className="form-label">Last Name</label>
                <input
                    type="text"
                    className="form-control"
                    id="lname"
                    disabled={!edit}
                    value={user?.lname || ''}
                    onChange={handleChange('lname')}
                    style={{ width: 'auto' }}

                />
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                    type="email"
                    className="form-control"
                    id="email"
                    disabled={!edit}
                    value={user?.email || ''}
                    onChange={handleChange('email')}
                    style={{ width: 'auto' }}

                />
            </div>
            <div>
            <button
                style={{ marginRight: '10px' }}
                className="btn btn-primary"
                onClick={handleEditProfile}
            >
                {edit ? 'Save' : 'Edit'}
            </button>
            <button
                style={{ marginRight: '10px' }}
                onClick={handleBasicInfo}
                className="btn btn-primary"
            >
                Update Basic Info
            </button>
            <button
                 style={{ marginRight: '10px' }}
                onClick={handleProfessionalInfo}
                className="btn btn-primary"
            >
                Update Professional Info
            </button>
        </div>
        </div>
    );
};

export default UserProfile;
