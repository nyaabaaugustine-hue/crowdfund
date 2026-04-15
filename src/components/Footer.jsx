import { Link } from 'react-router-dom'
import { Heart, Facebook, Twitter, Instagram, Mail, Phone, Shield, MapPin, ExternalLink } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-[#0B4D2B] text-white mt-20">
      <div className="kente-bar opacity-60" />

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <img
              src="https://res.cloudinary.com/dwsl2ktt2/image/upload/v1776084296/logo_zsmxnf.png"
              alt="Nkabom Fund Logo"
              className="w-10 h-10 object-contain"
            />
            <span className="font-display font-bold text-white text-xl">Nkabom Fund</span>
          </div>
          <p className="text-sm text-green-200 leading-relaxed mb-5">
            Ghana's most trusted crowdfunding platform. Raising funds for the things that matter most — together.
          </p>
          <div className="flex gap-3">
            <a
              href="https://facebook.com/nkabomfund"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              aria-label="Facebook"
            >
              <Facebook size={16} />
            </a>
            <a
              href="https://twitter.com/nkabomfund"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              aria-label="Twitter"
            >
              <Twitter size={16} />
            </a>
            <a
              href="https://instagram.com/nkabomfund"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={16} />
            </a>
          </div>
        </div>

        {/* Platform Links */}
        <div>
          <h4 className="font-bold text-sm uppercase tracking-wider text-[#F6A800] mb-4">Platform</h4>
          <ul className="space-y-2.5">
            {[
              { label: 'Explore Campaigns', link: '/explore' },
              { label: 'Start a Campaign', link: '/start' },
              { label: 'How it Works', link: '/about' },
              { label: 'Groups', link: '/groups' },
              { label: 'Success Stories', link: '/blog' },
            ].map(item => (
              <li key={item.label}>
                <Link
                  to={item.link}
                  className="text-sm text-green-200 hover:text-white transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h4 className="font-bold text-sm uppercase tracking-wider text-[#F6A800] mb-4">Categories</h4>
          <ul className="space-y-2.5">
            {[
              { label: 'Medical', emoji: '🏥', link: '/explore?cat=medical' },
              { label: 'Funeral', emoji: '🕊️', link: '/explore?cat=funeral' },
              { label: 'Education', emoji: '🎓', link: '/explore?cat=education' },
              { label: 'Business', emoji: '💼', link: '/explore?cat=business' },
              { label: 'Emergency', emoji: '🆘', link: '/explore?cat=emergency' },
              { label: 'Community', emoji: '🤝', link: '/explore?cat=community' },
            ].map(item => (
              <li key={item.label}>
                <Link
                  to={item.link}
                  className="text-sm text-green-200 hover:text-white transition-colors"
                >
                  {item.emoji} {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact & Trust */}
        <div>
          <h4 className="font-bold text-sm uppercase tracking-wider text-[#F6A800] mb-4">Contact</h4>
          <ul className="space-y-3 mb-6">
            <li className="flex items-center gap-3 text-sm text-green-200">
              <Mail size={15} className="flex-shrink-0" />
              hello@nkabomfund.com.gh
            </li>
            <li className="flex items-center gap-3 text-sm text-green-200">
              <Phone size={15} className="flex-shrink-0" />
              +233 30 291 0001
            </li>
            <li className="flex items-center gap-3 text-sm text-green-200">
              <MapPin size={15} className="flex-shrink-0" />
              Accra, Ghana
            </li>
          </ul>
          <div className="p-4 rounded-2xl bg-white/10">
            <p className="text-xs text-green-200 mb-3 leading-relaxed">
              All campaigns are verified by our team. Funds are disbursed only to approved campaigns.
            </p>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-[#F6A800] flex items-center justify-center flex-shrink-0">
                <span className="text-[10px] text-[#0B4D2B] font-bold">✓</span>
              </div>
              <span className="text-xs font-semibold text-[#F6A800]">Trusted &amp; Secure Platform</span>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Methods + Bottom Bar */}
      <div className="border-t border-white/10">

        {/* Payment Logos */}
        <div className="max-w-7xl mx-auto px-4 py-6">
          <p className="text-xs font-bold text-green-300 uppercase tracking-widest text-center mb-4">
            Accepted Payment Methods
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">

            {/* MTN MoMo */}
            <div className="relative h-10 w-24 rounded-lg overflow-hidden shadow-lg flex-shrink-0">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600" />
              <div className="relative h-full flex flex-col items-center justify-center">
                <span className="text-black font-bold text-sm tracking-tight">MTN</span>
                <span className="text-black/70 text-[8px] font-medium -mt-0.5">MoMo</span>
              </div>
            </div>

            {/* Telecel Cash */}
            <div className="relative h-10 w-28 rounded-lg overflow-hidden shadow-lg flex-shrink-0">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500 via-red-600 to-red-700" />
              <div className="relative h-full flex flex-col items-center justify-center">
                <span className="text-white font-bold text-xs tracking-wide">Telecel</span>
                <span className="text-white/80 text-[8px] font-medium -mt-0.5">Cash</span>
              </div>
            </div>

            {/* AirtelTigo Money */}
            <div className="relative h-10 w-32 rounded-lg overflow-hidden shadow-lg flex-shrink-0">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600" />
              <div className="relative h-full flex flex-col items-center justify-center">
                <span className="text-white font-bold text-[10px] tracking-wide">AirtelTigo</span>
                <span className="text-white/80 text-[8px] font-medium -mt-0.5">Money</span>
              </div>
            </div>

            {/* Divider */}
            <div className="h-8 w-px bg-white/20 flex-shrink-0" />

            {/* Visa */}
            <div className="relative h-10 w-16 rounded-lg overflow-hidden shadow-lg flex-shrink-0">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-800 via-blue-900 to-blue-950" />
              <div className="relative h-full flex items-center justify-center">
                <span className="text-white font-bold text-sm tracking-wider">VISA</span>
              </div>
            </div>

            {/* Mastercard */}
            <div className="relative h-10 w-14 rounded-lg overflow-hidden shadow-lg flex-shrink-0">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-900 to-gray-950" />
              <div className="relative h-full flex items-center justify-center gap-0.5">
                <div className="w-5 h-5 rounded-full bg-red-500 opacity-90" />
                <div className="w-5 h-5 rounded-full bg-yellow-500 opacity-90 -ml-2" />
              </div>
            </div>

            {/* Paystack */}
            <div className="relative h-10 w-24 rounded-lg overflow-hidden shadow-lg flex-shrink-0">
              <div className="absolute inset-0 bg-gradient-to-br from-[#00C3F7] via-[#00A3E4] to-[#0077B6]" />
              <div className="relative h-full flex items-center justify-center">
                <span className="text-white font-bold text-xs tracking-wide">Paystack</span>
              </div>
            </div>

          </div>
        </div>

        {/* Copyright Row */}
        <div className="max-w-7xl mx-auto px-4 pb-6 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
          <p className="text-xs text-green-300">
            © {new Date().getFullYear()} Nkabom Fund. All rights reserved. 🇬🇭
          </p>
          <div className="flex gap-5 text-xs">
            <a href="#" className="text-green-300 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-green-300 hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="text-green-300 hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>

      </div>
    </footer>
  )
}
