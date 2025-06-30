import React from 'react';
import { useNavigate } from 'react-router-dom';
import meooImage from '../../assets/meoo.jpg';
import { useTranslation } from 'react-i18next';

const SpotLanding = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-6 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${meooImage})`,
      }}
    >
      <div className="bg-white bg-opacity-80 p-8 rounded-2xl shadow-md text-center">
        <h1 className="text-4xl font-bold text-blue-800 mb-6">{t('spotWelcome')}</h1>
        <p className="font-semibold text-lg text-blue-700 mb-6 max-w-xl">
          {t('spotIntro')}
        </p>
        <div className="space-x-4">
          <button
            onClick={() => navigate('/spot/create')}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl shadow hover:bg-blue-700 transition"
          >
            {t('createSpot')}
          </button>
          <button
            onClick={() => navigate('/spot/view')}
            className="bg-gray-600 text-white px-6 py-3 rounded-xl shadow hover:bg-gray-700 transition"
          >
            {t('seeAllPosts')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpotLanding;
