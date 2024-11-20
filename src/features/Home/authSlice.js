import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { userServices } from '../../services/userServices';

const initialState = {
    isAuthenticated: false,
    user: null,
    phone: '',
    city: '',
    state: '',
    country: '',
    loading: false,
    error: null,
};

export const checkAuth = createAsyncThunk(
    'auth/checkAuth',
    async (_, { rejectWithValue }) => {
        try {
            const authStatus = await userServices.checkAuth();
            return authStatus;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async ({ fname, lname, email, password, role }, { rejectWithValue }) => {
        try {
            const response = await userServices.register(fname, lname, email, password, role);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const updateBasicInfo = createAsyncThunk(
    'auth/updateBasicInfo',
    async (info, { rejectWithValue }) => {
        try {
            const response = await userServices.updateBasicInfo(info.phone, info.city, info.state, info.country);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to update basic information');
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthenticated: (state, action) => {
            state.isAuthenticated = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setBasicInfo: (state, action) => {
            const { phone, city, state: newState, country } = action.payload;
            state.phone = phone;
            state.city = city;
            state.state = newState;
            state.country = country;
        },
        resetAuth: () => {
            return initialState; // Resetting to initial state
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(checkAuth.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.isAuthenticated = action.payload.isAuthenticated;
                state.user = action.payload.user;
                state.loading = false;
            })
            .addCase(checkAuth.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to check authentication';
            })
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.user = action.payload;
                state.loading = false;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Registration failed';
            })
            .addCase(updateBasicInfo.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateBasicInfo.fulfilled, (state, action) => {
                if (action.payload) {
                    const { phone, city, state: newState, country } = action.payload;
                    state.phone = phone || '';
                    state.city = city || '';
                    state.state = newState || '';
                    state.country = country || '';
                }
                state.loading = false;
            })
            .addCase(updateBasicInfo.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to update basic information';
            });
    },
});

export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectUser = (state) => state.auth.user;
export const selectBasicInfo = (state) => ({
    phone: state.auth.phone || '',
    city: state.auth.city || '',
    state: state.auth.state || '',
    country: state.auth.country || '',
});
export const selectLoading = (state) => state.auth.loading;
export const selectError = (state) => state.auth.error;

export const { setAuthenticated, setUser, setBasicInfo, resetAuth } = authSlice.actions;
export default authSlice.reducer;
