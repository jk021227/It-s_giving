import React, { useEffect, useState, useRef } from 'react';
import './App.css';

function App() {
    const [quote, setQuote] = useState('');
    const [author, setAuthor] = useState('');
    const [isFlipped, setIsFlipped] = useState(false);
    const [activeButton, setActiveButton] = useState(null);
    const soundMap = {
      anger: '/anger.mp3',
      motivation: '/motivation.mp3',
      love: '/love.mp3',
      success: '/success.mp3',
      freedom: '/freedom.mp3',
    };

    const audioRefs = useRef({});

    const preloadSounds = () => {
      Object.keys(soundMap).forEach((key) => {
        audioRefs.current[key] = new Audio(soundMap[key]); // create audio object for each sound
      });
    };

    const playSound = (buttonName) => {
      if (audioRefs.current[buttonName]) {
        audioRefs.current[buttonName].play();
      }
    };

    const stopSound = (buttonName) => {
      if (audioRefs.current[buttonName]) {
        audioRefs.current[buttonName].pause();
        audioRefs.current[buttonName].currentTime = 0; // reset audio to start
      }
    };

    // fetching quote from backend
    const fetchQuote = async (category) => {
      try {
        const response = await fetch(`http://localhost:8000/api/quote?category=${category}`);
        const data = await response.json();
        console.log(data);
        if (category === "motivation") {
            setQuote(data.quotes[0].q); 
            setAuthor(data.quotes[0].a);
        }
        else if (category !== "motivation") {
          setQuote(data.quotes[0].quote);
          setAuthor(data.quotes[0].author);
        }
        else {
          setQuote('No quotes available at the moment.');
        }
      } catch (error) {
          console.error('Error fetching quote:', error);
          setQuote('Failed to fetch quote.');
      }
    };

    useEffect(() => {
      preloadSounds(); 
    }, []);

    const handleButtonClick = (category) => {
        fetchQuote(category);
        setIsFlipped(false); // making sure when a new button is clicked, the card is not flipped over
        setActiveButton(category); // set  active button
    };

    return (
        <div className="App"
          style={{
            height: '100vh', 
            backgroundImage: 'url(/bg.png)', 
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
            <h1 className="line-1 anim-typewriter">It's giving...</h1>
            <h2>What are you feeling today?</h2>
            <div className="Button-box">
                {['anger', 'motivation', 'love', 'success', 'freedom'].map((emotion) => (
                  <button
                    key={emotion}
                    className={`button ${emotion} ${activeButton === emotion ? 'active' : ''}`} // applying active class conditionally
                    onMouseEnter={() => playSound(emotion)}
                    onMouseLeave={() => stopSound(emotion)}
                    onClick={() => handleButtonClick(emotion)} // fetch quote on button click
                    >
                    {emotion}
                  </button>
                ))}
            </div>

            {/* Flip Card for Quote Display */}
            <div className={`flip-card ${isFlipped ? 'flipped' : ''}`} onClick={() => setIsFlipped(!isFlipped)}>
                <div className="flip-card-inner">
                    <div className="flip-card-front">
                        <p>Click to reveal !</p>
                    </div>
                    <div className="flip-card-back">
                        <p>{"' " + quote + " '"}</p>
                        <p>{"by " + author}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;