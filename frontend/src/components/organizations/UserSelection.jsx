import React, { useEffect } from 'react'
import axios from "axios";
import { useNavigate,useLocation,Link } from 'react-router-dom';
const userSelection = () => {
    const navigate = useNavigate();
    const location = useLocation();
  
 
 var receivedUsername = location.state && location.state.name;
 var userid = location.state&&location.state.id;
 
   const movenext=async()=>{
  //  alert(userid);
   try {
    
     const response = await axios.post(`${REACT_APP_API_URL}/organization/getid`, {userid});
     if(response.data.length>0)
     {
console.log(response.data[0].org_name);Registration
       navigate('/orgHome',{ state: { id: response.data[0].id, name: response.data[0].org_name } });
     }
     else{
      navigate('/RegistrationForm',{ state: { id: userid, name: receivedUsername } });
     }
  
    
   } catch (error) {
    
      console.error(error);
   }
    
   }
  const movetoUser =()=>{
    navigate('/donor');
  }
    
  return (
    <>
   <div className="flex justify-center items-center h-screen">
      <div className="bg-white rounded-lg p-8 shadow-md">
        <h1 className="text-2xl font-bold mb-4">Wellcome {receivedUsername}</h1>
        <h2 className="text-lg mb-4">Choose User Type</h2>
        <div className="flex justify-center">
          <button 
          onClick={movetoUser}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4">
            Donor User
          </button>
          <Link   className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={movenext}>
            Charity Collector
          </Link>
        </div>
      </div>
    </div>
    </>
  )
}

export default userSelection