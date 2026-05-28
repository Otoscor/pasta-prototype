import { ArrowLeft, ShareNetwork, List, Robot } from '@phosphor-icons/react'

export default function Challenge({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex flex-col h-full bg-bg-primary text-text-primary overflow-y-auto">
      {/* Top Nav */}
      <div className="flex items-center justify-between px-base pt-7 pb-3">
        <button onClick={onBack} className="p-2 -ml-2">
          <ArrowLeft size={22} weight="regular" />
        </button>
        <div className="flex items-center gap-4">
          <ShareNetwork size={20} weight="regular" />
          <List         size={20} weight="regular" />
          <Robot        size={20} weight="regular" />
        </div>
      </div>

      {/* Hero Image */}
      <div className="relative mx-base rounded-xl overflow-hidden bg-bg-card h-48 flex flex-col items-center justify-end pb-5">
        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/90 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center opacity-20 text-8xl">
          👗
        </div>
        <h1 className="relative text-[22px] font-bold z-10">뱃살 빼기</h1>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-0 px-base pt-4 pb-2">
        {[
          { value: '51kg', label: '목표 체중' },
          { value: '2주',  label: '목표 기간' },
        ].map(m => (
          <div key={m.label} className="flex flex-col items-center">
            <span className="text-[40px] font-black leading-none">{m.value}</span>
            <span className="text-xs text-text-secondary mt-1">{m.label}</span>
          </div>
        ))}
      </div>

      {/* Motivational message */}
      <p className="text-center text-text-secondary text-sm px-xl py-3 leading-relaxed">
        2주 동안 4kg 감량으로<br />멋진 모습을 기대해 보세요!
      </p>

      {/* Week Card */}
      <div className="mx-base mt-2 bg-bg-card-el rounded-lg p-5">
        <div className="flex items-center justify-between mb-4">
          <span className="font-bold text-lg">1주차</span>
          <span className="bg-accent-mint text-text-on-accent text-xs font-medium px-3 py-1 rounded-md">
            진행중
          </span>
        </div>

        <div className="flex flex-col items-center gap-2 py-2">
          <span className="text-4xl">🥩</span>
          <p className="text-sm text-text-secondary text-center">2일치 기록으로</p>
          <p className="font-bold text-base text-center">삼겹살 1인분 정도 태웠어요.</p>
        </div>

        <div className="border-t border-border-dark mt-4 pt-3">
          <p className="text-sm text-text-secondary text-center">
            꾸준함은 가장 강한 무기! 멈추지 마세요! 💪
          </p>
        </div>
      </div>
    </div>
  )
}
