import React from 'react';
import { useTranslation } from 'react-i18next';

const CreatePost = () => {
  const { t } = useTranslation();

  return (
    <div>{t('createPost')}</div>
  );
};

export default CreatePost;
