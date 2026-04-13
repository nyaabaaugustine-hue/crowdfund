import React from 'react'
import { Building2, CheckCircle, BarChart2, Shield } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function CharityFundraisingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <section className="bg-gray-900 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center">
          <h1 className="font-display font-black text-5xl mb-6">Fundraise for a charity</h1>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto mb-10">Empower your NGO with a platform built for transparency and reach. Raise funds for the communities you serve.</p>
          <button id="signup" className="bg-[#02a95c] hover:bg-[#029350] text-white font-black px-10 py-4 rounded-xl text-lg transition-all">Claim your nonprofit</button>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div className="space-y-4">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={32} />
            </div>
            <h3 className="font-bold text-xl">Verified Trust</h3>
            <p className="text-gray-500 text-sm leading-relaxed">Registered NGOs receive a "Verified NGO" badge, increasing donor confidence by up to 40%.</p>
          </div>
          <div className="space-y-4">
            <div className="w-16 h-16 bg-green-50 text-[#02a95c] rounded-2xl flex items-center justify-center mx-auto mb-6">
              <BarChart2 size={32} />
            </div>
            <h3 className="font-bold text-xl">Advanced Analytics</h3>
            <p className="text-gray-500 text-sm leading-relaxed">Track donor demographics, regional growth, and campaign performance in real-time.</p>
          </div>
          <div className="space-y-4">
            <div className="w-16 h-16 bg-yellow-50 text-yellow-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Shield size={32} />
            </div>
            <h3 className="font-bold text-xl">Secure Disbursement</h3>
            <p className="text-gray-500 text-sm leading-relaxed">Direct bank transfers and Mobile Money options with full audit trails for your accounting.</p>
          </div>
        </div>

        <div className="mt-24 p-12 bg-[#F9F6EF] rounded-[40px] border border-gray-100 flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1">
            <h2 className="font-display font-bold text-3xl text-gray-900 mb-4">Are you a registered NGO?</h2>
            <p className="text-gray-600 leading-relaxed mb-6">GhCrowd supports foundations across Ghana. By claiming your nonprofit, you can manage multiple campaigns under one verified profile and access lower platform fees.</p>
            <ul className="space-y-3 mb-8">
              {['Tax-deductible receipts', 'Dedicated support manager', 'Custom donor data exports'].map(item => (
                <li key={item} className="flex items-center gap-2 text-sm font-bold text-gray-700"><CheckCircle size={16} className="text-[#02a95c]" /> {item}</li>
              ))}
            </ul>
          </div>
          <div className="w-full md:w-80 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
             <p className="text-xs font-bold text-gray-400 uppercase mb-4">Requirements</p>
             <div className="space-y-3">
               <div className="p-3 bg-gray-50 rounded-xl text-xs font-medium text-gray-600">Company Reg. Documents</div>
               <div className="p-3 bg-gray-50 rounded-xl text-xs font-medium text-gray-600">Official Bank Account</div>
               <div className="p-3 bg-gray-50 rounded-xl text-xs font-medium text-gray-600">Proof of Address</div>
             </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}