import React from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle, Play, ArrowRight } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function HowToStartPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="font-display font-black text-5xl text-gray-900 mb-6">How to start a GhCrowd</h1>
          <p className="text-gray-500 text-xl leading-relaxed">Everything you need to know about setting up a successful fundraiser in Ghana.</p>
        </div>

        <div className="space-y-20">
          {[
            { step: '1', title: 'Start with the basics', desc: 'Enter your name, location, and the category that best fits your cause. Whether it is medical, education, or a community project, being specific helps donors find you.', icon: '📝' },
            { step: '2', title: 'Tell your story', desc: 'This is the most important part. Explain who you are raising money for and why it matters. Use photos or even a short video. AI-assisted storytelling on GhCrowd can help you refine your message.', icon: '📖' },
            { step: '3', title: 'Set your goal', desc: 'Calculate exactly how much you need. Be transparent about the costs. You can always increase your goal later if the need grows.', icon: '🎯' },
            { step: '4', title: 'Share with friends and family', desc: 'Share your link via WhatsApp, Facebook, and Instagram. The first donations usually come from people you know.', icon: '📢' }
          ].map((item) => (
            <div key={item.step} className="flex flex-col sm:flex-row gap-8 items-start">
              <div className="w-12 h-12 rounded-full bg-[#02a95c] text-white flex items-center justify-center font-black text-xl flex-shrink-0">
                {item.step}
              </div>
              <div>
                <h3 className="font-display font-bold text-2xl text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-4">{item.desc}</p>
              </div>
            </div>
          ))}

          <section className="bg-gray-50 rounded-3xl p-10">
            <div className="flex items-center gap-3 mb-6">
              <Play className="text-[#02a95c]" size={24} />
              <h2 className="font-display font-bold text-2xl">See an example</h2>
            </div>
            <div className="aspect-video bg-gray-200 rounded-2xl overflow-hidden mb-6 flex items-center justify-center text-gray-400">
              {/* Placeholder for a tutorial video */}
              [Tutorial Video Placeholder]
            </div>
            <p className="text-sm text-gray-500 italic">Watch our 2-minute guide on crafting a story that moves people to action.</p>
          </section>

          <div className="text-center">
            <Link 
              to="/login"
              className="inline-flex items-center gap-2 bg-[#02a95c] text-white font-black px-10 py-5 rounded-2xl text-lg hover:bg-[#029350] transition-all"
            >
              Start your fundraiser now <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}