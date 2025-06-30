import React from 'react';
import { useNavigate } from 'react-router-dom';
import SpotPostForm from './SpotPostForm';
import { createSpotPost } from 'src/services/spotService';
import { uploadImages } from 'src/services/storageService';
import { useAuth } from 'src/contexts/AuthContext';
import { useTranslation } from 'react-i18next';

const SpotCreate = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { t } = useTranslation();

  if (!user) {
    alert(t('needLoginToPost'));
    navigate('/auth');
    return null;
  }

  const handleCreatePost = async (postData, files) => {
    try {
      const imageUrls = await uploadImages(files);

      await createSpotPost({
        ...postData,
        images: imageUrls,
        userEmail: user.email,
        userId: user.uid,
        status: 'pending',
      });

      alert(t('eventSubmittedSuccess'));
      navigate('/spot/view');
    } catch (err) {
      console.error('Error submitting the post:', err);
      alert(t('errorPosting'));
    }
  };

  return <SpotPostForm onSubmit={handleCreatePost} />;
};

export default SpotCreate;
