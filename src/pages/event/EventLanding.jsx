import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import xinh_vl from '../../assets/xinh_vl.png';

const EventLanding = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center p-6"
      style={{ backgroundImage: `url(${xinh_vl})` }}
    >
      <h1 className="text-4xl font-bold text-white mb-6 drop-shadow-lg">{t('eventCenter')}</h1>
      <div className="space-x-4">
        <button
          onClick={() => navigate('/event/create')}
          className="bg-green-700 text-white px-6 py-3 rounded-xl shadow hover:bg-green-700 transition"
        >
          {t('shareSomething')}
        </button>
        <button
          onClick={() => navigate('/event/view')}
          className="bg-gray-800 text-white px-6 py-3 rounded-xl shadow hover:bg-gray-900 transition"
        >
          {t('seeOthers')}
        </button>
      </div>
    </div>
  );
};

export default EventLanding;
