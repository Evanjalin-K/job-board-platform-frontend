import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { jobServices } from '../../services/jobServices';

export const fetchJobs = createAsyncThunk('jobs/fetchJobs', async () => {
  const response = await jobServices.getJobs();
  return response.data; 
});

export const fetchAppliedJobs = createAsyncThunk('jobs/fetchAppliedJobs', async () => {
  const response = await jobServices.getAppliedJobs();
  return response.data.map(job => job._id); 
});

export const applyJob = createAsyncThunk('jobs/applyJob', async (jobId, { rejectWithValue }) => {
  try {
    const response = await jobServices.applyJob(jobId);
    return { jobId, message: response.data.message }; 
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'An unexpected error occurred');
  }
});

export const fetchRecommendedJobs = createAsyncThunk('jobs/fetchRecommendedJobs', async (_, { rejectWithValue }) => {
  try {
    const response = await jobServices.getRecommendedJobs();
    return response; 
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'An unexpected error occurred');
  }
});

export const fetchJobsCreatedByUser = createAsyncThunk('jobs/fetchJobsCreatedByUser', async (userId, { rejectWithValue }) => {
  try {
    const response = await jobServices.getCreatedJobByUser(userId);
    return response.data; 
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'An unexpected error occurred');
  }
});

const jobSlice = createSlice({
  name: 'jobs',
  initialState: {
    jobs: [],
    filteredJobs: [],
    searchTerm: '',
    appliedJobs: [],
    recommendedJobs: [],
    createdJobs: [],
    loading: false,
    error: null,
    message: null,
    messageType: null
  },
  reducers: {
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },
    setFilteredJobs(state, action) {
      state.filteredJobs = action.payload;
    },
    clearMessage(state) {
      state.message = null;
      state.messageType = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.jobs = action.payload;
        state.filteredJobs = action.payload; 
        state.loading = false;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(fetchAppliedJobs.fulfilled, (state, action) => {
        state.appliedJobs = action.payload;
      })
      .addCase(fetchRecommendedJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecommendedJobs.fulfilled, (state, action) => {
        state.recommendedJobs = action.payload; 
        state.loading = false;
      })
      .addCase(fetchRecommendedJobs.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(applyJob.fulfilled, (state, action) => {
        const { jobId, message } = action.payload;
        if (!state.appliedJobs.includes(jobId)) {
          state.appliedJobs.push(jobId);
          state.message = message;
          state.messageType = 'success';
        }
      })
      .addCase(applyJob.rejected, (state, action) => {
        state.message = action.payload;
        state.messageType = 'error';
      })
      .addCase(fetchJobsCreatedByUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobsCreatedByUser.fulfilled, (state, action) => {
        state.createdJobs = action.payload;
        state.loading = false;
      })
      .addCase(fetchJobsCreatedByUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  }
});

export const { setSearchTerm, setFilteredJobs, clearMessage } = jobSlice.actions;

export default jobSlice.reducer;
