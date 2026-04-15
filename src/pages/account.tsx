import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Account() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleSignOut = () => {
    logout()
    navigate('/')
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Please sign in to view your account.</p>
        <Link to="/auth" className="text-green-600 ml-2">Sign in</Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center gap-6 mb-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-3xl font-bold text-green-700">
                {user.name?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{user.name || 'User'}</h1>
              <p className="text-gray-600">{user.email}</p>
              {user.role && (
                <span className="inline-block mt-1 px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full capitalize">
                  {user.role}
                </span>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-xl">
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium text-gray-900">{user.email}</p>
            </div>

            {user.id && (
              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-sm text-gray-500">User ID</p>
                <p className="font-medium text-gray-900 font-mono text-sm">{user.id}</p>
              </div>
            )}
          </div>

          <div className="mt-8 flex gap-4">
            <button
              onClick={handleSignOut}
              className="flex-1 bg-red-600 text-white py-3 rounded-xl font-semibold hover:bg-red-700 transition-colors"
            >
              Sign Out
            </button>
            <Link
              to="/"
              className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors text-center"
            >
              Go Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
