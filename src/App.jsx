import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [picture, setPicture] = useState(null);
  const [title, setTitle] = useState(null);
  const [date, setDate] = useState(null);
  const [explanation, setExplanation] = useState(null);
  const [inputDate, setInputDate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${import.meta.env.VITE_REACT_APP_NASA_API_KEY}&date=${inputDate}`);
        setPicture(response.data.hdurl);
        setTitle(response.data.title);
        setDate(response.data.date);
        setExplanation(response.data.explanation);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching data: ', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    if (inputDate) {
      fetchData();
    }
  }, [inputDate]);

  const handleFetchNasaData = (event) => {
    event.preventDefault();
    setInputDate(event.target.elements.date.value);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="max-w-lg mx-auto my-10 p-6 bg-gray-100 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-4 text-center">NASA</h1>
          <form onSubmit={handleFetchNasaData} className="flex justify-center">
            <div className="mb-4">
              <label htmlFor="date" className="mr-2">Date:</label>
              <input type="date" name="date" id="date" className="border border-gray-300 p-2 rounded-md" />
              <button
                type="submit"
                className="ml-2 bg-blue-700 text-white py-2 px-4 rounded-md"
              >
                Get Pic
              </button>
            </div>
          </form>
          {loading ? (
            <p className="text-center">Enter a Date!</p>
          ) : error ? (
            <p className="text-center text-red-500">Error fetching data: {error.message}</p>
          ) : (
            <>
              <div className="w-64 h-64 mx-auto mb-4">
                <img
                  src={picture}
                  alt="nasa"
                  className="w-full h-full object-cover rounded-md cursor-pointer"
                  onClick={openModal}
                />
              </div>
              <h1 className="text-2xl font-bold mb-2 text-center">{title}</h1>
              <h3 className="text-gray-600 mb-4 text-center">{date}</h3>
              <p>{explanation}</p>
            </>
          )}
        </div>
      </div>
      {showModal && (
        <div 
          className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-75" 
          onClick={closeModal}
        >
          <div className="relative w-2/3 h-2/3">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-300"
              onClick={closeModal}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <img
              src={picture}
              alt="nasa"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      )}
    </>
);
}

export default App;
