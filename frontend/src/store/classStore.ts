import { create } from 'zustand';
import { Class, RSVP, RSVPStatus } from '../types';
import { apiService } from '../services/api';

interface ClassState {
  classes: Class[];
  userRSVPs: RSVP[];
  isLoading: boolean;
  error: string | null;
  
  // Actions
  loadClasses: () => Promise<void>;
  loadUserRSVPs: () => Promise<void>;
  createRSVP: (classId: string) => Promise<void>;
  cancelRSVP: (rsvpId: string) => Promise<void>;
  clearError: () => void;
  setLoading: (loading: boolean) => void;
  
  // Real-time updates
  updateClassRSVPCount: (classId: string, count: number) => void;
  updateRSVPStatus: (classId: string, userId: string, status: RSVPStatus) => void;
}

export const useClassStore = create<ClassState>((set, get) => ({
  classes: [],
  userRSVPs: [],
  isLoading: false,
  error: null,

  loadClasses: async () => {
    set({ isLoading: true, error: null });
    try {
      const classes = await apiService.getClasses();
      set({ classes, isLoading: false });
    } catch (error: any) {
      set({ 
        error: error.response?.data?.error || 'Failed to load classes',
        isLoading: false 
      });
    }
  },

  loadUserRSVPs: async () => {
    set({ isLoading: true, error: null });
    try {
      const userRSVPs = await apiService.getRSVPs();
      set({ userRSVPs, isLoading: false });
    } catch (error: any) {
      set({ 
        error: error.response?.data?.error || 'Failed to load RSVPs',
        isLoading: false 
      });
    }
  },

  createRSVP: async (classId: string) => {
    set({ isLoading: true, error: null });
    try {
      const newRSVP = await apiService.createRSVP(classId);
      const currentRSVPs = get().userRSVPs;
      set({ 
        userRSVPs: [...currentRSVPs, newRSVP],
        isLoading: false 
      });
    } catch (error: any) {
      set({ 
        error: error.response?.data?.error || 'Failed to create RSVP',
        isLoading: false 
      });
      throw error;
    }
  },

  cancelRSVP: async (rsvpId: string) => {
    set({ isLoading: true, error: null });
    try {
      await apiService.cancelRSVP(rsvpId);
      const currentRSVPs = get().userRSVPs;
      set({ 
        userRSVPs: currentRSVPs.filter(rsvp => rsvp.id !== rsvpId),
        isLoading: false 
      });
    } catch (error: any) {
      set({ 
        error: error.response?.data?.error || 'Failed to cancel RSVP',
        isLoading: false 
      });
      throw error;
    }
  },

  clearError: () => set({ error: null }),
  setLoading: (loading: boolean) => set({ isLoading: loading }),

  updateClassRSVPCount: (classId: string, count: number) => {
    const classes = get().classes;
    const updatedClasses = classes.map(cls => 
      cls.id === classId 
        ? { ...cls, currentRSVPs: count }
        : cls
    );
    set({ classes: updatedClasses });
  },

  updateRSVPStatus: (classId: string, userId: string, status: RSVPStatus) => {
    const userRSVPs = get().userRSVPs;
    const updatedRSVPs = userRSVPs.map(rsvp => 
      rsvp.classId === classId && rsvp.userId === userId
        ? { ...rsvp, status }
        : rsvp
    );
    set({ userRSVPs: updatedRSVPs });
  },
}));

// Selectors
export const selectClasses = (state: ClassState) => state.classes;
export const selectUserRSVPs = (state: ClassState) => state.userRSVPs;
export const selectIsLoading = (state: ClassState) => state.isLoading;
export const selectError = (state: ClassState) => state.error;

export const selectClassesByDate = (state: ClassState, date: string) => 
  state.classes.filter(cls => cls.date === date);

export const selectUserRSVPForClass = (state: ClassState, classId: string) => 
  state.userRSVPs.find(rsvp => rsvp.classId === classId);

export const selectConfirmedRSVPs = (state: ClassState) => 
  state.userRSVPs.filter(rsvp => rsvp.status === RSVPStatus.CONFIRMED);

export const selectWaitlistRSVPs = (state: ClassState) => 
  state.userRSVPs.filter(rsvp => rsvp.status === RSVPStatus.WAITLIST);