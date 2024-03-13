import React from 'react';
import { useLanguageContext } from '../hooks/LanguageContext';

const Tradutor = () => {
  const { isEnglishLanguage, toggleLanguage } = useLanguageContext();

  return (
    <div
      className="d-flex align-items-center"
      style={{ height: '100%' }}
    >
      <img
        src={isEnglishLanguage ? 'usa.png' : 'brasil.png'}
        alt='Flag'
        onClick={toggleLanguage}
        className='rounded'
        style={{ maxWidth: '40px', cursor: 'pointer' }}
      />
    </div>
  );
};

export default Tradutor;
