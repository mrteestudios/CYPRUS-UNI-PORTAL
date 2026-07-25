import { University, Course, VoiceOption } from '../types';

export const UNIVERSITIES: University[] = [
  {
    id: 'emu',
    name: 'Eastern Mediterranean University',
    shortName: 'EMU (DAÜ)',
    city: 'Gazimağusa (Famagusta)',
    established: 1979,
    type: 'State / Public',
    accreditations: ['ABET', 'AACSB', 'ASIIN', 'FIBAA', 'TEDQUAL', 'YÖK', 'YÖDAK', 'UK ENIC'],
    totalStudents: '17,500+',
    internationalStudentsRatio: '70% from 110+ countries',
    campusSize: '3,000 Acres (Beachfront Campus)',
    coverImage: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1200&q=80',
    highlights: [
      'Ranked among top 600 Universities worldwide (Times Higher Education)',
      'ABET Accredited Engineering Programs (Computer, Software, Civil, Electrical)',
      'AACSB Accredited Faculty of Business and Economics',
      '50% Automatic Merit Scholarship for International Applicants',
      'On-campus private beach, Olympic swimming pool, & sports arena'
    ],
    website: 'https://www.emu.edu.tr'
  },
  {
    id: 'neu',
    name: 'Near East University',
    shortName: 'NEU (YDÜ)',
    city: 'Lefkoşa (Nicosia)',
    established: 1988,
    type: 'Private / Foundation',
    accreditations: ['YÖK', 'YÖDAK', 'EUA', 'IAU', 'WFME (Medicine)', 'FIP (Pharmacy)'],
    totalStudents: '26,000+',
    internationalStudentsRatio: '65% from 100+ countries',
    campusSize: 'Largest Campus in North Cyprus',
    coverImage: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80',
    highlights: [
      'Comprehensive Medical Center, Dental Hospital, & Veterinary Hospital',
      'Supercomputer Innovation Hub & AI Robotics Research Labs',
      'Grand Library holding 2.5 million printed books and 650 million digital items',
      'Günsel Electric Vehicle Innovation Facility on campus',
      '50% - 75% Merit & Sports Scholarships available'
    ],
    website: 'https://neu.edu.tr'
  },
  {
    id: 'ciu',
    name: 'Cyprus International University',
    shortName: 'CIU (UKÜ)',
    city: 'Lefkoşa (Nicosia)',
    established: 1997,
    type: 'Private / Foundation',
    accreditations: ['YÖK', 'YÖDAK', 'ASIIN', 'MÜDEK', 'Pearson Assured', 'ECBE'],
    totalStudents: '19,000+',
    internationalStudentsRatio: '75% from 110 countries',
    campusSize: 'Eco-Friendly Solar-Powered Campus',
    coverImage: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80',
    highlights: [
      'Greenest campus in North Cyprus with major solar energy power center',
      'Dual degree options with UK universities (University of Sunderland, University of Wolverhampton)',
      'All-inclusive packages covering Tuition + Dormitory + 3 Meals daily',
      'State-of-the-art Biotechnology & Bioengineering Research Labs',
      '50% guaranteed international tuition scholarship'
    ],
    website: 'https://www.ciu.edu.tr'
  },
  {
    id: 'gau',
    name: 'Girne American University',
    shortName: 'GAU',
    city: 'Girne (Kyrenia)',
    established: 1985,
    type: 'Private / Foundation',
    accreditations: ['YÖK', 'YÖDAK', 'IACBE', 'ECBE', 'ICAO (Aviation)', 'EUCLID'],
    totalStudents: '18,000+',
    internationalStudentsRatio: '60% from 95 countries',
    campusSize: 'Coastal Mountain Campus in Tourist Capital Girne',
    coverImage: 'https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?auto=format&fit=crop&w=1200&q=80',
    highlights: [
      'Pioneer in Aviation & Pilot Training with fleet of modern training aircraft',
      'Marine & Nautical Studies with hands-on Mediterranean sailing training',
      'Global campuses in USA, UK, Sri Lanka, and Turkey for study abroad turns',
      'Located in picturesque seaside harbor city of Kyrenia',
      '50% scholarship packages for international undergraduates'
    ],
    website: 'https://www.gau.edu.tr'
  },
  {
    id: 'bau',
    name: 'Bahçeşehir Cyprus University',
    shortName: 'BAU Cyprus',
    city: 'Lefkoşa (Nicosia)',
    established: 2017,
    type: 'Private / Foundation',
    accreditations: ['YÖK', 'YÖDAK', 'BAU Global Network Accredited'],
    totalStudents: '4,500+',
    internationalStudentsRatio: '80% international student body',
    campusSize: 'Modern Urban Tech Campus',
    coverImage: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
    highlights: [
      'Part of global BAU Global Network (Istanbul, Washington DC, Berlin, Plymouth)',
      'Strong focus on Artificial Intelligence, Cyber Security, & Digital Media',
      'Direct exchange & transfer options with BAU Istanbul and Berlin campus',
      'High tech industry partnerships and internship guarantees',
      '50% - 75% international tuition waivers'
    ],
    website: 'https://baucyprus.edu.tr'
  }
];

