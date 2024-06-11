import React, { useState,useEffect } from 'react'
import { useNavigate,useLocation,Link } from 'react-router-dom';
// import Updateform from './Updateform';
import axios from 'axios';
const OrgHome = () => {
  const[data,setdata]=useState();
  // const[formData,setformData]=useState()
  
    const navigate = useNavigate();
    const location = useLocation();
    var orgid = location.state&&location.state.id;
    var orgname = location.state&&location.state.name;
    useEffect(() => {
      const fetchData = async () => {
        
        try {
          const response = await axios.get(`${REACT_APP_API_URL}/posts/getpost`, { params: { orgid } });
          console.log(response.data);
          setdata(response.data);
        } catch (error) {
          console.error(error);
        }
      };
    
      fetchData();
    }, []);
    
    const movenext =()=>{
       
        navigate("/createPost",{ state: { id: orgid , name: orgname } })
    }
    
    const handleDelete = async (postId) => {
      try {
        await axios.delete(`http://localhost:4000/deletepost/${postId}`);
        // Remove the deleted post from the state
        setdata((prevData) => prevData.filter((post) => post.id !== postId));
       // window.location.reload();
      } catch (error) {
        console.error(error);
      }
    };
    
  return (
    
        <div className="flex items-center justify-center h-screen flex-col">
          <div className="max-w-md mx-auto bg-white rounded-md shadow-md">
            <div className="flex items-center justify-between px-4 py-3 bg-indigo-500">
              <h1 className="text-white text-lg font-semibold">{orgname}</h1>
            </div>
            <div className="p-4">
              {/* <button className="w-full px-4 py-2 mb-4 text-lg font-semibold text-white bg-indigo-500 rounded-md hover:bg-indigo-600">
                Profile
              </button> */}
              <button onClick={movenext} className="w-full px-4 py-2 text-lg font-semibold text-white bg-indigo-500 rounded-md hover:bg-indigo-600">
                Create Post
              </button>
              
            </div>
          </div>
         
         
          {/* {`http://localhost:4000/images/`+post.picture}  */}
          {/* {post.date.substring(0, 10)} */}
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
       {data && data.map((post) => (
         <div key={post.post_id} className="max-w-sm rounded overflow-hidden shadow-lg">
           <img src={`http://localhost:4000/images/`+post.picture}  alt="Post" className="w-full h-48 object-cover" />
           <div className="px-6 py-4">
             <div className="font-bold text-xl mb-2 text-center">{post.title}</div>
             <p className="text-gray-700 text-base text-center">{post.description}</p>
           </div>
           <div className="px-6 py-4">
             <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
               Date: {post.date.substring(0, 10)}
             </span>
             <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
               Target: {post.target_money}
             </span>
             <p className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mt-5">Amount Collected: {post.collected_money}</p>
           </div>
           <div className="flex justify-between">
                {/* <button
                  className="px-4 py-2 text-sm text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                  onClick={()=>handleOpenForm(post.post_id)}
                >
                  Update
                </button> */}
                <div className='flex w-full justify-center'>
                <button
                  className="px-4 py-2 text-sm text-white bg-red-500 rounded-lg hover:bg-red-600"
                  onClick={() => handleDelete(post.post_id)}
                >
                  Delete
                </button>
                </div>
              </div>
         </div>
       ))}
     </div>
     {/* {isFormOpen && (
      
      <Updateform
        initialData={formData}
        onSubmit={handleUpdate}
        onClose={handleCloseForm}
      />
    )} */}
    </div>
        
  )
}

export default OrgHome