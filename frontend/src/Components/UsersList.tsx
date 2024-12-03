import React, { useEffect, useState } from 'react';
import { getUsers, User } from '../services/api';

const UsersList: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await getUsers();
                console.log('Fetched Users:', data);
                setUsers(data);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch users:', error);
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <h1>Users List</h1>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        {user.name} - {user.email}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UsersList;
