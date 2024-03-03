import { useState } from 'react';
import { useTranslation } from 'react-i18next'; // #1
import i18n from './locales/i18n'; // #2. 만약 i18n을 사용하지 않는다면 import './locales/i18n'; 로 import 합니다.

const MyString = () => {
  const { t } = useTranslation(); // #3
  const [isKr, setIsKr] = useState(true); // #4

  const onToggle = () => {
    i18n.changeLanguage(isKr ? 'en' : 'kr'); // #4. 한국어 이면 영어로, 영어이면 한국어로 바꿉니다.
    setIsKr(!isKr);
  };
  return (
    <>
      <button onClick={onToggle}>{`언어 토글`}</button>
      <div>{`${t('idc_File')}, ${t('file.idc_Open')}, ${t('file.idc_Save')}, ${t('idc_Edit')}`}</div>
    </>
  );
};
export default MyString;
