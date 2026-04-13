import React from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { CATEGORIES } from '../data/seed'

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-[#F9F6EF]">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="mb-12">
          <h1 className="font-display font-black text-4xl text-gray-900 mb-4 tracking-tight">
            Browse fundraisers by category
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl">
            Whether it's for medical bills, tuition, or community growth, find the causes that matter most to you.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              to={`/explore?cat=${cat.id}`}
              className="group bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-md hover:border-[#02a95c40] transition-all flex flex-col items-start"
            >
              <div 
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-6 transition-transform group-hover:scale-110"
                style={{ backgroundColor: cat.bg }}
              >
                {cat.emoji}
              </div>
              <h3 className="font-display font-bold text-2xl text-gray-900 mb-2">{cat.label}</h3>
              <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                Support individuals and families facing {cat.label.toLowerCase()} challenges and milestones across Ghana.
              </p>
              <div className="mt-auto flex items-center gap-2 text-[#02a95c] font-bold text-sm">
                View all {cat.label} <ChevronRight size={16} />
              </div>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}