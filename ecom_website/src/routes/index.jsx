import React, { Suspense, lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

// 🧩 Layout
import Layout from '../components/layout/Layout'
import Loader from '../components/common/Loader'

// 📦 Lazy Pages
const Home = lazy(() => import('../pages/home/Home'))
const Products = lazy(() => import('../pages/products/Products'))
const ProductDetail = lazy(() => import('../pages/products/ProductDetail'))
const Brands = lazy(() => import('../pages/brands/Brands'))
const BlogList = lazy(() => import('../pages/blog/BlogList'))
const BlogDetail = lazy(() => import('../pages/blog/BlogDetail'))
const Enquiry = lazy(() => import('../pages/enquiry/Enquiry'))
const Contact = lazy(() => import('../pages/contact/Contact'))
const About = lazy(() => import('../pages/about/About'))

// 🔐 Protected Route (simple version)
const ProtectedRoute = ({ children }) => {
  const auth = JSON.parse(localStorage.getItem('appState'))
  const isLoggedIn = auth?.auth?.isLoggedIn

  return isLoggedIn ? children : <Navigate to="/login" replace />
}

function AppRoutes() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/home" replace />} />
          <Route path="home" element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="product-detail" element={<ProductDetail />} />
          <Route path="product-detail/:id" element={<ProductDetail />} />
          <Route path="brands" element={<Brands />} />
          <Route path="blog" element={<BlogList />} />
          <Route path="blog-detail" element={<BlogDetail />} />
          <Route path="blog-detail/:id" element={<BlogDetail />} />
          <Route path="enquiry" element={<Enquiry />} />
          <Route path="connect" element={<Contact />} />
          <Route path="about" element={<About />} />
        </Route>
        <Route path="*" element={<h2 style={{ textAlign: 'center', padding: '100px 20px', fontFamily: 'Outfit, sans-serif' }}>404 - Page Not Found</h2>} />
      </Routes>
    </Suspense>
  )
}

export default AppRoutes
