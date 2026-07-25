export interface University {
  id: string;
  name: string;
  shortName: string;
  city: string; // Gazimağusa (Famagusta), Lefkoşa (Nicosia), Girne (Kyrenia)
  established: number;
  type: 'State / Public' | 'Private / Foundation';
  accreditations: string[];
  totalStudents: string;
  internationalStudentsRatio: string;
  campusSize: string;
  coverImage: string;
  logoUrl?: string;
  highlights: string[];
  website: string;
}

export interface Course {
  id: string;
  universityId: string;
  universityName: string;
  title: string;
  faculty: string;
  degreeLevel: "Bachelor's" | "Master's" | "PhD" | "Associate";
  durationYears: number;
  language: 'English' | 'Turkish';
  annualFeeUSD: number; // Base tuition fee
  scholarshipAvailable: string; // e.g., '50% Automatic for International Students'
  netFeeWith50PercentUSD: number;
  entryRequirements: string[];
  careerProspects: string[];
  popular: boolean;
}

export interface Faculty {
  id: string;
  name: string;
  iconName: string;
  description: string;
}

export interface FeeEstimate {
  universityName: string;
  courseTitle: string;
  baseTuition: number;
  scholarshipDiscountPercent: number;
  netTuition: number;
  dormitoryFee: number;
  healthInsuranceFee: number;
  registrationFee: number;
  estimatedLivingExpensesMonthly: number;
  totalFirstYearUSD: number;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  audioUrl?: string;
  timestamp: Date;
  isStreaming?: boolean;
}

export type VoiceName = 'Zephyr' | 'Kore' | 'Puck' | 'Charon' | 'Fenrir';

export interface VoiceOption {
  id: VoiceName;
  name: string;
  gender: 'Female' | 'Male';
  accent: string;
  description: string;
}

export interface LiveSessionStatus {
  isConnected: boolean;
  isConnecting: boolean;
  isListening: boolean;
  isSpeaking: boolean;
  isThinking: boolean;
  selectedVoice: VoiceName;
  error?: string | null;
}

export interface LiveTranscriptItem {
  id: string;
  speaker: 'user' | 'ai';
  text: string;
  timestamp: string;
}
