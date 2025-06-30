import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HeaderWithSidebar from './HeaderWithSidebar';
import Footer from './Footer';
import Home from '../../pages/Home';
import PostDetail from '../../pages/PostDetail';
import CreatePost from '../../pages/CreatePost';

export default function Layout() {
  return (
    <>
      <HeaderWithSidebar />
      <main style={{ minHeight: '80vh' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post/:id" element={<PostDetail />} />
          <Route path="/create" element={<CreatePost />} />
          {/* thêm các route khác ở đây */}
        </Routes>
      </main>
      <Footer />
    </>
  );
}
