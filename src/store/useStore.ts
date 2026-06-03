import { create } from 'zustand';

export interface ProjectData {
  id: string;
  name: string;
  problem: string;
  research: string;
  design: string;
  development: string;
  challenges: string;
  result: string;
  techStack: string[];
  frameworkChoice: string;
  architectureSelected: string;
  performanceTradeoffs: string;
  challengesFaced: string;
  solutionsImplemented: string;
  architecture: string;
  performanceOptimizations: string;
  reusableComponents: string;
  apiIntegrations: string;
  lessonsLearned: string;
  demoUrl: string;
  githubUrl: string;
  heroImage: string;
  featureImages: string[];
  mobileImages: string[];
}

export interface ExperienceData {
  id: string;
  title: string;
  company: string;
  date: string;
  bullets: string[];
  color: string;
}

interface AppState {
  introComplete: boolean;
  setIntroComplete: (complete: boolean) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  scrollProgress: number;
  setScrollProgress: (progress: number) => void;
  currentSection: number;
  setCurrentSection: (section: number) => void;
  isMobile: boolean;
  setIsMobile: (isMobile: boolean) => void;
  activeProject: ProjectData | null;
  setActiveProject: (project: ProjectData | null) => void;
  activeExperience: ExperienceData | null;
  setActiveExperience: (experience: ExperienceData | null) => void;
}

export const useStore = create<AppState>((set) => {
  // Initialize mobile state check
  const isMobileInitial = typeof window !== 'undefined' ? window.innerWidth < 768 : false;

  if (typeof window !== 'undefined') {
    window.addEventListener('resize', () => {
      set({ isMobile: window.innerWidth < 768 });
    });
  }

  return {
    introComplete: false,
    setIntroComplete: (complete) => set({ introComplete: complete }),
    isLoading: true,
    setIsLoading: (loading) => set({ isLoading: loading }),
    scrollProgress: 0,
    setScrollProgress: (progress) => set({ scrollProgress: progress }),
    currentSection: 0,
    setCurrentSection: (section) => set({ currentSection: section }),
    isMobile: isMobileInitial,
    setIsMobile: (mobile) => set({ isMobile: mobile }),
    activeProject: null,
    setActiveProject: (project) => set({ activeProject: project }),
    activeExperience: null,
    setActiveExperience: (experience) => set({ activeExperience: experience }),
  };
});
