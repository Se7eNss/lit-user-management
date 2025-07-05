import en from '../locales/en';
import tr from '../locales/tr';

const messages = {en, tr};

export const localeLang = 'locale_lang';

const getPreferredLocale = () => {
  const storedLang = localStorage.getItem(localeLang);
  if (storedLang && (storedLang === 'tr' || storedLang === 'en')) {
    return storedLang;
  }

  const htmlLang = document.documentElement.lang.toLowerCase();
  if (htmlLang === 'tr' || htmlLang === 'en') {
    return htmlLang;
  }

  return 'en';
};

let currentLocale = getPreferredLocale();

export const t = (key, variable) => {
  let translation = messages[currentLocale][key] ?? key;

  if (typeof variable === 'string' || typeof variable === 'number') {
    translation = translation.replace('#', variable);
  }
  return translation;
};

export const setLocale = (locale) => {
  currentLocale = locale;
  localStorage.setItem(localeLang, locale);
  window.dispatchEvent(new CustomEvent('locale-changed'));
};
