import { useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import ExplorePage from './pages/ExplorePage'
import CampaignDetailPage from './pages/CampaignDetailPage'
import UserDashboard from './pages/dashboards/UserDashboard'
import AgentDashboard from './pages/dashboards/AgentDashboard'
import CompanyDashboard from './pages/dashboards/CompanyDashboard'
import AdminDashboard from './pages/dashboards/AdminDashboard'
import CategoriesPage from './pages/CategoriesPage'
import CrisisReliefPage from './pages/CrisisReliefPage'
import SocialImpactPage from './pages/SocialImpactPage'
import SupporterSpacePage from './pages/SupporterSpacePage'
import HowToStartPage from './pages/HowToStartPage'
import TeamFundraisingPage from './pages/TeamFundraisingPage'
import BlogPage from './pages/BlogPage'
import FundraisingTipsPage from './pages/FundraisingTipsPage'
import CharityFundraisingPage from './pages/CharityFundraisingPage'

function ProtectedRoute({ children, roles }) {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  if (roles && !roles.includes(user.role)) return <Navigate to="/" replace />
  return children
}

export default function App() {
  const { user } = useAuth()
  const { pathname } = useLocation()

  // Reset scroll to top whenever the route changes
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div key={pathname} className="animate-page">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/campaign/:id" element={<CampaignDetailPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/crisis-relief" element={<CrisisReliefPage />} />
        <Route path="/social-impact" element={<SocialImpactPage />} />
        <Route path="/supporter-space" element={<SupporterSpacePage />} />
        <Route path="/start" element={<HowToStartPage />} />
        <Route path="/team-fundraising" element={<TeamFundraisingPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/tips" element={<FundraisingTipsPage />} />
        <Route path="/charity" element={<CharityFundraisingPage />} />
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
    </div>
  )
}
