import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { User } from "../Components/Interfaces/User";

type EditUserProps = {
    users: User[];
    setUsers: (users: User[]) => void;
    handleDelete: () => void;
};

export default function EditUser({ users, setUsers, handleDelete }: EditUserProps) {
    const navigate = useNavigate();
    const { userId } = useParams<{ userId: string }>();
    const [user, setUser] = useState<User | null>(null);
    const [formValues, setFormValues] = useState<User | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`https://dummyjson.com/user/${userId}`);
                const data = await response.json();
                setUser(data);
            } catch (error) {
                console.error(error);
            }
        };

        if (userId) fetchUser();
    }, [userId]);

    useEffect(() => {
        setFormValues(user);
    }, [user]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (!formValues || !userId) return;

        const userIdNumber = parseInt(userId, 10);
        if (isNaN(userIdNumber)) return;

        fetch(`https://dummyjson.com/users/${userId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formValues),
        })
        .then(res => res.json())
        .then(data => {
            setUser(data);
            setUsers(users.map(user => user.id === userIdNumber ? data : user));
        });
    };

    const handleDeleteClick = () => {
        handleDelete();
        navigate('/');
    };

    return (
        <section className="min-h-screen py-12">
            <div className="max-w-3xl mx-auto bg-gray-500 rounded-lg shadow-lg p-8">
                <h1 className="text-3xl font-bold mb-4 text-white">View User</h1>
                {user ? (
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-2 sm:col-span-1">
                                <label className="block text-sm font-medium text-white">First Name</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formValues?.firstName || ''}
                                    onChange={handleInputChange}
                                    className="mt-1 bg-white text-gray focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                />
                            </div>
                            <div className="col-span-2 sm:col-span-1">
                                <label className="block text-sm font-medium text-white">Last Name</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formValues?.lastName || ''}
                                    onChange={handleInputChange}
                                    className="mt-1 bg-white text-gray focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                />
                            </div>
                            <div className="col-span-2 sm:col-span-1">
                                <label className="block text-sm font-medium text-white">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formValues?.email || ''}
                                    onChange={handleInputChange}
                                    className="mt-1 bg-white text-gray focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                />
                            </div>
                            <div className="col-span-2 sm:col-span-1">
                                <label className="block text-sm font-medium text-white">Phone</label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={formValues?.phone || ''}
                                    onChange={handleInputChange}
                                    className="mt-1 bg-white text-gray focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                />
                            </div>
                            <div className="col-span-2 sm:col-span-1">
                                <label className="block text-sm font-medium text-white">Address</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={formValues?.address?.address || ''}
                                    onChange={handleInputChange}
                                    className="mt-1 bg-white text-gray focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                />
                                <input
                                    type="text"
                                    name="city"
                                    value={formValues?.address?.city || ''}
                                    onChange={handleInputChange}
                                    className="mt-1 bg-white text-gray focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                />
                                <input
                                    type="text"
                                    name="postalCode"
                                    value={formValues?.address?.postalCode || ''}
                                    onChange={handleInputChange}
                                    className="mt-1 bg-white text-gray focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                />
                                <input
                                    type="text"
                                    name="state"
                                    value={formValues?.address?.state || ''}
                                    onChange={handleInputChange}
                                    className="mt-1 bg-white text-gray focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                />
                            </div>
                        </div>
                        <div className="mt-4 flex justify-start space-x-8">
                            <button type="submit" className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-400 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                Update User
                            </button>
                            <button type="button" onClick={handleDeleteClick} className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-400 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                                Delete User
                            </button>
                        </div>
                    </form>
                ) : (
                    <p>Loading...</p>
                )}
                <button className="block mt-4 bg-gray-600 text-white px-4 py-2 rounded-md" onClick={() => navigate('/')}>Back</button>
            </div>
        </section>
    );
}
