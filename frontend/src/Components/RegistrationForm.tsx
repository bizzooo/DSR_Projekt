import axios from "axios";
import { useState } from "react"

export const RegistrationForm = ():JSX.Element => {
     const [formData, setFormData] = useState({
          name: "",
          email: "",
          password: "",
          age: "",
          height: "",
          weight: "",
     });

     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          setFormData({ ...formData, [e.target.name]: e.target.value });
      };

     const handleSubmit = async (e: React.FormEvent) => {
          e.preventDefault();
          try {
               const response = await axios.post('http://localhost:8000/index.php?route=register', formData);
               alert(response.data.message);
        } catch (error) {
            console.error('Registration failed:', error);
            alert('Registration failed');
        }
     };

     return (
          <div>
               <form onSubmit={handleSubmit}>
                    <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
                    <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
                    <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                    <input type="number" name="age" placeholder="Age" onChange={handleChange} />
                    <input type="number" name="height" placeholder="Height" onChange={handleChange} />
                    <input type="number" name="weight" placeholder="Weight" onChange={handleChange} />
                    <button type="submit">Register</button>
               </form>
          </div>
     )
}