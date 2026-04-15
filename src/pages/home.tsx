import { Link } from 'react-router-dom'
import { useAuth } from './context/AuthContext'

export default function Home() {
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="mb-8">
          <img 
            src="https://res.cloudinary.com/dwsl2ktt2/image/upload/v1776084296/logo_zsmxnf.png" 
            alt="Nkabom Fund" 
            className="h-20 mx-auto mb-6"
          />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to Nkabom Fund
          </h1>
          <p className="text-xl text-gray-600">
            Ghana's trusted crowdfunding platform for meaningful causes
          </p>
        </div>

        {user && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <p className="text-gray-600">
              Signed in as <span className="font-semibold text-gray-900">{user.email}</span>
            </p>
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <Link 
            to="/explore" 
            className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-2">Explore Campaigns</h2>
            <p className="text-gray-600">Discover causes that need your support</p>
          </Link>

          <Link 
            to="/start" 
            className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-2">Start a Campaign</h2>
            <p className="text-gray-600">Create your own fundraising campaign</p>
          </Link>

          <Link 
            to="/groups" 
            className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-2">Join Groups</h2>
            <p className="text-gray-600">Connect with communities and causes</p>
          </Link>
        </div>
      </div>
    </div>
  )
}
