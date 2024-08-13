## **Job Board Platform ( Candidates Portal )** 

The project is about to create a Job Board Platform ( Candidates Portal ) by using,

Front-end: Reactjs
Back-end: Nodejs
Database: MongoDB

#### Functionality Development:

1. Users can make their profile on the home page using the form.
2. Users can browse and search for job opportunities based on their skills, preferences, and experiences.
3. Allows users to apply for job opportunities directly through the platform.
4. Provides personalized job recommendations based on the user's profile and search history to help them find      relevant opportunities.
5. Enables candidates to track the status of their job applications and manage their application history.
6. Sends notifications to users about new job opportunities (Through Email), application status updates, and other relevant information.

#### This project includes home and dashboard pages. Each page has different components.

- The front end is developed by using Reactjs. 
- Used Formik to validate the form data.
- Used Redux for the state management.
- Used React Router for handling client-side routing.
 
#### Home: 

#### Registration, basic information and professional information

- The user can register by entering their first name, last name, email, role and password.

- Both admin and user should enter basic and professional information, but only admin can enter to add a job route.

- After the registration, the user has to add their basic information, like their phone number, city, state, and country.

- Once the basic information is done, the user has to add their professional information, like their degree, field, institution, graduation year, certification, skills, preferred location, desired industries, employment type, current job, experience, and salary expectations.

- The states for registration, basic information, and authentication are managed by authSlice, and adding professional information is managed by professionalSlice.

#### Login:

- The user can enter their email and password to login, and states are managed by loginSlice.

#### Dashboard

The dashboard contains Home, Jobs, User Profile, Application Status, Add Job, and Logout.

This route will provide all the jobs and the recommended job for the user. The user can apply for the job by clicking the apply button. The states for getting the jobs applying for them are handled by jobSlice.

#### Home

The user can go back to the home page by clicking the home icon.

#### Jobs

This route will provide all the jobs. The user can apply for the job by clicking the apply button. All job-related states are managed by JobSlice.

#### User Profile

This shows the user profile of the authenticated person. The user can update the profile, upload the profile picture, basic information, and professional information. The states for updating the profile, the profile picture, and viewing the profile are managed by profileSlice.

#### Application Status

The user can get the applied job here and also find the status of the job. Here, the user can withdraw the job as well.

#### Add Jobs (Admin access)

Here, the admin can add jobs and companies, delete the created job, and change the status of the job created by them.
 
#### Note: The Add Job Route will be enabled only for the admin users.

#### Packages Used:

- reduxjs/toolkit
- axios
- bootstrap
- formik
- react
- react-dom
- react-icons
- react-redux
- react-router-dom
- redux


















