import { useState, useEffect, useRef } from 'react'
import { X, Check, Link2, Share2 } from 'lucide-react'
import { formatGHS } from '../data/seed'

const LOGO_URL =
  'https://res.cloudinary.com/dwsl2ktt2/image/upload/v1776084296/logo_zsmxnf.png'

/* ─── SVG icons kept inline so we have zero extra deps ─── */
function FBIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#1877F2">
      <path d="M24 12.073C24 5.403 18.627 0 12 0S0 5.403 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.313 0 2.686.236 2.686.236v2.97h-1.513c-1.49 0-1.956.93-1.956 1.886v2.268h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
    </svg>
  )
}
function XIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}
function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#0A66C2">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}
function WAIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#25D366">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

const SOCIALS = [
  {
    id: 'facebook',
    label: 'Facebook',
    Icon: FBIcon,
    bg: '#E7F0FD',
    hoverBg: '#1877F2',
    hoverText: 'white',
  },
  {
    id: 'twitter',
    label: 'X',
    Icon: XIcon,
    bg: '#F0F0F0',
    hoverBg: '#000',
    hoverText: 'white',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    Icon: LinkedInIcon,
    bg: '#E8F0FA',
    hoverBg: '#0A66C2',
    hoverText: 'white',
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    Icon: WAIcon,
    bg: '#E8F9EF',
    hoverBg: '#25D366',
    hoverText: 'white',
  },
]

