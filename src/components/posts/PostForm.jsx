 import React, { useState } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../../services/firebase'; // file cấu hình firebase

const PostForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) {
      alert('Please fill in all fields');
      return;
    }

    try {
      await addDoc(collection(db, 'posts'), {
        title,
        content,
        author: 'CurrentUser', // Thay bằng user hiện tại nếu có auth
        createdAt: serverTimestamp(),
      });
      alert('Post created!');
      setTitle('');
      setContent('');
    } catch (error) {
      console.error('Error adding document: ', error);
      alert('Error creating post');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={e => setContent(e.target.value)}
      />
      <button type="submit">Create Post</button>
    </form>
  );
};

export default PostForm;
