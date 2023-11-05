import React, { useState, useEffect } from 'react';
import { PiTimerBold } from 'react-icons/pi';

function Timer() {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [timerId, setTimerId] = useState(null);

  useEffect(() => {
    if (isRunning && totalSeconds > 0) {
      const timer = setInterval(() => {
        setTotalSeconds((prevTotalSeconds) => {
          if (prevTotalSeconds <= 1) {
            clearInterval(timer);
            setIsRunning(false);
            return 0;
          }
          return prevTotalSeconds - 1;
        });
      }, 1000);
      setTimerId(timer);

      return () => {
        clearInterval(timer);
      };
    }
  }, [isRunning, totalSeconds]);

  const startTimer = () => {
    const totalSecondsInput = hours * 3600 + minutes * 60;
    setTotalSeconds(totalSecondsInput);
    setIsRunning(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
    clearInterval(timerId); // Clear the interval to pause the timer
  };

  const resetTimer = () => {
    setIsRunning(false);
    setHours(0);
    setMinutes(0);
    setTotalSeconds(0);
    clearInterval(timerId); // Clear the interval to reset the timer
  };

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg mx-10" >
      <div className="flex justify-center items-center">
        <h1 className="text-3xl font-semibold mb-4 flex flex-row">
          Pomodoro Timer
          <PiTimerBold className="m-1" />
        </h1>
      </div>
      <div className="flex justify-center items-center  space-x-2">
        <input
          type="number"
          placeholder="Hours"
          className="w-20 h-10 px-2 py-1 rounded border"
          value={hours}
          onChange={(e) => setHours(Math.abs(parseInt(e.target.value)))}
        />
        <span className="text-xl">:</span>
        <input
          type="number"
          placeholder="Minutes"
          className="w-20 h-10 px-2 py-1 rounded border"
          value={minutes}
          onChange={(e) => setMinutes(Math.abs(parseInt(e.target.value)))}
        />
        {isRunning ? (
          <button
            className="bg-red-500 text-white px-4 py-1 rounded-3xl hover:bg-red-600"
            onClick={pauseTimer}
          >
            Pause
          </button>
        ) : (
          <button
            className="bg-blue-500 text-white px-4 py-1 rounded-3xl hover:bg-blue-600"
            onClick={startTimer}
          >
            Start
          </button>
        )}
        <button
          className="bg-gray-500 text-white px-4 py-1 rounded-3xl hover:bg-gray-600"
          onClick={resetTimer}
        >
          Reset
        </button>
      </div>
      <div className="text-4xl mt-4 flex items-center justify-center">
        {isRunning ? formatTime(totalSeconds) : formatTime(hours * 3600 + minutes * 60)}
      </div>
    </div>
  );
}

export default Timer;
