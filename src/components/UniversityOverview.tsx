import React, { useState } from 'react';
import { UNIVERSITIES } from '../data/universitiesData';
import { MapPin, Award, Users, Mic, CheckCircle2, ChevronRight } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

interface UniversityOverviewProps {
  onAskAboutUniversity: (uniName: string) => void;
  onExploreCourses: (uniId: string) => void;
}

export const UniversityOverview: React.FC<UniversityOverviewProps> = ({
  onAskAboutUniversity,
  onExploreCourses,
}) => {
  const { t } = useLanguage();
  const [selectedCity, setSelectedCity] = useState<string>('All');

  const cities = ['All', 'Gazimağusa (Famagusta)', 'Lefkoşa (Nicosia)', 'Girne (Kyrenia)'];

  const filteredUniversities = selectedCity === 'All'
    ? UNIVERSITIES
    : UNIVERSITIES.filter((u) => u.city.includes(selectedCity.split(' ')[0]));

  return (
    <div className="space-y-10 py-10">
      {/* Title & City Filters */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-6">
        <div>
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#00E5FF] block mb-1">
            {t.uniSubtitle}
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight text-white">
            {t.uniTitle}
          </h2>
          <p className="text-sm text-[#D1D5DB]/80 mt-2 max-w-2xl leading-relaxed">
            {t.uniDesc}
          </p>
        </div>

        {/* City Filter Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1">
          {cities.map((city) => (
            <button
              key={city}
              onClick={() => setSelectedCity(city)}
              className={`px-4 py-2 text-[10px] uppercase font-bold tracking-widest transition-all cursor-pointer rounded-xl ${
                selectedCity === city
                  ? 'bg-gradient-to-r from-[#00E5FF] to-[#8B5CF6] text-[#071A2F] shadow-[0_0_15px_rgba(0,229,255,0.4)]'
                  : 'bg-[#102A43] text-[#D1D5DB] hover:text-white border border-white/10'
              }`}
            >
              {city === 'All' ? t.allCities : city}
            </button>
          ))}
        </div>
      </div>

      {/* University Cards Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredUniversities.map((uni) => (
          <div
            key={uni.id}
            className="group relative glass-panel-interactive bg-[#102A43]/80 border border-white/10 hover:border-[#00E5FF]/40 rounded-[18px] overflow-hidden flex flex-col justify-between"
          >
            {/* Image Header */}
            <div>
              <div className="relative h-52 overflow-hidden border-b border-white/10">
                <img
                  src={uni.coverImage}
                  alt={uni.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#102A43] via-[#102A43]/40 to-transparent" />

                {/* City Tag & Type */}
                <div className="absolute top-4 left-4 flex items-center space-x-2">
                  <span className="bg-[#071A2F]/90 backdrop-blur-md text-[#00E5FF] text-[10px] font-bold uppercase tracking-wider px-3 py-1 flex items-center gap-1.5 border border-[#00E5FF]/30 rounded-full shadow-md">
                    <MapPin className="w-3 h-3 text-[#00E5FF]" />
                    {uni.city}
                  </span>
                  <span className="bg-[#8B5CF6]/90 backdrop-blur-md text-white px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest rounded-full border border-white/15">
                    {uni.type}
                  </span>
                </div>

                {/* University Title Overlay */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="text-xl font-display font-bold tracking-tight text-white">{uni.name}</h3>
                  <p className="text-[11px] font-mono text-[#D1D5DB]/80 mt-0.5">Est. {uni.established} • {uni.shortName}</p>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 space-y-5">
                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-3 text-xs bg-[#071A2F]/80 p-3 rounded-xl border border-white/10">
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-[#00E5FF] flex-shrink-0" />
                    <div>
                      <p className="text-[9px] uppercase font-bold tracking-wider text-[#D1D5DB]/50">{t.totalStudentsLabel}</p>
                      <p className="font-bold text-white">{uni.totalStudents}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Award className="w-4 h-4 text-[#7CFC00] flex-shrink-0" />
                    <div>
                      <p className="text-[9px] uppercase font-bold tracking-wider text-[#D1D5DB]/50">{t.intlRatioLabel}</p>
                      <p className="font-bold text-white">{uni.internationalStudentsRatio.split(' ')[0]}</p>
                    </div>
                  </div>
                </div>

                {/* Accreditations Badges */}
                <div>
                  <p className="text-[9px] font-bold text-[#D1D5DB]/60 mb-2 uppercase tracking-widest">
                    {t.accreditationsLabel}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {uni.accreditations.map((acc, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 bg-[#071A2F] text-[#00E5FF] text-[10px] font-bold border border-[#00E5FF]/20 rounded-md uppercase tracking-wider"
                      >
                        {acc}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Highlights list */}
                <div className="space-y-2 pt-1 border-t border-white/10">
                  {uni.highlights.slice(0, 3).map((h, i) => (
                    <div key={i} className="flex items-start space-x-2 text-xs text-[#D1D5DB]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#7CFC00] mt-0.5 flex-shrink-0" />
                      <span className="line-clamp-2 leading-relaxed">{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Card Footer Actions */}
            <div className="p-6 pt-0 grid grid-cols-2 gap-3">
              <button
                onClick={() => onAskAboutUniversity(uni.name)}
                className="btn-glass-cyan flex items-center justify-center space-x-1.5 py-3 px-3 text-[10px] uppercase font-bold tracking-widest cursor-pointer"
              >
                <Mic className="w-3.5 h-3.5" />
                <span>{t.askAiVoiceBtn}</span>
              </button>

              <button
                onClick={() => onExploreCourses(uni.id)}
                className="btn-cta-coral flex items-center justify-center space-x-1 py-3 px-3 text-[10px] uppercase font-bold tracking-widest cursor-pointer"
              >
                <span>{t.exploreCoursesBtn}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
