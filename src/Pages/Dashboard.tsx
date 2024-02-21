import React, { useEffect, useState } from 'react';
import Modal from '../Components/Modal/Modal';
import { User } from '../Components/Interfaces/User';

function Dashboard() {
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

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

    const handleUserClick = (user: User) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedUser(null);
    };

    const handleEditUser = () => {
        // Handle edit user functionality
    };

    const handleDeleteUser = () => {
        // Handle delete user functionality
    };

    return (
        <div className="bg-blue-200 p-4">
            <h1 className="text-3xl font-semibold mb-4">Users</h1>
            <div className="grid grid-cols-3 gap-4">
                {users.map(user => (
                    <div key={user.id} className="bg-gray-200 p-4 rounded-lg" onClick={() => handleUserClick(user)}>
                        <img src={user.image} alt={`${user.firstName} ${user.lastName}`} className="w-20 h-auto rounded-lg mb-2" />
                        <p className="text-lg font-semibold">{user.firstName} {user.lastName}</p>
                    </div>
                ))}
            </div>
            <Modal
                show={isModalOpen}
                onClose={handleCloseModal}
                onEdit={handleEditUser}
                onDelete={handleDeleteUser}
            />
        </div>
    );
}

export default Dashboard;

