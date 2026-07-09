import React, { Suspense, lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

// 🧩 Layout
import Layout from '../components/layout/Layout'
import Loader from '../components/common/Loader'

// 📦 Lazy Pages
const Home = lazy(() => import('../pages/home/Home'))
const Services = lazy(() => import('../pages/services/Services'))
const Portfolio = lazy(() => import('../pages/portfolio/Portfolio'))
const Blogs = lazy(() => import('../pages/blog/Blogs'))
const BlogDetail = lazy(() => import('../pages/blog/BlogDetail'))
const Contact = lazy(() => import('../pages/contact/Contact'))
const About = lazy(() => import('../pages/about/About'))


function AppRoutes() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/home" replace />} />
          <Route path="home" element={<Home />} />
          <Route path="services" element={<Services />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="products" element={<Navigate to="/home" replace />} />
          <Route path="product-detail" element={<Navigate to="/home" replace />} />
          <Route path="product-detail/:id" element={<Navigate to="/home" replace />} />
          <Route path="blog" element={<Blogs />} />
          <Route path="blog-detail" element={<BlogDetail />} />
          <Route path="blog-detail/:id" element={<BlogDetail />} />
          <Route path="connect" element={<Contact />} />
          <Route path="about" element={<About />} />
          <Route path="cart" element={<Navigate to="/home" replace />} />
          <Route path="supplier/:brandName" element={<Navigate to="/home" replace />} />
        </Route>
        <Route path="*" element={<h2 style={{ textAlign: 'center', padding: '100px 20px', fontFamily: 'Outfit, sans-serif' }}>404 - Page Not Found</h2>} />
      </Routes>
    </Suspense>
  )
}

export default AppRoutes
