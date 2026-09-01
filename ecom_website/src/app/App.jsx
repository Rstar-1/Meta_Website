import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from '../routes/index'
import ScrollToTop from '../components/common/ScrollToTop'
import AgencyCustomCursor from '../pages/design-agency/components/AgencyCustomCursor'

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AgencyCustomCursor />
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App

