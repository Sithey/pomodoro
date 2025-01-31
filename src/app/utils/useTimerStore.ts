import {create} from 'zustand';

interface TimerSettings {
  focusTime: number;
  shortBreakTime: number;
  longBreakTime: number;
  cycles: number;
  isActive: boolean;
  isPaused: boolean;
  setFocusTime: (time: number) => void;
  setShortBreakTime: (time: number) => void;
  setCycles: (cycles: number) => void;
  setIsActive: (isActive: boolean) => void;
  setIsPaused: (isPaused: boolean) => void;
}

export const useTimerStore = create<TimerSettings>((set) => ({
  focusTime: 1500,
  shortBreakTime: 300,
  longBreakTime: 900,
  cycles: 4,
  isActive: false,
  isPaused: false,
  setFocusTime: (time) => set({ focusTime: time }),
  setShortBreakTime: (time) => set({ shortBreakTime: time }),
  setCycles: (cycles) => set({ cycles }),
  setIsActive: (isActive) => set({ isActive }),
  setIsPaused: (isPaused) => set({ isPaused }),
}));