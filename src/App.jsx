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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=yV1mHf6M4XGcUOjmpRDc6AZ65cLxmM0X2razi3hR&date=${inputDate}`);
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

  return (
    <>
      <h1>NASA</h1>
      <form onSubmit={handleFetchNasaData}>
        <label htmlFor="date">Date: </label>
        <input type="date" name="date" id="date" />
        <button type="submit">Get Pic</button>
      </form>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error fetching data: {error.message}</p>
      ) : (
        <>
          <img src={picture} alt="nasa" />
          <h1>{title}</h1>
          <h3>{date}</h3>
          <p>{explanation}</p>
        </>
      )}
    </>
  );
}

export default App;
