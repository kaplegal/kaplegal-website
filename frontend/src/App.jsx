import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AppLayout from './components/layout/AppLayout'
import Home from './components/pages/Home'
import Blogs from './components/pages/Blogs'
import BlogPost from './components/pages/BlogPost'
import OurApproach from './components/pages/OurApproach'
import PrivacyPolicy from './components/pages/PrivacyPolicy'

// Admin components
import AdminDashboard from './components/admin/AdminDashboard'
import AdminTestimonials from './components/admin/AdminTestimonials'
import AdminBlogs from './components/admin/AdminBlogs'
import AdminContacts from './components/admin/AdminContacts'
import AdminLogin from './components/admin/AdminLogin'
import ProtectedRoute from './components/admin/ProtectedRoute'
import ChangePasskey from './components/admin/ChangePasskey'

import './styles/theme.css'
import './styles/responsive.css'
import './styles/button-animation.css'
import './App.css'

function App() {
  return (
    <Router>
      <div className="app">
        <AppLayout>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blogs/:id" element={<BlogPost />} />
            <Route path="/blogs/slug/:slug" element={<BlogPost />} />
            <Route path="/our-approach" element={<OurApproach />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            
            {/* Admin Login Route */}
            <Route path="/admin/login" element={<AdminLogin />} />
            
            {/* Protected Admin Routes */}
            <Route path="/admin" element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin/testimonials" element={
              <ProtectedRoute>
                <AdminTestimonials />
              </ProtectedRoute>
            } />
            <Route path="/admin/blogs" element={
              <ProtectedRoute>
                <AdminBlogs />
              </ProtectedRoute>
            } />
            <Route path="/admin/contacts" element={
              <ProtectedRoute>
                <AdminContacts />
              </ProtectedRoute>
            } />
            <Route path="/admin/change-passkey" element={
              <ProtectedRoute>
                <ChangePasskey />
              </ProtectedRoute>
            } />
          </Routes>
        </AppLayout>
      </div>
    </Router>
  )
}

export default App
