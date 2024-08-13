import { protectedInstance } from "./instance"

const jobServices = {
    getJobs: async () => {
        return await protectedInstance.get('/job/all')
    },
    applyJob: async (jobId) => {
        return await protectedInstance.post(`/job/${jobId}/apply`)
    },
    getRecommendedJobs: async () => {
        try {
            const response = await protectedInstance.get('/job/recommendations');
            return response.data;
        } catch (error) {
            console.error('Error fetching recommended jobs:', error);
            throw error;
        }
    },
    getAppliedJobs: async () => {
        try {
            const response = await protectedInstance.get('job/applied/jobs');
            console.log('API Response:', response.data); 
            return response.data; 
        } catch (error) {
            console.error("Error fetching applied jobs:", error);
            throw error; 
        }
    },
    getCreatedJobByUser: async () => {
        try {
            const response = await protectedInstance.get('/job/createdJobs');
            console.log("User:", response.data);
            
            return response.data;
        } catch (error) {
            console.error("Error fetching jobs created by user:", error);
            throw error;
        }
      },
    updateApplicationStatus: async (applicationId, status) => {
        try {
            const response = await protectedInstance.put('/job//status/update', { applicationId, status });
            return response.data; 
        } catch (error) {
            console.error('Error updating job status:', error);
            throw new Error('Failed to update the application status. Please try again later.');
        }
    },

    deleteApplication: async (id) => {
        try {
            const response = await protectedInstance.delete(`/job/withdraw/${id}`);

            if (!response) {
                throw new Error(`Failed to delete application. Status: ${response.status}. Message: ${errorText}`);
            }

            return response; 
        } catch (error) {
            console.error('Error deleting application:', error);
            throw new Error('Failed to delete application. Please try again later.');
        }
    },
    postJob: async (jobData) => {
        try {
            const response = await protectedInstance.post('/job/add', jobData);
            return response.data;
        } catch (error) {
            throw new Error('Failed to post job. Please try again later.');
        }
    },
    deleteJobByUser : async (jobId, userId) => {
        try {
            const response = await protectedInstance.delete(`/job/admin/delete/${jobId}`, {
                data: { userId } 
            });
            return response.data;
        } catch (error) {
            throw new Error('Failed to delete job. Please try again later.');
        }
}
}


export { jobServices }