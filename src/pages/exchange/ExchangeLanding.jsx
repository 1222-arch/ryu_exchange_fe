import React from 'react';
import { useNavigate } from 'react-router-dom';
import shelf from '../../assets/vaii.jpg';
import { useTranslation } from 'react-i18next'; // import i18n

const ExchangeLanding = () => {
  const navigate = useNavigate();
  const { t } = useTranslation(); // dùng i18n

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat p-6"
      style={{
        backgroundImage: `url(${shelf})`,
      }}
    >
      <div className="bg-white bg-opacity-80 p-8 rounded-2xl shadow-md max-w-3xl text-center">
        <h1 className="text-3xl font-bold mb-6 text-blue-800">{t('welcome')}</h1>

        <p className="mb-4 text-gray-700 text-xl">
          {t('exchangeInfo')}
        </p>

        <div className="flex gap-4 justify-center">
          <button
            onClick={() => navigate('/exchange/create')}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            {t('startNewPost')}
          </button>

          <button
            onClick={() => navigate('/exchange/view')}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition"
          >
            {t('seeOthers')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExchangeLanding;
