import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const ExchangePostForm = ({ onSubmit }) => {
  const { t } = useTranslation();
  const [files, setFiles] = useState(null);
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [userName, setUserName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!files || files.length === 0) {
      alert(t('noFile') || "You haven't selected an image!");
      return;
    }
    onSubmit({ price, description, userName }, files);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">{t('createExchange')}</h2>

      <label className="block mb-2 font-medium">{t('uploadPicture')}:</label>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={(e) => setFiles(e.target.files)}
        className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />

      <label className="block mb-2 font-medium">{t('price')}:</label>
      <input
        type="text"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder={t('price') || "For Example: ¥100"}
        className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />

      <label className="block mb-2 font-medium">{t('describe')}:</label>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder={t('detailedDescription')}
        className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows={4}
        required
      />

      <label className="block mb-2 font-medium">{t('postedBy')}:</label>
      <input
        type="text"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        placeholder={t('yourName')}
        className="w-full border border-gray-300 rounded-md px-3 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition"
      >
        {t('submit')}
      </button>
    </form>
  );
};

export default ExchangePostForm;
