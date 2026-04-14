import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, TrendingUp, Users, Heart, BookOpen, ArrowRight } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CampaignCard from '../components/CampaignCard'
import { CATEGORIES } from '../data/seed'
import { useData } from '../context/DataContext'

// Category meta — extra content per category
const CAT_META = {
  medical:   { color: '#02a95c', campaigns: 28, raised: '₵184,000', desc: 'Cover surgery costs, chemotherapy, dialysis, and emergency medical treatment for Ghanaians who cannot afford private care.', examples: ['Cancer treatment', 'Dialysis fund', 'Surgery abroad', 'Hospital bills'] },
  funeral:   { color: '#4B5563', campaigns: 14, raised: '₵96,200', desc: 'Help families give their loved ones a dignified burial. Covers traditional ceremonies, funeral home costs, and transportation.', examples: ['Burial costs', 'Traditional rites', 'Repatriation', 'Memorial fund'] },
  education: { color: '#0070e0', campaigns: 19, raised: '₵132,000', desc: 'Pay school fees, buy textbooks, fund scholarships, or build a new classroom for communities that need it most.', examples: ['University fees', 'Secondary school', 'Classroom building', 'Scholarships'] },
  business:  { color: '#f59e0b', campaigns: 11, raised: '₵78,400', desc: 'Launch or expand a small business. Fund equipment, working capital, market stalls, or artisan workshops.', examples: ['Kente weaving', 'Market stall', 'Farm equipment', 'Tailoring workshop'] },
  emergency: { color: '#eb0000', campaigns: 8,  raised: '₵214,600', desc: 'Immediate response for floods, fires, accidents, or sudden displacement. Funds reach beneficiaries in under 24 hours.', examples: ['Flood victims', 'Fire relief', 'Accident recovery', 'Displacement aid'] },
  community: { color: '#7c3aed', campaigns: 16, raised: '₵158,800', desc: 'Build community infrastructure, fund youth programs, support local sports, and grow sustainable livelihoods.', examples: ['Borehole water', 'Youth academy', 'Football club', 'Community centre'] },
}

export default function CategoriesPage() {
  const { campaigns } = useData()
  const [hovered, setHovered] = useState(null)

  const getCount = (catId) => campaigns.filter(c => c.category === catId && c.status === 'approved').length

  return (
    <div className="min-h-screen bg-[#F9F6EF]">
      <Navbar />

      {/* Header */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 lg:py-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-[#F0EDE4] px-4 py-2 rounded-full text-sm font-bold text-gray-600 mb-5">
              Browse by Category
            </div>
            <h1 className="font-display font-black text-4xl sm:text-5xl text-gray-900 mb-4 tracking-tight">
              Find a cause that speaks<br />
              <span className="text-[#0B4D2B]">to your heart.</span>
            </h1>
            <p className="text-gray-500 text-lg max-w-xl leading-relaxed">
              Whether it's a neighbour's medical bill or a school in need of repair — your donation makes an
              immediate, traceable difference.
            </p>
          </div>
        </div>

        {/* Quick stat bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-8">
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {CATEGORIES.map(cat => {
              const meta = CAT_META[cat.id]
              return (
                <Link key={cat.id} to={`/explore?cat=${cat.id}`} className="group text-center bg-[#F9F6EF] hover:bg-white rounded-xl p-3 border border-transparent hover:border-gray-200 transition-all">
                  <span className="text-xl block mb-1">{cat.emoji}</span>
                  <p className="text-xs font-bold text-gray-800">{meta?.campaigns ?? 0}</p>
                  <p className="text-[10px] text-gray-400">active</p>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Categories grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CATEGORIES.map((cat) => {
            const meta = CAT_META[cat.id]
            const liveCount = getCount(cat.id)
            const isHovered = hovered === cat.id

            return (
              <Link
                key={cat.id}
                to={`/explore?cat=${cat.id}`}
                onMouseEnter={() => setHovered(cat.id)}
                onMouseLeave={() => setHovered(null)}
                className="group bg-white rounded-2xl overflow-hidden border-2 border-transparent hover:border-gray-200 hover:shadow-warm-md transition-all flex flex-col"
              >
                {/* Colour bar top */}
                <div className="h-1.5 w-full" style={{ backgroundColor: meta?.color || cat.color }} />

                <div className="p-7 flex flex-col flex-1">
                  {/* Icon + live count */}
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl" style={{ backgroundColor: cat.bg }}>
                      {cat.emoji}
                    </div>
                    <div className="text-right">
                      <p className="font-display font-black text-xl text-gray-900">{liveCount}</p>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">live</p>
                    </div>
                  </div>

                  <h3 className="font-display font-bold text-xl text-gray-900 mb-2">{cat.label}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-5 flex-1">{meta?.desc}</p>

                  {/* Examples */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {meta?.examples.map(ex => (
                      <span key={ex} className="text-xs bg-[#F9F6EF] text-gray-600 px-2.5 py-1 rounded-full border border-gray-100">{ex}</span>
                    ))}
                  </div>

                  {/* Stats row */}
                  <div className="grid grid-cols-2 gap-3 mb-5 pt-4 border-t border-gray-100">
                    <div>
                      <p className="font-bold text-gray-900 text-sm">{meta?.raised}</p>
                      <p className="text-[10px] text-gray-400 uppercase tracking-wider">raised</p>
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-sm">{meta?.campaigns}</p>
                      <p className="text-[10px] text-gray-400 uppercase tracking-wider">campaigns</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm font-bold group-hover:gap-3 transition-all" style={{ color: meta?.color }}>
                    View {cat.label} campaigns <ChevronRight size={16} />
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </main>

      {/* Bottom CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-100 shadow-warm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-[#EDFAF2] rounded-2xl flex items-center justify-center flex-shrink-0">
              <Heart size={26} className="text-[#0B4D2B]" />
            </div>
            <div>
              <h3 className="font-display font-bold text-xl text-gray-900 mb-1">Don't see your cause?</h3>
              <p className="text-gray-500 text-sm">All genuine Ghanaian causes are welcome. Start your campaign today and we'll help you find the right category.</p>
            </div>
          </div>
          <Link to="/login" className="flex-shrink-0 inline-flex items-center gap-2 bg-[#0B4D2B] hover:bg-[#065F46] text-white font-black px-7 py-3.5 rounded-xl transition-all text-sm">
            Start a Campaign <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
