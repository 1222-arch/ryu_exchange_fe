import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../services/firebase';
import { Link } from 'react-router-dom';
import water_bg from '../assets/water_bg.jpg';
import sunset from '../assets/sunset.jpeg';  
import spring from '../assets/spring.jpeg';
import TOU from '../assets/t1.jpg';
 import PP from '../assets/PP.jpg'
import { useTranslation } from 'react-i18next';  // đổi thành react-i18next

const Home = () => {
  const { t } = useTranslation();  // dùng hook i18next

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsCollection = collection(db, 'posts');
        const q = query(postsCollection, orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);
        const postsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(postsData);
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="w-full min-h-screen">
      {/* Section 1: Welcome */}
      <div className="relative w-full h-screen">
        <img
          src={water_bg}
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover -z-10"
        />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4">
          <h1 className="text-5xl font-bold mb-6 drop-shadow-lg">{t('welcome')}</h1>
          <Link to="/auth">
            {/* Nút hoặc link đăng nhập nếu cần */}
          </Link>
        </div>
      </div>

      {/* Section 2: What is RyuExChange */}
      <div className="bg-white text-gray-800 px-6 py-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center ">
          {/* Text content */}
          <div className="h-full flex self-stretch">
            <div>
              <h2 className="text-5xl font-bold mb-4" style={{ fontFamily: 'Roboto' }}>
                {t('whatIs')}
              </h2>
              <p className="text-2xl leading-relaxed" style={{ fontFamily: 'Roboto' }}>
                {t('description1')}
              </p>
            </div>
          </div>
          {/* Image */}
          <div>
            <img
              src={sunset}
              alt="Intro"
              className="rounded-lg shadow-lg w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>

      {/* How to use */}
      <div className="bg-white text-gray-800 px-6 py-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center ">
          {/* Image */}
          <div>
            <img
              src={spring}
              alt="Intro"
              className="rounded-lg shadow-lg w-full h-auto object-cover"
            />
          </div>
          {/* Text content */}
          <div className="h-full flex self-stretch">
            <div>
              <h2 className="text-5xl font-bold mb-4" style={{ fontFamily: 'Roboto' }}>
                {t('howToUse')}
              </h2>
              <p className="text-2xl leading-relaxed" style={{ fontFamily: 'Roboto' }}>
                {t('step1')}<br />
                {t('step2')}<br />
                {t('step3')}<br />
                {t('step4')}
              </p>
            </div>
          </div>
        </div>
      </div>

        {/* Section: Terms of Use Preview */}
<div className="bg-white text-gray-800 px-6 py-16">
  <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
    
    {/* Text content */}
    <div className="h-full flex self-stretch">
      <div>
        <h2 className="text-5xl font-bold mb-4" style={{ fontFamily: 'Roboto' }}>
          {t('termsOfUseTitle', 'Terms of Use')}
        </h2>
        <p className="text-2xl leading-relaxed mb-4" style={{ fontFamily: 'Roboto' }}>
          {t('termsPreview', 'By using RyuExChange, you agree to basic guidelines such as being respectful, posting responsibly, and following our content rules.')}
        </p>
        <Link
          to="/terms"
          className="text-blue-600 font-semibold hover:underline text-xl"
        >
          {t('seeMore', 'See more')}
        </Link>
      </div>
    </div>

    {/* Image */}
    <div>
      <img
        src={TOU}  
        alt="Terms"
        className="rounded-lg shadow-lg w-full h-auto object-cover"
      />
    </div>

  </div>
</div>

    {/* Section: Privacy Policy */}
<div className="bg-white text-gray-800 px-6 py-16">
  <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

    {/* Image */}
    <div>
      <img
        src={PP}  
        alt="Privacy"
        className="rounded-lg shadow-lg w-full h-auto object-cover"
      />
    </div>

    {/* Text content */}
    <div className="h-full flex self-stretch">
      <div>
        <h2 className="text-5xl font-bold mb-4" style={{ fontFamily: 'Roboto' }}>
          {t('privacyPolicyTitle', 'Privacy Policy')}
        </h2>
        <p className="text-2xl leading-relaxed mb-4" style={{ fontFamily: 'Roboto' }}>
          {t('privacyPreview', 'We take your privacy seriously. RyuExChange collects minimal user data and uses it solely for improving user experience. We do not share personal information without consent.')}
        </p>
        <Link
          to="/privacy-policy"
          className="text-blue-600 font-semibold hover:underline text-xl"
        >
          {t('seeMore', 'See more')}
        </Link>
      </div>
    </div>

  </div>
</div>



    </div>
  );
};

export default Home;
