export default function Logo({ className = "h-14 md:h-16" }: { className?: string }) {
  return (
    <div className={`flex items-center ${className} overflow-hidden`}>
      <img 
        src="/JuniFeup_Cinemas.webp" 
        alt="JuniFeup Cinemas" 
        className="h-28 md:h-36 w-auto object-contain"
        onError={(e) => {
          // Try other formats if webp fails
          const target = e.target as HTMLImageElement
          if (target.src.includes('JuniFeup_Cinemas.webp')) {
            target.src = '/JuniFeup_Cinemas.png'
          } else if (target.src.includes('JuniFeup_Cinemas.png')) {
            target.src = '/JuniFeup_Cinemas.jpg'
          } else {
            // Show fallback text if all images fail
            target.style.display = 'none'
            const fallback = document.createElement('div')
            fallback.className = 'flex flex-col text-white'
            fallback.innerHTML = `
              <span class="text-lg md:text-xl font-bold leading-tight">JuniFeup</span>
              <span class="text-xs md:text-sm font-medium opacity-90 uppercase tracking-wide">CINEMAS</span>
            `
            target.parentElement?.appendChild(fallback)
          }
        }}
      />
    </div>
  )
}
