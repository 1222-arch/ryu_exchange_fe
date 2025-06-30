import React from 'react';
import { Link } from 'react-router-dom';
import formatDate from '../../utils/formatDate';

const PostItem = ({ post }) => {
  return (
    <div className="post-item" style={{ border: '1px solid #ddd', padding: '16px', marginBottom: '12px' }}>
      <h2>{post.title}</h2>
      <p>{post.content.length > 100 ? post.content.slice(0, 100) + '...' : post.content}</p>
      <div style={{ fontSize: '0.9rem', color: '#666' }}>
        <span>Author: {post.author?.name || "Unknown"}</span> | <span>{formatDate(post.createdAt)}</span>
      </div>
      <Link to={`/post/${post.id}`} style={{ color: 'blue', marginTop: '8px', display: 'inline-block' }}>
        See more
      </Link>
    </div>
  );
};

export default PostItem;
