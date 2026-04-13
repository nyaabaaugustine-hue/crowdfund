import { Link } from 'react-router-dom'
import { Heart, Facebook, Twitter, Instagram, Mail, Phone } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-[#0B4D2B] text-white mt-20">
      <div className="kente-bar opacity-60" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-[#F6A800] flex items-center justify-center">
              <span className="text-[#0B4D2B] font-display font-bold text-sm">G</span>
            </div>
            <span className="font-display font-bold text-white text-xl">Nkabom Fund</span>
          </div>
          <p className="text-sm text-green-200 leading-relaxed mb-5">
            Ghana's most trusted crowdfunding platform. Raising funds for the things that matter most — together.
          </p>
          <div className="flex gap-3">
            {[Facebook, Twitter, Instagram].map((Icon, i) => (
              <a key={i} href="#" className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Platform */}
        <div>
          <h4 className="font-bold text-sm uppercase tracking-wider text-[#F6A800] mb-4">Platform</h4>
          <ul className="space-y-2.5">
            {['How it Works','Start a Campaign','Explore Campaigns','Success Stories','Our Mission'].map(item => (
              <li key={item}>
                <Link to="/explore" className="text-sm text-green-200 hover:text-white transition-colors">{item}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h4 className="font-bold text-sm uppercase tracking-wider text-[#F6A800] mb-4">Categories</h4>
          <ul className="space-y-2.5">
            {['🏥 Medical','🕊️ Funeral','🎓 Education','💼 Business','🆘 Emergency','🤝 Community'].map(item => (
              <li key={item}>
                <Link to="/explore" className="text-sm text-green-200 hover:text-white transition-colors">{item}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-bold text-sm uppercase tracking-wider text-[#F6A800] mb-4">Contact</h4>
          <ul className="space-y-3">
            <li className="flex items-center gap-3 text-sm text-green-200">
              <Mail size={15} className="flex-shrink-0" />
              hello@ghcrowd.com.gh
            </li>
            <li className="flex items-center gap-3 text-sm text-green-200">
              <Phone size={15} className="flex-shrink-0" />
              +233 30 291 0001
            </li>
          </ul>
          <div className="mt-6 p-4 rounded-2xl bg-white/10">
            <p className="text-xs text-green-200 mb-3">All campaigns are verified by our team. Funds are disbursed only to approved campaigns.</p>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-[#F6A800] flex items-center justify-center">
                <span className="text-[10px] text-[#0B4D2B] font-bold">✓</span>
              </div>
              <span className="text-xs font-semibold text-[#F6A800]">Trusted & Secure Platform</span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-green-300">
          <p>© 2024 Nkabom Fund. Made with <Heart size={11} className="inline text-red-400" /> in Ghana 🇬🇭</p>
          
          <div className="flex items-center gap-4 grayscale opacity-50 hover:opacity-100 transition-opacity">
            <img src="https://res.cloudinary.com/dwsl2ktt2/image/upload/v1776085018/newmo_vwzw4r.png" className="h-4 w-auto brightness-0 invert" alt="MTN" />
            <img src="https://res.cloudinary.com/dwsl2ktt2/image/upload/v1776085086/tele_1_wfgluk.png" className="h-4 w-auto brightness-0 invert" alt="Telecel" />
            <img src="https://res.cloudinary.com/dwsl2ktt2/image/upload/v1776085165/download_1_jclht6.jpg" className="h-4 w-auto brightness-0 invert" alt="AirtelTigo" />
            <img src="https://res.cloudinary.com/dwsl2ktt2/image/upload/v1776085269/Visa-Logo-2006_vrk179.png" className="h-4 w-auto brightness-0 invert" alt="Visa" />
            <img src="https://res.cloudinary.com/dwsl2ktt2/image/upload/v1776085228/mastr_sotqfd.jpg" className="h-4 w-auto brightness-0 invert" alt="Mastercard" />
          </div>

          <div className="flex gap-5">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
