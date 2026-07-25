import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'tr' | 'ru';

export interface Translations {
  // Navbar
  portalTitle: string;
  brandName: string;
  voiceAiBadge: string;
  tabUniversities: string;
  tabCourses: string;
  tabCalculator: string;
  tabGuide: string;
  tabChat: string;
  speakGemini: string;
  liveActive: string;

  // Hero Section
  heroSubhead: string;
  heroTitle1: string;
  heroTitle2: string;
  heroDesc: string;
  speakBtn: string;
  multimodalVoiceAi: string;
  geminiLiveVoice: string;
  calcTuitionBtn: string;
  admissionsInsight: string;
  degreeProgramsCount: string;
  automaticScholarship: string;
  quickVoiceQueries: string;
  mediterraneanHub: string;
  sunnyDays: string;

  // University Overview
  uniSubtitle: string;
  uniTitle: string;
  uniDesc: string;
  allCities: string;
  totalStudentsLabel: string;
  intlRatioLabel: string;
  accreditationsLabel: string;
  askAiVoiceBtn: string;
  exploreCoursesBtn: string;

  // Course Explorer
  courseSubtitle: string;
  courseTitle: string;
  courseDesc: string;
  searchPlaceholder: string;
  allUnisOption: string;
  allDegreesOption: string;
  noCoursesFoundMsg: string;
  featuredBadge: string;
  yearsDurationText: string;
  mediumLanguageText: string;
  standardTuitionText: string;
  netTuitionText: string;
  entryRequirementsText: string;
  askAboutCourseBtn: string;

  // Fee Calculator
  calcSubtitle: string;
  calcTitle: string;
  calcDesc: string;
  step1UniLabel: string;
  step2CourseLabel: string;
  step3ScholarshipLabel: string;
  step4DormLabel: string;
  includeMealPlanLabel: string;
  mealPlanDescText: string;
  officialQuoteTitle: string;
  waiverActiveText: string;
  dormAccText: string;
  healthInsText: string;
  regTaxText: string;
  totalFirstYearText: string;
  semesterPaymentText: string;
  guaranteedBankText: string;
  copyQuoteBtn: string;
  copiedQuoteBtn: string;

  // Visa & Living Guide
  guideSubtitle: string;
  guideTitle: string;
  guideDesc: string;
  arrivalProtocolTitle: string;
  ercanAirportText: string;
  noAdvanceVisaText: string;
  studentResidencyText: string;
  housingDormsTitle: string;
  campusDormsText: string;
  offCampusApartmentsText: string;
  allInclusivePackagesText: string;
  monthlyLivingTitle: string;
  groceriesText: string;
  transportText: string;
  dataMobileText: string;
  partTimeJobTitle: string;
  partTimeJobText: string;
  islandSafetyTitle: string;
  islandSafetyText: string;
  freeTransitTitle: string;
  freeTransitText: string;

  // Chat Assistant
  chatSubtitle: string;
  chatTitle: string;
  chatDesc: string;
  advisorActiveText: string;
  voicePersonaLabel: string;
  userLabel: string;
  advisorLabel: string;
  listenWithVoiceBtn: string;
  stopSpeechBtn: string;
  generatingVoiceBtn: string;
  typeInquiryPlaceholder: string;
  switchToVoiceRoomBtn: string;

  // Language names
  englishLabel: string;
  turkishLabel: string;
  russianLabel: string;
}

