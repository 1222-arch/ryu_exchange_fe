import React, { useState } from 'react';
import { useTranslation } from 'react-i18next'; // ✅ import mới

const EventPostForm = ({ onSubmit }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [files, setFiles] = useState([]);
    const { t } = useTranslation(); // ✅

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        setFiles(prev => {
            const newFiles = [...prev, ...selectedFiles];
            return newFiles.slice(0, 4); // max 4 ảnh
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!files || files.length === 0) {
            alert(t('noFile'));
            return;
        }
        onSubmit({ title, description }, files);
        setTitle('');
        setDescription('');
        setFiles([]);
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-4 bg-white rounded shadow">
            <h2 className="text-xl font-bold mb-4">{t('createEvent')}</h2>

            <label className="block mb-1 font-semibold">{t('title')}</label>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border px-3 py-2 mb-4 rounded"
                required
            />

            <label className="block mb-1 font-semibold">{t('description')}</label>
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={6}
                className="w-full border px-3 py-2 mb-4 rounded"
                required
            />

            <label className="block mb-1 font-semibold">{t('uploadEventImages')}</label>
            <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                className="mb-4"
            />

            {files.length > 0 && (
                <div className="grid grid-cols-2 gap-2 mb-4">
                    {files.map((file, idx) => (
                        <img
                            key={idx}
                            src={URL.createObjectURL(file)}
                            alt={`preview-${idx}`}
                            className="h-32 w-full object-cover rounded"
                        />
                    ))}
                </div>
            )}

            <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
                {t('submit')}
            </button>
        </form>
    );
};

export default EventPostForm;
