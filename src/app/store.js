// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from "../features/Home/authSlice"
import LoginReducer from "../features/Home/loginSlice"
import ProfessionalReducer from "../features/Home/professionalSlice"
import JobsReducer from "../features/Home/jobSlice"
import ProfileReducer from "../features/Home/profileSlice"
import CompanyReducer from "../features/Home/companySlice"
export const store = configureStore({
  reducer: {
    auth: authReducer, 
    login: LoginReducer,
    professional: ProfessionalReducer,
    jobs: JobsReducer,
    profile: ProfileReducer,
    company: CompanyReducer
  },
});
