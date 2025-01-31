"use client"
import { useTimerStore } from './utils/useTimerStore';
import Timer from './components/Timer';
import Settings from './components/Settings';

export default function Home() {
  const { isActive } = useTimerStore();

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 p-4">
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
          Pomodoro Timer
        </h1>
        <div className="transition-all duration-500 ease-in-out">
          {isActive ? <Timer /> : <Settings />}
        </div>
      </div>
    </main>
  );
}