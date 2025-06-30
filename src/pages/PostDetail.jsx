import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from "../services/firebase";
import { useTranslation } from 'react-i18next';

const PostDetail = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const docRef = doc(db, 'posts', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setPost(docSnap.data());
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchPost();
  }, [id]);

  if (!post) return <p>{t('loading') || 'Loading...'}</p>;

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <p>
        <strong>{t('author') || 'Author:'}</strong> {post.author || t('unknown') || 'Unknown'}
      </p>
    </div>
  );
};

export default PostDetail;
