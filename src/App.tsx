import { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { User } from './Components/Interfaces/User'
import Dashboard from './Pages/Dashboard'
import UserPage from './Pages/EditUser'


function App() {

    const navigate = useNavigate()

    const [showModal, setShowModal] = useState(false)
    const [users, setUsers] = useState<User[]>([])
    const [selectedUser, setSelectedUser] = useState<User | null>(null)

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

   
    const handleOpenModal = () => setShowModal(true)	
    const handleCloseModal = () => setShowModal(false)

    const handleModalClick = (user: User) => {
        setSelectedUser(user)
        handleOpenModal()
    }

   const handleEdit = () => {
        if (!selectedUser) return
        navigate(`/user/${selectedUser.id}`)
        handleCloseModal()
        
    }

    const handleDelete = () => {
        if (!selectedUser) return
        const updatedUsers = users.filter((user: User) => user.id !== selectedUser.id)
        setUsers(updatedUsers)
        handleCloseModal()
        setSelectedUser(null)
       
    }

    return (
        <>
        <Routes>
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
