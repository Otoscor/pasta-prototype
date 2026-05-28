import ShopSubNav from '../components/ShopSubNav'

export default function ShopMy({
  onBack,
  onNavigate,
}: {
  onBack: () => void
  onNavigate: (id: string) => void
}) {
  return (
    <div className="relative flex flex-col h-full bg-lt-bg text-lt-text overflow-hidden">
      <div
        className="flex-1 overflow-y-auto pb-[100px]"
        style={{ scrollbarWidth: 'none' } as React.CSSProperties}
      >

        {/* Header */}
        <div className="px-base pt-10 pb-2">
          <span className="text-[18px] font-bold">주문/배송 현황</span>
        </div>

        {/* ── 프로필 스켈레톤 ── */}
        <div className="mx-base mt-2 mb-3 bg-lt-card rounded-2xl px-4 py-4 flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-lt-border flex-none" />
          <div className="flex-1 flex flex-col gap-2">
            <div className="h-4 w-24 rounded-full bg-lt-border" />
            <div className="h-3 w-32 rounded-full bg-lt-border" />
          </div>
          <div className="h-3 w-16 rounded-full bg-lt-border flex-none" />
        </div>

        {/* ── 주문/배송 현황 스켈레톤 ── */}
        <div className="mx-base mb-3 bg-lt-card rounded-2xl p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="h-4 w-28 rounded-full bg-lt-border" />
            <div className="h-3 w-10 rounded-full bg-lt-border" />
          </div>
          <div className="flex items-start justify-around">
            {[0, 1, 2, 3].map(i => (
              <div key={i} className="flex flex-col items-center gap-2 flex-1">
                <div className="w-12 h-12 rounded-2xl bg-lt-input" />
                <div className="h-2.5 w-10 rounded-full bg-lt-border" />
              </div>
            ))}
          </div>
        </div>

        {/* ── 최근 구매 내역 스켈레톤 ── */}
        <div className="mx-base mb-3 bg-lt-card rounded-2xl p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="h-4 w-24 rounded-full bg-lt-border" />
            <div className="h-3 w-10 rounded-full bg-lt-border" />
          </div>
          <div className="flex flex-col">
            {[0, 1, 2].map(i => (
              <div key={i} className="flex items-center gap-3 py-3">
                <div className="w-14 h-14 rounded-xl bg-lt-input flex-none" />
                <div className="flex-1 flex flex-col gap-2">
                  <div className="h-3 w-full rounded-full bg-lt-border" />
                  <div className="h-3 w-2/3 rounded-full bg-lt-border" />
                  <div className="h-5 w-16 rounded-full bg-lt-input" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── 설정 메뉴 스켈레톤 ── */}
        <div className="mx-base mb-6 bg-lt-card rounded-2xl overflow-hidden">
          {[0, 1, 2, 3, 4].map(i => (
            <div key={i} className="flex items-center gap-3 px-4 h-[52px]">
              <div className="w-5 h-5 rounded-md bg-lt-border flex-none" />
              <div className="h-3 w-28 rounded-full bg-lt-border flex-1" />
              <div className="w-3 h-3 rounded-full bg-lt-border flex-none" />
            </div>
          ))}
        </div>

      </div>

      <ShopSubNav activeId="shop-my" onBack={onBack} onNavigate={onNavigate} />
    </div>
  )
}
