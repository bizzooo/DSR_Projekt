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
          <div className="flex h-screen items-center justify-center bg-gym-pattern bg-center">
    <div className="m-2 mt-2 flex w-full max-w-md flex-col opacity-100 bg-slate-100 p-4 rounded-xl border-2 border-slate-300">
      <h1 className="text-lg font-bold mb-4">Register</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col border-b-2 border-slate-300 pb-3">
          <label htmlFor="name" className="mb-1 text-sm">Name</label>
          <input
            className="shadow appearance-none border rounded w-full p-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex flex-col mt-2 border-b-2 border-slate-300 pb-3">
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
        <div className="flex flex-col mt-2 border-b-2 border-slate-300 pb-3">
          <label htmlFor="age" className="mb-1 text-sm">Age</label>
          <input
            className="shadow appearance-none border rounded w-full p-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="number"
            name="age"
            placeholder="Age"
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col mt-2 border-b-2 border-slate-300 pb-3">
          <label htmlFor="height" className="mb-1 text-sm">Height</label>
          <input
            className="shadow appearance-none border rounded w-full p-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="number"
            name="height"
            placeholder="Height"
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col mt-2 border-b-2 border-slate-300 pb-3">
          <label htmlFor="weight" className="mb-1 text-sm">Weight</label>
          <input
            className="shadow appearance-none border rounded w-full p-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="number"
            name="weight"
            placeholder="Weight"
            onChange={handleChange}
          />
        </div>
        <button
          className="mt-4 p-2 bg-blue-500 text-white rounded"
          type="submit"
        >
          Register
        </button>
      </form>
    </div>
  </div>
     )
}