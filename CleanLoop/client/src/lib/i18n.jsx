// Lightweight translations for the citizen and worker apps.
// Add a language by adding a new key with the same entries.
import { createContext, useContext, useEffect, useState } from 'react';

const DICT = {
  en: {
    home: 'Home', map: 'Map', report: 'Report', rewards: 'Rewards', profile: 'Profile', jobs: 'Jobs', route: 'Route', earnings: 'Earnings',
    hello: 'Hello', reportGarbage: 'Report garbage', reportDumping: 'Report dumping', segregationCoach: 'Which bin?', bookPickup: 'Doorstep pickup',
    cleanupDrives: 'Cleanup drives', govServices: 'City services', yourImpact: 'Your impact', removed: 'removed', co2Saved: 'CO₂ saved',
    points: 'points', myReports: 'My reports', seeAll: 'See all', online: 'Online', offline: 'Offline', goOnline: 'Go online',
    claim: 'Claim job', nearby: 'Nearby', active: 'Active', history: 'History', wallet: 'Wallet', badges: 'Badges', leaderboard: 'Leaderboard',
    redeem: 'Redeem', language: 'Language', logout: 'Sign out', notifications: 'Notifications', confirmCleanup: 'Confirm cleanup',
    takePhoto: 'Take photo', retake: 'Retake', submit: 'Submit report', analysing: 'AI is analysing the photo', sos: 'SOS',
  },
  ta: {
    home: 'முகப்பு', map: 'வரைபடம்', report: 'புகார்', rewards: 'பரிசுகள்', profile: 'சுயவிவரம்', jobs: 'வேலைகள்', route: 'பாதை', earnings: 'வருமானம்',
    hello: 'வணக்கம்', reportGarbage: 'குப்பையைப் புகாரளி', reportDumping: 'சட்டவிரோதக் கொட்டல்', segregationCoach: 'எந்தத் தொட்டி?', bookPickup: 'வீட்டு சேகரிப்பு',
    cleanupDrives: 'சுத்தம் இயக்கங்கள்', govServices: 'நகர சேவைகள்', yourImpact: 'உங்கள் பங்களிப்பு', removed: 'அகற்றப்பட்டது', co2Saved: 'CO₂ சேமிப்பு',
    points: 'புள்ளிகள்', myReports: 'என் புகார்கள்', seeAll: 'அனைத்தும்', online: 'ஆன்லைன்', offline: 'ஆஃப்லைன்', goOnline: 'ஆன்லைன் செல்',
    claim: 'வேலையை ஏற்கவும்', nearby: 'அருகில்', active: 'நடப்பு', history: 'வரலாறு', wallet: 'பணப்பை', badges: 'பதக்கங்கள்', leaderboard: 'தரவரிசை',
    redeem: 'பெறுக', language: 'மொழி', logout: 'வெளியேறு', notifications: 'அறிவிப்புகள்', confirmCleanup: 'சுத்தத்தை உறுதிசெய்',
    takePhoto: 'புகைப்படம் எடு', retake: 'மீண்டும் எடு', submit: 'புகாரைச் சமர்ப்பி', analysing: 'AI புகைப்படத்தை ஆய்வு செய்கிறது', sos: 'அவசரம்',
  },
  hi: {
    home: 'होम', map: 'नक्शा', report: 'रिपोर्ट', rewards: 'इनाम', profile: 'प्रोफ़ाइल', jobs: 'काम', route: 'रास्ता', earnings: 'कमाई',
    hello: 'नमस्ते', reportGarbage: 'कचरा रिपोर्ट करें', reportDumping: 'अवैध डंपिंग', segregationCoach: 'कौन सा डिब्बा?', bookPickup: 'घर से पिकअप',
    cleanupDrives: 'सफ़ाई अभियान', govServices: 'नगर सेवाएँ', yourImpact: 'आपका योगदान', removed: 'हटाया गया', co2Saved: 'CO₂ बचाया',
    points: 'अंक', myReports: 'मेरी रिपोर्ट', seeAll: 'सभी देखें', online: 'ऑनलाइन', offline: 'ऑफ़लाइन', goOnline: 'ऑनलाइन जाएँ',
    claim: 'काम लें', nearby: 'पास में', active: 'चालू', history: 'इतिहास', wallet: 'वॉलेट', badges: 'बैज', leaderboard: 'लीडरबोर्ड',
    redeem: 'भुनाएँ', language: 'भाषा', logout: 'साइन आउट', notifications: 'सूचनाएँ', confirmCleanup: 'सफ़ाई की पुष्टि करें',
    takePhoto: 'फ़ोटो लें', retake: 'फिर से लें', submit: 'रिपोर्ट भेजें', analysing: 'AI फ़ोटो जाँच रहा है', sos: 'SOS',
  },
};
export const LANGUAGES = [{ id: 'en', label: 'English' }, { id: 'ta', label: 'தமிழ்' }, { id: 'hi', label: 'हिन्दी' }];

const I18nCtx = createContext({ t: (k) => k, lang: 'en', setLang: () => {} });

export function I18nProvider({ children }) {
  const [lang, setLangState] = useState(() => { try { return localStorage.getItem('cleanloop.lang') || 'en'; } catch { return 'en'; } });
  const setLang = (l) => { setLangState(l); try { localStorage.setItem('cleanloop.lang', l); } catch { /* ignore */ } };
  useEffect(() => { document.documentElement.lang = lang; }, [lang]);
  const t = (k) => DICT[lang]?.[k] || DICT.en[k] || k;
  return <I18nCtx.Provider value={{ t, lang, setLang }}>{children}</I18nCtx.Provider>;
}

export const useI18n = () => useContext(I18nCtx);
