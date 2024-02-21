import { User } from '../Components/Interfaces/User';
import Modal from '../Components/Modal/Modal';
import { useState, useEffect } from 'react';

type DashboardProps = {
    users: User[]; // Array of user objects passed as props
    handleModalClick: (user: User) => void; // Function to handle click on user card
    showModal: boolean; // Boolean flag to control visibility of modal
    handleCloseModal: () => void; // Function to handle closing modal
    handleEdit: () => void; // Function to handle edit action
    handleDelete: () => void; // Function to handle delete action
};

export default function Dashboard({ users, handleModalClick, showModal, handleCloseModal, handleEdit, handleDelete }: DashboardProps) {
    const itemsPerPageLarge = 9; // Number of items per page on larger screens
    const itemsPerPageSmall = 8; // Number of items per page on smaller screens
    const [currentPage, setCurrentPage] = useState(1); // State to manage current page number
    const [sortedUsers, setSortedUsers] = useState<User[]>([]); // State to store sorted users

    // Calculate index of last item based on current page and screen width
    const indexOfLastItem = currentPage * (window.innerWidth >= 640 ? itemsPerPageLarge : itemsPerPageSmall);
    // Calculate index of first item based on current page and screen width
    const indexOfFirstItem = indexOfLastItem - (window.innerWidth >= 640 ? itemsPerPageLarge : itemsPerPageSmall);
    // Slice users array to get current page users
    const currentUsers = sortedUsers.slice(indexOfFirstItem, indexOfLastItem);

    // Function to handle pagination
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    // Function to sort users alphabetically by first name
    const sortByFirstName = () => {
        const sorted = [...users].sort((a, b) => a.firstName.localeCompare(b.firstName));
        setSortedUsers(sorted);
    };

    // Function to sort users alphabetically by last name
    const sortByLastName = () => {
        const sorted = [...users].sort((a, b) => a.lastName.localeCompare(b.lastName));
        setSortedUsers(sorted);
    };

    // Effect to initialize sortedUsers with the initial users array
    useEffect(() => {
        setSortedUsers(users.slice());
    }, [users]);

    // Effect to handle window resize and reset current page
    useEffect(() => {
        const handleResize = () => {
            setCurrentPage(1); // Reset current page when window is resized
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <>
            <section className="bg-orange-400 py-20 px-10 min-h-screen"> 
                <div className="max-w-screen-xl mx-auto">
                    <h1 className="text-white font-bold text-center text-5xl mb-1" style={{ color: '#FFF3E9' }}>CONTACT-A-CAT</h1>
                    <h2 className="italic text-center text-2xl mb-10" style={{ color: '#FFF3E9' }}>...for all your Business Cat needs</h2>
                    <div className="flex justify-center mb-12">
                        {/* Button to sort users by first name */}
                        <button className="mx-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600" onClick={sortByFirstName} >Sort by First Name</button>
                        {/* Button to sort users by last name */}
                        <button className="mx-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600" onClick={sortByLastName}>Sort by Last Name</button>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-10"> 
                        {/* Render user cards */}
                        {currentUsers.map((user: User) => (
                            <div key={user.id} className="flex flex-col justify-center items-center cursor-pointer transition duration-200 ease-in-out">
                                {/* Clickable user card */}
                                <div onClick={() => handleModalClick(user)} className="bg-orange-300 p-4 rounded-full shadow-lg overflow-hidden flex justify-center items-start mb-4 hover:scale-105" style={{ width: '140px', height: '140px' }}>
                                    {/* User image */}
                                    <img src={user.image} alt={user.firstName + ' ' + user.lastName} className="w-26 h-26 rounded-full object-cover" />
                                </div>
                                {/* User first name */}
                                <h2 className="text-xl font-bold text-center truncate" style={{ color: '#656059' }}>{user.firstName}</h2>
                                {/* User last name */}
                                <h2 className="text-xl font-bold text-center truncate" style={{ color: '#656059' }}>{user.lastName}</h2>
                            </div>
                        ))}
                    </div>
                    {/* Pagination */}
                    <div className="flex justify-center mt-8">
                        {users.length > (window.innerWidth >= 640 ? itemsPerPageLarge : itemsPerPageSmall) && (
                            <ul className="flex">
                                {[...Array(Math.ceil(users.length / (window.innerWidth >= 640 ? itemsPerPageLarge : itemsPerPageSmall))).keys()].map((pageNumber) => (
                                    <li key={pageNumber} className={`mx-5 cursor-pointer ${currentPage === pageNumber + 1 ? 'font-bold' : ''}`} onClick={() => paginate(pageNumber + 1)}>
                                        {pageNumber + 1}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
                {/* Modal component */}
                <Modal 
                    show={showModal} 
                    onClose={handleCloseModal} 
                    handleEdit={handleEdit} 
                    handleDelete={handleDelete}
                />
            </section>
        </>
    )
}


