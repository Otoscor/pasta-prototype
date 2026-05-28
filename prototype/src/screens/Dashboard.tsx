import { House, ChartBar, Gear, Plus, Fire, Timer, ForkKnife } from '@phosphor-icons/react'
import { useState } from 'react'

const DAYS = [
  { day: 'Sun', date: 7,  progress: 0 },
  { day: 'Mon', date: 8,  progress: 0.3 },
  { day: 'Tue', date: 9,  progress: 0.6 },
  { day: 'Wed', date: 10, progress: 0.8 },
  { day: 'Thu', date: 11, progress: 1,   isToday: false },
  { day: 'Fri', date: 12, progress: 0.4, isToday: true },
  { day: 'Sat', date: 13, progress: 0 },
]

const NUTRIENTS = [
  { label: 'Protein left', value: '105g', color: '#FF3B30', progress: 0.6 },
  { label: 'Carbs left',   value: '129g', color: '#FF9500', progress: 0.4 },
  { label: 'Fat over',     value: '22g',  color: '#007AFF', progress: 1.0 },
]

const tabs = [
  { icon: House,    label: 'Home' },
  { icon: ChartBar, label: 'Progress' },
  { icon: Gear, label: 'Settings' },
]

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <div className="flex flex-col h-full bg-lt-bg font-sans">
      <div className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-base pt-8 pb-2 bg-lt-bg">
          <div className="flex items-center gap-2">
            <span className="text-xl">🍎</span>
            <span className="text-lt-text font-bold text-lg">Cal AI</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white rounded-full px-3 py-1.5 shadow-sm">
            <Fire size={16} className="text-orange-500" />
            <span className="text-lt-text font-semibold text-sm">1</span>
          </div>
        </div>

        {/* Weekly Calendar */}
        <div className="flex justify-between px-base pb-3">
          {DAYS.map(d => (
            <div key={d.date} className="flex flex-col items-center gap-1">
              <span className="text-[10px] text-lt-secondary">{d.day}</span>
              <div className={`w-9 h-9 rounded-full flex items-center justify-center relative ${
                d.isToday ? 'bg-white shadow' : ''
              }`}>
                {d.progress > 0 && (
                  <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="15" fill="none" stroke="#E5E5EA" strokeWidth="2.5" />
                    <circle
                      cx="18" cy="18" r="15" fill="none"
                      stroke={d.isToday ? '#34C759' : '#34C759'}
                      strokeWidth="2.5"
                      strokeDasharray={`${d.progress * 94} 94`}
                      strokeLinecap="round"
                    />
                  </svg>
                )}
                <span className={`text-sm font-semibold z-10 ${
                  d.isToday ? 'text-lt-text' : 'text-lt-secondary'
                }`}>{d.date}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Calorie Card */}
        <div className="mx-base mb-3 bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[42px] font-black text-lt-text leading-none">738</div>
              <div className="text-lt-secondary text-sm mt-1">Calories left</div>
              <div className="flex items-center gap-3 mt-2">
                <span className="flex items-center gap-1 text-lt-secondary text-xs">
                  <Timer size={13} /> +200
                </span>
                <span className="flex items-center gap-1 text-lt-secondary text-xs">
                  <ForkKnife size={13} /> +1,118
                </span>
              </div>
            </div>
            {/* Donut gauge */}
            <div className="relative w-20 h-20">
              <svg className="-rotate-90 w-full h-full" viewBox="0 0 80 80">
                <circle cx="40" cy="40" r="30" fill="none" stroke="#E5E5EA" strokeWidth="8" />
                <circle
                  cx="40" cy="40" r="30" fill="none"
                  stroke="#1C1C1E" strokeWidth="8"
                  strokeDasharray="113 188" strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <Fire size={20} className="text-lt-text" />
              </div>
            </div>
          </div>
        </div>

        {/* Nutrient Cards */}
        <div className="grid grid-cols-3 gap-2 mx-base mb-3">
          {NUTRIENTS.map(n => (
            <div key={n.label} className="bg-white rounded-lg p-3 shadow-sm">
              <div className="text-lg font-bold text-lt-text">{n.value}</div>
              <div className="text-[10px] text-lt-secondary mb-2">{n.label}</div>
              <div className="relative w-12 h-12 mx-auto">
                <svg className="-rotate-90 w-full h-full" viewBox="0 0 48 48">
                  <circle cx="24" cy="24" r="18" fill="none" stroke="#F2F2F7" strokeWidth="5" />
                  <circle
                    cx="24" cy="24" r="18" fill="none"
                    stroke={n.color} strokeWidth="5"
                    strokeDasharray={`${n.progress * 113} 113`}
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* Recently uploaded */}
        <div className="px-base pb-3">
          <h2 className="text-lt-text font-bold text-base mb-2">Recently uploaded</h2>
          <div className="bg-white rounded-lg p-3 shadow-sm flex items-start gap-3">
            <div className="w-14 h-14 rounded-md bg-lt-bg flex-shrink-0 overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-green-200 to-green-400 flex items-center justify-center text-2xl">🥗</div>
            </div>
            <div className="flex-1">
              <div className="text-lt-red font-semibold text-sm">No label detected</div>
              <div className="text-lt-secondary text-xs mt-0.5">Please retake the picture with the label clearly visible</div>
              <button className="mt-2 text-xs font-semibold text-lt-text border border-lt-text/20 px-3 py-1 rounded-full">
                Retry
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Tab Bar */}
      <div className="flex-shrink-0 bg-white border-t border-gray-100 flex items-center justify-around px-2 py-2 relative">
        {tabs.map((t, i) => {
          const Icon = t.icon
          return (
            <button
              key={t.label}
              onClick={() => setActiveTab(i)}
              className="flex flex-col items-center gap-0.5 flex-1"
            >
              <Icon size={22} weight="regular" className={activeTab === i ? 'text-lt-text' : 'text-lt-secondary'} />
              <span className={`text-[10px] ${activeTab === i ? 'text-lt-text font-semibold' : 'text-lt-secondary'}`}>
                {t.label}
              </span>
            </button>
          )
        })}
        {/* FAB */}
        <div className="absolute right-4 -top-7 w-14 h-14 rounded-full bg-lt-text flex items-center justify-center shadow-lg">
          <Plus size={26} weight="regular" className="text-white" />
        </div>
      </div>
    </div>
  )
}
