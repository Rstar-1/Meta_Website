import { useEffect } from 'react'
import { BrowserRouter, useLocation } from 'react-router-dom'
import ReactGA from 'react-ga4'
import AppRoutes from '../routes/index'
import ScrollToTop from '../components/common/ScrollToTop'

const gaId = import.meta.env.VITE_GA_MEASUREMENT_ID

if (gaId) {
  ReactGA.initialize(gaId)
}

const AnalyticsTracker = () => {
  const location = useLocation()

  useEffect(() => {
    if (gaId) {
      ReactGA.send({ hitType: 'pageview', page: location.pathname + location.search })
    }
  }, [location])

  return null
}

const App = () => {
  return (
    <BrowserRouter>
      <AnalyticsTracker />
      <ScrollToTop />
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App

