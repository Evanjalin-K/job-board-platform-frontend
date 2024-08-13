import axios from "axios"

const baseURL = ["http://localhost:3000", "https://job-board-platform-frontend.netlify.app", "https://job-board-platform-backend-hw9v.onrender.com"]

const instance = axios.create({
    baseURL,
    timeout:5000,
    headers: {
        "Content-Type": "application/json"
    }
});

const protectedInstance = axios.create({
    baseURL,
    timeout:5000,
    headers: {
        "Content-Type": "application/json"
    },
      withCredentials: true
});

export{ instance, protectedInstance };