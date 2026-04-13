import { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CampaignCard from '../components/CampaignCard'
import { useData } from '../context/DataContext'
import { CATEGORIES } from '../data/seed'

const SORT_OPTIONS = [
  { id: 'recent', label: 'Most Recent' },
  { id: 'funded', label: 'Most Funded' },
  { id: 'urgent', label: 'Ending Soon' },
  { id: 'percent', label: 'Highest %' },
]

export default function ExplorePage() {
  const { campaigns } = useData()
  const [params] = useSearchParams()
  const [search, setSearch] = useState('')
  const [catFilter, setCatFilter] = useState(params.get('cat') || 'all')
  const [sort, setSort] = useState('recent')
  const [filtersOpen, setFiltersOpen] = useState(false)

  const approved = campaigns.filter(c => c.status === 'approved')

  const filtered = useMemo(() => {
    let list = approved
    if (catFilter !== 'all') list = list.filter(c => c.category === catFilter)
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(c =>
        c.title.toLowerCase().includes(q) ||
        c.shortDesc.toLowerCase().includes(q) ||
        c.location.toLowerCase().includes(q)
      )
    }
    switch (sort) {
      case 'funded':   return [...list].sort((a,b) => b.raised - a.raised)
      case 'urgent':   return [...list].sort((a,b) => a.daysLeft - b.daysLeft)
      case 'percent':  return [...list].sort((a,b) => (b.raised/b.target) - (a.raised/a.target))
      default:         return [...list].sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt))
    }
  }, [approved, catFilter, search, sort])

  return (
    <div className="min-h-screen bg-[#F9F6EF]">
      <Navbar />

      {/* Page header */}
      <div className="bg-white border-b border-[#F0EDE4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <h1 className="font-display font-bold text-3xl text-gray-900 mb-1">Explore Campaigns</h1>
          <p className="text-gray-400 text-sm">{approved.length} active campaigns · Find one to support today</p>

          {/* Search + filters */}
          <div className="flex gap-3 mt-5">
            <div className="flex-1 relative">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search campaigns, causes, locations..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="gh-input pl-10"
              />
              {search && (
                <button onClick={() => setSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2">
                  <X size={14} className="text-gray-400" />
                </button>
              )}
            </div>
            <button
              onClick={() => setFiltersOpen(!filtersOpen)}
              className="flex items-center gap-2 px-4 py-3 bg-white border border-[#E5DFD3] rounded-xl text-sm font-semibold text-gray-700 hover:bg-[#F0EDE4] transition-colors"
            >
              <SlidersHorizontal size={16} /> Sort
            </button>
          </div>

          {/* Sort dropdown */}
          {filtersOpen && (
            <div className="mt-3 flex gap-2 flex-wrap anim-fade-in">
              {SORT_OPTIONS.map(opt => (
                <button
                  key={opt.id}
                  onClick={() => { setSort(opt.id); setFiltersOpen(false) }}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${
                    sort === opt.id
                      ? 'bg-[#0B4D2B] text-white'
                      : 'bg-white border border-[#E5DFD3] text-gray-600 hover:bg-[#F0EDE4]'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Category tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-0">
          <div className="flex gap-2 overflow-x-auto pb-0 -mx-4 px-4 sm:mx-0 sm:px-0">
            <button
              onClick={() => setCatFilter('all')}
              className={`flex-shrink-0 px-4 py-2.5 rounded-t-xl text-sm font-semibold transition-colors border-b-2 ${
                catFilter === 'all'
                  ? 'border-[#0B4D2B] text-[#0B4D2B] bg-[#EDFAF2]'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              All
            </button>
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setCatFilter(cat.id)}
                className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2.5 rounded-t-xl text-sm font-semibold transition-colors border-b-2 ${
                  catFilter === cat.id
                    ? 'border-[#0B4D2B] text-[#0B4D2B] bg-[#EDFAF2]'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <span>{cat.emoji}</span> {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-4xl mb-4">🔍</p>
            <h3 className="font-display font-bold text-xl text-gray-700 mb-2">No campaigns found</h3>
            <p className="text-gray-400 text-sm">Try a different search or category</p>
            <button
              onClick={() => { setSearch(''); setCatFilter('all') }}
              className="mt-4 text-sm font-semibold text-[#0B4D2B] hover:underline"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <>
            <p className="text-sm text-gray-400 mb-5">{filtered.length} campaign{filtered.length !== 1 ? 's' : ''} found</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map((c, i) => (
                <CampaignCard key={c.id} campaign={c} delay={Math.min(i * 40, 300)} />
              ))}
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  )
}
