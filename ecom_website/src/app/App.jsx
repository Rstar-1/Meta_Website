import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from '../routes/index'
import ScrollToTop from '../components/common/ScrollToTop'

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App

