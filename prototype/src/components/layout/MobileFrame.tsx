// 브라우저에서 모바일 화면을 시뮬레이션하는 폰 프레임
export default function MobileFrame({ children, lightMode = false }: { children: React.ReactNode; lightMode?: boolean }) {
  return (
    <div className={`relative w-[390px] h-[844px] rounded-[32px] overflow-hidden shadow-2xl flex flex-col ${lightMode ? 'bg-lt-bg' : 'bg-bg-primary border border-white/10'}`}>
      {/* Status Bar */}
      <div className="flex-shrink-0 h-6" />

      {/* Screen content */}
      <div className="flex-1 min-h-0 relative">
        {children}
      </div>
    </div>
  )
}
