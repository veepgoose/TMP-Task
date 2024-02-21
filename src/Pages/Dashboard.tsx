import { User } from '../Components/Interfaces/User';
import Modal from '../Components/Modal/Modal';


type DashboardProps = {
    users: User[];
    handleModalClick: (user: User) => void;
    showModal: boolean;
    handleCloseModal: () => void;
    handleEdit: () => void;
    handleDelete: () => void;
};

export default function Dashboard({ users, handleModalClick, showModal, handleCloseModal, handleEdit, handleDelete }: DashboardProps) {
    return (
        <>
            <section className=" py-20 px-10 min-h-screen"> 
                <div className="max-w-screen-xl mx-auto">
                    <h1 className=" font-bold text-center text-5xl mb-1" >USERS</h1>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-10"> 
                        {users.map((user: User) => (
                            <div key={user.id} className="flex flex-col justify-center items-center cursor-pointer transition duration-200 ease-in-out">
                                <div onClick={() => handleModalClick(user)} className=" p-4 rounded shadow-lg overflow-hidden flex justify-center items-start mb-4 hover:scale-105" >
                                    <img src={user.image} alt={user.firstName + ' ' + user.lastName}  />
                                </div>
                                <h2 className="text-xl font-bold text-center truncate" >{user.firstName}</h2>
                                <h2 className="text-xl font-bold text-center truncate" >{user.lastName}</h2>
                            </div>
                        ))}
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