export default function ShareModal({ campaign, onClose }) {
  const [copied, setCopied] = useState(false)
  const [visible, setVisible] = useState(false)
  const inputRef = useRef(null)

  const campaignUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}/campaign/${campaign.id}`
      : ''

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(campaignUrl)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(campaignUrl)}&text=${encodeURIComponent(`Support "${campaign.title}" on Nkabom Fund 🇬🇭`)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(campaignUrl)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`Support "${campaign.title}" on Nkabom Fund 🇬🇭\n${campaignUrl}`)}`,
  }

  /* mount → animate in */
  useEffect(() => {
    // lock body scroll
    document.body.style.overflow = 'hidden'
    const raf = requestAnimationFrame(() => setVisible(true))
    return () => {
      cancelAnimationFrame(raf)
      document.body.style.overflow = ''
    }
  }, [])

  const handleClose = () => {
    setVisible(false)
    setTimeout(onClose, 280) // let exit animation finish
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(campaignUrl).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    })
    /* also select the input text */
    inputRef.current?.select()
  }

  const handleSocialClick = (id) => {
    window.open(shareLinks[id], '_blank', 'width=640,height=480,noopener')
  }

  /* native share API on mobile */
  const handleNativeShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Support "${campaign.title}" on Nkabom Fund`,
        text: `Help raise funds — every donation makes a difference! 🇬🇭`,
        url: campaignUrl,
      })
    }
  }

  const pct = Math.min(
    Math.round((campaign.raised / campaign.target) * 100),
    100
  )

  return (
    <>
      {/* ── Inline keyframes ── */}
      <style>{`
        @keyframes smOverlayIn  { from { opacity:0 } to { opacity:1 } }
        @keyframes smOverlayOut { from { opacity:1 } to { opacity:0 } }
        @keyframes smSheetIn    { from { opacity:0; transform:translateY(32px) scale(0.97) } to { opacity:1; transform:translateY(0) scale(1) } }
        @keyframes smSheetOut   { from { opacity:1; transform:translateY(0) scale(1) } to { opacity:0; transform:translateY(24px) scale(0.97) } }
        @keyframes smBtnPop     { 0%{transform:scale(1)} 40%{transform:scale(0.92)} 100%{transform:scale(1)} }
        .sm-social-btn:hover .sm-icon-wrap { transform: scale(1.12); }
        .sm-social-btn .sm-icon-wrap { transition: transform .18s cubic-bezier(.34,1.56,.64,1); }
        .sm-copy-success { animation: smBtnPop .3s ease; }
      `}</style>

      {/* ── Backdrop ── */}
      <div
        onClick={handleClose}
        style={{
          position: 'fixed', inset: 0,
          background: 'rgba(10,20,15,0.55)',
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)',
          zIndex: 9990,
          animation: `${visible ? 'smOverlayIn' : 'smOverlayOut'} .28s ease both`,
        }}
      />

      {/* ── Sheet ── */}
      <div
        style={{
          position: 'fixed', top: 0, left: 0, right: 0,
          display: 'flex', flexDirection: 'column',
          padding: '16px',
          zIndex: 9991,
          pointerEvents: 'none',
          maxHeight: '100vh', overflowY: 'auto',
        }}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            pointerEvents: 'auto',
            width: '100%', maxWidth: '420px',
            background: 'white',
            borderRadius: '28px',
            boxShadow: '0 32px 80px rgba(0,0,0,0.22), 0 2px 8px rgba(0,0,0,0.08)',
            overflow: 'hidden',
            animation: `${visible ? 'smSheetIn' : 'smSheetOut'} .28s cubic-bezier(.22,1,.36,1) both`,
          }}
        >
          {/* ── Ghana kente top bar ── */}
          <div style={{ height: '4px', background: 'linear-gradient(90deg,#CE1126 25%,#FCD116 25% 50%,#006B3F 50% 75%,#1A1A1A 75%)' }} />

          {/* ── Header ── */}
          <div style={{ padding: '20px 20px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <img src={LOGO_URL} alt="Nkabom Fund" style={{ width: 36, height: 36, objectFit: 'contain' }} />
              <div>
                <p style={{ fontWeight: 800, fontSize: 15, color: '#111', margin: 0, lineHeight: 1.2 }}>
                  Share this Campaign
                </p>
                <p style={{ fontSize: 12, color: '#9CA3AF', margin: 0 }}>Help raise awareness!</p>
              </div>
            </div>
            <button
              onClick={handleClose}
              style={{
                width: 34, height: 34, borderRadius: '50%',
                background: '#F3F4F6', border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
                transition: 'background .15s',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = '#E5E7EB')}
              onMouseLeave={e => (e.currentTarget.style.background = '#F3F4F6')}
            >
              <X size={16} color="#6B7280" />
            </button>
          </div>

          {/* ── Campaign preview card ── */}
          <div style={{ padding: '16px 20px 0' }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 12,
              background: '#F9F6EF', borderRadius: 16, padding: '12px 14px',
              border: '1px solid #F0EDE4',
            }}>
              <img
                src={campaign.image}
                alt={campaign.title}
                style={{ width: 52, height: 52, borderRadius: 10, objectFit: 'cover', flexShrink: 0 }}
                onError={e => { e.target.style.background = '#E5DFD3'; e.target.src = '' }}
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{
                  fontWeight: 700, fontSize: 13, color: '#111',
                  margin: '0 0 4px', overflow: 'hidden',
                  display: '-webkit-box', WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical', lineHeight: 1.35,
                }}>
                  {campaign.title}
                </p>
                {/* mini progress */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ flex: 1, height: 4, background: '#E5DFD3', borderRadius: 99, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${pct}%`, background: '#0B4D2B', borderRadius: 99 }} />
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#0B4D2B', whiteSpace: 'nowrap' }}>
                    {formatGHS(campaign.raised)} raised
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ── Social buttons ── */}
          <div style={{ padding: '18px 20px 0' }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 10px' }}>
              Share via
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
              {SOCIALS.map(({ id, label, Icon, bg }) => (
                <button
                  key={id}
                  className="sm-social-btn"
                  onClick={() => handleSocialClick(id)}
                  style={{
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', gap: 7,
                    padding: '12px 6px',
                    borderRadius: 14,
                    background: bg,
                    border: '1.5px solid transparent',
                    cursor: 'pointer',
                    transition: 'all .18s ease',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-2px)'
                    e.currentTarget.style.boxShadow = '0 6px 18px rgba(0,0,0,0.12)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  <div className="sm-icon-wrap" style={{ lineHeight: 0 }}>
                    <Icon />
                  </div>
                  <span style={{ fontSize: 10, fontWeight: 700, color: '#374151' }}>{label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* ── Native share (mobile only) ── */}
          {typeof navigator !== 'undefined' && 'share' in navigator && (
            <div style={{ padding: '12px 20px 0' }}>
              <button
                onClick={handleNativeShare}
                style={{
                  width: '100%', padding: '11px',
                  borderRadius: 14, border: '1.5px solid #E5DFD3',
                  background: 'white', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  fontWeight: 700, fontSize: 13, color: '#374151',
                  transition: 'background .15s',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = '#F9F6EF')}
                onMouseLeave={e => (e.currentTarget.style.background = 'white')}
              >
                <Share2 size={16} color="#0B4D2B" /> More options…
              </button>
            </div>
          )}

          {/* ── Copy link ── */}
          <div style={{ padding: '14px 20px 0' }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 8px' }}>
              Or copy link
            </p>
            <div style={{ display: 'flex', gap: 8 }}>
              <div style={{
                flex: 1, display: 'flex', alignItems: 'center', gap: 8,
                border: '1.5px solid #E5DFD3', borderRadius: 12,
                padding: '0 12px', background: '#FAFAFA',
                overflow: 'hidden',
              }}>
                <Link2 size={14} color="#9CA3AF" style={{ flexShrink: 0 }} />
                <input
                  ref={inputRef}
                  readOnly
                  value={campaignUrl}
                  onClick={e => e.target.select()}
                  style={{
                    flex: 1, border: 'none', background: 'transparent',
                    fontSize: 12, color: '#6B7280', outline: 'none',
                    padding: '10px 0', minWidth: 0,
                    fontFamily: 'inherit',
                  }}
                />
              </div>
              <button
                className={copied ? 'sm-copy-success' : ''}
                onClick={handleCopy}
                style={{
                  padding: '0 18px',
                  borderRadius: 12,
                  border: 'none',
                  background: copied ? '#0B4D2B' : '#111',
                  color: 'white',
                  fontWeight: 700, fontSize: 13,
                  cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: 6,
                  flexShrink: 0,
                  transition: 'background .2s',
                  whiteSpace: 'nowrap',
                }}
              >
                {copied ? (
                  <><Check size={14} /> Copied!</>
                ) : (
                  'Copy'
                )}
              </button>
            </div>
          </div>

          {/* ── Footer / close ── */}
          <div style={{ padding: '16px 20px 20px', textAlign: 'center' }}>
            <button
              onClick={handleClose}
              style={{
                background: 'none', border: 'none',
                fontSize: 13, color: '#9CA3AF',
                cursor: 'pointer', fontWeight: 600,
                transition: 'color .15s',
                padding: '6px 16px',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = '#374151')}
              onMouseLeave={e => (e.currentTarget.style.color = '#9CA3AF')}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
