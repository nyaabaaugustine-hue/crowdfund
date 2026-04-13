import React from 'react'
import { TrendingUp, Award } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CampaignCard from '../components/CampaignCard'
import { useData } from '../context/DataContext'

export default function SocialImpactPage() {
  const { campaigns } = useData()
  const impactCampaigns = campaigns.filter(c => 
    (c.category === 'community' || c.category === 'education') && c.status === 'approved'
  ).slice(0, 6)

  return (
    <div className="min-h-screen bg-[#F9F6EF]">
      <Navbar />
      <section className="bg-[#02a95c] text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, white 0%, transparent 50%)' }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative text-center">
          <h1 className="font-display font-black text-5xl mb-6">Direct support for urgent needs</h1>
          <p className="text-green-100 text-xl max-w-2xl mx-auto leading-relaxed">
            Invest in the future of Ghana. These community-led initiatives are building schools, providing clean water, and creating sustainable livelihoods.
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          <div className="lg:col-span-1 space-y-8 sticky top-24">
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <Award className="text-[#F6A800] mb-4" size={32} />
              <h3 className="font-bold text-xl mb-2">High-Impact Only</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                We prioritize projects that benefit at least 50+ people in a community or provide long-term educational infrastructure.
              </p>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <TrendingUp className="text-[#02a95c] mb-4" size={32} />
              <h3 className="font-bold text-xl mb-2">Progressive Growth</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                95% of social impact funds reach the beneficiary within 7 days of campaign completion.
              </p>
            </div>
          </div>
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {impactCampaigns.map((c, i) => (
              <CampaignCard key={c.id} campaign={c} delay={i * 100} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}