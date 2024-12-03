import axios from 'axios';

// Define the base URL for the API
const API_URL = 'http://localhost:8000'; // Update with your backend's URL

export interface User {
    id: number;
    name: string;
    email: string;
    age: number | null;
    height: number | null;
    weight: number | null;
}

// Fetch all users
export const getUsers = async (): Promise<User[]> => {
    try {
        const response = await axios.get<User[]>(`${API_URL}/index.php?route=users`);
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};