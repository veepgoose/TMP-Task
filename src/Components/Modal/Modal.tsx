import { useState } from 'react';

type ModalProps = {
    show: boolean; // Boolean flag indicating whether the modal is visible
    onClose: () => void; // Function to handle modal close event
    handleEdit: () => void; // Function to handle edit button click
    handleDelete: () => void; // Function to handle delete button click
};

export default function Modal({
    show,
    onClose,
    handleEdit,
    handleDelete,
}: ModalProps) {
    // State to track whether the mouse is hovering over the edit button
    const [isEditHovered, setIsEditHovered] = useState(false);
    // State to track whether the mouse is hovering over the delete button
    const [isDeleteHovered, setIsDeleteHovered] = useState(false);

    // If the modal is not visible, return null to prevent rendering
    if (!show) return null;

    return (
        // Overlay div covering the entire screen to capture clicks and close the modal
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            onClick={onClose}
        >
            {/* Modal dialog */}
            <div
                className="relative bg-blue-300 p-8 rounded-lg shadow-lg w-64 h-50" 
                // Stop click propagation to prevent closing the modal when clicking inside it
                onClick={(e: React.MouseEvent<HTMLDivElement>) =>
                    e.stopPropagation()
                }
                // Event handlers to track mouse hover over edit and delete buttons
                onMouseEnter={() => setIsEditHovered(true)}
                onMouseLeave={() => setIsDeleteHovered(false)}
            >
                {/* Modal title */}
                <h2 className="text-2xl font-bold mb-4 text-blue-900">😸Update Cat😸</h2>
                {/* Edit button */}
                <button
                    className={`w-full py-2 mb-2 rounded ${
                        isEditHovered
                            ? 'bg-blue-500 text-white'
                            : 'bg-blue-400 text-blue-900 hover:bg-gray-300'
                    }`}
                    onClick={handleEdit} // Call handleEdit function on button click
                    onMouseEnter={() => setIsEditHovered(true)} // Set hover state to true on mouse enter
                    onMouseLeave={() => setIsEditHovered(false)} // Set hover state to false on mouse leave
                >
                    Edit
                </button>
                {/* Delete button */}
                <button
                    className={`w-full py-2 rounded ${
                        isDeleteHovered
                            ? 'bg-orange-600 text-white'
                            : 'bg-orange-300 text-orange-800 hover:bg-red-300'
                    }`}
                    onClick={handleDelete} // Call handleDelete function on button click
                    onMouseEnter={() => setIsDeleteHovered(true)} // Set hover state to true on mouse enter
                    onMouseLeave={() => setIsDeleteHovered(false)} // Set hover state to false on mouse leave
                >
                    Delete Cat 😿
                </button>
            </div>
        </div>
    );
}







