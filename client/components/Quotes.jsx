import React, { useState, useEffect } from 'react';

const Quotes = () => {
  const [quotes, setQuotes] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Fetch quotes from the API when the component mounts
    fetch("https://type.fit/api/quotes")
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        setQuotes(data);
      });
  }, []); // The empty array as the second argument ensures this effect runs only once when the component mounts

  useEffect(() => {
    // Function to change the displayed quote every 2 minutes
    const changeQuote = () => {
      if (currentIndex < quotes.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        // If we reach the end of the quotes array, reset to the first quote
        setCurrentIndex(0);
      }
    };

    // Start changing quotes every 2 minutes
    const intervalId = setInterval(changeQuote, 2 * 60 * 1000);

    // Clear the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, [currentIndex, quotes]);

  return (
    
      <div className="bg-white rounded-lg shadow-md p-4">
        <p className="text-gray-600 italic">"{quotes[currentIndex]?.text || 'Loading...'}"</p>
        <p className="text-gray-800 mt-2">- {quotes[currentIndex]?.author || 'Unknown'}</p>
      </div>
  );
};

export default Quotes;
