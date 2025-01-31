"use client"

import { useState, useEffect } from 'react';
import { useTimerStore } from '../utils/useTimerStore';

const Timer = () => {
  const { focusTime, shortBreakTime, cycles, isActive, isPaused, setIsActive, setIsPaused } = useTimerStore();
  const [time, setTime] = useState(focusTime);
  const [currentCycle, setCurrentCycle] = useState(1);
  const [isFocus, setIsFocus] = useState(true);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive && !isPaused) {
      interval = setInterval(() => {
        setTime((time) => {
          if (time > 0) {
            return time - 1;
          } else {
            return 0;
          }
        });
      }, 1000);
    } else if (!isActive && time !== 0) {
      clearInterval(interval!);
    }
    return () => clearInterval(interval!);
  }, [isActive, isPaused, time]);

  useEffect(() => {
    if (time === 0) {
      if (isFocus) {
        const nextCycle = currentCycle + 1;
        if (nextCycle > cycles) {
          setIsActive(false);
          setIsPaused(false);
          setTime(focusTime);
          setCurrentCycle(1);
          setIsFocus(true);
        } else {
          setCurrentCycle(nextCycle);
          setTime(shortBreakTime);
        }
      } else {
        setTime(focusTime);
      }
      setIsFocus(!isFocus);
    }
  }, [time, isFocus, currentCycle, cycles, focusTime, shortBreakTime, setIsActive, setIsPaused]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <div className="p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl text-center">
      <div className="mb-8">
        <div className="text-7xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
          {formatTime(time)}
        </div>
        <div className="mt-2 text-gray-600">
          {isFocus ? "Focus Time" : "Short Break"}
        </div>
      </div>

      <div className="flex gap-4 justify-center mb-6">
        <button
          className={`px-6 py-3 rounded-lg font-medium shadow-lg transition-all duration-200 transform hover:scale-[1.02] ${
            isActive && !isPaused 
              ? 'bg-red-500 hover:bg-red-600 text-white' 
              : 'bg-green-500 hover:bg-green-600 text-white'
          }`}
          onClick={() => {
            if (isActive && !isPaused) {
              setIsPaused(true);
            } else {
              setIsActive(true);
              setIsPaused(false);
            }
          }}
        >
          {isActive && !isPaused ? 'Pause' : 'Start'}
        </button>
        <button
          className="px-6 py-3 bg-gray-500 text-white rounded-lg font-medium shadow-lg hover:bg-gray-600 transition-all duration-200 transform hover:scale-[1.02]"
          onClick={() => {
            setIsActive(false);
            setIsPaused(false);
            setTime(focusTime);
            setCurrentCycle(1);
            setIsFocus(true);
          }}
        >
          Reset
        </button>
      </div>

      <div className="flex items-center justify-center gap-2">
        {[...Array(cycles)].map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full transition-all ${
              index < currentCycle ? 'bg-indigo-600' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Timer;