import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, ShoppingCart, Lightning, Minus, Plus } from '@phosphor-icons/react'
import type { FoodItem } from './FoodScanSearch'

const MEAL_TIMES = [
  { id: 'breakfast', label: '아침' },
  { id: 'lunch',     label: '점심' },
  { id: 'dinner',    label: '저녁' },
  { id: 'snack',     label: '간식' },
]

// Guess current meal time by hour
function guessCurrentMeal(): string {
  const h = new Date().getHours()
  if (h < 10) return 'breakfast'
  if (h < 14) return 'lunch'
  if (h < 19) return 'dinner'
  return 'snack'
}

// Default food shown after camera scan
const SCANNED_FOOD: FoodItem = {
  id: 0,
  emoji: '🥗',
  name: '닭가슴살 샐러드',
  kcal: 230,
  protein: 28,
}

const UNIT_STEP = 50  // grams per tap

export default function FoodScanResult({
  food: foodProp,
  onBack,
  onAdded,
}: {
  food?: FoodItem
  onBack: () => void
  onAdded: () => void
}) {
  const base = foodProp ?? SCANNED_FOOD
  const [amount, setAmount] = useState(100)
  const [mealTime, setMealTime] = useState(guessCurrentMeal())

  const ratio = amount / 100
  const nutrition = {
    calories: Math.round(base.kcal * ratio),
    protein:  Math.round(base.protein * ratio),
    carbs:    Math.round(((base as any).carbs  ?? 8)  * ratio),
    fat:      Math.round(((base as any).fat    ?? 4)  * ratio),
  }

  return (
    <div className="relative flex flex-col h-full bg-bg-primary text-text-primary overflow-hidden">

      {/* Header */}
      <div className="flex items-center gap-3 px-base pt-9 pb-3">
        <button onClick={onBack} className="w-10 h-10 flex items-center justify-center -ml-2">
          <ArrowLeft size={22} weight="bold" />
        </button>
        <span className="text-[18px] font-bold">분석 결과</span>
      </div>

      {/* Scrollable body */}
      <div
        className="flex-1 overflow-y-auto pb-[88px]"
        style={{ scrollbarWidth: 'none' } as React.CSSProperties}
      >

        {/* Food image placeholder */}
        <div className="w-full h-[180px] bg-[#222] flex items-center justify-center">
          <span className="text-[56px]">{base.emoji}</span>
        </div>

        {/* Food name + amount stepper */}
        <div className="mx-base mt-3 mb-3 bg-bg-card rounded-2xl px-4 py-4">
          <p className="text-[20px] font-bold text-text-primary mb-1">{base.name}</p>

          {/* Amount stepper */}
          <div className="flex items-center gap-3 mt-3">
            <span className="text-[13px] text-text-secondary flex-none">섭취량</span>
            <div className="flex items-center border border-border-dark rounded-xl overflow-hidden">
              <button
                onClick={() => setAmount(a => Math.max(UNIT_STEP, a - UNIT_STEP))}
                className="w-10 h-10 flex items-center justify-center active:bg-bg-input transition-colors"
              >
                <Minus size={15} className="text-text-secondary" />
              </button>
              <span className="w-16 text-center text-[15px] font-semibold text-text-primary select-none">
                {amount}g
              </span>
              <button
                onClick={() => setAmount(a => a + UNIT_STEP)}
                className="w-10 h-10 flex items-center justify-center active:bg-bg-input transition-colors"
              >
                <Plus size={15} className="text-text-secondary" />
              </button>
            </div>
          </div>
        </div>

        {/* PASTA comment */}
        <div className="mx-base mb-3 bg-bg-card rounded-2xl px-4 py-3 flex items-center gap-3">
          <Lightning size={16} weight="fill" className="text-accent flex-none" />
          <p className="text-[13px] text-text-secondary leading-snug">
            오늘 단백질 목표의{' '}
            <span className="text-accent font-bold">
              {Math.round((nutrition.protein / 50) * 100)}%
            </span>{' '}
            충족돼요!
          </p>
        </div>

        {/* Nutrition 2×2 grid */}
        <div className="mx-base mb-3 bg-bg-card rounded-2xl p-4">
          <p className="text-[15px] font-bold text-text-primary mb-3">영양 정보</p>
          <div className="grid grid-cols-2 gap-2">
            {([
              { label: '칼로리',   value: `${nutrition.calories}kcal` },
              { label: '단백질',   value: `${nutrition.protein}g` },
              { label: '탄수화물', value: `${nutrition.carbs}g` },
              { label: '지방',     value: `${nutrition.fat}g` },
            ] as { label: string; value: string }[]).map(item => (
              <div key={item.label} className="bg-bg-input rounded-xl px-4 py-3">
                <p className="text-[11px] text-text-tertiary mb-1">{item.label}</p>
                <p className="text-[22px] font-black text-text-primary leading-none">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Meal time selector */}
        <div className="mx-base mb-3 bg-bg-card rounded-2xl p-4">
          <p className="text-[14px] font-semibold text-text-primary mb-3">식사 시간대</p>
          <div className="flex gap-2">
            {MEAL_TIMES.map(mt => (
              <button
                key={mt.id}
                onClick={() => setMealTime(mt.id)}
                className={`flex-1 h-[40px] rounded-xl text-[13px] font-semibold transition-colors ${
                  mealTime === mt.id
                    ? 'bg-accent text-text-on-accent'
                    : 'bg-bg-input text-text-secondary'
                }`}
              >
                {mt.label}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Fixed bottom CTA */}
      <div className="flex-none px-base py-3 bg-bg-primary border-t border-border-dark">
        <motion.button
          whileTap={{ scale: 0.97 }}
          transition={{ type: 'spring', stiffness: 500, damping: 25 }}
          onClick={onAdded}
          className="w-full h-[56px] bg-accent text-text-on-accent rounded-xl
                     text-[16px] font-bold flex items-center justify-center gap-2"
        >
          <ShoppingCart size={20} weight="bold" />
          식사 기록에 추가
        </motion.button>
      </div>

    </div>
  )
}
