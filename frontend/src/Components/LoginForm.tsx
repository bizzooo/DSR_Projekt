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
          <div>
               <form onSubmit={handleSubmit}>
                    <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
                    <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                    <button type="submit">Login</button>
               </form>
          </div>
     )
}