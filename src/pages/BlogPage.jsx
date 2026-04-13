import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Calendar } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { BLOG_POSTS } from '../data/seed'

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[#F9F6EF]">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <div className="max-w-2xl mb-16">
          <h1 className="font-display font-black text-5xl text-gray-900 mb-6">Nkabom Fund Blog</h1>
          <p className="text-gray-500 text-xl leading-relaxed">Inspiring stories of impact, fundraising guides, and the latest news from our community.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {BLOG_POSTS.map((post) => (
            <article key={post.id} className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all">
              <div className="h-60 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
              </div>
              <div className="p-8">
                <div className="flex items-center gap-3 text-xs font-bold text-[#02a95c] uppercase tracking-widest mb-4">
                  <span className="bg-[#02a95c15] px-2 py-1 rounded">{post.category}</span>
                  <span className="flex items-center gap-1 text-gray-400"><Calendar size={12} /> {post.date}</span>
                </div>
                <h3 className="font-display font-bold text-2xl text-gray-900 mb-4 leading-snug group-hover:text-[#02a95c] transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3">
                  {post.excerpt}
                </p>
                <Link to={post.link} className="inline-flex items-center gap-2 text-sm font-black text-gray-900 group-hover:gap-3 transition-all">
                  Read more <ArrowRight size={16} className="text-[#02a95c]" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}