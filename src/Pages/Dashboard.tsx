import { User } from '../Components/Interfaces/User';
import Modal from '../Components/Modal/Modal';
import { useState, useEffect } from 'react';

type DashboardProps = {
    users: User[];
    handleModalClick: (user: User) => void;
    showModal: boolean;
    handleCloseModal: () => void;
    handleEdit: () => void;
    handleDelete: () => void;
};

export default function Dashboard({ users, handleModalClick, showModal, handleCloseModal, handleEdit, handleDelete }: DashboardProps) {
    const itemsPerPageLarge = 9; 
    const itemsPerPageSmall = 8; 
    const [currentPage, setCurrentPage] = useState(1);
    const [sortedUsers, setSortedUsers] = useState<User[]>([]);

    const indexOfLastItem = currentPage * (window.innerWidth >= 640 ? itemsPerPageLarge : itemsPerPageSmall);
    const indexOfFirstItem = indexOfLastItem - (window.innerWidth >= 640 ? itemsPerPageLarge : itemsPerPageSmall);
    const currentUsers = sortedUsers.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const sortByFirstName = () => {
        const sorted = [...users].sort((a, b) => a.firstName.localeCompare(b.firstName));
        setSortedUsers(sorted);
    };

    const sortByLastName = () => {
        const sorted = [...users].sort((a, b) => a.lastName.localeCompare(b.lastName));
        setSortedUsers(sorted);
    };

    useEffect(() => {
        setSortedUsers(users.slice());
    }, [users]);

    useEffect(() => {
        const handleResize = () => {
            setCurrentPage(1); 
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
                        <button className="mx-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600" onClick={sortByFirstName} >Sort by First Name</button>
                        <button className="mx-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600" onClick={sortByLastName}>Sort by Last Name</button>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-10"> 
                        {currentUsers.map((user: User) => (
                            <div key={user.id} className="flex flex-col justify-center items-center cursor-pointer transition duration-200 ease-in-out">
                                <div onClick={() => handleModalClick(user)} className="bg-orange-300 p-4 rounded-full shadow-lg overflow-hidden flex justify-center items-start mb-4 hover:scale-105" style={{ width: '140px', height: '140px' }}>
                                    <img src={user.image} alt={user.firstName + ' ' + user.lastName} className="w-26 h-26 rounded-full object-cover" />
                                </div>
                                <h2 className="text-xl font-bold text-center truncate" style={{ color: '#656059' }}>{user.firstName}</h2>
                                <h2 className="text-xl font-bold text-center truncate" style={{ color: '#656059' }}>{user.lastName}</h2>
                            </div>
                        ))}
                    </div>
                    
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

