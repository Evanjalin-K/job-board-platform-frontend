import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { jobServices } from '../../services/jobServices';
import { companyServices } from '../../services/companyServices';

const initialState = {
  jobs: [],
  companies: [],
  filteredJobs: [],
  searchTerm: '',
  appliedJobs: [],
  loadingJobs: false,
  loadingCompanies: false,
  error: null,
  success: '',
};

export const fetchJobs = createAsyncThunk('company/fetchJobs', async () => {
  const response = await jobServices.getJobs();
  return response.data;
});

export const fetchCompanies = createAsyncThunk('company/fetchCompanies', async () => {
  const response = await companyServices.getNames();
  return response.data;
});

export const postJob = createAsyncThunk('company/postJob', async (jobData, { rejectWithValue }) => {
  try {
    const response = await jobServices.postJob(jobData);
    return response.message;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || error.message || 'An error occurred');
  }
});

const jobCompanySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },
    applyJob(state, action) {
      state.appliedJobs.push(action.payload);
    },
    setFilteredJobs(state, action) {
      state.filteredJobs = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.loadingJobs = true;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.jobs = action.payload;
        state.filteredJobs = action.payload;
        state.loadingJobs = false;
      })
      .addCase(fetchJobs.rejected, (state) => {
        state.error = 'Error fetching jobs.';
        state.loadingJobs = false;
      })
      .addCase(fetchCompanies.pending, (state) => {
        state.loadingCompanies = true;
      })
      .addCase(fetchCompanies.fulfilled, (state, action) => {
        state.companies = action.payload;
        state.loadingCompanies = false;
      })
      .addCase(fetchCompanies.rejected, (state) => {
        state.error = 'Error fetching companies.';
        state.loadingCompanies = false;
      })
      .addCase(postJob.pending, (state) => {
        state.success = '';
        state.error = '';
      })
      .addCase(postJob.fulfilled, (state, action) => {
        state.success = action.payload;
      })
      .addCase(postJob.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { setSearchTerm, applyJob, setFilteredJobs } = jobCompanySlice.actions;
export default jobCompanySlice.reducer;