const translations: Record<Language, Translations> = {
  en: {
    // Navbar
    portalTitle: 'N Cyprus Admissions Portal',
    brandName: 'Cyprus Global Universities',
    voiceAiBadge: 'Voice AI',
    tabUniversities: 'Universities',
    tabCourses: 'Programs & Fees',
    tabCalculator: 'Cost Estimator',
    tabGuide: 'Visa & Living',
    tabChat: 'AI Text Advisor',
    speakGemini: 'Speak with Advisor Now',
    liveActive: 'Live Voice Active',

    // Hero Section
    heroSubhead: 'International Admissions • TRNC Higher Education',
    heroTitle1: 'YOUR FUTURE,',
    heroTitle2: 'ARTICULATED.',
    heroDesc: 'Experience university admissions in North Cyprus through Gemini 3.1 Live multimodal voice. Ask about engineering fees, medicine entry requirements, or Mediterranean student life using natural spoken voice.',
    speakBtn: 'Speak',
    multimodalVoiceAi: 'Multimodal Voice AI',
    geminiLiveVoice: 'Gemini Live Voice',
    calcTuitionBtn: 'Calculate Tuition & Living Costs',
    admissionsInsight: 'Admissions Insight',
    degreeProgramsCount: '120+ Degree Programs',
    automaticScholarship: '50% Automatic Scholarship',
    quickVoiceQueries: 'Quick Voice Queries',
    mediterraneanHub: 'Mediterranean Education Hub',
    sunnyDays: '300+ Sunny Days / Year',

    // University Overview
    uniSubtitle: 'ACADEMIC INSTITUTIONS',
    uniTitle: 'Accredited Universities in North Cyprus',
    uniDesc: 'Discover premier state and foundation universities offering 100% English-medium degree programs, international accreditations (ABET, AACSB, ASIIN), and automatic 50% scholarships.',
    allCities: 'All Cities',
    totalStudentsLabel: 'Total Students',
    intlRatioLabel: 'Int’l Ratio',
    accreditationsLabel: 'Accreditations & Memberships',
    askAiVoiceBtn: 'Ask AI Voice',
    exploreCoursesBtn: 'Courses',

    // Course Explorer
    courseSubtitle: 'PROGRAM FINDER & FEES',
    courseTitle: 'Academic Degrees & Scholarship Fees',
    courseDesc: 'Search accredited undergraduate and graduate programs. International applicants automatically receive a 50% tuition waiver upon acceptance.',
    searchPlaceholder: 'Search programs (e.g., Computer Engineering, Medicine, Pharmacy...)',
    allUnisOption: 'All Universities',
    allDegreesOption: 'All Degree Levels',
    noCoursesFoundMsg: 'No academic programs found matching your search criteria.',
    featuredBadge: 'Featured',
    yearsDurationText: 'Years Duration',
    mediumLanguageText: 'Medium',
    standardTuitionText: 'Standard Annual Tuition:',
    netTuitionText: 'Net Annual Tuition (50% Waiver):',
    entryRequirementsText: 'Entry Requirements:',
    askAboutCourseBtn: 'Ask AI Voice About',

    // Fee Calculator
    calcSubtitle: 'FINANCIAL PLANNING',
    calcTitle: 'Annual Tuition & Living Cost Calculator',
    calcDesc: 'Configure academic program parameters, scholarship waiver tiers, dormitory housing, and meal plans to calculate your exact first-year financial investment.',
    step1UniLabel: '1. Select Target University',
    step2CourseLabel: '2. Select Academic Program',
    step3ScholarshipLabel: '3. Scholarship Discount Waiver',
    step4DormLabel: '4. Dormitory Housing Option',
    includeMealPlanLabel: 'Include Campus Dining Meal Plan',
    mealPlanDescText: '3 meals daily in university cafeteria ($1,400/yr)',
    officialQuoteTitle: 'Official Estimate Quote',
    waiverActiveText: 'Waiver Active',
    dormAccText: 'Dormitory Accommodation:',
    healthInsText: 'TRNC Student Health Insurance:',
    regTaxText: 'Registration & Activity Tax:',
    totalFirstYearText: 'Total First-Year Cost:',
    semesterPaymentText: 'Semester Payment Schedule (2 parts):',
    guaranteedBankText: 'Direct Official University Account Payment',
    copyQuoteBtn: 'Copy Fee Estimate Quote',
    copiedQuoteBtn: 'Quote Copied to Clipboard!',

    // Visa & Living Guide
    guideSubtitle: 'STUDENT PROTOCOL & RELOCATION',
    guideTitle: 'Living & Studying in North Cyprus',
    guideDesc: 'North Cyprus (TRNC) hosts over 100,000 international students from 130+ nations annually, offering a safe, Mediterranean academic atmosphere.',
    arrivalProtocolTitle: '1. Arrival & Entry Visa Protocol',
    ercanAirportText: 'Ercan Airport (ECN): Primary airport with transit flights via Istanbul or Ankara.',
    noAdvanceVisaText: 'No Advance Visa Required: Present official acceptance letter at border control for 30-90 day entry visa.',
    studentResidencyText: 'Student Residency Permit: Processed online via Ministry portal after university registration.',
    housingDormsTitle: '2. Housing & Campus Dormitories',
    campusDormsText: 'Campus Dorms ($1,500 - $3,500/yr): Air-conditioned rooms with high-speed internet and security.',
    offCampusApartmentsText: 'Off-Campus Apartments ($250 - $450/mo): Shared 2-3 bedroom city apartments.',
    allInclusivePackagesText: 'All-Inclusive Packages: CIU and NEU offer tuition + dorm + 3 meals daily packages.',
    monthlyLivingTitle: '3. Monthly Living Expenses',
    groceriesText: 'Groceries & Food: $180 - $250 / mo',
    transportText: 'Transportation: Free University Shuttles',
    dataMobileText: 'Personal & Mobile Data: $40 - $70 / mo',
    partTimeJobTitle: '4. Part-Time Employment',
    partTimeJobText: 'International students are legally permitted to work part-time up to 20 hours per week during semesters and full-time during official breaks.',
    islandSafetyTitle: '5. Island Life & Safety',
    islandSafetyText: 'Over 300 sunny days annually, historic UNESCO castles in Kyrenia & Famagusta, and one of the lowest crime rates in Europe.',
    freeTransitTitle: '6. Free Student Transit',
    freeTransitText: 'All major universities (EMU, NEU, CIU, GAU) operate free campus shuttle buses connecting dormitories, lecture halls, and city centers every 15-30 minutes.',

    // Chat Assistant
    chatSubtitle: 'CONSULTATION PORTAL',
    chatTitle: 'AI Academic Assistant',
    chatDesc: 'Powered by Gemini 2.5 Flash with real-time speech synthesis. Inquire about degree programs, fees, and admissions.',
    advisorActiveText: 'Admissions Advisor Active',
    voicePersonaLabel: 'Voice Persona:',
    userLabel: 'User',
    advisorLabel: 'Admissions Advisor',
    listenWithVoiceBtn: 'Listen with Gemini Voice',
    stopSpeechBtn: 'Stop Speech',
    generatingVoiceBtn: 'Generating Voice...',
    typeInquiryPlaceholder: 'Type your inquiry regarding programs, tuition, or campus life...',
    switchToVoiceRoomBtn: 'Switch to Real-Time Voice Room',

    englishLabel: 'English',
    turkishLabel: 'Türkçe',
    russianLabel: 'Русский',
  },
  tr: {
    // Navbar
    portalTitle: 'N Kıbrıs Başvuru Portalı',
    brandName: 'Kıbrıs Global Üniversiteleri',
    voiceAiBadge: 'Sesli AI',
    tabUniversities: 'Üniversiteler',
    tabCourses: 'Programlar & Ücretler',
    tabCalculator: 'Maliyet Hesaplayıcı',
    tabGuide: 'Vize & Yaşam',
    tabChat: 'AI Danışman',
    speakGemini: 'Şimdi Danışmanla Konuş',
    liveActive: 'Canlı Ses Aktif',

    // Hero Section
    heroSubhead: 'Uluslararası Kayıtlar • KKTC Yükseköğretim',
    heroTitle1: 'GELECEĞİNİZİ',
    heroTitle2: 'ŞEKİLLENDİRİN.',
    heroDesc: 'Kuzey Kıbrıs üniversite kabullerini Gemini 3.1 Live çok modlu ses teknolojisiyle deneyimleyin. Mühendislik ücretleri, tıp başvuru koşulları veya Kıbrıs öğrenci yaşamı hakkında sesli bilgi alın.',
    speakBtn: 'Konuş',
    multimodalVoiceAi: 'Çok Modlu Sesli AI',
    geminiLiveVoice: 'Gemini Canlı Ses',
    calcTuitionBtn: 'Eğitim ve Yaşam Maliyetini Hesapla',
    admissionsInsight: 'Kabul İstatistikleri',
    degreeProgramsCount: '120+ Akademik Program',
    automaticScholarship: '%50 Otomatik Burs',
    quickVoiceQueries: 'Örnek Sesli Sorular',
    mediterraneanHub: 'Akdeniz Eğitim Merkezi',
    sunnyDays: 'Yılda 300+ Güneşli Gün',

    // University Overview
    uniSubtitle: 'AKADEMİK KURUMLAR',
    uniTitle: 'Kuzey Kıbrıs Akredite Üniversiteleri',
    uniDesc: '%100 İngilizce eğitim veren, uluslararası akreditasyonlara (ABET, AACSB, ASIIN) ve otomatik %50 burs imkanına sahip devlet ve vakıf üniversitelerini inceleyin.',
    allCities: 'Tüm Şehirler',
    totalStudentsLabel: 'Toplam Öğrenci',
    intlRatioLabel: 'Uluslararası Oran',
    accreditationsLabel: 'Akreditasyonlar & Üyelikler',
    askAiVoiceBtn: 'AI Sesle Sor',
    exploreCoursesBtn: 'Programlar',

    // Course Explorer
    courseSubtitle: 'PROGRAM VE ÜCRET ARAMA',
    courseTitle: 'Akademik Dereceler & Burslu Ücretler',
    courseDesc: 'Akredite lisans ve lisansüstü programları arayın. Uluslararası adaylara kabul aşamasında otomatik %50 eğitim bursu uygulanır.',
    searchPlaceholder: 'Program arayın (ör. Bilgisayar Mühendisliği, Tıp, Eczacılık...)',
    allUnisOption: 'Tüm Üniversiteler',
    allDegreesOption: 'Tüm Dereceler',
    noCoursesFoundMsg: 'Arama kriterlerinize uygun akademik program bulunamadı.',
    featuredBadge: 'Öne Çıkan',
    yearsDurationText: 'Yıl Süre',
    mediumLanguageText: 'Eğitim Dili',
    standardTuitionText: 'Standart Yıllık Harç:',
    netTuitionText: 'Net Yıllık Ücret (%50 Burslu):',
    entryRequirementsText: 'Kabul Koşulları:',
    askAboutCourseBtn: 'AI Sesle Soru Sor:',

    // Fee Calculator
    calcSubtitle: 'FİNANSAL PLANLAMA',
    calcTitle: 'Yıllık Eğitim ve Yaşam Maliyeti Hesaplayıcı',
    calcDesc: 'İlk yıl toplam harcamalarınızı kesin olarak görmek için üniversite, burs oranı, yurt konaklaması ve yemek planınızı seçin.',
    step1UniLabel: '1. Hedef Üniversiteyi Seçin',
    step2CourseLabel: '2. Akademik Programı Seçin',
    step3ScholarshipLabel: '3. Burs İndirim Oranı',
    step4DormLabel: '4. Yurt Seçeneği',
    includeMealPlanLabel: 'Kampüs Yemek Planını Dahil Et',
    mealPlanDescText: 'Üniversite kafeteryasında günde 3 öğün ($1,400/yıl)',
    officialQuoteTitle: 'Resmi Fiyat Teklifi',
    waiverActiveText: 'Burs Aktif',
    dormAccText: 'Yurt Konaklaması:',
    healthInsText: 'KKTC Öğrenci Sağlık Sigortası:',
    regTaxText: 'Kayıt ve Etkinlik Harcı:',
    totalFirstYearText: 'Toplam İlk Yıl Maliyeti:',
    semesterPaymentText: 'Dönemlik Ödeme Planı (2 Taksit):',
    guaranteedBankText: 'Doğrudan Resmi Üniversite Banka Hesabına Ödeme',
    copyQuoteBtn: 'Hesaplama Teklifini Kopyala',
    copiedQuoteBtn: 'Teklif Panoya Kopyalandı!',

    // Visa & Living Guide
    guideSubtitle: 'ÖĞRENCİ PROTOKOLÜ VE YERLEŞİM',
    guideTitle: 'Kuzey Kıbrıs’ta Yaşam ve Eğitim',
    guideDesc: 'Kuzey Kıbrıs (KKTC), 130’dan fazla ülkeden 100.000’i aşkın uluslararası öğrenciye güvenli ve uluslararası bir öğrenim ortamı sunar.',
    arrivalProtocolTitle: '1. Varış ve Giriş Vizesi',
    ercanAirportText: 'Ercan Havalimanı (ECN): İstanbul veya Ankara aktarmalı uçuşlar mevcuttur.',
    noAdvanceVisaText: 'Önceden Vize Gerekmez: Resmi kabul mektubunuzu sınır kontrolüne sunarak 30-90 günlük vize alabilirsiniz.',
    studentResidencyText: 'Öğrenci İkamet İzni: Üniversite kaydının ardından İçişleri Bakanlığı portalı üzerinden online alınır.',
    housingDormsTitle: '2. Yurt ve Konaklama',
    campusDormsText: 'Kampüs Yurtları ($1,500 - $3,500/yıl): Klimalı, yüksek hızlı internetli ve 24/7 güvenlikli odalar.',
    offCampusApartmentsText: 'Şehir İçi Daireler ($250 - $450/ay): Gazimağusa, Girne veya Lefkoşa merkezinde paylaşımlı evler.',
    allInclusivePackagesText: 'Her Şey Dahil Paketler: UKÜ ve YDÜ eğitim + yurt + 3 öğün yemek paketleri sunar.',
    monthlyLivingTitle: '3. Aylık Yaşam Giderleri',
    groceriesText: 'Mutfak ve Market: $180 - $250 / ay',
    transportText: 'Ulaşım: Ücretsiz Üniversite Servisleri',
    dataMobileText: 'Kişisel ve Mobil Veri: $40 - $70 / ay',
    partTimeJobTitle: '4. Yarı Zamanlı Çalışma',
    partTimeJobText: 'Uluslararası öğrenciler dönem içinde haftada 20 saate kadar, tatillerde ise tam zamanlı yasal olarak çalışabilirler.',
    islandSafetyTitle: '5. Ada Yaşamı ve Güvenlik',
    islandSafetyText: 'Yılda 300’den fazla güneşli gün, tarihi kaleler ve Avrupa’nın en düşük suç oranlarından biri.',
    freeTransitTitle: '6. Ücretsiz Öğrenci Servisleri',
    freeTransitText: 'Tüm ana üniversiteler (DAÜ, YDÜ, UKÜ, GAÜ) yurtları, fakülteleri ve şehir merkezlerini bağlayan ücretsiz servisler sunar.',

    // Chat Assistant
    chatSubtitle: 'DANIŞMANLIK PORTALI',
    chatTitle: 'AI Akademik Danışman',
    chatDesc: 'Gerçek zamanlı ses sentezli Gemini 2.5 Flash ile güçlendirilmiştir. Programlar, harçlar ve kabuller hakkında soru sorun.',
    advisorActiveText: 'Kabul Danışmanı Aktif',
    voicePersonaLabel: 'Ses Personası:',
    userLabel: 'Kullanıcı',
    advisorLabel: 'Akademik Danışman',
    listenWithVoiceBtn: 'Gemini Sesi ile Dinle',
    stopSpeechBtn: 'Sesi Durdur',
    generatingVoiceBtn: 'Ses Oluşturuluyor...',
    typeInquiryPlaceholder: 'Programlar, eğitim harçları veya yaşam hakkında sorunuzu yazın...',
    switchToVoiceRoomBtn: 'Canlı Sesli Odaya Geç',

    englishLabel: 'English',
    turkishLabel: 'Türkçe',
    russianLabel: 'Русский',
  },
  ru: {
    // Navbar
    portalTitle: 'Портал Поступления С. Кипра',
    brandName: 'Глобальные Университеты Кипра',
    voiceAiBadge: 'Голосовой ИИ',
    tabUniversities: 'Университеты',
    tabCourses: 'Программы и Стоимость',
    tabCalculator: 'Калькулятор Затрат',
    tabGuide: 'Виза и Жизнь',
    tabChat: 'ИИ-Консультант',
    speakGemini: 'Связаться с советником',
    liveActive: 'Голос Активен',

    // Hero Section
    heroSubhead: 'Международный Прием • Высшее Образование ТРСК',
    heroTitle1: 'ВАШЕ БУДУЩЕЕ,',
    heroTitle2: 'СДЕЛАТЬ ШАГ.',
    heroDesc: 'Узнайте о поступлении в университеты Северного Кипра с помощью мультимодального голоса Gemini 3.1 Live. Спрашивайте о стоимости обучения, требованиях и студенческой жизни голосом.',
    speakBtn: 'Голос',
    multimodalVoiceAi: 'Мультимодальный ИИ',
    geminiLiveVoice: 'Голос Gemini Live',
    calcTuitionBtn: 'Рассчитать Учебу и Проживание',
    admissionsInsight: 'Обзор Поступления',
    degreeProgramsCount: '120+ Учебных Программ',
    automaticScholarship: '50% Авто-Стипендия',
    quickVoiceQueries: 'Примеры Вопросов',
    mediterraneanHub: 'Средиземноморский Центр Образования',
    sunnyDays: '300+ Солнечных Дней в Году',

    // University Overview
    uniSubtitle: 'АКАДЕМИЧЕСКИЕ ИНСТИТУТЫ',
    uniTitle: 'Аккредитованные Университеты Северного Кипра',
    uniDesc: 'Узнайте о ведущих государственных и частных университетах с обучением на 100% английском языке, международной аккредитацией (ABET, AACSB, ASIIN) и скидкой 50%.',
    allCities: 'Все Города',
    totalStudentsLabel: 'Всего Студентов',
    intlRatioLabel: 'Доля Иностранцев',
    accreditationsLabel: 'Аккредитации и Членство',
    askAiVoiceBtn: 'Спросить ИИ',
    exploreCoursesBtn: 'Программы',

    // Course Explorer
    courseSubtitle: 'ПОИСК ПРОГРАММ И СТОИМОСТЬ',
    courseTitle: 'Академические Степени и Стоимость',
    courseDesc: 'Ищите программы бакалавриата и магистратуры. Иностранные студенты автоматически получают скидку 50% при зачислении.',
    searchPlaceholder: 'Поиск программ (напр. Компьютерная инженерия, Медицина...)',
    allUnisOption: 'Все Университеты',
    allDegreesOption: 'Все Уровни',
    noCoursesFoundMsg: 'Программы по вашему запросу не найдены.',
    featuredBadge: 'Популярное',
    yearsDurationText: 'Лет Обучения',
    mediumLanguageText: 'Язык Обучения',
    standardTuitionText: 'Стандартная Стоимость:',
    netTuitionText: 'Стоимость со Скидкой 50%:',
    entryRequirementsText: 'Требования к Поступлению:',
    askAboutCourseBtn: 'Спросить ИИ про:',

    // Fee Calculator
    calcSubtitle: 'ФИНАНСОВОЕ ПЛАНИРОВАНИЕ',
    calcTitle: 'Калькулятор Учебы и Проживания',
    calcDesc: 'Рассчитайте точные финансовые расходы на первый год: выберите университет, процент скидки, проживание в общежитии и план питания.',
    step1UniLabel: '1. Выберите Университет',
    step2CourseLabel: '2. Выберите Программу',
    step3ScholarshipLabel: '3. Уровень Скидки на Обучение',
    step4DormLabel: '4. Вариант Общежития',
    includeMealPlanLabel: 'Включить План Питания',
    mealPlanDescText: '3-разовое питание в столовой университета ($1,400/год)',
    officialQuoteTitle: 'Официальный Расчет',
    waiverActiveText: 'Скидка Активна',
    dormAccText: 'Проживание в Общежитии:',
    healthInsText: 'Студенческая Страховка ТРСК:',
    regTaxText: 'Регистрационный Взнос:',
    totalFirstYearText: 'Итого за Первый Год:',
    semesterPaymentText: 'Оплата по Семестрам (2 части):',
    guaranteedBankText: 'Прямая Оплата на Официальный Счет Университета',
    copyQuoteBtn: 'Скопировать Расчет Затрат',
    copiedQuoteBtn: 'Расчет Скопирован в Буфер!',

    // Visa & Living Guide
    guideSubtitle: 'СТУДЕНЧЕСКИЙ ПРОТОКОЛ И ПЕРЕЕЗД',
    guideTitle: 'Жизнь и Учеба на Северном Кипре',
    guideDesc: 'Северный Кипр (ТРСК) ежегодно принимает более 100 000 иностранных студентов из 130+ стран, предлагая безопасную академическую среду.',
    arrivalProtocolTitle: '1. Прибытие и Входная Виза',
    ercanAirportText: 'Аэропорт Эрджан (ECN): Рейсы с пересадкой в Стамбуле или Анкаре.',
    noAdvanceVisaText: 'Виза Заранее не Нужна: Предъявите официальное приглашение на границе для получения визы на 30-90 дней.',
    studentResidencyText: 'Студенческий ВНЖ: Оформляется онлайн через портал МВД после регистрации в ВУЗе.',
    housingDormsTitle: '2. Проживание и Общежития',
    campusDormsText: 'Общежития Кампуса ($1,500 - $3,500/год): Комнаты с кондиционером, скоростным интернетом и охраной.',
    offCampusApartmentsText: 'Квартиры в Городе ($250 - $450/мес): Аренда комнат в Фамагусте, Кирении или Никосии.',
    allInclusivePackagesText: 'Пакеты "Все Включено": CIU и NEU предлагают обучение + проживание + 3-разовое питание.',
    monthlyLivingTitle: '3. Ежемесячные Расходы',
    groceriesText: 'Продукты и Питание: $180 - $250 / мес',
    transportText: 'Транспорт: Бесплатные Университетские Автобусы',
    dataMobileText: 'Связь и Мобильный Интернет: $40 - $70 / мес',
    partTimeJobTitle: '4. Подработка для Студентов',
    partTimeJobText: 'Иностранные студенты имеют право официально работать до 20 часов в неделю во время семестра и полный день на каникулах.',
    islandSafetyTitle: '5. Жизнь на Острове и Безопасность',
    islandSafetyText: 'Более 300 солнечных дней в году, замки ЮНЕСКО и один из самых низких уровней преступности в Европе.',
    freeTransitTitle: '6. Бесплатный Транспорт',
    freeTransitText: 'Все главные университеты (EMU, NEU, CIU, GAU) предоставляют бесплатные шаттлы каждые 15-30 минут.',

    // Chat Assistant
    chatSubtitle: 'КОНСУЛЬТАЦИОННЫЙ ПОРТАЛ',
    chatTitle: 'Академический ИИ-Советник',
    chatDesc: 'Работает на Gemini 2.5 Flash с озвучкой в реальном времени. Задавайте вопросы о программах, ценах и визах.',
    advisorActiveText: 'Советник по Приему Активен',
    voicePersonaLabel: 'Голос Советника:',
    userLabel: 'Вы',
    advisorLabel: 'Консультант по Приему',
    listenWithVoiceBtn: 'Озвучить Голосом Gemini',
    stopSpeechBtn: 'Остановить Речь',
    generatingVoiceBtn: 'Генерация Голоса...',
    typeInquiryPlaceholder: 'Задайте вопрос о программах, стоимости или проживании...',
    switchToVoiceRoomBtn: 'Перейти в Голосовой Чат',

    englishLabel: 'English',
    turkishLabel: 'Türkçe',
    russianLabel: 'Русский',
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const value = {
    language,
    setLanguage,
    t: translations[language],
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
