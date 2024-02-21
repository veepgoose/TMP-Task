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
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            onClick={onClose}
        >
            <div
                className="relative bg-blue-300 p-8 rounded-lg shadow-lg w-64 h-50" 
                onClick={(e: React.MouseEvent<HTMLDivElement>) =>
                    e.stopPropagation()
                }
                onMouseEnter={() => setIsEditHovered(true)}
                onMouseLeave={() => setIsDeleteHovered(false)}
            >
                <h2 className="text-2xl font-bold mb-4 text-blue-900">😸Update Cat😸</h2>
                <button
                    className={`w-full py-2 mb-2 rounded ${
                        isEditHovered
                            ? 'bg-blue-500 text-white'
                            : 'bg-blue-400 text-blue-900 hover:bg-gray-300'
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
                            ? 'bg-orange-600 text-white'
                            : 'bg-orange-300 text-orange-800 hover:bg-red-300'
                    }`}
                    onClick={handleDelete}
                    onMouseEnter={() => setIsDeleteHovered(true)}
                    onMouseLeave={() => setIsDeleteHovered(false)}
                >
                    Delete Cat 😿
                </button>
            </div>
        </div>
    );
}






