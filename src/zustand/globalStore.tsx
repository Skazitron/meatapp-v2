import { User } from 'firebase/auth';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { CalendarType } from '@/types/CalendarType';

// Define the state and actions of your store
type State = {
  bears: number;
  addABear: () => void;
  user: User | null;
  updateUser: (user: State['user']) => void;
  calendarList: CalendarType[] | null;
  logout: () => void;
  setCalendarList: (calendars: CalendarType[]) => void;
};

export const useGlobalStore = create<State>()(
  persist(
    (set, get) => ({
      bears: 0,
      addABear: () => set({ bears: get().bears + 1 }),
      calendarList: null,
      user: null,
      updateUser: (user: State['user']) => set({ user: user }),
      logout: () => {
        set({ user: null });
      },
      setCalendarList: (calendars) => set({ calendarList: calendars })
    }),
    {
      name: 'meat-app', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage) // (optional) by default, 'localStorage' is used
    }
  )
);
