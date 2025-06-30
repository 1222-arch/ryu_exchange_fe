import React from 'react';
import { useTranslation } from 'react-i18next';

const Privacy = () => {
  const { t } = useTranslation();

  const title = t('privacyPolicyTitle');
  const lastUpdated = t('privacyPolicyLastUpdated');
  const content = t('privacyPolicyContent', { returnObjects: true });

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded shadow">
      <h1 className="text-4xl font-bold mb-4">{title}</h1>
      <p className="text-gray-500 mb-6">{lastUpdated}</p>

      <div className="space-y-4 text-lg leading-relaxed">
        {content.map((line, index) => (
          <p key={index}>{line}</p>
        ))}
      </div>
    </div>
  );
};

export default Privacy;
