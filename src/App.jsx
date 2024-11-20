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
import HomeFooter from "./components/HomeFooter";

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
            element: <CompanyLogos />
          },
          {
            path:"",
            element: <HomeFooter/>
          }
        ]
      },
      {
        path: "allcompanies",
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
        element: <RecommendedJobs /> 
      },
      {
        path: "search",
        element: <Search /> 
      },
      {
        path: "jobs",
        element: <Jobs /> 
      },
      {
        path: "profile",
        element: <UserProfile />, 
        loader: userLoader
      },
      
      {
        path: "application",
        element: <Application />,
        loader: applicationLoader
      },
      {
        path: "createdJobs",
        element: <CreatedJobs /> 
      }
    ]
  },
  {
    path: "/postUser",
    element: <UserToPostJob />,
    loader: userLoader,
    children: [
      {
        path: "", 
        element: <PostJob />
      },
      {
        path: "jobs",
        element: <Jobs /> 
      },
      {
      path: "profile",
      element: <UserProfile />, 
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
    element: <BasicInfoUpdate />, 
    loader: BasicLoader
  },
  {
    path: "/professional/update",
    element: <ProfessionalInfoUpdate />, 
    loader: ProfessionalLoader
  },
  
  
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
