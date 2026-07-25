import React, { useState } from 'react';
import { COURSES, UNIVERSITIES } from '../data/universitiesData';
import { Search, Clock, Mic, CheckCircle2, Award } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

interface CourseExplorerProps {
  onAskAboutCourse: (courseTitle: string, uniName: string) => void;
  preselectedUniId?: string | null;
}

export const CourseExplorer: React.FC<CourseExplorerProps> = ({
  onAskAboutCourse,
  preselectedUniId,
}) => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUni, setSelectedUni] = useState<string>(preselectedUniId || 'All');
  const [selectedDegree, setSelectedDegree] = useState<string>('All');

  const degrees = ['All', "Bachelor's", "Master's"];

  const filteredCourses = COURSES.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.faculty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.universityName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesUni = selectedUni === 'All' || course.universityId === selectedUni;
    const matchesDegree = selectedDegree === 'All' || course.degreeLevel === selectedDegree;

    return matchesSearch && matchesUni && matchesDegree;
  });

  return (
    <div className="space-y-10 py-10">
      {/* Header */}
      <div className="border-b border-white/10 pb-6">
        <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#00E5FF] block mb-1">
          {t.courseSubtitle}
        </span>
        <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight text-white">
          {t.courseTitle}
        </h2>
        <p className="text-sm text-[#D1D5DB]/80 mt-2 max-w-2xl leading-relaxed">
          {t.courseDesc}
        </p>
      </div>

      {/* Filter Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 glass-panel p-4 bg-[#102A43]/80 border-white/10 rounded-2xl">
        {/* Search Input */}
        <div className="sm:col-span-6 relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#00E5FF]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full bg-[#071A2F]/90 border border-white/15 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-[#D1D5DB]/40 focus:outline-none focus:border-[#00E5FF]"
          />
        </div>

        {/* University Filter */}
        <div className="sm:col-span-3">
          <select
            value={selectedUni}
            onChange={(e) => setSelectedUni(e.target.value)}
            className="w-full bg-[#071A2F]/90 border border-white/15 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#00E5FF]"
          >
            <option value="All" className="bg-[#071A2F] text-white">{t.allUnisOption}</option>
            {UNIVERSITIES.map((u) => (
              <option key={u.id} value={u.id} className="bg-[#071A2F] text-white">
                {u.shortName}
              </option>
            ))}
          </select>
        </div>

        {/* Degree Level Filter */}
        <div className="sm:col-span-3">
          <select
            value={selectedDegree}
            onChange={(e) => setSelectedDegree(e.target.value)}
            className="w-full bg-[#071A2F]/90 border border-white/15 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#00E5FF]"
          >
            <option value="All" className="bg-[#071A2F] text-white">{t.allDegreesOption}</option>
            {degrees.slice(1).map((d) => (
              <option key={d} value={d} className="bg-[#071A2F] text-white">
                {d}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Course List Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        {filteredCourses.length === 0 ? (
          <div className="col-span-2 text-center py-12 glass-panel bg-[#102A43]/60 text-[#D1D5DB]/60 text-xs uppercase font-bold tracking-wider rounded-[18px]">
            {t.noCoursesFoundMsg}
          </div>
        ) : (
          filteredCourses.map((course) => (
            <div
              key={course.id}
              className="glass-panel-interactive bg-[#102A43]/80 border border-white/10 hover:border-[#8B5CF6]/40 p-6 rounded-[18px] transition-all duration-300 flex flex-col justify-between space-y-5"
            >
              <div>
                {/* Header info */}
                <div className="flex items-start justify-between gap-3 border-b border-white/10 pb-3">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#00E5FF] block mb-1">
                      {course.universityName}
                    </span>
                    <h3 className="text-xl font-display font-bold text-white leading-tight">{course.title}</h3>
                    <p className="text-xs text-[#D1D5DB]/80 mt-1">{course.faculty}</p>
                  </div>

                  {course.popular && (
                    <span className="px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest bg-gradient-to-r from-[#00E5FF] to-[#8B5CF6] text-[#071A2F] rounded-full shadow-[0_0_12px_rgba(0,229,255,0.3)] flex-shrink-0">
                      {t.featuredBadge}
                    </span>
                  )}
                </div>

                {/* Duration & Language */}
                <div className="flex items-center space-x-6 text-xs text-[#D1D5DB] py-3 my-2 border-b border-white/10">
                  <div className="flex items-center space-x-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#00E5FF]" />
                    <span>{course.durationYears} {t.yearsDurationText}</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <Award className="w-3.5 h-3.5 text-[#8B5CF6]" />
                    <span>{course.language} {t.mediumLanguageText}</span>
                  </div>
                </div>

                {/* Pricing Breakdown Box */}
                <div className="bg-[#071A2F]/90 p-4 rounded-xl border border-white/10 space-y-1.5 my-3">
                  <div className="flex items-center justify-between text-xs text-[#D1D5DB]/50 line-through">
                    <span>{t.standardTuitionText}</span>
                    <span>${course.annualFeeUSD.toLocaleString()} / year</span>
                  </div>

                  <div className="flex items-center justify-between text-sm font-display font-bold text-white">
                    <span>{t.netTuitionText}</span>
                    <span className="text-xl font-black text-[#7CFC00]">${course.netFeeWith50PercentUSD.toLocaleString()} USD</span>
                  </div>
                  <p className="text-[10px] text-[#00E5FF] uppercase tracking-wider font-semibold">{course.scholarshipAvailable}</p>
                </div>

                {/* Entry Requirements Summary */}
                <div className="pt-2 space-y-1.5">
                  <p className="text-[9px] font-bold text-[#D1D5DB]/50 uppercase tracking-widest">{t.entryRequirementsText}</p>
                  {course.entryRequirements.map((req, i) => (
                    <div key={i} className="flex items-center space-x-2 text-xs text-[#D1D5DB]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#7CFC00] flex-shrink-0" />
                      <span>{req}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => onAskAboutCourse(course.title, course.universityName)}
                className="btn-cta-coral w-full flex items-center justify-center space-x-2 py-3 px-4 text-[10px] uppercase font-bold tracking-widest cursor-pointer"
              >
                <Mic className="w-3.5 h-3.5" />
                <span>{t.askAboutCourseBtn} {course.title}</span>
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
