import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { userServices } from '../../services/userServices';

export const updateProfessionalInfo = createAsyncThunk(
    'professional/updateProfessionalInfo',
    async (info, thunkAPI) => {
        try {
            const response = await userServices.ProfessionalInfo(info);
            console.log('API Response Data:', response.data); 
            return response.data;
        } catch (error) {
            console.error('API Error:', error); 
            return thunkAPI.rejectWithValue(error.response?.data || 'Unknown error');
        }
    }
);

const professionalSlice = createSlice({
    name: 'professional',
    initialState: {
        degree: '',
        field: '',
        institution: '',
        graduationYear: '',
        certifications: [],
        skills: [],
        preferredLocations: [],
        desiresIndustries: [],
        employmentType: '',
        currentJob: '',
        salaryExpectation: '',
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(updateProfessionalInfo.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateProfessionalInfo.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const payload = action.payload || {};
                state.degree = payload.degree || state.degree;
                state.field = payload.field || state.field;
                state.institution = payload.institution || state.institution;
                state.graduationYear = payload.graduationYear || state.graduationYear;
                state.certifications = payload.certifications || state.certifications;
                state.skills = payload.skills || state.skills;
                state.preferredLocations = payload.preferredLocations || state.preferredLocations;
                state.desiresIndustries = payload.desiresIndustries || state.desiresIndustries;
                state.employmentType = payload.employmentType || state.employmentType;
                state.currentJob = payload.currentJob || state.currentJob;
                state.salaryExpectation = payload.salaryExpectation || state.salaryExpectation;
            })
            .addCase(updateProfessionalInfo.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    }
});

export const selectProfessionalInfo = (state) => state.professional;
export const selectLoading = (state) => state.professional.status === 'loading';
export const selectError = (state) => state.professional.error;

export default professionalSlice.reducer;
