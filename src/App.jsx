import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [picture, setPicture] = useState(null);
  const [title, setTitle] = useState(null);
  const [date, setDate] = useState(null);
  const [explanation, setExplanation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('https://api.nasa.gov/planetary/apod?api_key=yV1mHf6M4XGcUOjmpRDc6AZ65cLxmM0X2razi3hR&date=2023-04-28')
      .then(response => {
        setPicture(response.data.hdurl)
        setTitle(response.data.title)
        setDate(response.data.date)
        setExplanation(response.data.explanation)
        console.log(response.data)
      })
      .catch(error => {
        console.error('Erorr fetching data: ', error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      })
  }, [])

  return (
    <>
      <h1>NASA</h1>
      <div>
        <label htmlFor="date">Date: </label>
        <input type="date" name='date' id='date'/>
        <button type='button'> Get Pic </button>
      </div>
      <img src={picture} alt="nasa" />
      <h1>{title}</h1>
      <h3>{date}</h3>
      <p>{explanation}</p>
    </>
  )
}

export default App;
