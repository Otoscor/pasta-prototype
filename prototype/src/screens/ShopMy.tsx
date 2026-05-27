import {
  ArrowLeft, CreditCard, Package, Truck, CheckCircle,
  CaretRight, Bell, Clipboard, Headset, SignOut, Target,
} from '@phosphor-icons/react'

// ─── Mock data ────────────────────────────────────────────────────────────────

const ORDER_STEPS = [
  { id: 'paid',     label: '결제완료', icon: CreditCard,   count: 0 },
  { id: 'ready',    label: '배송준비', icon: Package,      count: 1 },
  { id: 'shipping', label: '배송중',   icon: Truck,        count: 2 },
  { id: 'done',     label: '배송완료', icon: CheckCircle,  count: 0 },
]


const RECENT_ORDERS = [
  {
    id: 'o1',
    name: '뉴트리데이 단백질 드링크 바닐라',
    price: 12900,
    date: '2025.05.20',
    status: '배송완료',
    canReview: true,
  },
  {
    id: 'o2',
    name: '네이처메이드 멀티비타민 90정',
    price: 22000,
    date: '2025.05.15',
    status: '배송완료',
    canReview: true,
  },
  {
    id: 'o3',
    name: '바이오나 프리미엄 유청단백질',
    price: 34900,
    date: '2025.05.08',
    status: '배송중',
    canReview: false,
  },
]

const SETTINGS = [
  { icon: Target,    label: '건강 목표 설정' },
  { icon: Bell,      label: '알림 설정' },
  { icon: Clipboard, label: '이용약관' },
  { icon: Headset,   label: '고객센터' },
]

// ─── Component ────────────────────────────────────────────────────────────────

export default function ShopMy({ onBack }: { onBack: () => void }) {
  return (
    <div className="relative flex flex-col h-full bg-bg-primary text-text-primary overflow-hidden">
    <div
      className="flex-1 overflow-y-auto"
      style={{ scrollbarWidth: 'none' } as React.CSSProperties}
    >

      {/* Header */}
      <div className="flex items-center gap-3 px-base pt-4 pb-2">
        <button onClick={onBack} className="w-10 h-10 flex items-center justify-center -ml-2">
          <ArrowLeft size={22} weight="bold" />
        </button>
        <span className="text-[18px] font-bold">마이</span>
      </div>

      {/* ── 프로필 ── */}
      <div className="mx-base mt-2 mb-3 bg-bg-card rounded-2xl px-4 py-4 flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-accent/20 flex items-center justify-center flex-none">
          <span className="text-[22px] font-black text-accent">K</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[17px] font-bold text-text-primary">김파스타</p>
          <p className="text-[13px] text-text-secondary mt-0.5">PASTA 실버 등급 🥈</p>
        </div>
        <div className="flex items-center gap-1 flex-none">
          <span className="text-[13px] text-text-tertiary">건강점수</span>
          <span className="text-[15px] font-black text-accent ml-1">87</span>
          <CaretRight size={14} className="text-text-tertiary" />
        </div>
      </div>

      {/* ── 주문/배송 현황 ── */}
      <div className="mx-base mb-3 bg-bg-card rounded-2xl p-4">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[15px] font-bold text-text-primary">주문/배송 현황</span>
          <button className="flex items-center gap-0.5 text-[13px] text-text-tertiary">
            전체 <CaretRight size={13} />
          </button>
        </div>

        <div className="flex items-start justify-around">
          {ORDER_STEPS.map(({ id, label, icon: Icon, count }, i) => (
            <div key={id} className="flex flex-col items-center gap-2 flex-1">
              {/* icon + badge */}
              <div className="relative">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center
                  ${count > 0 ? 'bg-accent/15' : 'bg-bg-input'}`}>
                  <Icon
                    size={22}
                    weight={count > 0 ? 'fill' : 'regular'}
                    className={count > 0 ? 'text-accent' : 'text-text-tertiary'}
                  />
                </div>
                {count > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-accent
                                   text-text-on-accent text-[11px] font-bold
                                   flex items-center justify-center">
                    {count}
                  </span>
                )}
              </div>

              {/* connector line (between icons) */}
              {i < ORDER_STEPS.length - 1 && (
                <div className="absolute" />
              )}

              <span className={`text-[11px] font-medium ${count > 0 ? 'text-accent' : 'text-text-tertiary'}`}>
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>


      {/* ── 최근 구매 내역 ── */}
      <div className="mx-base mb-3 bg-bg-card rounded-2xl p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[15px] font-bold text-text-primary">최근 구매 내역</span>
          <button className="flex items-center gap-0.5 text-[13px] text-text-tertiary">
            전체 <CaretRight size={13} />
          </button>
        </div>

        <div className="divide-y divide-border-dark">
          {RECENT_ORDERS.map((order) => (
            <div key={order.id} className="flex items-center gap-3 py-3">
              {/* Thumbnail */}
              <div className="w-14 h-14 rounded-xl bg-bg-input flex-none flex items-center justify-center">
                <span className="text-[11px] text-text-tertiary">이미지</span>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-semibold text-text-primary truncate">{order.name}</p>
                <p className="text-[12px] text-text-tertiary mt-0.5">
                  {order.price.toLocaleString()}원 · {order.date}
                </p>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full
                    ${order.status === '배송완료'
                      ? 'bg-bg-input text-text-secondary'
                      : 'bg-accent/15 text-accent'}`}>
                    {order.status}
                  </span>
                  {order.canReview && (
                    <button className="text-[11px] text-text-tertiary underline underline-offset-2">
                      리뷰 쓰기
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── 설정 메뉴 + 로그아웃 ── */}
      <div className="mx-base mb-6 bg-bg-card rounded-2xl overflow-hidden divide-y divide-border-dark">
        {SETTINGS.map(({ icon: Icon, label }) => (
          <button
            key={label}
            className="w-full flex items-center gap-3 px-4 h-[52px] active:opacity-70 transition-opacity"
          >
            <Icon size={18} className="text-text-secondary flex-none" />
            <span className="flex-1 text-left text-[14px] text-text-primary">{label}</span>
            <CaretRight size={14} className="text-text-tertiary" />
          </button>
        ))}
        <button className="w-full flex items-center gap-3 px-4 h-[52px] active:opacity-70 transition-opacity">
          <SignOut size={18} className="text-accent-red flex-none" />
          <span className="text-[14px] text-accent-red">로그아웃</span>
        </button>
      </div>

    </div>
    </div>
  )
}
