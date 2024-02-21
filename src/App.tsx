import { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { User } from './Components/Interfaces/User'
import Dashboard from './Pages/Dashboard'
import UserPage from './Pages/EditUser'

function App() {
    // Use the navigation hook from React Router
    const navigate = useNavigate()

    // State variables to manage the modal and user data
    const [showModal, setShowModal] = useState(false)
    const [users, setUsers] = useState<User[]>([])
    const [selectedUser, setSelectedUser] = useState<User | null>(null)

    // Fetch users from the API 
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('https://dummyjson.com/users')
                const data = await response.json()
                setUsers(data.users)
            } catch (error) {
                console.error(error)
            }
        }
        fetchUsers()
    }, [])

    // Function to open the modal
    const handleOpenModal = () => setShowModal(true)
    
    // Function to close the modal
    const handleCloseModal = () => setShowModal(false)

    // Function to handle click on a user in the dashboard
    const handleModalClick = (user: User) => {
        setSelectedUser(user)
        handleOpenModal()
    }

    // Function to handle editing a user
    const handleEdit = () => {
        if (!selectedUser) return
        // Navigate to the user editing page
        navigate(`/user/${selectedUser.id}`)
        // Close the modal after navigation
        handleCloseModal()
    }

    // Function to handle deleting a user
    const handleDelete = () => {
        if (!selectedUser) return
        // Filter out the deleted user from the user list
        const updatedUsers = users.filter((user: User) => user.id !== selectedUser.id)
        setUsers(updatedUsers)
        // Close the modal and reset selectedUser after deletion
        handleCloseModal()
        setSelectedUser(null)
    }

    return (
        <>
            <Routes>
                {/* Route for the dashboard page */}
                <Route path="/" element={
                    <Dashboard 
                        users={users}
                        handleModalClick={handleModalClick} 
                        showModal={showModal} 
                        handleCloseModal={handleCloseModal} 
                        handleEdit={handleEdit} 
                        handleDelete={handleDelete}
                    />
                } />
                {/* Route for the user editing page */}
                <Route path="/user/:userId" element={
                    <UserPage 
                        users={users}
                        setUsers={setUsers}
                        handleDelete={handleDelete}
                    />
                } />
            </Routes>
        </>
    );
}

export default App;

