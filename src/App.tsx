import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { UniversityOverview } from './components/UniversityOverview';
import { CourseExplorer } from './components/CourseExplorer';
import { FeeCalculator } from './components/FeeCalculator';
import { ChatAssistant } from './components/ChatAssistant';
import { VisaAndLivingGuide } from './components/VisaAndLivingGuide';
import { VoiceLiveModal } from './components/VoiceLiveModal';
import { LanguageProvider } from './lib/LanguageContext';
import { GraduationCap, Mic } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [isLiveVoiceOpen, setIsLiveVoiceOpen] = useState<boolean>(false);
  const [initialVoicePrompt, setInitialVoicePrompt] = useState<string | null>(null);
  const [preselectedCourseUniId, setPreselectedCourseUniId] = useState<string | null>(null);

  const handleOpenLiveVoiceWithPrompt = (prompt: string) => {
    setInitialVoicePrompt(prompt);
    setIsLiveVoiceOpen(true);
  };

  const handleAskAboutUniversity = (uniName: string) => {
    handleOpenLiveVoiceWithPrompt(`Can you tell me about studying at ${uniName} in North Cyprus, including popular courses and tuition fees?`);
  };

  const handleAskAboutCourse = (courseTitle: string, uniName: string) => {
    handleOpenLiveVoiceWithPrompt(`What are the tuition fees, entry requirements, and 50% scholarship details for ${courseTitle} at ${uniName}?`);
  };

  const handleExploreCoursesForUni = (uniId: string) => {
    setPreselectedCourseUniId(uniId);
    setActiveTab('courses');
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-[#071A2F] text-white font-sans flex flex-col selection:bg-[#00E5FF] selection:text-[#071A2F] relative overflow-x-hidden">
        {/* Background Aurora Lighting FX */}
        <div className="fixed -top-40 -left-40 w-96 h-96 bg-[#00E5FF]/15 rounded-full blur-[120px] pointer-events-none animate-aurora z-0" />
        <div className="fixed top-1/3 -right-40 w-96 h-96 bg-[#8B5CF6]/15 rounded-full blur-[120px] pointer-events-none animate-aurora z-0" />
        <div className="fixed -bottom-40 left-1/3 w-[500px] h-[500px] bg-[#00E5FF]/10 rounded-full blur-[140px] pointer-events-none z-0" />

        {/* Top Header Navigation */}
        <div className="relative z-40">
          <Navbar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onOpenLiveVoice={() => {
              setInitialVoicePrompt(null);
              setIsLiveVoiceOpen(true);
            }}
            isLiveActive={isLiveVoiceOpen}
          />
        </div>

        {/* Main Content View Container */}
        <main className="flex-1 relative z-10">
          {/* Render Hero on Overview Tab */}
          {activeTab === 'overview' && (
            <>
              <HeroSection
                onOpenLiveVoice={() => {
                  setInitialVoicePrompt(null);
                  setIsLiveVoiceOpen(true);
                }}
                onSelectPrompt={handleOpenLiveVoiceWithPrompt}
                setActiveTab={setActiveTab}
              />
              <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
                <UniversityOverview
                  onAskAboutUniversity={handleAskAboutUniversity}
                  onExploreCourses={handleExploreCoursesForUni}
                />
              </div>
            </>
          )}

          {/* Course Explorer Tab */}
          {activeTab === 'courses' && (
            <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
              <CourseExplorer
                onAskAboutCourse={handleAskAboutCourse}
                preselectedUniId={preselectedCourseUniId}
              />
            </div>
          )}

          {/* Fee Calculator Tab */}
          {activeTab === 'calculator' && (
            <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
              <FeeCalculator />
            </div>
          )}

          {/* Visa & Living Guide Tab */}
          {activeTab === 'guide' && (
            <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
              <VisaAndLivingGuide />
            </div>
          )}

          {/* Gemini Chat Assistant Tab */}
          {activeTab === 'chat' && (
            <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
              <ChatAssistant
                onOpenLiveVoice={() => {
                  setInitialVoicePrompt(null);
                  setIsLiveVoiceOpen(true);
                }}
                initialQuery={initialVoicePrompt}
              />
            </div>
          )}
        </main>

        {/* Gemini Live Multimodal Voice Modal Room */}
        <VoiceLiveModal
          isOpen={isLiveVoiceOpen}
          onClose={() => {
            setIsLiveVoiceOpen(false);
            setInitialVoicePrompt(null);
          }}
          initialPrompt={initialVoicePrompt}
        />

        {/* Futuristic Glassmorphic Footer */}
        <footer className="relative z-10 bg-[#102A43]/80 border-t border-white/10 backdrop-blur-xl text-white py-12 mt-20 text-xs">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 space-y-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-white/10">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#00E5FF] to-[#8B5CF6] flex items-center justify-center text-[#071A2F] shadow-[0_0_20px_rgba(0,229,255,0.4)]">
                  <GraduationCap className="w-5 h-5 font-bold" />
                </div>
                <div>
                  <p className="font-display font-bold text-lg text-white tracking-tight">Cyprus Global Universities</p>
                  <p className="text-[10px] uppercase font-bold tracking-widest text-[#D1D5DB]/60">Multimodal Voice AI Portal • TRNC Admissions</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <button
                  onClick={() => {
                    setInitialVoicePrompt(null);
                    setIsLiveVoiceOpen(true);
                  }}
                  className="btn-cta-coral flex items-center space-x-2 px-5 py-3 text-xs uppercase tracking-wider cursor-pointer"
                >
                  <Mic className="w-4 h-4 text-white" />
                  <span>Speak with Advisor Now</span>
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#D1D5DB]/60">
              <p>© {new Date().getFullYear()} Cyprus Global Universities.</p>
              <p className="flex items-center gap-1.5">
                Powered by{' '}
                <a
                  href="https://lighthousewebdesign.xyz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#00E5FF] font-bold hover:underline transition-all"
                >
                  Lighthouse Web Design
                </a>
              </p>
            </div>
          </div>
        </footer>
      </div>
    </LanguageProvider>
  );
}
