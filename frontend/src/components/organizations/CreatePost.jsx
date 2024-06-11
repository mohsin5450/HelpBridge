import React, { useState } from 'react';
import { useNavigate,useLocation,Link} from 'react-router-dom';
import axios from 'axios';
function CreatePost() {
  const [formData, setFormData] = useState({
    id:'',
    title: '',
    description: '',
    date: '',
    targetMoney: '',
    amountCollected: '',
    picture: '',
  });
const[file,setFile]=useState();

 const handleFile=(e)=>{
    setFile(e.target.files[0]);
    formData.picture=file;
 }
const navigate = useNavigate();
const location = useLocation();
var orgId = location.state&& location.state.id;

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const formdata = new FormData();
    formdata.append('id', orgId);
    formdata.append('title', formData.title);
    formdata.append('description', formData.description);
    formdata.append('date', formData.date);
    formdata.append('targetMoney',formData.targetMoney);
    formdata.append('amountCollected',formData.amountCollected);
     formdata.append('image',file);
  
    var username = location.state&&location.state.name;
formData.id=orgId;
if( formData.id&&
formData.title&&
formData.description&&
formData.date&&
formData.targetMoney&&
formData.amountCollected)
    // TODO: Perform submission logic or API call with the form data
    try {
    alert(formData.id);
        const response = await axios.post(`${REACT_APP_API_URL}/posts/createpost`, formdata)
 navigate("/orgHome",{ state: { id: orgId, name: username } });
      } catch (error) {
        console.error(error);
        
          alert("not post the data");
        
      }
      else{
        alert("please fill all input field");
      }
    // Reset the form
    setFormData({
      title: '',
      description: '',
      date: '',
      targetMoney: '',
      amountCollected: '',
      picture: '',
    });
  };
  const handleChange = (event) => {
    const { name, value, type } = event.target;
    const fieldValue = type === 'file' ? event.target.files[0] : value;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: fieldValue,
    }));
  };

  return (
    <form className="max-w-md mx-auto mt-8" onSubmit={handleSubmit} encType="multipart/form-data">

      <div className="mb-4">
        <label htmlFor="title" className="text-lg font-semibold text-gray-800">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          value={formData.title}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="picture" className="text-lg font-semibold text-gray-800">
          Picture
        </label>
        <input
          type="file"
          id="picture"
          name="picture"
          className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          onChange={handleFile}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="text-lg font-semibold text-gray-800">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          value={formData.description}
          onChange={handleChange}
        ></textarea>
      </div>
      <div className="mb-4">
        <label htmlFor="date" className="text-lg font-semibold text-gray-800">
          Date
        </label>
        <input
          type="date"
          id="date"
          name="date"
          className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          value={formData.date}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="targetMoney" className="text-lg font-semibold text-gray-800">
          Target Amount
        </label>
        <input
          type="number"
          id="targetMoney"
          name="targetMoney"
          className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          value={formData.targetMoney}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="amountCollected" className="text-lg font-semibold text-gray-800">
          Amount Collected
        </label>
        <input
          type="number"
          id="amountCollected"
          name="amountCollected"
          className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          value={formData.amountCollected}
          onChange={handleChange}
        />
      </div>
      <div className="mt-6">
        <button
          type="submit"
          
          className="w-full px-4 py-2 text-lg font-semibold text-white bg-indigo-500 rounded-md hover:bg-indigo-600"
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default CreatePost;

