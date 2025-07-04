import { useState } from "react";

export default function DatasetUpload({ onUpload, isLoading }) {
    const [file, setFile] = useState(null);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (file) onUpload(file);
    };
  
    return (
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-medium mb-4">U pload Your Dataset</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              CSV or Excel File
            </label>
            <input
              type="file"
              accept=".csv,.xlsx,.xls"
              onChange={(e) => setFile(e.target.files[0])}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
            />
          </div>
          <button
            type="submit"
            disabled={!file || isLoading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-300"
          >
            {isLoading ? 'Analyzing...' : 'Analyze Dataset'}
          </button>
        </form>
      </div>
    );
  }