export const COURSES: Course[] = [
  // EMU COURSES
  {
    id: 'emu-cs',
    universityId: 'emu',
    universityName: 'Eastern Mediterranean University',
    title: 'B.Sc. Computer Engineering',
    faculty: 'Faculty of Engineering',
    degreeLevel: "Bachelor's",
    durationYears: 4,
    language: 'English',
    annualFeeUSD: 6400,
    scholarshipAvailable: '50% Automatic Scholarship ($3,200/yr net)',
    netFeeWith50PercentUSD: 3200,
    entryRequirements: [
      'High School Diploma (minimum 60% overall average)',
      'Mathematics & Physics background',
      'English Proficiency (IELTS 5.5 / TOEFL 60 or EMU English Test)'
    ],
    careerProspects: ['Software Developer', 'Systems Architect', 'AI Specialist', 'Cyber Security Engineer'],
    popular: true
  },
  {
    id: 'emu-se',
    universityId: 'emu',
    universityName: 'Eastern Mediterranean University',
    title: 'B.Sc. Software Engineering',
    faculty: 'Faculty of Engineering',
    degreeLevel: "Bachelor's",
    durationYears: 4,
    language: 'English',
    annualFeeUSD: 6400,
    scholarshipAvailable: '50% Automatic Scholarship ($3,200/yr net)',
    netFeeWith50PercentUSD: 3200,
    entryRequirements: ['High School Diploma', 'IELTS 5.5 or EMU English Placement Test'],
    careerProspects: ['Full-stack Developer', 'DevOps Specialist', 'Mobile App Engineer', 'Cloud Architect'],
    popular: true
  },
  {
    id: 'emu-med',
    universityId: 'emu',
    universityName: 'Eastern Mediterranean University',
    title: 'Doctor of Medicine (M.D. Joint Program with Marmara University)',
    faculty: 'Faculty of Medicine',
    degreeLevel: "Bachelor's",
    durationYears: 6,
    language: 'English',
    annualFeeUSD: 13500,
    scholarshipAvailable: 'Competitive Merit Discounts Available (up to 25-50%)',
    netFeeWith50PercentUSD: 10125,
    entryRequirements: [
      'High School Diploma with 80%+ grade in Biology and Chemistry',
      'IELTS 6.0 / TOEFL 75 or pass EMU English Exam',
      'Passed Entrance Assessment'
    ],
    careerProspects: ['Medical Doctor', 'Clinical Researcher', 'Hospital Specialist'],
    popular: true
  },
  {
    id: 'emu-pharm',
    universityId: 'emu',
    universityName: 'Eastern Mediterranean University',
    title: 'Pharm.D. Doctor of Pharmacy',
    faculty: 'Faculty of Pharmacy',
    degreeLevel: "Bachelor's",
    durationYears: 5,
    language: 'English',
    annualFeeUSD: 8200,
    scholarshipAvailable: '50% Automatic Scholarship ($4,100/yr net)',
    netFeeWith50PercentUSD: 4100,
    entryRequirements: ['High School Diploma with Chemistry & Biology', 'IELTS 5.5 or EMU English Test'],
    careerProspects: ['Clinical Pharmacist', 'Pharmaceutical Researcher', 'Drug Regulatory Officer'],
    popular: true
  },
  {
    id: 'emu-biz',
    universityId: 'emu',
    universityName: 'Eastern Mediterranean University',
    title: 'B.A. Business Administration (AACSB Accredited)',
    faculty: 'Faculty of Business & Economics',
    degreeLevel: "Bachelor's",
    durationYears: 4,
    language: 'English',
    annualFeeUSD: 5800,
    scholarshipAvailable: '50% Automatic Scholarship ($2,900/yr net)',
    netFeeWith50PercentUSD: 2900,
    entryRequirements: ['High School Diploma', 'English Proficiency Test'],
    careerProspects: ['Business Analyst', 'Marketing Director', 'Financial Manager', 'Entrepreneur'],
    popular: false
  },
  {
    id: 'emu-arch',
    universityId: 'emu',
    universityName: 'Eastern Mediterranean University',
    title: 'B.Arch. Architecture',
    faculty: 'Faculty of Architecture',
    degreeLevel: "Bachelor's",
    durationYears: 4,
    language: 'English',
    annualFeeUSD: 6200,
    scholarshipAvailable: '50% Automatic Scholarship ($3,100/yr net)',
    netFeeWith50PercentUSD: 3100,
    entryRequirements: ['High School Diploma', 'Portfolio / Drawing Aptitude Test'],
    careerProspects: ['Architectural Designer', 'Urban Planner', 'Interior Consultant'],
    popular: true
  },
  {
    id: 'emu-msc-ai',
    universityId: 'emu',
    universityName: 'Eastern Mediterranean University',
    title: 'M.Sc. Artificial Intelligence & Data Science',
    faculty: 'Faculty of Computing & Technology',
    degreeLevel: "Master's",
    durationYears: 2,
    language: 'English',
    annualFeeUSD: 4500,
    scholarshipAvailable: '50% - 100% Graduate Assistantship Scholarships',
    netFeeWith50PercentUSD: 2250,
    entryRequirements: ["Bachelor's Degree in CS, Engineering or related STEM field (CGPA 2.5+/4.0)"],
    careerProspects: ['AI Engineer', 'Data Scientist', 'Machine Learning Researcher'],
    popular: true
  },

  // NEU COURSES
  {
    id: 'neu-med',
    universityId: 'neu',
    universityName: 'Near East University',
    title: 'Doctor of Medicine (M.D.)',
    faculty: 'Faculty of Medicine',
    degreeLevel: "Bachelor's",
    durationYears: 6,
    language: 'English',
    annualFeeUSD: 12600,
    scholarshipAvailable: 'Special International Scholarship Grants (Net ~$7,800/yr)',
    netFeeWith50PercentUSD: 7800,
    entryRequirements: ['High School Diploma (Min 75% in Science)', 'IELTS 6.0 or NEU Proficiency Exam'],
    careerProspects: ['Medical Practitioner', 'Surgeon', 'Medical Researcher'],
    popular: true
  },
  {
    id: 'neu-dent',
    universityId: 'neu',
    universityName: 'Near East University',
    title: 'Doctor of Dental Surgery (D.D.S.)',
    faculty: 'Faculty of Dentistry',
    degreeLevel: "Bachelor's",
    durationYears: 5,
    language: 'English',
    annualFeeUSD: 9400,
    scholarshipAvailable: '50% Merit Waiver ($4,700/yr net)',
    netFeeWith50PercentUSD: 4700,
    entryRequirements: ['High School Science Stream', 'IELTS 5.5 or English Exam'],
    careerProspects: ['Dentist', 'Orthodontist', 'Dental Surgeon'],
    popular: true
  },
  {
    id: 'neu-ai',
    universityId: 'neu',
    universityName: 'Near East University',
    title: 'B.Sc. Artificial Intelligence Engineering',
    faculty: 'Faculty of Engineering',
    degreeLevel: "Bachelor's",
    durationYears: 4,
    language: 'English',
    annualFeeUSD: 5600,
    scholarshipAvailable: '50% Guaranteed Scholarship ($2,800/yr net)',
    netFeeWith50PercentUSD: 2800,
    entryRequirements: ['High School Certificate', 'Mathematics proficiency'],
    careerProspects: ['AI Robotics Specialist', 'NLP Developer', 'Deep Learning Specialist'],
    popular: true
  },
  {
    id: 'neu-vet',
    universityId: 'neu',
    universityName: 'Near East University',
    title: 'Doctor of Veterinary Medicine (D.V.M.)',
    faculty: 'Faculty of Veterinary Medicine',
    degreeLevel: "Bachelor's",
    durationYears: 5,
    language: 'English',
    annualFeeUSD: 6800,
    scholarshipAvailable: '50% International Scholarship ($3,400/yr net)',
    netFeeWith50PercentUSD: 3400,
    entryRequirements: ['High School Diploma with Biology'],
    careerProspects: ['Veterinary Surgeon', 'Animal Health Specialist', 'Zoological Pharmacist'],
    popular: false
  },

  // CIU COURSES
  {
    id: 'ciu-bio',
    universityId: 'ciu',
    universityName: 'Cyprus International University',
    title: 'B.Sc. Bioengineering & Biotechnology',
    faculty: 'Faculty of Engineering',
    degreeLevel: "Bachelor's",
    durationYears: 4,
    language: 'English',
    annualFeeUSD: 6100,
    scholarshipAvailable: '50% Automatic Scholarship ($3,050/yr net)',
    netFeeWith50PercentUSD: 3050,
    entryRequirements: ['High School Certificate', 'English placement exam'],
    careerProspects: ['Biotech Researcher', 'Biomedical Equipment Specialist', 'Genetic Engineer'],
    popular: true
  },
  {
    id: 'ciu-civ',
    universityId: 'ciu',
    universityName: 'Cyprus International University',
    title: 'B.Sc. Civil Engineering (ASIIN Accredited)',
    faculty: 'Faculty of Engineering',
    degreeLevel: "Bachelor's",
    durationYears: 4,
    language: 'English',
    annualFeeUSD: 5800,
    scholarshipAvailable: '50% Automatic Scholarship ($2,900/yr net)',
    netFeeWith50PercentUSD: 2900,
    entryRequirements: ['High School Science Stream'],
    careerProspects: ['Structural Engineer', 'Site Manager', 'Infrastructure Designer'],
    popular: false
  },
  {
    id: 'ciu-tour',
    universityId: 'ciu',
    universityName: 'Cyprus International University',
    title: 'B.A. Tourism & Hotel Management',
    faculty: 'School of Tourism & Hotel Management',
    degreeLevel: "Bachelor's",
    durationYears: 4,
    language: 'English',
    annualFeeUSD: 5200,
    scholarshipAvailable: '50% Guaranteed Scholarship ($2,600/yr net)',
    netFeeWith50PercentUSD: 2600,
    entryRequirements: ['High School Diploma'],
    careerProspects: ['Resort Manager', 'Event Specialist', 'Airlines Operations Manager'],
    popular: false
  },

  // GAU COURSES
  {
    id: 'gau-pilot',
    universityId: 'gau',
    universityName: 'Girne American University',
    title: 'B.Sc. Pilot Training & Aviation Management',
    faculty: 'Faculty of Aviation',
    degreeLevel: "Bachelor's",
    durationYears: 4,
    language: 'English',
    annualFeeUSD: 7200,
    scholarshipAvailable: '50% Academic Scholarship (Flight hours billed separately)',
    netFeeWith50PercentUSD: 3600,
    entryRequirements: ['High School Diploma', 'ICAO Class 1 Medical Fitness Certificate', 'English Exam'],
    careerProspects: ['Commercial Airline Pilot', 'Flight Inspector', 'Aviation Operations Director'],
    popular: true
  },
  {
    id: 'gau-law',
    universityId: 'gau',
    universityName: 'Girne American University',
    title: 'LL.B. International Law',
    faculty: 'Faculty of Law',
    degreeLevel: "Bachelor's",
    durationYears: 4,
    language: 'English',
    annualFeeUSD: 5600,
    scholarshipAvailable: '50% Automatic Scholarship ($2,800/yr net)',
    netFeeWith50PercentUSD: 2800,
    entryRequirements: ['High School Diploma', 'Good English skills'],
    careerProspects: ['International Legal Consultant', 'Diplomat', 'Corporate Legal Advisor'],
    popular: false
  },

  // BAU CYPRUS COURSES
  {
    id: 'bau-cyber',
    universityId: 'bau',
    universityName: 'Bahçeşehir Cyprus University',
    title: 'B.Sc. Cyber Security Engineering',
    faculty: 'Faculty of Engineering & Architecture',
    degreeLevel: "Bachelor's",
    durationYears: 4,
    language: 'English',
    annualFeeUSD: 6000,
    scholarshipAvailable: '50% - 75% BAU Global Waiver ($1,500 - $3,000/yr net)',
    netFeeWith50PercentUSD: 3000,
    entryRequirements: ['High School Certificate', 'English placement exam'],
    careerProspects: ['Ethical Hacker', 'Security Analyst', 'Cryptographer', 'SOC Director'],
    popular: true
  },
  {
    id: 'bau-digital',
    universityId: 'bau',
    universityName: 'Bahçeşehir Cyprus University',
    title: 'B.A. Digital Media & Cinema',
    faculty: 'Faculty of Communication',
    degreeLevel: "Bachelor's",
    durationYears: 4,
    language: 'English',
    annualFeeUSD: 5200,
    scholarshipAvailable: '50% Automatic Scholarship ($2,600/yr net)',
    netFeeWith50PercentUSD: 2600,
    entryRequirements: ['High School Certificate'],
    careerProspects: ['Content Director', 'Video Producer', 'UI/UX Media Designer'],
    popular: false
  }
];

