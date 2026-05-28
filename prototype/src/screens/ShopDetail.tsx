import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft } from '@phosphor-icons/react'

// ─── Types ───────────────────────────────────────────────────────────────────

interface BaseProduct {
  id: string
  brand: string
  name: string
  price: number
  originalPrice: number
  discountRate: number
  rating: number
  reviewCount: number
  nutriTags: string[]
  pastaScore: number
  recommendReason: string
  badge?: '신상' | '베스트' | '한정'
  isLiked: boolean
  freeShipping: boolean
  imageUrl: string
}

interface Review {
  id: string
  nickname: string
  rating: number
  text: string
  date: string
}

interface ProductDetail extends BaseProduct {
  nutrition: {
    calories: number
    protein: number
    carbs: number
    fat: number
  }
  reviews: Review[]
}

// ─── Mock detail data ─────────────────────────────────────────────────────────

const DETAIL_MAP: Record<string, { nutrition: ProductDetail['nutrition']; reviews: Review[] }> = {
  '1': {
    nutrition: { calories: 180, protein: 20, carbs: 8, fat: 4 },
    reviews: [
      { id: 'rv1', nickname: '헬스인생', rating: 5, text: '운동 후 마시기 딱 좋아요. 단백질 함량이 높아서 만족!', date: '2024.03.12' },
      { id: 'rv2', nickname: '다이어터A', rating: 5, text: '맛도 좋고 포만감도 오래 가요. 재구매 의사 있어요.', date: '2024.03.08' },
      { id: 'rv3', nickname: '영양덕후', rating: 4, text: '성분이 깔끔하고 당류가 적어서 좋습니다.', date: '2024.02.28' },
    ],
  },
  '2': {
    nutrition: { calories: 120, protein: 25, carbs: 3, fat: 2 },
    reviews: [
      { id: 'rv1', nickname: '피트니스마니아', rating: 5, text: '초코맛이 진짜 맛있어요. 물에 타도 덩어리 없이 잘 녹아요.', date: '2024.03.15' },
      { id: 'rv2', nickname: '근육키우기', rating: 4, text: '단백질 함량 대비 가격이 합리적입니다.', date: '2024.03.10' },
      { id: 'rv3', nickname: '헬린이', rating: 5, text: '처음 단백질 파우더 써봤는데 이걸로 입문하길 잘했네요.', date: '2024.02.20' },
    ],
  },
  '3': {
    nutrition: { calories: 5, protein: 0, carbs: 1, fat: 0 },
    reviews: [
      { id: 'rv1', nickname: '건강덕후', rating: 5, text: '비타민D 수치가 올라갔어요. 꾸준히 먹는 게 중요한 것 같아요.', date: '2024.03.01' },
      { id: 'rv2', nickname: '면역지킴이', rating: 5, text: '겨울철 감기 예방에 도움이 되는 것 같아요.', date: '2024.02.15' },
      { id: 'rv3', nickname: '영양챙김이', rating: 5, text: '알약이 크지 않아서 먹기 편해요. 냄새도 없고 좋아요.', date: '2024.01.30' },
    ],
  },
  '4': {
    nutrition: { calories: 215, protein: 15, carbs: 30, fat: 3 },
    reviews: [
      { id: 'rv1', nickname: '다이어트중', rating: 4, text: '바나나맛이 생각보다 맛있어요. 포만감도 좋고요.', date: '2024.03.05' },
      { id: 'rv2', nickname: '몸만들기', rating: 4, text: '칼로리가 낮아서 다이어트 중에 안심하고 먹을 수 있어요.', date: '2024.02.25' },
      { id: 'rv3', nickname: '식단관리자', rating: 5, text: '14팩 구성이라 한 달 가까이 쓸 수 있어서 경제적이에요.', date: '2024.02.10' },
    ],
  },
}

const FALLBACK_NUTRITION: ProductDetail['nutrition'] = { calories: 0, protein: 0, carbs: 0, fat: 0 }

