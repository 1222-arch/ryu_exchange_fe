import React from 'react';
import { useNavigate } from 'react-router-dom';
import EventPostForm from './EventPostForm';
import { createEventPost } from 'src/services/eventService';
import { uploadImages } from 'src/services/storageService';
import { useAuth } from 'src/contexts/AuthContext';
import { useTranslation } from 'react-i18next'; 

const EventCreate = () => {
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
      const imageUrls = await uploadImages(files, 'eventImages');

      await createEventPost({
        ...postData,
        imageUrls,
        userEmail: user.email,
        userId: user.uid,
        status: 'pending',
      });

      alert(t('eventSubmittedSuccess'));  
      navigate('/event/view');
    } catch (error) {
      console.error('Error submitting the event:', error);
      alert(t('errorPosting'));  
    }
  };

  return <EventPostForm onSubmit={handleCreatePost} />;
};

export default EventCreate;
