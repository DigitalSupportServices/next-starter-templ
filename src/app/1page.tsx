import React, { useState, FC, ChangeEvent } from 'react';

// Define the props for components that need to navigate
interface PageProps {
  handleNavigation: (page: 'home' | 'business' | 'support' | 'upload') => void;
}

// --- Page Components ---

/**
 * The main home page of the application, showing links to other services.
 */
const HomePage: FC<PageProps> = ({ handleNavigation }) => (
  <div className="flex flex-col items-center justify-center p-8 text-center">
    <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-slate-100">
      Our Digital Services
    </h1>
    
    <div className="flex flex-col space-y-6 w-full max-w-lg">
      
      {/* Button to navigate to the Digital Business Services page */}
      <button
        onClick={() => handleNavigation('business')}
        className="group block p-4 rounded-xl bg-slate-700 hover:bg-slate-600 transition duration-300 transform hover:scale-105"
      >
        <div className="flex items-center justify-between">
          <span className="text-xl font-semibold text-slate-100 group-hover:text-cyan-400">
            Digital Business Services
          </span>
          <svg className="h-6 w-6 text-slate-300 group-hover:text-cyan-400 transform transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
        <p className="mt-2 text-sm text-slate-400 text-left">
          From strategy to implementation, we help transform your business for the digital age.
        </p>
      </button>

      {/* Button to navigate to the Digital Support Services page */}
      <button
        onClick={() => handleNavigation('support')}
        className="group block p-4 rounded-xl bg-slate-700 hover:bg-slate-600 transition duration-300 transform hover:scale-105"
      >
        <div className="flex items-center justify-between">
          <span className="text-xl font-semibold text-slate-100 group-hover:text-indigo-400">
            Digital Support Services
          </span>
          <svg className="h-6 w-6 text-slate-300 group-hover:text-indigo-400 transform transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
        <p className="mt-2 text-sm text-slate-400 text-left">
          Reliable, 24/7 technical assistance and maintenance to keep your operations running smoothly.
        </p>
      </button>
      
      {/* Button to navigate to the simulated File Upload page */}
      <button
        onClick={() => handleNavigation('upload')}
        className="group block p-4 rounded-xl bg-slate-700 hover:bg-slate-600 transition duration-300 transform hover:scale-105"
      >
        <div className="flex items-center justify-between">
          <span className="text-xl font-semibold text-slate-100 group-hover:text-pink-400">
            Simulated File Upload
          </span>
          <svg className="h-6 w-6 text-slate-300 group-hover:text-pink-400 transform transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
        </div>
        <p className="mt-2 text-sm text-slate-400 text-left">
          Demonstrates how a client-side app interacts with a backend for cloud storage.
        </p>
      </button>

    </div>
  </div>
);

/**
 * A component for the Digital Business Services page.
 */
const BusinessServicesPage: FC<PageProps> = ({ handleNavigation }) => (
  <div className="p-8 text-left">
    <h1 className="text-3xl font-bold mb-4 text-slate-100">Digital Business Services</h1>
    <p className="text-slate-300 mb-6">
      Our Digital Business Services focus on leveraging cutting-edge technology to streamline your operations,
      enhance customer experiences, and drive sustainable growth. We offer consulting, digital marketing,
      e-commerce solutions, and data analytics to help you stay ahead in a competitive market.
    </p>
    <button
      onClick={() => handleNavigation('home')}
      className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
    >
      &larr; Go Back
    </button>
  </div>
);

/**
 * A component for the Digital Support Services page.
 */
const SupportServicesPage: FC<PageProps> = ({ handleNavigation }) => (
  <div className="p-8 text-left">
    <h1 className="text-3xl font-bold mb-4 text-slate-100">Digital Support Services</h1>
    <p className="text-slate-300 mb-6">
      We provide round-the-clock Digital Support Services to ensure your systems are always up and running.
      Our team of experts is available to assist with technical issues, system maintenance, software updates,
      and security monitoring, giving you peace of mind and allowing you to focus on your core business.
    </p>
    <button
      onClick={() => handleNavigation('home')}
      className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
    >
      &larr; Go Back
    </button>
  </div>
);

