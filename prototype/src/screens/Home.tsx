import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChatCircle, Gift, Bell, Camera, CheckCircle, Info,
  ArrowClockwise, CaretRight, Notebook, ChartBar, ShoppingBag, Users, SquaresFour,
  ArrowDown, House, Scan, User,
  type Icon as PhosphorIcon,
} from '@phosphor-icons/react'

type NavState =
  | { mode: 'primary' }
  | { mode: 'contextual'; parentId: string }

const SHOP_SUB_NAV = [
  { id: 'shop-home', label: '홈',      icon: House },
  { id: 'shop-scan', label: '푸드스캔', icon: Scan },
  { id: 'shop-my',   label: '마이',     icon: User },
]

const NAV_ITEMS = [
  { id: 'today',     label: '오늘',    icon: Notebook,    subNav: null },
  { id: 'analysis',  label: '분석',    icon: ChartBar,    subNav: null },
  { id: 'shop',      label: '샵',      icon: ShoppingBag, subNav: SHOP_SUB_NAV },
  { id: 'community', label: '커뮤니티', icon: Users,       subNav: null },
  { id: 'all',       label: '전체',    icon: SquaresFour, subNav: null },
]

function RoutineCard({ active, kcal, label, icon: Icon, showInfo }: {
  active?: boolean
  kcal: string
  label: string
  icon?: PhosphorIcon
  showInfo?: boolean
}) {
  const bg = active ? 'bg-[#2A8C87]' : 'bg-bg-card'
  const textKcal = active ? 'text-white/70' : 'text-text-secondary'
  const textLabel = active ? 'text-white' : 'text-text-primary'
  const circleBg = active ? 'bg-black/20' : 'bg-bg-input'
  const iconColor = active ? 'text-white/60' : 'text-text-tertiary'

  return (
    <div className={`flex-none w-36 h-36 rounded-lg p-3 flex flex-col ${bg}`}>
      <div className="flex items-start justify-between mb-3">
        <div className={`w-[48px] h-[48px] rounded-full ${circleBg}`} />
        {Icon && <Icon size={18} weight="regular" className={iconColor} />}
      </div>
      <div className="flex-1" />
      <div className={`text-[14px] ${textKcal}`}>{kcal}</div>
      <div className={`flex items-center justify-between`}>
        <span className={`text-[16px] font-bold ${textLabel}`}>{label}</span>
        {showInfo && <Info size={12} weight="regular" className="text-text-tertiary" />}
      </div>
    </div>
  )
}

