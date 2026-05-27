// 브라우저에서 모바일 화면을 시뮬레이션하는 폰 프레임
export default function MobileFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-[390px] h-[844px] rounded-[32px] overflow-hidden shadow-2xl border border-white/10 bg-bg-primary flex flex-col">
      {/* Status Bar */}
      <div className="flex-shrink-0 h-11" />

      {/* Screen content */}
      <div className="flex-1 min-h-0 relative">
        {children}
      </div>
    </div>
  )
}