function getDetail(base: BaseProduct): ProductDetail {
  const extra = DETAIL_MAP[base.id]
  return {
    ...base,
    nutrition: extra?.nutrition ?? FALLBACK_NUTRITION,
    reviews: extra?.reviews ?? [],
  }
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function ShopDetail({
  product,
  onBack,
}: {
  product: BaseProduct
  onBack: () => void
}) {
  const [scrolled, setScrolled] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  const detail = getDetail(product)

  const handleScroll = () => {
    if (scrollRef.current) {
      setScrolled(scrollRef.current.scrollTop > 260)
    }
  }

  return (
    <div className="relative flex flex-col bg-lt-bg text-lt-text overflow-hidden -mt-6" style={{ height: 'calc(100% + 24px)' }}>

      {/* ── Fixed header ── */}
      <motion.div
        className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-base pt-3 pb-4 pointer-events-none overflow-hidden"
        animate={{ backgroundColor: scrolled ? '#FFFFFF' : 'transparent' }}
        transition={{ duration: 0.2 }}
        style={!scrolled ? { background: 'linear-gradient(to bottom, rgba(0,0,0,0.6), transparent)' } : {}}
      >
        <button
          onClick={onBack}
          className="pointer-events-auto w-10 h-10 flex items-center justify-center"
        >
          <ArrowLeft size={22} weight="bold" className={`drop-shadow ${scrolled ? 'text-lt-text' : 'text-white'}`} />
        </button>

        <AnimatePresence>
          {scrolled && (
            <motion.span
              key="title"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.18 }}
              className="absolute inset-x-0 text-center text-[15px] font-bold text-lt-text truncate px-14 pointer-events-none"
            >
              {detail.name}
            </motion.span>
          )}
        </AnimatePresence>

        <div className="w-10 h-10" />
      </motion.div>

      {/* ── Scrollable body ── */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto pb-[88px]"
        style={{ scrollbarWidth: 'none' } as React.CSSProperties}
      >

        {/* Hero — product image */}
        <div className="relative w-full h-[320px] flex-none">
          <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />
        </div>

        {/* Section 1 — 스켈레톤 */}
        <div className="mx-base mt-6 mb-3 rounded-xl bg-lt-card px-4 pt-4 pb-4 flex flex-col gap-3">
          <div className="h-3 w-20 rounded-full bg-lt-border" />
          <div className="h-5 w-3/4 rounded-full bg-lt-border" />
          <div className="h-4 w-1/3 rounded-full bg-lt-border" />
          <div className="h-8 w-1/2 rounded-full bg-lt-border" />
        </div>

        {/* Section 2 — 스켈레톤 */}
        <div className="mx-base mb-3 rounded-xl bg-lt-card p-4 flex items-center gap-3">
          <div className="w-14 h-14 rounded-full bg-lt-border flex-none" />
          <div className="flex-1 flex flex-col gap-2">
            <div className="h-3 w-24 rounded-full bg-lt-border" />
            <div className="h-3 w-full rounded-full bg-lt-border" />
            <div className="h-3 w-2/3 rounded-full bg-lt-border" />
          </div>
        </div>

        {/* Section 3 — 스켈레톤 */}
        <div className="mx-base mb-3 rounded-xl bg-lt-card p-4">
          <div className="h-4 w-16 rounded-full bg-lt-border mb-4" />
          <div className="grid grid-cols-2 gap-2">
            {[0,1,2,3].map(i => (
              <div key={i} className="bg-lt-input rounded-xl px-4 py-4 flex flex-col gap-2">
                <div className="h-2.5 w-12 rounded-full bg-lt-border" />
                <div className="h-6 w-16 rounded-full bg-lt-border" />
              </div>
            ))}
          </div>
        </div>

        {/* Section 4 — 스켈레톤 */}
        <div className="mx-base mb-3 rounded-xl bg-lt-card p-4">
          <div className="h-4 w-20 rounded-full bg-lt-border mb-4" />
          <div className="flex flex-col gap-3">
            {[0,1,2].map(i => (
              <div key={i} className="bg-lt-input rounded-xl p-3 flex flex-col gap-2">
                <div className="flex justify-between">
                  <div className="h-3 w-16 rounded-full bg-lt-border" />
                  <div className="h-3 w-12 rounded-full bg-lt-border" />
                </div>
                <div className="h-3 w-full rounded-full bg-lt-border" />
                <div className="h-3 w-2/3 rounded-full bg-lt-border" />
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ── Fixed bottom CTA ── */}
      <div className="flex-none px-base py-3 bg-lt-card border-t border-lt-border flex items-center gap-3">

        <motion.button
          whileTap={{ scale: 0.97 }}
          transition={{ type: 'spring', stiffness: 500, damping: 25 }}
          className="flex-1 h-[56px] bg-lt-bg text-lt-text rounded-xl text-[15px] font-bold"
        >
          선물하기
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.97 }}
          transition={{ type: 'spring', stiffness: 500, damping: 25 }}
          className="flex-1 h-[56px] bg-accent text-text-on-accent rounded-xl text-[15px] font-bold"
        >
          구매하기
        </motion.button>

      </div>

    </div>
  )
}
