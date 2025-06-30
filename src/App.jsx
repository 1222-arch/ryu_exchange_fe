import React from 'react'
import HeaderWithSidebar from './components/layout/HeaderWithSidebar'
import Footer from './components/layout/Footer'
import { AuthProvider } from './contexts/AuthContext'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home'
import Login from './pages/Login'
import PostDetail from './pages/PostDetail';
import CreatePost from './pages/CreatePost';
import Authentication from './routes/Authentication';
import EventPage from './pages/EventPage';
import ExchangeLanding from './pages/exchange/ExchangeLanding';
import ExchangePostForm from './pages/exchange/ExchangePostForm';
import ExchangeCreate from './pages/exchange/ExchangeCreate';
import ExchangeList from './pages/exchange/ExchangeList';
import SpotLanding from './pages/spot/SpotLanding';
import SpotList from './pages/spot/SpotList';
import SpotCreate from './pages/spot/SpotCreate';
import EventLanding from './pages/event/EventLanding';
import EventCreate from './pages/event/EventCreate';
import EventList from './pages/event/EventList';
import Terms from './pages/Terms';
 import PrivacyPolicy from './pages/PrivacyPolicy';


  const App = () => {
  return (
    
      <AuthProvider>
        <Router>
      <HeaderWithSidebar/>
      <Routes>
         <Route path="/" element={<Home/>}  />
         <Route  path="/login" element={<Login/>} />
         <Route path="/post/:id" element={<PostDetail/>}/>
         <Route path="/create-post" element={<CreatePost/>}/>
          <Route path='/auth' element={<Authentication/>}/>
           
           <Route path="/exchange" element={<ExchangeLanding />} />
          <Route path="/exchange/create" element={<ExchangeCreate />} />
          <Route path="/exchange/view" element={<ExchangeList />} />

          
          <Route path="/spot" element={<SpotLanding />} /> 
          <Route path="/spot/create" element={<SpotCreate />} /> 
          <Route path="/spot/view" element={<SpotList />} /> 

          <Route path='event'   element={<EventLanding />} />
            <Route path='event/create'   element={<EventCreate />}/>
              <Route path='event/view'   element={<EventList />}/>
  
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
           
       
      
      </Routes>
      

      <Footer/>

      </Router>

      </AuthProvider>
     
  )
}

export default App