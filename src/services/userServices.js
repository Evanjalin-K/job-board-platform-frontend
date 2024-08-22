import { instance, protectedInstance } from "./instance"

const userServices= {
register: async ( fname, lname, email, password, role ) => {

    return await instance.post('/user/register', {
        fname, 
        lname, 
        email,
        password,
        role
    }, { withCredentials: true })
},
basicInfo: async (phone, city, state, country) => {
    try {
        const response = await protectedInstance.post('/user/basic', {
            phone,
            city,
            state,
            country
        });
        console.log('Data successfully saved:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error updating basic info:', error.response ? error.response.data : error.message);
        throw error; 
    }
},

updateBasicInfo: async (phone, city, state, country) => {
    try {
        const response = await protectedInstance.put('/user/basic/update', {
            phone,
            city,
            state,
            country
        });
        console.log('Data successfully saved:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error updating basic info:', error.response ? error.response.data : error.message);
        throw error;
    }
},

getBasicInfo: async() => { 
    try {
    const response = await protectedInstance.get(`/user/basic/info`);
    console.log('Fetched basic info:', response.data);
    return response.data;
} catch (error) {
    console.error('Error fetching basic info:', error.response ? error.response.data : error.message);
    throw error;
}
},
ProfessionalInfo: async (
    degree,
    field,
    institution,
    graduationYear,
    certifications,
    skills,
    preferredLocations,
    desiresIndustries,
    employementType,
    salaryExpectation
) => {
    try {
        const response = await protectedInstance.post('/user/professional', 
            degree,
            field,
            institution,
            graduationYear,
            certifications,
            skills,
            preferredLocations,
            desiresIndustries,
            employementType,
            salaryExpectation
        );
        return response.data;
    } catch (error) {
        console.error('Error updating professional info:', error);
        throw error; 
    }
},

login: async (email, password) => {
    return await protectedInstance.post('/user/login', {
        email, 
        password
    }, { withCredentials: true })
},
getProfile: async () => {
    try {
        const user = await protectedInstance.get('/user/profile')
        console.log("Profile:", user);
        
        return user;

    } catch (error) {
        return null
    }
},
updateProfile: async (profileData) => {
    try {
        const response = await protectedInstance.put('/user/profile/update', profileData);
        return response.data;
    } catch (error) {
        console.error('Error updating profile:', error);
        throw error;  
    }
},

logout: async() => { 
    return await protectedInstance.post('/user/logout')
},
checkAuth: async () => {
    try {
        const user = await protectedInstance.get('/user/profile');
        return user? true : false;
    } catch (error) { 
        return false;
    }
},
setProfilePicture: async (formData) => {
    return await protectedInstance.put('/user/profile/picture', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
},


getProfessionalInfo: async() => { 
    try {
    const response = await protectedInstance.get(`/user/professional/info`);
    console.log('Fetched professional info:', response.data);
    return response.data;
} catch (error) {
    console.error('Error fetching professional info:', error.response ? error.response.data : error.message);
    throw error;
}
},

  updateProfessionalInfo: async (
            degree,
            field,
            institution,
            graduationYear,
            certifications,
            skills,
            preferredLocations,
            desiresIndustries,
            employmentType,
            salaryExpectation,
            currentJob,
            experience
) => {
    try{

        const response = await protectedInstance.put('/user/professional/update', 
            degree,
            field,
            institution,
            graduationYear,
            certifications,
            skills,
            preferredLocations,
            desiresIndustries,
            employmentType,
            salaryExpectation,
            currentJob,
            experience
        );

        return response.data;
    } catch (error) {
        console.error('Error updating professional info:', error);

        return null;
    }
},
forgotPassword: async (email) => {
        
    const response = await instance.post(`/user/${email}`, {
        email
    });
    
},
updatePassword: async (newPassword, confirmPassword, token) => {

    const response = await instance.post(`/user/updatePassword/${token}`, { 
        newPassword,
        confirmPassword
        
    });
}
}
export { userServices }