import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import ExplorePage from './pages/ExplorePage'
import CampaignDetailPage from './pages/CampaignDetailPage'
import UserDashboard from './pages/dashboards/UserDashboard'
import AgentDashboard from './pages/dashboards/AgentDashboard'
import CompanyDashboard from './pages/dashboards/CompanyDashboard'
import AdminDashboard from './pages/dashboards/AdminDashboard'

function ProtectedRoute({ children, roles }) {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  if (roles && !roles.includes(user.role)) return <Navigate to="/" replace />
  return children
}

export default function App() {
  const { user } = useAuth()

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/explore" element={<ExplorePage />} />
      <Route path="/campaign/:id" element={<CampaignDetailPage />} />
      <Route path="/dashboard" element={
        <ProtectedRoute roles={['user']}>
          <UserDashboard />
        </ProtectedRoute>
      } />
      <Route path="/agent" element={
        <ProtectedRoute roles={['agent']}>
          <AgentDashboard />
        </ProtectedRoute>
      } />
      <Route path="/company" element={
        <ProtectedRoute roles={['company']}>
          <CompanyDashboard />
        </ProtectedRoute>
      } />
      <Route path="/admin" element={
        <ProtectedRoute roles={['admin']}>
          <AdminDashboard />
        </ProtectedRoute>
      } />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
