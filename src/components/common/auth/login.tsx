import React, { useState, useEffect } from 'react';
import {useAppStore} from '../../../store/store';
import '../styles/styles.css'
import { useNavigate } from 'react-router-dom';



const Login =() => {
 
    const [localemail, setlocalEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
  
    const setEmail = useAppStore((state)=>state.setUserEmail);

    const navigate = useNavigate(); // For redirecting after login

    const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    
   
    console.log("Email:", localemail);//making sure my stuff is working
    

    setEmail(localemail);
    localStorage.setItem('userEmail',localemail);  //not sure if it matters to set local storage since we have global state set

    navigate('/home');
   
  };

 

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-700">
    <div className="bg-white p-8 rounded-lg shadow-lg w-96">
      <h2 className="text-gray-700 text-2xl font-semibold text-center mb-6">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={localemail}
            onChange={(e) => setlocalEmail(e.target.value)}
            required
            className="mt-2 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-2 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Login
        </button>
      </form>
    </div>
  </div>
  );
}

export default Login;