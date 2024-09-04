import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './en/string.json'; // 영어 사전
import ko from './ko/string.json'; // 한국어 사전

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en }, // #1. 영어 일때는 ./en/string.json 사용
    ko: { translation: ko }, // #1. 한국어 일때는 ./ko/string.json 사용
  },
  lng: 'ko', // 기본 언어는 ko을 사용합니다.
  fallbackLng: 'en', // 언어 사전이 없는 경우 en을 사용합니다.
  interpolation: { escapeValue: false }, // HTML 태그를 지원합니다.
});

export default i18n;