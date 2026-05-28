import { Scan, MagnifyingGlass } from '@phosphor-icons/react'
import ShopSubNav from '../components/ShopSubNav'


export default function FoodScan({
  onBack,
  onScan,
  onSearch,
  onNavigate,
}: {
  onBack: () => void
  onScan: () => void
  onSearch: () => void
  onNavigate: (id: string) => void
}) {
  return (
    <div className="relative flex flex-col h-full bg-lt-bg text-lt-text">

      {/* Title */}
      <div className="px-base pt-[52px] pb-8">
        <p className="text-[26px] font-semibold text-lt-text leading-tight">
          내 몸에 맞는<br />프로틴 음료 찾기
        </p>
      </div>

      {/* CTAs */}
      <div className="px-base flex gap-3">

        {/* Primary — Scan */}
        <button
          onClick={onScan}
          className="flex-1 h-[96px] bg-accent text-text-on-accent rounded-2xl
                     flex flex-col items-center justify-center gap-2 active:opacity-90 transition-opacity"
        >
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
            <Scan size={22} weight="bold" />
          </div>
          <p className="text-[15px] font-bold leading-none">스캔하기</p>
        </button>

        {/* Secondary — Search */}
        <button
          onClick={onSearch}
          className="flex-1 h-[96px] bg-lt-card text-lt-text rounded-2xl
                     flex flex-col items-center justify-center gap-2 active:opacity-80 transition-opacity"
        >
          <div className="w-10 h-10 rounded-xl bg-lt-input flex items-center justify-center">
            <MagnifyingGlass size={22} weight="regular" className="text-lt-secondary" />
          </div>
          <p className="text-[15px] font-semibold leading-none">직접 검색하기</p>
        </button>

      </div>

      {/* Sub-nav */}
      <ShopSubNav activeId="shop-scan" onBack={onBack} onNavigate={onNavigate} />

    </div>
  )
}
