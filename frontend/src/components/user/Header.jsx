import React,{useState} from "react";
import logo from '../../assets/logo.png'
import { Link, useNavigate } from "react-router-dom";

function Header() {
  //const [isLoggedIn, setIsLoggedIn] = useState(false);
 const navigate = useNavigate();
const moveback=()=>{
  
  navigate("/login",{replace: true});
}


  return (
    <header className="bg-indigo-500 py-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center cursor-pointer" onClick={moveback}>
          <img src={logo} alt="Logo" className="h-8 mr-2" />
         
          <h1  className="text-white font-semibold text-lg" >Charity Campaign</h1>
          
        </div>
       
      </div>
    </header>
  );
}

export default Header;
