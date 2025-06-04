'use client';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { FaUpload } from 'react-icons/fa';

export default function ReportProduct() {
  const [reason, setReason] = useState('');
  const [details, setDetails] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState('');

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Submit logic 
    alert('Product report submitted successfully.');

    // Reset form
    setReason('');
    setDetails('');
    setFile(null);
    setFileName('');
  };

  return (   
    <div className='min-h-screen flex items-center justify-center px-4 py-8'>
      <div className="w-full max-w-xl bg-white p-6 rounded-2xl shadow-xl">
        <h2 className='text-2xl font-semibold mb-6 text-center border-b-2 border-bg-gray-300'>Report Product</h2>
    <form
      onSubmit={handleSubmit}
    >
      
      {/* Reason Dropdown */}
      <div className="mb-4">
        <label htmlFor="reason" className="block text-xs font-medium text-gray-300 mb-1">
          Select your reason<span className="text-red-500">*</span>
        </label>
        <select
          id="reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          required
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#00001a]"
        >
          <option value="select">Select option</option>
          <option value="incorrect">Incorrect product</option>
          <option value="fraud">Fraud or scam</option>
          <option value="illegal">Illegal Item</option>
          <option value="other">Other</option>
        </select>
      </div>

      {/* Details Textarea */}
      <div className="mb-4 w-full">
        <label htmlFor="details" className="block text-sm font-medium text-gray-700 mb-1">
          Tell us more about reason (Optional)
        </label>
        <textarea
          id="details"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          rows={4}
          className="w-full border border-gray-300 rounded-md px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Upload Photo */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Upload a photo reference (Optional)
          <p className="text-xs text-gray-400 mb-3">Photo reference gives us a better clarity on what the problem is.</p>
        </label>
        <div className="border-2 border-gray-300 rounded-md p-4 text-center cursor-pointer hover:bg-gray-50 transition">
          <label htmlFor="file-upload" className="cursor-pointer">
            <div className="flex flex-col items-center text-gray-500">
              <FaUpload className="w-6 h-6 text-primary mb-1" />
              <p className="text-sm text-primary font-medium">Click to upload</p>
              <p className="text-xs text-gray-400">PDF, JPG, or PNG (max. 25 MB)</p>
            </div>
          </label>
          <input
            id="file-upload"
            type="file"
            accept=".jpg,.jpeg,.png,.pdf"
            onChange={handleFileChange}
            className="hidden"
          />
          {fileName && <p className="mt-2 text-sm text-gray-700">{fileName}</p>}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="w-full mt-6 flex flex-col gap-3 pt-4">
        <button
          type="submit"
          className="w-full px-4 py-2 bg-[#00001a] text-white font-medium rounded-md hover:bg-gray-900 transition"
        >
          Report product
        </button>
        <button
          type="button"
          onClick={() => {
            setReason('');
            setDetails('');
            setFile(null);
            setFileName('');
          }}
          className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 transition"
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
  </div>
  );
};

