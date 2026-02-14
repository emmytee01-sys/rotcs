import { Routes, Route, Navigate } from 'react-router-dom'

// Layouts
import AdminLayout from './layouts/AdminLayout'
import ConsultantLayout from './layouts/ConsultantLayout'
import OperatorLayout from './layouts/OperatorLayout'

// Admin Pages
import RevenueCenter from './pages/admin/RevenueCenter'
import Geospatial from './pages/admin/Geospatial'
import Operators from './pages/admin/Operators'
import AdminSupport from './pages/admin/Support'

// Consultant Pages
import MultiStateHub from './pages/consultant/MultiStateHub'
import StateDeepDive from './pages/consultant/StateDeepDive'
import GeospatialIntel from './pages/consultant/GeospatialIntel'
import Forensics from './pages/consultant/Forensics'
import ConsultantSupport from './pages/consultant/Support'

// Operator Pages
import OperatorHome from './pages/operator/Home'
import Billing from './pages/operator/Billing'
import Payment from './pages/operator/Payment'
import APIConfiguration from './pages/operator/APIConfiguration'
import OperatorSupport from './pages/operator/Support'

// Pages
import LandingPage from './pages/LandingPage'

// Shared Pages


// Components
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />

      {/* Admin Routes - Protected */}
      <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/revenue" replace />} />
          <Route path="revenue" element={<RevenueCenter />} />
          <Route path="geospatial" element={<Geospatial />} />
          <Route path="operators" element={<Operators />} />
          <Route path="support" element={<AdminSupport />} />
        </Route>
      </Route>

      {/* Consultant Routes - Protected */}
      <Route element={<ProtectedRoute allowedRoles={['consultant']} />}>
        <Route path="/consultant" element={<ConsultantLayout />}>
          <Route index element={<Navigate to="/consultant/hub" replace />} />
          <Route path="hub" element={<MultiStateHub />} />
          <Route path="state" element={<StateDeepDive />} />
          <Route path="state/:stateId" element={<StateDeepDive />} />
          <Route path="geospatial" element={<GeospatialIntel />} />
          <Route path="forensics" element={<Forensics />} />
          <Route path="support" element={<ConsultantSupport />} />
        </Route>
      </Route>

      {/* Operator Routes - Protected */}
      <Route element={<ProtectedRoute allowedRoles={['operator']} />}>
        <Route path="/operator" element={<OperatorLayout />}>
          <Route index element={<Navigate to="/operator/home" replace />} />
          <Route path="home" element={<OperatorHome />} />
          <Route path="billing" element={<Billing />} />
          <Route path="payment" element={<Payment />} />
          <Route path="api-config" element={<APIConfiguration />} />
          <Route path="support" element={<OperatorSupport />} />
        </Route>
      </Route>

      {/* Fallback - redirect unknown routes to landing page */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App

