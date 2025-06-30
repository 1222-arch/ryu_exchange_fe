import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const SpotPostForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [contentText, setContentText] = useState('');
  const [imageFiles, setImageFiles] = useState([]);
  const { t } = useTranslation();

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    const combinedFiles = [...imageFiles, ...newFiles].slice(0, 4); // giữ tối đa 4 ảnh
    setImageFiles(combinedFiles);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (contentText.length > 1800) {
      alert(t('contentTooLong', 'Content must not exceed 1800 characters.'));
      return;
    }

    const postData = {
      title,
      contentText,
      createdAt: new Date(),
    };

    onSubmit(postData, imageFiles);

    setTitle('');
    setContentText('');
    setImageFiles([]);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">{t('createSpot')}</h2>

      <label className="block mb-1 font-semibold">{t('title')}</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border px-3 py-2 mb-4 rounded"
        required
      />

      <label className="block mb-1 font-semibold">{t('content')}</label>
      <textarea
        value={contentText}
        onChange={(e) => setContentText(e.target.value)}
        rows={6}
        className="w-full border px-3 py-2 mb-4 rounded"
        maxLength={1800}
        required
      />

      <label className="block mb-1 font-semibold">{t('uploadImages')}</label>
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileChange}
        className="mb-4"
      />

      {imageFiles.length > 0 && (
        <div className="grid grid-cols-2 gap-2 mb-4">
          {imageFiles.map((file, idx) => (
            <img
              key={idx}
              src={URL.createObjectURL(file)}
              alt={`preview-${idx}`}
              className="h-32 object-cover rounded"
            />
          ))}
        </div>
      )}

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {t('submit')}
      </button>
    </form>
  );
};

export default SpotPostForm;
