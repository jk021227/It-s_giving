import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [quote, setQuote] = useState('');

  // Fetch the quote from FastAPI backend
  const fetchQuote = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/quote'); // Your FastAPI backend URL
      const data = await response.json();
      if (data.quotes && data.quotes.length > 0) {
        setQuote(data.quotes[0].q); 
      } else {
        setQuote('No quotes available at the moment.');
      }
    } catch (error) {
      console.error('Error fetching quote:', error);
      setQuote('Failed to fetch quote.');
    }
  };

  useEffect(() => {
    fetchQuote(); // Fetch quote when component mounts
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Zen Quote of the Day</h1>
        <p>{quote}</p>
      </header>
    </div>
  );
}

export default App;
