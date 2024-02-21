import { useState } from 'react';

type ModalProps = {
    show: boolean;
    onClose: () => void;
    handleEdit: () => void;
    handleDelete: () => void;
};

export default function Modal({
    show,
    onClose,
    handleEdit,
    handleDelete,
}: ModalProps) {
    const [isEditHovered, setIsEditHovered] = useState(false);
    const [isDeleteHovered, setIsDeleteHovered] = useState(false);

    if (!show) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
            onClick={onClose}
        >
            <div
                className="relative bg-white p-8 rounded-lg shadow-lg w-64 h-50" 
                onClick={(e: React.MouseEvent<HTMLDivElement>) =>
                    e.stopPropagation()
                }
                onMouseEnter={() => setIsEditHovered(true)}
                onMouseLeave={() => setIsDeleteHovered(false)}
            >
                <h2 className="text-2xl font-bold mb-4">View User</h2>
                <button
                    className={`w-full py-2 mb-2 rounded ${
                        isEditHovered
                            ? 'bg-gray-500 text-white'
                            : 'bg-gray-400  hover:bg-gray-300'
                    }`}
                    onClick={handleEdit}
                    onMouseEnter={() => setIsEditHovered(true)}
                    onMouseLeave={() => setIsEditHovered(false)}
                >
                    Edit
                </button>
                <button
                    className={`w-full py-2 rounded ${
                        isDeleteHovered
                            ? 'bg-red-600 text-white'
                            : 'bg-red-300 text-red-800 hover:bg-red-800'
                    }`}
                    onClick={handleDelete}
                    onMouseEnter={() => setIsDeleteHovered(true)}
                    onMouseLeave={() => setIsDeleteHovered(false)}
                >
                    Delete 
                </button>
            </div>
        </div>
    );
}







