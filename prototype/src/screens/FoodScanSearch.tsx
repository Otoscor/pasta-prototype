import { useState } from 'react'
import { ArrowLeft, MagnifyingGlass, X } from '@phosphor-icons/react'

interface FoodItem {
  id: number
  emoji: string
  name: string
  brand?: string
  kcal: number
  protein: number
}

const QUICK_CHIPS = ['닭가슴살', '현미밥', '달걀', '샐러드', '바나나', '두부', '오트밀']

const SEARCH_DB: FoodItem[] = [
  { id: 1,  emoji: '🍗', name: '닭가슴살 구이',         kcal: 165, protein: 31 },
  { id: 2,  emoji: '🥗', name: '닭가슴살 샐러드',        kcal: 230, protein: 28 },
  { id: 3,  emoji: '🍗', name: '닭가슴살 스테이크 100g', kcal: 120, protein: 25 },
  { id: 4,  emoji: '🍚', name: '현미밥 1공기',           kcal: 310, protein: 6  },
  { id: 5,  emoji: '🥚', name: '삶은 달걀 1개',          kcal: 78,  protein: 6  },
  { id: 6,  emoji: '🥚', name: '달걀 후라이',             kcal: 92,  protein: 6  },
  { id: 7,  emoji: '🍌', name: '바나나 1개',             kcal: 89,  protein: 1  },
  { id: 8,  emoji: '🫘', name: '두부 100g',              kcal: 76,  protein: 8  },
  { id: 9,  emoji: '🥣', name: '오트밀 1컵',             kcal: 150, protein: 5  },
  { id: 10, emoji: '🥗', name: '그린 샐러드',            kcal: 45,  protein: 2  },
]

export default function FoodScanSearch({
  onBack,
  onSelect,
}: {
  onBack: () => void
  onSelect: (food: FoodItem) => void
}) {
  const [query, setQuery] = useState('')

  const results = query.trim()
    ? SEARCH_DB.filter(f =>
        f.name.includes(query) || (f.brand ?? '').includes(query)
      )
    : []

  return (
    <div className="flex flex-col h-full bg-bg-primary text-text-primary">

      {/* Search bar header */}
      <div className="flex items-center gap-2 px-base pt-9 pb-3">
        <button onClick={onBack} className="w-10 h-10 flex items-center justify-center -ml-2 flex-none">
          <ArrowLeft size={22} weight="bold" />
        </button>
        <div className="flex-1 flex items-center gap-2 bg-bg-input rounded-xl px-3 h-[44px]">
          <MagnifyingGlass size={16} className="text-text-tertiary flex-none" />
          <input
            autoFocus
            type="text"
            placeholder="음식 이름을 입력하세요"
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-[15px] text-text-primary placeholder:text-text-tertiary outline-none"
          />
          {query.length > 0 && (
            <button onClick={() => setQuery('')}>
              <X size={15} className="text-text-tertiary" />
            </button>
          )}
        </div>
      </div>

      <div
        className="flex-1 overflow-y-auto"
        style={{ scrollbarWidth: 'none' } as React.CSSProperties}
      >

        {/* No query — quick chips */}
        {!query.trim() && (
          <div className="px-base pt-2">
            <p className="text-[12px] text-text-tertiary mb-3">자주 먹은 음식</p>
            <div className="flex flex-wrap gap-2">
              {QUICK_CHIPS.map(chip => (
                <button
                  key={chip}
                  onClick={() => setQuery(chip)}
                  className="px-3.5 py-2 rounded-full bg-bg-card border border-border-dark
                             text-[13px] text-text-secondary active:opacity-70 transition-opacity"
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Search results */}
        {query.trim() && (
          <div className="px-base pt-2">
            {results.length === 0 ? (
              <p className="text-[14px] text-text-tertiary text-center mt-12">
                검색 결과가 없어요
              </p>
            ) : (
              <div className="space-y-2">
                {results.map(food => (
                  <button
                    key={food.id}
                    onClick={() => onSelect(food)}
                    className="w-full flex items-center gap-3 bg-bg-card rounded-xl px-4 py-3
                               border border-border-dark active:opacity-80 transition-opacity text-left"
                  >
                    <span className="text-[28px] leading-none flex-none">{food.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-[14px] font-semibold text-text-primary truncate">{food.name}</p>
                      {food.brand && (
                        <p className="text-[12px] text-text-tertiary">{food.brand}</p>
                      )}
                    </div>
                    <div className="flex-none text-right">
                      <p className="text-[14px] font-bold text-text-primary">{food.kcal}kcal</p>
                      <p className="text-[12px] text-text-tertiary">단백질 {food.protein}g</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  )
}

export type { FoodItem }
