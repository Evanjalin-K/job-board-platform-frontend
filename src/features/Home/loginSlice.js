import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { userServices } from '../../services/userServices';

const initialState = {
    isAuthenticated: false,
    user: null,
    loading: false,
    error: null,
    loginError: null,  
};



export const registerUser = createAsyncThunk('login/registerUser', async (userData, { rejectWithValue }) => {
    try {
        const response = await userServices.register(userData.fname, userData.lname, userData.email, userData.password);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const loginUser = createAsyncThunk('login/loginUser', async (userData, { rejectWithValue }) => {
    try {
        const response = await userServices.login(userData.email, userData.password);
        console.log('login:', response.data);
        
        return response.data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});
export const checkAuth = createAsyncThunk('login/checkAuth', async (_, { rejectWithValue }) => {
    try {
        const authStatus = await userServices.checkAuth();
        return authStatus;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

const authSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setAuthenticated: (state, action) => {
            state.isAuthenticated = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
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
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.loginError = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.user = action.payload;
                state.loading = false;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.loginError = action.payload || 'Login failed';
            });
    },
});

export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectUser = (state) => state.auth.user;
export const selectLoading = (state) => state.auth.loading;
export const selectError = (state) => state.auth.error;
export const selectLoginError = (state) => state.auth.loginError;

export const { setAuthenticated, setUser } = authSlice.actions;
export default authSlice.reducer;
