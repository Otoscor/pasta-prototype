import { useState } from 'react'
import { X, Bookmark, MagnifyingGlass, Camera } from '@phosphor-icons/react'

const MEAL_TABS = [
  { id: 'breakfast', emoji: '🍳', label: '아침' },
  { id: 'lunch',     emoji: '☀️',  label: '점심' },
  { id: 'dinner',    emoji: '🌙', label: '저녁' },
  { id: 'snack',     emoji: '🍪', label: '간식' },
]

const FOOD_TAGS = [
  { id: 1, label: '리조또',    top: '38%', left: '12%' },
  { id: 2, label: '아메리카노', top: '18%', left: '52%' },
  { id: 3, label: '샌드위치',  top: '62%', left: '40%' },
]

export default function MealRecord({ onBack }: { onBack: () => void }) {
  const [activeTab, setActiveTab] = useState('snack')

  return (
    <div className="flex flex-col h-full bg-bg-primary text-text-primary overflow-y-auto">
      {/* Top Nav */}
      <div className="flex items-center justify-between px-base pt-7 pb-3">
        <button onClick={onBack} className="p-2 -ml-2">
          <X size={22} weight="regular" />
        </button>
        <div className="flex items-center gap-4">
          <Bookmark        size={22} weight="regular" />
          <MagnifyingGlass size={22} weight="regular" />
          <Camera          size={22} weight="regular" />
        </div>
      </div>

      {/* Title + CTA Badge */}
      <div className="flex items-center justify-between px-base pb-3">
        <h1 className="text-[22px] font-bold">식사기록</h1>
        <span className="bg-accent text-text-on-accent text-sm font-semibold px-4 py-1.5 rounded-full">
          음식을 추가해보세요!
        </span>
      </div>

      {/* Meal Type Tabs */}
      <div className="flex gap-2 px-base pb-4 overflow-x-auto scrollbar-none">
        {MEAL_TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === tab.id
                ? 'bg-bg-card text-text-primary border border-border-dark'
                : 'text-text-secondary'
            }`}
          >
            <span>{tab.emoji}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Date / Time inputs */}
      <div className="grid grid-cols-2 gap-3 px-base pb-4">
        {[
          { label: '식사 날짜', value: '25.09.07' },
          { label: '식사 시간', value: '오후 4:06' },
        ].map(item => (
          <div key={item.label} className="bg-bg-input rounded-md px-4 py-3 flex flex-col gap-0.5">
            <span className="text-xs text-text-secondary">{item.label}</span>
            <div className="flex items-center justify-between">
              <span className="text-base font-bold">{item.value}</span>
              <span className="text-text-secondary text-xs">▾</span>
            </div>
          </div>
        ))}
      </div>

      {/* Food Photo */}
      <div className="relative mx-base rounded-lg overflow-hidden bg-bg-card">
        <div className="w-full h-52 bg-gradient-to-br from-bg-card to-bg-secondary flex items-center justify-center">
          <span className="text-text-tertiary text-sm">📷 사진 영역</span>
        </div>

        {/* Close button */}
        <button className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/50 flex items-center justify-center">
          <X size={14} weight="bold" />
        </button>

        {/* Food tags */}
        {FOOD_TAGS.map(tag => (
          <span
            key={tag.id}
            className="absolute bg-accent-red text-white text-xs font-medium px-2 py-0.5 rounded-md"
            style={{ top: tag.top, left: tag.left }}
          >
            {tag.id} {tag.label}
          </span>
        ))}
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* CTA Button */}
      <div className="px-base pb-4 pt-3">
        <button className="w-full bg-accent text-text-on-accent font-semibold text-base py-3.5 rounded-md active:scale-95 transition-transform">
          기록완료
        </button>
      </div>
    </div>
  )
}
