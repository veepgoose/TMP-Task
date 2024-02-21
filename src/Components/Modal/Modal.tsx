import React from 'react';

type ModalProps = {
    show: boolean;
    onClose: () => void;
    onEdit: () => void;
    onDelete: () => void;
};

const Modal: React.FC<ModalProps> = ({ show, onClose, onEdit, onDelete }) => {
    if (!show) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded-lg">
                <h2 className="text-lg font-semibold mb-4">User Options</h2>
                <button className="mr-4" onClick={onEdit}>Edit User</button>
                <button onClick={onDelete}>Delete User</button>
                <button className="absolute top-0 right-0 p-2" onClick={onClose}>X</button>
            </div>
        </div>
    );
};

export default Modal;
