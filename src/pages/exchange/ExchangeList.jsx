import React, { useEffect, useState, useCallback } from 'react';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../services/firebase';
import { useAuth } from 'src/contexts/AuthContext';
import { useTranslation } from 'react-i18next';

const ExchangeList = () => {
  const [posts, setPosts] = useState([]);
  const { user } = useAuth();
  const { t } = useTranslation();

  // State quản lý post đang được mở rộng
  const [expandedPostId, setExpandedPostId] = useState(null);

  // State loading/error khi like/unlike
  const [loadingLike, setLoadingLike] = useState(false);
  const [errorLike, setErrorLike] = useState(null);
  const adminEmails = import.meta.env.VITE_ADMIN_EMAILS
  ? import.meta.env.VITE_ADMIN_EMAILS.split(',')
  : [];

const isAdmin = user?.email && adminEmails.includes(user.email);


  // Lấy danh sách bài đăng
  const fetchPosts = useCallback(async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'exchangePosts'));
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  // Toggle mở rộng bài viết
  const toggleExpand = useCallback((postId) => {
    setExpandedPostId(prev => (prev === postId ? null : postId));
  }, []);

  // Xử lý like/unlike với loading và bắt lỗi
  const handleLike = useCallback(async (postId, alreadyLiked) => {
    if (!user) return;
    setLoadingLike(true);
    setErrorLike(null);

    try {
      const postRef = doc(db, 'exchangePosts', postId);
      const post = posts.find(p => p.id === postId);
      const currentLikes = post.likes || [];

      const updatedLikes = alreadyLiked
        ? currentLikes.filter(email => email !== user.email)
        : [...currentLikes, user.email];

      await updateDoc(postRef, { likes: updatedLikes });

      // Cập nhật state local
      setPosts(prev =>
        prev.map(p => (p.id === postId ? { ...p, likes: updatedLikes } : p))
      );
    } catch (error) {
      console.error('Error updating likes:', error);
      setErrorLike(t('errorPosting') || 'Something went wrong when liking the post. Please try again.');
    } finally {
      setLoadingLike(false);
    }
  }, [posts, user, t]);

  // Cập nhật trạng thái bài viết (approve/decline)
  const handleUpdateStatus = useCallback(async (id, newStatus) => {
    try {
      const postRef = doc(db, 'exchangePosts', id);
      await updateDoc(postRef, { status: newStatus });
      setPosts(prev =>
        prev.map(post =>
          post.id === id ? { ...post, status: newStatus } : post
        )
      );
    } catch (error) {
      console.error('Error updating status:', error);
    }
  }, []);

 

  return (
    <div className="max-w-6xl mx-auto p-6">
      {errorLike && (
        <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">
          {errorLike}
        </div>
      )}

      <h2 className="text-2xl font-bold mb-6 text-center">{t('exchangePosts')}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts
          .filter(post => isAdmin || post.status === 'approved')
          .map(post => {
            const isExpanded = post.id === expandedPostId;

            return (
              <div
                key={post.id}
                className={`bg-white rounded-lg shadow p-4 cursor-pointer transition-all duration-300 ${
                  isExpanded ? 'scale-105 shadow-xl' : ''
                }`}
                onClick={() => toggleExpand(post.id)}
              >
                <img
                  src={post.imageUrls?.[0]}
                  alt="Exchange item"
                  className="w-full rounded-md mb-4"
                />
                <div className="mb-2"><strong>{t('postedBy')}:</strong> {post.userName}</div>
                <div className="mb-2"><strong>{t('price')}:</strong> {post.price}</div>
                <div className="mb-2">
                  <strong>{t('description')}:</strong>
                  <p
                    className="text-gray-700 transition-all duration-300"
                    style={{
                      fontSize: isExpanded ? '18px' : '15px',
                      lineHeight: isExpanded ? '1.6' : '1.3',
                      maxHeight: isExpanded ? 'none' : '100px',
                      overflow: isExpanded ? 'visible' : 'hidden',
                    }}
                  >
                    {post.description}
                  </p>
                </div>
                <div className="mb-2">
                  <strong>{t('status')}:</strong>
                  <span
                    className={`font-bold ml-2 ${
                      post.status === 'approved'
                        ? 'text-green-600'
                        : post.status === 'declined'
                        ? 'text-red-600'
                        : 'text-yellow-500'
                    }`}
                  >
                    {post.status}
                  </span>
                </div>

                {user && (
                  <>
                    <button
                      disabled={loadingLike}
                      onClick={e => {
                        e.stopPropagation();
                        handleLike(post.id, post.likes?.includes(user.email));
                      }}
                      className={`px-3 py-1 rounded ${
                        post.likes?.includes(user.email)
                          ? 'bg-red-500 text-white'
                          : 'bg-gray-300 text-black'
                      } ${loadingLike ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      {post.likes?.includes(user.email) ? `♥ ${t('liked')}` : `♡ ${t('like')}`}
                    </button>

                    {post.likes?.length > 0 && (
                      <p className="text-sm text-gray-600 mt-1">
                        {post.likes.length} {t('likes')}
                      </p>
                    )}
                  </>
                )}

                {post.userEmail && post.userEmail !== user?.email && (
                  <a
                    href={`mailto:${post.userEmail}?subject=Interested in the item on RyuExchange`}
                    className="ml-2 inline-block bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                    onClick={e => e.stopPropagation()}
                  >
                    {t('contactPoster')}
                  </a>
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

export default ExchangeList;
