import { AuthView } from '@neondatabase/auth-ui'
import { DefaultLink } from '@neondatabase/auth-ui'

export { DefaultLink }

export default function Auth() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-6 text-center">
          <img 
            src="https://res.cloudinary.com/dwsl2ktt2/image/upload/v1776084296/logo_zsmxnf.png" 
            alt="Nkabom Fund" 
            className="h-16 mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold text-gray-900">Welcome to Nkabom Fund</h1>
          <p className="text-gray-600 mt-2">Sign in to start fundraising or donate to causes</p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <AuthView />
        </div>
        <DefaultLink className="block mt-4 text-center text-sm text-green-700 hover:text-green-800" />
      </div>
    </div>
  )
}
