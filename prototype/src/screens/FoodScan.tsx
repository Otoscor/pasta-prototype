import { Scan, MagnifyingGlass, ArrowLeft, Lightning } from '@phosphor-icons/react'

const RECENT_FOODS = [
  { id: 1, emoji: '🍗', name: '닭가슴살', kcal: 165 },
  { id: 2, emoji: '🍚', name: '현미밥', kcal: 310 },
  { id: 3, emoji: '🥚', name: '삶은 달걀', kcal: 78 },
  { id: 4, emoji: '🥗', name: '샐러드', kcal: 120 },
  { id: 5, emoji: '🍌', name: '바나나', kcal: 89 },
]

export default function FoodScan({
  onBack,
  onScan,
  onSearch,
}: {
  onBack: () => void
  onScan: () => void
  onSearch: () => void
}) {
  return (
    <div className="flex flex-col h-full bg-bg-primary text-text-primary">

      {/* Header */}
      <div className="flex items-center gap-3 px-base pt-4 pb-3">
        <button onClick={onBack} className="w-10 h-10 flex items-center justify-center -ml-2">
          <ArrowLeft size={22} weight="bold" />
        </button>
        <span className="text-[18px] font-bold">음식 기록</span>
      </div>

      {/* Title */}
      <div className="px-base pt-4 pb-8">
        <p className="text-[26px] font-black text-text-primary leading-tight">
          오늘 뭐 드셨나요?
        </p>
        <p className="text-[14px] text-text-secondary mt-1.5">
          AI가 칼로리를 자동으로 분석해요
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
          className="flex-1 h-[96px] bg-bg-card text-text-primary rounded-2xl
                     flex flex-col items-center justify-center gap-2 active:opacity-80 transition-opacity"
        >
          <div className="w-10 h-10 rounded-xl bg-bg-input flex items-center justify-center">
            <MagnifyingGlass size={22} weight="regular" className="text-text-secondary" />
          </div>
          <p className="text-[15px] font-semibold leading-none">직접 검색하기</p>
        </button>

      </div>

      {/* Divider */}
      <div className="flex items-center gap-3 px-base mt-8 mb-4">
        <div className="flex-1 h-px bg-border-dark" />
        <span className="text-[12px] text-text-tertiary">최근 기록</span>
        <div className="flex-1 h-px bg-border-dark" />
      </div>

      {/* Recent foods */}
      <div
        className="flex gap-2.5 overflow-x-auto px-base pb-2"
        style={{ scrollbarWidth: 'none' } as React.CSSProperties}
      >
        {RECENT_FOODS.map(food => (
          <button
            key={food.id}
            className="flex-none flex flex-col items-center gap-2 bg-bg-card rounded-2xl px-4 py-3
                       active:opacity-80 transition-opacity min-w-[80px]"
          >
            <span className="text-[28px] leading-none">{food.emoji}</span>
            <span className="text-[12px] font-medium text-text-primary whitespace-nowrap">{food.name}</span>
            <span className="text-[11px] text-text-tertiary">{food.kcal}kcal</span>
          </button>
        ))}
      </div>

      {/* Today summary banner */}
      <div className="mx-base mt-6 bg-bg-card rounded-2xl px-4 py-3 flex items-center gap-3">
        <Lightning size={18} weight="fill" className="text-accent flex-none" />
        <div className="flex-1">
          <span className="text-[13px] text-text-secondary">오늘 섭취</span>
          <span className="text-[13px] font-bold text-text-primary ml-1.5">1,240</span>
          <span className="text-[13px] text-text-tertiary"> / 1,800 kcal</span>
        </div>
        <div className="flex-none">
          <div className="w-[80px] h-1.5 rounded-full bg-bg-input overflow-hidden">
            <div className="h-full rounded-full bg-accent" style={{ width: '69%' }} />
          </div>
        </div>
      </div>

    </div>
  )
}
