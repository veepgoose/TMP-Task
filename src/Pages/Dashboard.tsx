import { useEffect, useState } from 'react';
import { User } from '../Components/Interfaces/User';

function Dashboard() {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        fetchUsers().then(data => setUsers(data));
    }, []);

    // Fetch users from API
    const fetchUsers = async () => {
        try {
            const response = await fetch('https://dummyjson.com/users');
            const data = await response.json();
            return data.users;
        } catch (error) {
            console.error(error);
            return [];
        }
    };

    return (
        <div>
            <h1>Dashboard</h1>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        {user.firstName} {user.lastName}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Dashboard;
