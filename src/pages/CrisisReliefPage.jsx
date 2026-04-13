import React from 'react'
import { ShieldCheck, AlertCircle } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CampaignCard from '../components/CampaignCard'
import { useData } from '../context/DataContext'

export default function CrisisReliefPage() {
  const { campaigns } = useData()
  const crisisCampaigns = campaigns.filter(c => 
    (c.category === 'emergency' || c.category === 'medical') && c.status === 'approved'
  ).slice(0, 8)

  return (
    <div className="min-h-screen bg-[#F9F6EF]">
      <Navbar />
      <section className="bg-red-50 border-b border-red-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            <div className="flex items-center gap-2 bg-red-100 text-red-600 px-4 py-2 rounded-full text-sm font-black uppercase tracking-widest mb-6">
              <AlertCircle size={16} /> Urgent Needs
            </div>
            <h1 className="font-display font-black text-4xl sm:text-5xl text-gray-900 mb-6">
              Donate to verified crisis relief
            </h1>
            <p className="text-gray-600 text-lg font-medium leading-relaxed">
              When disaster strikes, every second counts. GhCrowd works with local agents and NGOs to ensure your emergency donations reach those in immediate need safely and quickly.
            </p>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="flex items-center gap-3 mb-10 pb-6 border-b border-gray-100">
          <ShieldCheck className="text-[#02a95c]" size={24} />
          <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">
            All campaigns below are 100% verified for emergency disbursement
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {crisisCampaigns.map((c, i) => (
            <CampaignCard key={c.id} campaign={c} delay={i * 50} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}