/**
 * New component for the file upload demonstration.
 * It shows how a file is prepared and sent to a backend API.
 */
const UploadPage: FC<PageProps> = ({ handleNavigation }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  // Handles the file selection from the input element
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFile(e.target.files[0]);
      setMessage(''); // Clear any previous messages
    }
  };

  // Handles the file upload by sending a POST request to a backend API
  const handleUpload = async () => {
    if (!selectedFile) {
      setMessage('Please select a file first.');
      return;
    }

    setUploading(true);
    setMessage('');

    try {
      // Create a FormData object to send the file
      const formData = new FormData();
      formData.append('file', selectedFile);

      // In a real application, you would replace this with your actual backend API endpoint.
      // This endpoint would be responsible for securely handling the file and
      // uploading it to a cloud storage service (e.g., AWS S3).
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Upload successful:', result);
        setMessage(`Success! File '${selectedFile.name}' was uploaded.`);
        setSelectedFile(null); // Clear the selected file after upload
      } else {
        const errorData = await response.json();
        console.error('Upload failed:', errorData);
        setMessage(`Error during upload: ${errorData.message || 'Unknown error'}`);
      }

    } catch (error) {
      console.error('Fetch error:', error);
      setMessage('Network error. Please check your connection and try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-8 text-center">
      <h1 className="text-3xl font-bold mb-4 text-slate-100">Simulated File Upload</h1>
      <p className="text-slate-300 mb-6">
        This page demonstrates how a frontend app handles a file upload interaction with a backend service.
        In a real scenario, the backend would securely handle the upload to a cloud storage service like an S3 bucket.
      </p>

      <div className="space-y-4">
        <input
          type="file"
          onChange={handleFileChange}
          className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cyan-50 file:text-cyan-700 hover:file:bg-cyan-100"
        />

        {selectedFile && (
          <p className="text-slate-400 mt-2">
            Selected file: <span className="font-semibold text-slate-100">{selectedFile.name}</span>
          </p>
        )}

        <button
          onClick={handleUpload}
          disabled={!selectedFile || uploading}
          className={`w-full py-3 px-4 rounded-lg font-bold transition-colors duration-200
            ${uploading ? 'bg-slate-600 cursor-not-allowed' : 'bg-pink-600 hover:bg-pink-500 text-white'}
          `}
        >
          {uploading ? 'Uploading...' : 'Upload File'}
        </button>

        {message && (
          <p className={`mt-4 font-semibold ${message.startsWith('Error') ? 'text-red-400' : 'text-green-400'}`}>
            {message}
          </p>
        )}
      </div>

      <button
        onClick={() => handleNavigation('home')}
        className="mt-8 bg-slate-700 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
      >
        &larr; Go Back
      </button>
    </div>
  );
};

// Main App Component with Routing Logic
const App: React.FC = () => {
  // Use a state variable to track the current page
  const [currentPage, setCurrentPage] = useState<'home' | 'business' | 'support' | 'upload'>('home');

  // Function to handle page navigation
  const handleNavigation = (page: 'home' | 'business' | 'support' | 'upload') => {
    setCurrentPage(page);
  };

  // Render the appropriate component based on the currentPage state
  let content;
  switch (currentPage) {
    case 'home':
      content = <HomePage handleNavigation={handleNavigation} />;
      break;
    case 'business':
      content = <BusinessServicesPage handleNavigation={handleNavigation} />;
      break;
    case 'support':
      content = <SupportServicesPage handleNavigation={handleNavigation} />;
      break;
    case 'upload':
      content = <UploadPage handleNavigation={handleNavigation} />;
      break;
    default:
      content = <div className="text-center text-red-500">Page not found!</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white p-4">
      <div className="bg-slate-800 p-8 rounded-xl shadow-2xl max-w-lg w-full">
        {content}
      </div>
    </div>
  );
};

export default App;
