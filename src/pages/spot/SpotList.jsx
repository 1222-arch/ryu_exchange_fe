import React, { useEffect, useState } from 'react';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../services/firebase';
import { useAuth } from 'src/contexts/AuthContext';
import { useTranslation } from 'react-i18next';

const SpotList = () => {
  const { t } = useTranslation();
  const [posts, setPosts] = useState([]);
  const { user } = useAuth();

  const adminEmails = import.meta.env.VITE_ADMIN_EMAILS
  ? import.meta.env.VITE_ADMIN_EMAILS.split(',')
  : [];

const isAdmin = user?.email && adminEmails.includes(user.email);

  const [expandedPostId, setExpandedPostId] = useState(null);

  const fetchPosts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'spotPosts'));
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(data);
    } catch (error) {
      console.error('Error retrieving spot posts:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const postRef = doc(db, 'spotPosts', id);
      await updateDoc(postRef, { status: newStatus });
      setPosts(prev =>
        prev.map(post =>
          post.id === id ? { ...post, status: newStatus } : post
        )
      );
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleLike = async (postId, alreadyLiked) => {
    if (!user) return;
    const postRef = doc(db, 'spotPosts', postId);
    const post = posts.find(p => p.id === postId);
    const currentLikes = post.likes || [];

    const updatedLikes = alreadyLiked
      ? currentLikes.filter(email => email !== user.email)
      : [...currentLikes, user.email];

    await updateDoc(postRef, { likes: updatedLikes });

    setPosts(prev =>
      prev.map(p => (p.id === postId ? { ...p, likes: updatedLikes } : p))
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">{t('spotPosts')}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts
          .filter(post => isAdmin || post.status === 'approved')
          .map(post => {
            const isExpanded = post.id === expandedPostId;

            return (
              <div
                key={post.id}
                className={`bg-white rounded-lg shadow p-4 cursor-pointer transition-transform duration-300 ease-in-out ${
                  isExpanded ? 'scale-115 shadow-xl relative z-10' : ''
                }`}
                onClick={() => setExpandedPostId(isExpanded ? null : post.id)}
              >
                <h3
                  className={`text-lg font-semibold mb-2 transition-all duration-300 ${
                    isExpanded ? 'text-xl' : ''
                  }`}
                >
                  {post.title}
                </h3>

                {post.images?.length > 0 && (
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {post.images.map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt={`spot-${idx}`}
                        className="h-32 w-full object-cover rounded transition-transform duration-300 ease-in-out"
                        loading="lazy"
                      />
                    ))}
                  </div>
                )}

                <p
                  className={`text-gray-700 whitespace-pre-wrap mb-2 transition-all duration-300 ${
                    isExpanded ? 'text-base' : 'text-sm'
                  }`}
                >
                  {post.contentText}
                </p>

                <div className="mb-2">
                  {/* <strong>{t('status')}:</strong>{' '} */}
                  <span
                    className={`font-bold ${
                      post.status === 'approved'
                        ? 'text-green-600'
                        : post.status === 'declined'
                        ? 'text-red-600'
                        : 'text-yellow-500'
                    }`}
                  >
                    {post.status === 'approved'
                      ? t('statusApproved')
                      : post.status === 'declined'
                      ? t('decline')
                      : t('pending')  }
                  </span>
                 
                </div>

                {user && (
                  <>
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        handleLike(post.id, post.likes?.includes(user.email));
                      }}
                      className={`px-3 py-1 rounded ${
                        post.likes?.includes(user.email)
                          ? 'bg-red-500 text-white'
                          : 'bg-gray-300 text-black'
                      }`}
                    >
                      {post.likes?.includes(user.email)
                        ? `♥ ${t('liked')}`
                        : `♡ ${t('like')}`}
                    </button>

                    {post.likes?.length > 0 && (
                      <p className="text-sm text-gray-600 mt-1">
                        {post.likes.length} {t('likes')}
                      </p>
                    )}
                  </>
                )}

                {isAdmin && (
                  <div className="flex space-x-2 mt-4">
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        handleUpdateStatus(post.id, 'approved');
                      }}
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded"
                    >
                      {t('approve')}
                    </button>
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        handleUpdateStatus(post.id, 'declined');
                      }}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
                    >
                      {t('decline')}
                    </button>
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default SpotList;
