import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Companies from "./components/Companies";
import HomeContent from "./components/HomeContent";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./pages/Dashboard";
import { loader as userLoader } from "./pages/Dashboard";
import Jobs from "./components/Jobs";
import BasicInfo from "./components/BasicInfo";
import ProfessionalInfo from "./components/ProfessionalInfo";
import RecommendedJobs from "./components/RecommendedJobs";
import { loader as applicationLoader } from "./pages/Dashboard";
import Application from "./components/Application";
import Search from "./components/Search";
import PostJob from "./components/PostJob";
import CompanyLogos from "./components/CompanyLogos";
import Applicants from "./components/Applicants";
import BasicInfoUpdate from "./components/BasicInfoUpdate";
import { loader as BasicLoader } from "./components/BasicInfoUpdate";
import ProfessionalInfoUpdate from "./components/ProfessionalInfoUpdate";
import { loader as ProfessionalLoader } from "./components/ProfessionalInfoUpdate";
import CreatedJobs from "./components/CreatedJobs";
import UserProfile from "./components/UserProfile";
import UserToPostJob from "./components/UserToPostJob"
import ForgotPassword from "./components/ForgotPassword";
import UpdatePassword from "./components/UpdatePassword";
import AddCompany from "./components/AddCompany";
import { loader as checkAuthLoader  } from "./components/Login";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "",
        element: <HomeContent />,
        children: [
          {
            path: "",
            element: <CompanyLogos /> // Adjusted to render CompanyLogos at the root of HomeContent
          }
        ]
      },
      {
        path: "companies",
        element: <Companies />
      },
      {
        path: "register",
        element: <Register />
      },
      {
        path: "basic",
        element: <BasicInfo />
      },
      {
        path: "professional",
        element: <ProfessionalInfo />
      },
      {
        path: "login",
        element: <Login />,
        loader: checkAuthLoader
      }
    ]
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    loader: userLoader,
    children: [
      {
        path: "",
        element: <RecommendedJobs /> // Default child route for /dashboard
      },
      {
        path: "search",
        element: <Search /> // For /dashboard/search
      },
      {
        path: "jobs",
        element: <Jobs /> // For /dashboard/jobs
      },
      {
        path: "profile",
        element: <UserProfile />, // For /dashboard/profile
        loader: userLoader
      },
      
      {
        path: "application",
        element: <Application />, // For /dashboard/application
        loader: applicationLoader
      },
      {
        path: "createdJobs",
        element: <CreatedJobs /> // For /dashboard/createdJobs
      }
    ]
  },
  {
    path: "/postUser",
    element: <UserToPostJob />,
    loader: userLoader,
    children: [
      {
        path: "", // Default child route for /postUser
        element: <PostJob />
      },
      {
        path: "jobs",
        element: <Jobs /> // For /dashboard/jobs
      },
      {
      path: "profile",
      element: <UserProfile />, // For /dashboard/profile
      loader: userLoader
      },
      {
        path: "deleteJob",
        element: <CreatedJobs />
      },
      {
        path: "applicants",
        element: <Applicants />
      },
      {
        path: "addcompany",
        element: <AddCompany/>
      }
      
    ]
  },
  {
    path: "/forgetpassword",
    element: <ForgotPassword/>
  },
  {
    path: "user/updatePassword/:token",
    element: <UpdatePassword />
  },
  {
    path: "/basic/update",
    element: <BasicInfoUpdate />, // For /dashboard/update
    loader: BasicLoader
  },
  {
    path: "/professional/update",
    element: <ProfessionalInfoUpdate />, // For /dashboard/profupdate
    loader: ProfessionalLoader
  }
  
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