export const VOICE_OPTIONS: VoiceOption[] = [
  {
    id: 'Zephyr',
    name: 'Zephyr (Friendly & Professional)',
    gender: 'Female',
    accent: 'International English',
    description: 'Warm, clear, and encouraging admissions guide voice.'
  },
  {
    id: 'Kore',
    name: 'Kore (Energetic Academic Advisor)',
    gender: 'Female',
    accent: 'Neutral Clear',
    description: 'Upbeat and articulate, perfect for quick course comparisons.'
  },
  {
    id: 'Puck',
    name: 'Puck (Youthful Student Ambassador)',
    gender: 'Male',
    accent: 'Modern Conversational',
    description: 'Relatable student perspective on campus life and accommodation.'
  },
  {
    id: 'Charon',
    name: 'Charon (Deep & Authoritative)',
    gender: 'Male',
    accent: 'Executive English',
    description: 'Formal, precise tone for complex visa & official scholarship queries.'
  },
  {
    id: 'Fenrir',
    name: 'Fenrir (Dynamic & Engaging)',
    gender: 'Male',
    accent: 'Global Accent',
    description: 'Fast-paced, high energy guide for quick facts and tuition totals.'
  }
];

export const QUICK_VOICE_PROMPTS = [
  "What are the fees for Computer Engineering at EMU with a 50% scholarship?",
  "How do I get an automatic 50% international scholarship in North Cyprus?",
  "Tell me about Medicine at Near East University and the requirements.",
  "Which university offers Pilot Training or Aviation in Kyrenia?",
  "What is the average monthly cost of living for a student in Famagusta?",
  "How does the student visa process work upon arriving at Ercan Airport?"
];
