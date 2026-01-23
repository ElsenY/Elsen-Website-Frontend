import { create } from 'zustand';

interface UIState {
  navBarTitle: string;
  setNavBarTitle: (title: string) => void;
  showNavBar: boolean;
  setShowNavBar: (show: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  navBarTitle: 'Default Title',
  setNavBarTitle: (title) => set({ navBarTitle: title }),
  showNavBar: true,
  setShowNavBar: (show) => set({ showNavBar: show }),
}));
