import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Calendar, Clock, ChevronRight, Rss, BookOpen, TrendingUp, Users, Tag } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { BLOG_POSTS } from '../data/seed'

// Expanded blog post data (augments seed data)
const EXTENDED_POSTS = [
  ...BLOG_POSTS,
  {
    id: 'blog-004',
    title: 'WhatsApp vs Facebook: Where to Share Your Campaign for Maximum Reach',
    image: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1776097110/slide5_pndb9r.jpg',
    date: 'February 25, 2024',
    category: 'Strategy',
    readTime: '4 min read',
    excerpt: 'Understanding which platform drives the most donations for Ghanaian campaigns — and how to craft messages that actually convert.',
  },
  {
    id: 'blog-005',
    title: 'Why ID Verification Makes Donors 3× More Likely to Give',
    image: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1776097120/slide2_e1m7pp.jpg',
    date: 'February 18, 2024',
    category: 'Trust & Safety',
    readTime: '3 min read',
    excerpt: 'Data from 5,000+ campaigns shows one thing clearly: verified campaigns outperform unverified ones by a wide margin. Here is why.',
  },
  {
    id: 'blog-006',
    title: 'The Diaspora Factor: How Ghanaians Abroad Are Driving Donations Home',
    image: 'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1776097721/slide4_yukxzd.jpg',
    date: 'February 10, 2024',
    category: 'Community',
    readTime: '5 min read',
    excerpt: 'UK, US, and Canada-based Ghanaians now account for 23% of all donations on Nkabom Fund. We spoke to some of them about why they give.',
  },
]

const CATEGORIES_BLOG = ['All', 'Impact', 'Tips & Guides', 'Community', 'Strategy', 'Trust & Safety']

const FEATURED_POST = EXTENDED_POSTS[0]

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = activeCategory === 'All'
    ? EXTENDED_POSTS
    : EXTENDED_POSTS.filter(p => p.category === activeCategory)

  const rest = filtered.filter(p => p.id !== FEATURED_POST.id)

  return (
    <div className="min-h-screen bg-[#F9F6EF]">
      <Navbar />

      {/* Header */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 lg:py-16">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#EDFAF2] text-[#0B4D2B] px-4 py-2 rounded-full text-sm font-bold mb-5">
                <Rss size={14} /> Nkabom Fund Stories
              </div>
              <h1 className="font-display font-black text-4xl sm:text-5xl text-gray-900 mb-3">Blog & Resources</h1>
              <p className="text-gray-500 text-lg max-w-xl">
                Impact stories, fundraising playbooks, platform updates, and insights from the heart of Ghanaian giving.
              </p>
            </div>
            <div className="flex-shrink-0 flex items-center gap-2 bg-[#F9F6EF] rounded-xl px-4 py-3 border border-gray-100">
              <Users size={16} className="text-gray-400" />
              <span className="text-sm text-gray-500"><span className="font-bold text-gray-900">2,400+</span> readers</span>
            </div>
          </div>
        </div>

        {/* Category filter */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-0">
          <div className="flex gap-1 overflow-x-auto pb-0 -mx-4 px-4 sm:mx-0 sm:px-0">
            {CATEGORIES_BLOG.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 px-4 py-2.5 text-sm font-semibold border-b-2 transition-colors ${
                  activeCategory === cat
                    ? 'border-[#0B4D2B] text-[#0B4D2B]'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {/* Featured post */}
        {activeCategory === 'All' && (
          <div className="mb-12">
            <Link to="#" className="group grid grid-cols-1 lg:grid-cols-2 gap-0 bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-warm hover:shadow-warm-md transition-all">
              <div className="h-64 lg:h-auto overflow-hidden">
                <img
                  src={FEATURED_POST.image}
                  alt={FEATURED_POST.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-8 sm:p-10 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-[#EDFAF2] text-[#0B4D2B] text-xs font-black px-3 py-1.5 rounded-full uppercase tracking-wider">{FEATURED_POST.category}</span>
                  <span className="text-gray-400 text-xs font-medium">Featured</span>
                </div>
                <h2 className="font-display font-bold text-2xl sm:text-3xl text-gray-900 mb-4 leading-snug group-hover:text-[#0B4D2B] transition-colors">
                  {FEATURED_POST.title}
                </h2>
                <p className="text-gray-500 leading-relaxed mb-6 line-clamp-3">
                  {FEATURED_POST.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-gray-400">
                    <span className="flex items-center gap-1"><Calendar size={12} /> {FEATURED_POST.date}</span>
                    {FEATURED_POST.readTime && <span className="flex items-center gap-1"><Clock size={12} /> {FEATURED_POST.readTime}</span>}
                  </div>
                  <span className="flex items-center gap-1 text-sm font-bold text-[#0B4D2B] group-hover:gap-2 transition-all">
                    Read article <ArrowRight size={15} />
                  </span>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Post grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {(activeCategory === 'All' ? rest : filtered).map((post) => (
            <article key={post.id} className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all flex flex-col">
              <div className="h-52 overflow-hidden flex-shrink-0">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-600"
                />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[10px] font-black text-[#0B4D2B] bg-[#EDFAF2] px-2.5 py-1 rounded-full uppercase tracking-wider">{post.category}</span>
                  <span className="text-xs text-gray-400 flex items-center gap-1"><Calendar size={11} />{post.date}</span>
                </div>
                <h3 className="font-display font-bold text-lg text-gray-900 mb-3 leading-snug group-hover:text-[#0B4D2B] transition-colors line-clamp-2 flex-1">
                  {post.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
                  {post.readTime && (
                    <span className="flex items-center gap-1 text-xs text-gray-400"><Clock size={11} />{post.readTime}</span>
                  )}
                  <span className="flex items-center gap-1 text-xs font-bold text-[#0B4D2B] ml-auto group-hover:gap-2 transition-all">
                    Read more <ChevronRight size={14} />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <BookOpen size={40} className="mx-auto mb-4 text-gray-200" />
            <p className="text-gray-500">No articles in this category yet. Check back soon!</p>
          </div>
        )}
      </main>

      {/* Newsletter CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
        <div className="bg-gradient-to-br from-[#0B4D2B] to-[#065F46] rounded-3xl p-8 sm:p-12 text-white">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-5">
              <Rss size={24} className="text-[#F6A800]" />
            </div>
            <h2 className="font-display font-bold text-2xl sm:text-3xl mb-3">Get fundraising insights in your inbox</h2>
            <p className="text-green-200 mb-8 max-w-lg mx-auto">
              Impact stories, fundraising tips, and platform updates. No spam. Unsubscribe anytime.
            </p>
            <div className="flex gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 text-sm outline-none focus:border-white/50 transition-colors"
              />
              <button className="flex-shrink-0 bg-[#F6A800] hover:bg-[#D48E00] text-[#3D2A00] font-black px-6 py-3 rounded-xl transition-colors text-sm">
                Subscribe
              </button>
            </div>
            <p className="text-green-300 text-xs mt-3">Join 2,400+ readers · Unsubscribe anytime</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
