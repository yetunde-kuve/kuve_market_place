import React, { useState } from "react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
    const [reason, setReason] = useState("");
    const [description, setDescription] = useState("");
    const [file, setFile] = useState<File | null>(null);

    // Handle reason selection
    const handleReasonChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setReason(e.target.value);
    };

    // Handle description change
    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.target.value);
    };

    // Handle file upload
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    // Close the modal
    const handleClose = () => {
        onClose();
    };

    return (
        <div
            className={`fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 transition-all duration-300 ${
                isOpen ? "opacity-100 visible" : "opacity-0 invisible"
            } z-50`}
        >
            <div className="bg-white rounded-lg shadow-lg p-6 w-96">
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Report Product</h2>
                    <button
                        onClick={handleClose}
                        className="text-gray-500 hover:text-gray-700 focus:outline-none"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>

                {/* Form */}
                <form className="space-y-4">
                    {/* Select Reason */}
                    <div>
                        <label
                            htmlFor="reason"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Select your reason *
                        </label>
                        <select
                            id="reason"
                            value={reason}
                            onChange={handleReasonChange}
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                            <option value="">Select option</option>
                            <option value="reason1">Reason 1</option>
                            <option value="reason2">Reason 2</option>
                            <option value="reason3">Reason 3</option>
                        </select>
                    </div>

                    {/* Description */}
                    <div>
                        <label
                            htmlFor="description"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Tell us more about the reason (Optional)
                        </label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={handleDescriptionChange}
                            rows={4}
                            className="mt-1 block w-full resize-none border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        ></textarea>
                    </div>

                    {/* File Upload */}
                    <div>
                        <label
                            htmlFor="file"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Upload a photo reference (Optional)
                        </label>
                        <p className="text-xs text-gray-500">
                            Photo reference gives us a better clarity on what the problem is.
                        </p>
                        <input
                            type="file"
                            id="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded mr-2"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded"
                        >
                            Report product
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Modal;