import { create } from 'zustand';

interface AdminState {
  sidebarOpen: boolean;
  currentSection: string;
  breadcrumbs: string[];
  toggleSidebar: () => void;
  setCurrentSection: (section: string) => void;
  setBreadcrumbs: (breadcrumbs: string[]) => void;
}

export const useAdminStore = create<AdminState>((set) => ({
  sidebarOpen: true,
  currentSection: 'Dashboard',
  breadcrumbs: ['Admin', 'Dashboard'],
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setCurrentSection: (section) => set({ currentSection: section }),
  setBreadcrumbs: (breadcrumbs) => set({ breadcrumbs }),
}));