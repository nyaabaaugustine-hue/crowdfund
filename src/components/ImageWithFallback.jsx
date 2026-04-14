import { useState } from 'react'
import { Image as ImageIcon } from 'lucide-react'

export default function ImageWithFallback({ 
  src, 
  alt, 
  className, 
  style,
  fallbackBg = '#F0EDE4'
}) {
  const [hasError, setHasError] = useState(false)
  
  if (hasError || !src) {
    return (
      <div 
        className={className} 
        style={{ 
          ...style, 
          background: fallbackBg, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          minHeight: style?.minHeight || '100px'
        }}
      >
        <ImageIcon size={24} className="text-gray-400" />
      </div>
    )
  }
  
  return (
    <img
      src={src}
      alt={alt || ''}
      className={className}
      style={style}
      onError={() => setHasError(true)}
    />
  )
}