export default function Home({ onNavigate }: { onNavigate: (screen: string) => void }) {
  const [activeTab, setActiveTab] = useState<'weight' | 'sugar'>('weight')
  const [activeNav, setActiveNav] = useState('today')
  const [navState, setNavState] = useState<NavState>({ mode: 'primary' })
  const [activeSubNav, setActiveSubNav] = useState('shop-home')

  return (
    <div className="relative flex flex-col h-full bg-bg-primary text-text-primary overflow-hidden">
      {/* Fixed Top Header */}
      <div className="flex-none bg-bg-primary">
        {/* Top Header */}
        <div className="flex items-center justify-between px-base pb-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('weight')}
              className={`text-[22px] font-bold ${activeTab === 'weight' ? 'text-text-primary' : 'text-text-tertiary'}`}
            >
              체중
            </button>
            <button
              onClick={() => setActiveTab('sugar')}
              className={`text-[22px] font-bold ${activeTab === 'sugar' ? 'text-text-primary' : 'text-text-tertiary'}`}
            >
              혈당
            </button>
          </div>
          <div className="flex items-center gap-4">
            <ChatCircle size={22} weight="regular" className="text-text-secondary" />
            <Gift size={22} weight="regular" className="text-text-secondary" />
            <div className="relative">
              <Bell size={22} weight="regular" className="text-text-secondary" />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-orange-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto pb-[70px]" style={{ scrollbarWidth: 'none' }}>
        {/* 오늘 루틴 섹션 */}
        <section className="px-base mb-5">
          <div className="flex items-center justify-between mb-3">
            <span className="font-bold text-base">오늘 루틴</span>
            <button className="text-text-tertiary text-xs flex items-center gap-0.5">
              상세보기 <CaretRight size={12} weight="regular" />
            </button>
          </div>

          {/* 배너 카드 */}
          <div className="bg-bg-card rounded-lg px-4 py-3 flex items-center justify-between mb-3">
            <span className="text-sm text-text-secondary">
              3일차 루틴 완료시 <span className="text-accent font-bold">300P</span>
            </span>
            <div className="relative w-10 h-10">
              {/* Ring SVG */}
              <svg className="absolute inset-0" viewBox="0 0 40 40" fill="none">
                <circle cx="20" cy="20" r="17" stroke="#2E3648" strokeWidth="3" />
                <circle cx="20" cy="20" r="17" stroke="#F5C518" strokeWidth="3"
                  strokeLinecap="round" strokeDasharray="107" strokeDashoffset="75"
                  transform="rotate(-90 20 20)" />
              </svg>
              {/* P coin placeholder */}
              <div className="absolute inset-[6px] rounded-full bg-bg-input" />
            </div>
          </div>

          {/* 루틴 카드 가로 스크롤 */}
          <div className="flex gap-3 overflow-x-auto pb-1 -mx-base px-base" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <RoutineCard active kcal="400kcal" label="점심" icon={Camera} />
            <RoutineCard kcal="220kcal" label="운동" icon={CheckCircle} showInfo />
            <RoutineCard kcal="300kcal" label="아침" />
          </div>
        </section>

        {/* 혜택 섹션 */}
        <section className="px-base mb-5">
          <div className="flex items-center justify-between mb-3">
            <span className="font-bold text-base">혜택</span>
            <button className="text-text-tertiary text-xs flex items-center gap-0.5">
              더보기 <CaretRight size={12} weight="regular" />
            </button>
          </div>
          <div className="bg-bg-card rounded-lg p-4 flex items-center gap-3">
            <div className="w-16 h-16 bg-bg-input rounded-md flex-none" />
            <div className="flex-1 min-w-0">
              <div className="text-[11px] text-text-secondary mb-1">7일 연속 성공하면 130P</div>
              <div className="font-bold text-[18px]">출석 시작</div>
            </div>
            <CaretRight size={18} weight="regular" className="text-text-tertiary flex-none" />
          </div>
        </section>

        {/* 오늘의 걸음 섹션 */}
        {(() => {
          const STEP_MILESTONES = [
            { steps: 1000, points: 5  },
            { steps: 3000, points: 10 },
            { steps: 5000, points: 15 },
            { steps: 7000, points: 20 },
          ];
          const MAX_STEPS = 7000;
          const CURRENT_STEPS = 3200;
          return (
            <section className="px-base mb-5">
              <div className="bg-bg-card rounded-lg p-4">
                {/* 헤더 */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-bg-input rounded-md flex-none" />
                  <span className="font-bold text-[18px] flex-1">오늘의 걸음</span>
                  <ArrowClockwise size={16} weight="regular" className="text-text-tertiary" />
                </div>

                {/* 게이지바 + 라벨 컨테이너 */}
                <div className="mt-4">
                  {/* Row 2: 프로그레스 바 + 마커 */}
                  <div className="relative mb-1">
                  <div className="h-2 bg-border-dark rounded-full overflow-hidden">
                    <div
                      className="h-full bg-accent rounded-full"
                      style={{ width: `${(CURRENT_STEPS / MAX_STEPS) * 100}%` }}
                    />
                  </div>
                  {STEP_MILESTONES.map((m) => {
                    const pct = (m.steps / MAX_STEPS) * 100;
                    const achieved = CURRENT_STEPS >= m.steps;
                    const isLast = m.steps === MAX_STEPS;
                    return (
                      <div
                        key={m.steps}
                        className="absolute top-1/2 -translate-y-1/2"
                        style={{
                          left: `${pct}%`,
                          transform: `translateY(-50%) ${isLast ? 'translateX(-100%)' : 'translateX(-50%)'}`,
                        }}
                      >
                        <div
                          className={`w-3 h-3 rounded-full border-2 border-bg-card ${achieved ? 'bg-accent-hover' : 'bg-text-tertiary'}`}
                        />
                      </div>
                    );
                  })}
                </div>

                {/* Row 3: 라벨 행 */}
                <div className="relative h-5 mt-3">
                  {STEP_MILESTONES.map((m) => {
                    const pct = (m.steps / MAX_STEPS) * 100;
                    const achieved = CURRENT_STEPS >= m.steps;
                    const isLast = m.steps === MAX_STEPS;
                    return (
                      <div
                        key={m.steps}
                        className="absolute top-0 flex items-center justify-center"
                        style={{
                          left: `${pct}%`,
                          transform: isLast ? 'translateX(-100%)' : 'translateX(-50%)',
                        }}
                      >
                        {achieved ? (
                          <span className="text-[12px] font-bold text-accent whitespace-nowrap">{m.points}XP</span>
                        ) : (
                          <span className="text-[12px] text-text-tertiary whitespace-nowrap">{m.steps.toLocaleString()}보</span>
                        )}
                      </div>
                    );
                  })}
                </div>
                </div>
              </div>
            </section>
          );
        })()}

        {/* 기록 섹션 헤더 (부분 노출) */}
        <div className="px-base">
          <div className="flex items-center justify-between mb-3">
            <span className="font-bold text-base">기록</span>
            <button className="text-text-tertiary text-xs flex items-center gap-0.5">
              더보기 <CaretRight size={12} weight="regular" />
            </button>
          </div>
        </div>
      </div>

      {/* Nav — primary / contextual (sequenced) */}
      <AnimatePresence mode="wait">
        {navState.mode === 'primary' ? (

          /* ── Primary Bottom Tab Bar ── */
          <motion.div
            key="primary-bar"
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="absolute bottom-0 left-0 right-0 bg-bg-card border-t border-border-dark h-[64px] flex items-center justify-around px-2 pb-2"
          >
            {NAV_ITEMS.map(({ id, label, icon: Icon, subNav }) => {
              const isActive = activeNav === id
              return (
                <motion.button
                  key={id}
                  whileTap={{ scale: 0.88 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                  onClick={() => {
                    if (subNav) {
                      setNavState({ mode: 'contextual', parentId: id })
                      setActiveSubNav(subNav[0].id)
                      onNavigate(subNav[0].id)
                    } else {
                      setActiveNav(id)
                    }
                  }}
                  className={`flex flex-col items-center gap-1 min-w-[44px] justify-center
                    ${isActive ? 'text-accent' : 'text-text-tertiary'}`}
                >
                  <Icon size={24} weight={isActive ? 'fill' : 'regular'} />
                  <span className="text-[13px]">{label}</span>
                </motion.button>
              )
            })}
          </motion.div>

        ) : (

          /* ── Contextual Floating Tab Bar ── */
          <motion.div
            key="contextual-floating"
            initial={{ opacity: 0, y: 24, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.92 }}
            transition={{ duration: 0.22, ease: [0.34, 1.26, 0.64, 1] }}
            className="absolute bottom-5 left-0 right-0 mx-auto w-fit bg-bg-card border border-border-dark rounded-2xl shadow-2xl flex items-center px-2 py-2 h-[60px]"
          >
            <motion.button
              whileTap={{ scale: 0.88 }}
              transition={{ type: 'spring', stiffness: 500, damping: 25 }}
              onClick={() => setNavState({ mode: 'primary' })}
              className="w-10 h-10 rounded-full bg-bg-input flex items-center justify-center flex-none ml-1"
            >
              <ArrowDown size={20} weight="bold" className="text-text-secondary" />
            </motion.button>

            {SHOP_SUB_NAV.map(({ id, label, icon: Icon }) => {
              const isActive = activeSubNav === id
              return (
                <motion.button
                  key={id}
                  whileTap={{ scale: 0.88 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                  onClick={() => { setActiveSubNav(id); onNavigate(id) }}
                  className={`flex flex-col items-center gap-0.5 w-[72px] justify-center
                    ${isActive ? 'text-accent' : 'text-text-tertiary'}`}
                >
                  <Icon size={22} weight={isActive ? 'fill' : 'regular'} />
                  <span className="text-[11px] font-medium">{label}</span>
                </motion.button>
              )
            })}
          </motion.div>

        )}
      </AnimatePresence>
    </div>
  )
}
