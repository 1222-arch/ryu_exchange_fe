import React from 'react';
import { useNavigate } from 'react-router-dom';
import ExchangePostForm from './ExchangePostForm';
import { createExchangePost } from 'src/services/postService';
import { uploadImages } from 'src/services/storageService';
import { useAuth } from 'src/contexts/AuthContext';
import { useTranslation } from 'react-i18next'; // import mới

const ExchangeCreate = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { t } = useTranslation(); // dùng i18next

  if (!user) {
    alert(t('needLoginToPost'));
    navigate('/auth');
    return null;
  }

  const handleCreatePost = async (postData, files) => {
    try {
      const imageUrls = await uploadImages(files);

      await createExchangePost({
        ...postData,
        imageUrls,
        userEmail: user.email,
        userId: user.uid,
        status: 'pending',
      });

      alert(t('eventSubmittedSuccess'));
      navigate('/exchange/view');
    } catch (error) {
      console.error('Error submitting the post:', error);
      alert(t('errorPosting'));
    }
  };

  return <ExchangePostForm onSubmit={handleCreatePost} />;
};

export default ExchangeCreate;
