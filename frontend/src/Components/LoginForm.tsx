import { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const LoginForm = ():JSX.Element =>{
     const [formData,setFormData] = useState({
          email: "",
          password: "",
     });
     const { login } = useAuth(); 
     const navigate = useNavigate();

     const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
          setFormData({...formData, [e.target.name]: e.target.value})
     }

     const handleSubmit = async (e: React.FormEvent) =>{
          e.preventDefault();
          try{
               const response = await axios.post('http://localhost:8000/index.php?route=login', formData);
               alert(`Login successful: ${JSON.stringify(response.data.user)}`);
               login(response.data.user);
               navigate('/');
          } catch (error){
               console.error("Login failed", error);
               alert("Invalid email or password")
          }
     }

     return(
     <div className="flex h-screen flex-row justify-center bg-gym-pattern bg-center">
          <div className="m-2 mt-2 max-w-md max-h-fit flex w-full flex-col opacity-100 bg-slate-100 p-4 rounded-xl border-2 border-slate-300">
               <h1 className="text-lg font-bold mb-4">Login</h1>
               <div className="flex flex-col border-b-2 border-slate-300 pb-3">
                    <label htmlFor="email" className="mb-1 text-sm">Email</label>
                    <input 
                         className="shadow appearance-none border rounded w-full p-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                         type="email" 
                         name="email" 
                         placeholder="Email" 
                         onChange={handleChange} 
                         required 
                    />
               </div>
               <div className="flex flex-col mt-2 border-b-2 border-slate-300 pb-3">
                    <label htmlFor="password" className="mb-1 text-sm">Password</label>
                    <input 
                         className="shadow appearance-none border rounded w-full p-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                         type="password" 
                         name="password" 
                         placeholder="Password" 
                         onChange={handleChange} 
                         required 
                    />
               </div>
               <button 
                    className="mt-4 p-2 bg-blue-500 text-white rounded" 
                    type="submit" 
                    onClick={handleSubmit}>
                    Login
               </button>
          </div>
        </div>
     )
}