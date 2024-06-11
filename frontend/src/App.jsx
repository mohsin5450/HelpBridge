import { useState } from "react";
import SignUpForm from "./components/organizations/SignUpForm";
import LoginForm from "./components/organizations/LoginForm"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegistrationForm from "./components/organizations/RegistrationForm";
import userSelection  from "./components/organizations/userSelection ";
import Profile from "./components/organizations/Profile";
import CreatePost from "./components/organizations/CreatePost";
import OrgHome from "./components/organizations/OrgHome";
import App_user from "./components/user/App_user";
import Header from "./components/user/Header";
import HomePage from "./components/user/HomePage";
import PostDetails from "./components/user/postDetails";
import LatestCampaigns from "./components/user/LatestCampaigns";
function App() {
  
  

  
  return (
     <>
    
        <header className="bg-white">
      <Header/>
      </header>
      
   
      <main>
    
      <Routes>
      
       
      
        <Route exact path="/" element={<HomePage/>} />
        <Route path="/login" element={<LoginForm/>} />
        <Route path="/SignUpForm" element={<SignUpForm/>} />
        <Route path="/donor" element={<App_user/>} />
        <Route path="/userSelection" element={<userSelection  />} />
        <Route path="/RegistrationForm" element={<RegistrationForm/>} />
        <Route path="/orgHome" element={<OrgHome/>} />
        <Route path="/createPost" element={<CreatePost/>} />
        <Route path="/Services/:id" element={<PostDetails/>}/>
        <Route path="/compaigns" element={<LatestCampaigns />}/>
      </Routes>
    
      </main>
    </>
  )
}

export default App
