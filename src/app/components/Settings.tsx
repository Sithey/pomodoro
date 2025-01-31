"use client"
import { useTimerStore } from '../utils/useTimerStore';

const Settings = () => {
  const { focusTime, shortBreakTime, cycles, setFocusTime, setShortBreakTime, setCycles, setIsActive } = useTimerStore();

  return (
    <div className="p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Timer Settings</h2>
      <div className="space-y-6">
        <div className="relative">
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            Focus Duration (minutes)
          </label>
          <input
            type="number"
            value={focusTime / 60}
            onChange={(e) => setFocusTime(Number(e.target.value) * 60)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
            min="1"
          />
        </div>

        <div className="relative">
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            Short Break (minutes)
          </label>
          <input
            type="number"
            value={shortBreakTime / 60}
            onChange={(e) => setShortBreakTime(Number(e.target.value) * 60)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
            min="1"
          />
        </div>

        <div className="relative">
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            Number of Cycles
          </label>
          <input
            type="number"
            value={cycles}
            onChange={(e) => setCycles(Number(e.target.value))}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
            min="1"
          />
        </div>

        <button
          className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium shadow-lg hover:opacity-90 transition-all duration-200 transform hover:scale-[1.02]"
          onClick={() => setIsActive(true)}
        >
          Start Timer
        </button>
      </div>
    </div>
  );
};

export default Settings;