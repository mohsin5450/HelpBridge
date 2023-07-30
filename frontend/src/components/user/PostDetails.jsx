import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DonationConfirmation from './DonationConfirmation';
import axios from 'axios';

function PostDetails() {
  const [showOtpPopup, setShowOtpPopup] = useState(false);
  const [post, setPost] = useState([]);
  const [money, setmoney] = useState({
    id:'',
    money:'',
    
  });
  const { id } = useParams();
console.log(id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/getposts',{ params: { id } });
      //  console.log(response.data);
        setPost(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  //console.log(post); // Check the contents of the post array

  const filteredPost = post.filter((post) => post.post_id == id)[0];
  //console.log(filteredPost); // Check the filtered post object
  const [message, setMessage] = useState('');

  const [updated, setUpdated] = useState(message);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setmoney({ ...money, [name]: value });
  };
  
  const handleCloseOtpPopup = () => {
    setShowOtpPopup(false);
  };

  const donateMoney= async()=>{
    var check=''
    // alert(filteredPost.collected_money)
    money.id=id;
    var check=money.money;
    money.money = parseInt(filteredPost.collected_money, 10) + parseInt(money.money, 10);
    if(check!=''){

      try {
        
        const response = await axios.put('http://localhost:4000/donateMoney',money);
        money.money="";
        setShowOtpPopup(true);
      //  consolsue.log(response.data);
        // setPost(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    else{
      alert("please add some Amount");
    }
  }
  

  return (
    <div className="flex h-screen w-screen ">
      <div className="flex flex-col justify items-center">
        {filteredPost ? (
          <div className="flex w-screen h-screen flex-col justify-center items-center text-center">
            <div className="flex justify-center mb-14">
              <h1 className="text-[#6366F1] text-3xl font-bold mt-8">{filteredPost.title}</h1>
            </div>
            <div className="flex justify-center w-screen text-center items-center flex-col md:flex-row">
              <div className="flex justify-center items-center mb-8 md:mr-5">
                <img
                  src={'http://localhost:4000/images/' + filteredPost.picture}
                  alt="not available"
                  className="w-96 rounded-md"
                />
              </div>
              <div className='flex   justify-end  flex-col'>
              <div className="flex  text-center">
                <p className=" text-1xl">{filteredPost.description}</p>
              </div>
              <div className="flex  text-center">
                
                <p className=" text-1xl">Target money: {" "}{filteredPost.target_money}</p>
              </div>
              <div className="flex  text-center">
                <p className=" text-1xl">Collected money: {" "}{filteredPost.collected_money}</p>
              </div>
                </div>
            </div>
          </div>
        ) : (
          <p>No post found</p>
        )}
    <div className='flex justify-center flex-col text-black'>
      <div className='flex justify-center mt-5 mb-5'>

    <h1 className="text-[#6366F1] text-3xl font-bold">Donate Now</h1>
      </div>
      <input type='number'  name="money" value={money.money} onChange={handleChange} placeholder='Enter Amount' className="w-full py-3 px-4 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500"></input>
      

      <div className="w-full max-w-lg mx-auto p-8">
    <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-lg font-medium mb-6">Payment Information</h2>
        <div>
            <div className="grid grid-cols-2 gap-6">
                <div className="col-span-2 sm:col-span-1">
                    <label for="card-number" class="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                    <input type="text" name="card-number" id="card-number" placeholder="0000 0000 0000 0000" className="w-full py-3 px-4 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500"/>
                </div>
                <div className="col-span-2 sm:col-span-1">
                    <label for="expiration-date" className="block text-sm font-medium text-gray-700 mb-2">Expiration Date</label>
                    <input type="text" name="expiration-date" id="expiration-date" placeholder="MM / YY" className="w-full py-3 px-4 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500"/>
                </div>
                <div className="col-span-2 sm:col-span-1">
                    <label for="cvv" className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                    <input type="text" name="cvv" id="cvv" placeholder="000" className="w-full py-3 px-4 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500"/>
                </div>
                <div className="col-span-2 sm:col-span-1">
                    <label for="card-holder" class="block text-sm font-medium text-gray-700 mb-2">Card Holder</label>
                    <input type="text" name="card-holder" id="card-holder" placeholder="Full Name" className="w-full py-3 px-4 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500"/>
                </div>
            </div>
            <div class="mt-8">
                <button type="submit" onClick={donateMoney} className="w-full bg-green-500 hover:bg-blue-600 text-white font-medium py-3 rounded-lg focus:outline-none">Donate</button>
            </div>
        </div>

    </div>
    

 </div>
 </div>
      </div>
      {showOtpPopup && <DonationConfirmation  onClose={handleCloseOtpPopup} />}
    </div>
  );
}


export default PostDetails;
