import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { userServices } from '../../services/userServices'; 

const initialState = {
  user: null,
  loading: false,
  error: null,
  edit: false,
};

export const fetchProfile = createAsyncThunk('profile/fetchProfile', async () => {
  const response = await userServices.getProfile();
  return response.data;
});

export const updateProfile = createAsyncThunk('profile/updateProfile', async (profileData) => {
  const response = await userServices.updateProfile(profileData);
  return response.data;
});

export const setProfilePicture = createAsyncThunk('profile/setProfilePicture', async (formData) => {
  const response = await userServices.setProfilePicture(formData);
  return response.data;
});

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setEdit(state, action) {
      state.edit = action.payload;
    },
    updateField(state, action) {
      const { field, value } = action.payload;
      if (state.user) {
        state.user[field] = value;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.user = action.payload.user || null;
        state.loading = false;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        if (state.user && action.payload && action.payload.user) {
          state.user = action.payload.user;
        }
      })
      .addCase(setProfilePicture.fulfilled, (state, action) => {
        if (state.user && action.payload && action.payload.user) {
          state.user.profilePicture = action.payload.user.profilePicture;
        }
      });
  },
});

export const selectUser = (state) => state.profile.user;
export const selectLoading = (state) => state.profile.loading;
export const selectError = (state) => state.profile.error;
export const selectEdit = (state) => state.profile.edit;

export const { setEdit, updateField } = profileSlice.actions;
export default profileSlice.reducer;
