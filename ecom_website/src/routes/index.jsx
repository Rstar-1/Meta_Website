import React, { Suspense, lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

// 🧩 Layout
import Layout from '../components/layout/Layout'
import Loader from '../components/common/Loader'

// 📦 Lazy Pages
const Home = lazy(() => import('../pages/home/Home'))
const Products = lazy(() => import('../pages/products/Products'))
const ProductDetail = lazy(() => import('../pages/products/ProductDetail'))
const Category = lazy(() => import('../pages/category/Category'))
const Blogs = lazy(() => import('../pages/blog/Blogs'))
const BlogDetail = lazy(() => import('../pages/blog/BlogDetail'))
const Contact = lazy(() => import('../pages/contact/Contact'))
const About = lazy(() => import('../pages/about/About'))
const Cart = lazy(() => import('../pages/cart/Cart'))
const Order = lazy(() => import('../pages/order/Order'))
const SupplierDetail = lazy(() => import('../pages/supplier/SupplierDetail'))
const Purchase = lazy(() => import('../pages/purchase/Purchase'))


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
          <Route path="category" element={<Category />} />
          <Route path="blog" element={<Blogs />} />
          <Route path="blog-detail" element={<BlogDetail />} />
          <Route path="blog-detail/:id" element={<BlogDetail />} />
          <Route path="connect" element={<Contact />} />
          <Route path="about" element={<About />} />
          <Route path="cart" element={<Cart />} />
          <Route path="order" element={<Order />} />
          <Route path="order/:id" element={<Order />} />
          <Route path="supplier/:brandName" element={<SupplierDetail />} />
          <Route path="wheretobuy" element={<Purchase />} />
          <Route path="purchase" element={<Navigate to="/wheretobuy" replace />} />
        </Route>
        <Route path="*" element={<h2 style={{ textAlign: 'center', padding: '100px 20px', fontFamily: 'Outfit, sans-serif' }}>404 - Page Not Found</h2>} />
      </Routes>
    </Suspense>
  )
}

export default AppRoutes
