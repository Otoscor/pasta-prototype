import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft, Heart, Lightning,
  Minus, Plus, ShoppingCart,
} from '@phosphor-icons/react'

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
  const [liked, setLiked] = useState(product.isLiked)
  const [quantity, setQuantity] = useState(1)
  const [scrolled, setScrolled] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  const detail = getDetail(product)
  const totalPrice = detail.price * quantity

  const handleScroll = () => {
    if (scrollRef.current) {
      setScrolled(scrollRef.current.scrollTop > 260)
    }
  }

  return (
    <div className="relative flex flex-col bg-bg-primary text-text-primary overflow-hidden -mt-11" style={{ height: 'calc(100% + 44px)' }}>

      {/* ── Fixed header ── */}
      <motion.div
        className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-base pt-3 pb-4 pointer-events-none overflow-hidden"
        animate={{ backgroundColor: scrolled ? '#0D1117' : 'transparent' }}
        transition={{ duration: 0.2 }}
        style={!scrolled ? { background: 'linear-gradient(to bottom, rgba(0,0,0,0.6), transparent)' } : {}}
      >
        <button
          onClick={onBack}
          className="pointer-events-auto w-10 h-10 flex items-center justify-center"
        >
          <ArrowLeft size={22} weight="bold" className={`drop-shadow ${scrolled ? 'text-text-primary' : 'text-white'}`} />
        </button>

        <AnimatePresence>
          {scrolled && (
            <motion.span
              key="title"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.18 }}
              className="absolute inset-x-0 text-center text-[15px] font-bold text-text-primary truncate px-14 pointer-events-none"
            >
              {detail.name}
            </motion.span>
          )}
        </AnimatePresence>

        <button
          onClick={() => setLiked(l => !l)}
          className="pointer-events-auto w-10 h-10 flex items-center justify-center"
        >
          <Heart
            size={22}
            weight={liked ? 'fill' : 'regular'}
            className={`drop-shadow ${liked ? 'text-accent-red' : scrolled ? 'text-text-primary' : 'text-white'}`}
          />
        </button>
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

        {/* Section 1 — Brand / Name / Price / Stepper */}
        <div className="bg-bg-card mx-base mt-6 mb-3 rounded-xl px-4 pt-4 pb-4">

          {/* Brand */}
          <span className="text-[12px] text-text-secondary">{detail.brand}</span>

          {/* Name */}
          <p className="text-[17px] font-semibold text-text-primary leading-snug mt-1 mb-4">
            {detail.name}
          </p>

          {/* Price row */}
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-[13px] text-text-tertiary line-through">
              {detail.originalPrice.toLocaleString()}원
            </span>
            <span className="text-[13px] font-bold text-accent-red">-{detail.discountRate}%</span>
            {detail.freeShipping && (
              <span className="text-[12px] text-accent-mint font-medium ml-0.5">무료배송</span>
            )}
          </div>
          <p className="text-[26px] font-black text-text-primary">
            {detail.price.toLocaleString()}원
          </p>
        </div>

        {/* Section 2 — PASTA 점수 */}
        <div className="mx-base mb-3 rounded-xl bg-bg-card p-4">
          <div className="flex items-center gap-3">
            <div className="flex-none w-[56px] h-[56px] rounded-full border-2 border-accent bg-accent/10
                            flex flex-col items-center justify-center">
              <span className="text-[20px] font-black text-accent leading-none">{detail.pastaScore}</span>
              <span className="text-[9px] text-accent/70 font-medium">점</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-1">
                <Lightning size={14} weight="fill" className="text-accent flex-none" />
                <span className="text-[13px] font-bold text-text-primary">PASTA 추천</span>
              </div>
              <p className="text-[14px] text-text-secondary leading-snug">
                "{detail.recommendReason}"
              </p>
            </div>
          </div>
        </div>

        {/* Section 3 — 영양 정보 2×2 그리드 */}
        <div className="mx-base mb-3 rounded-xl bg-bg-card p-4">
          <p className="text-[15px] font-bold text-text-primary mb-3">영양 정보</p>
          <div className="grid grid-cols-2 gap-2">
            {([
              { label: '칼로리',   value: `${detail.nutrition.calories}kcal` },
              { label: '단백질',   value: `${detail.nutrition.protein}g` },
              { label: '탄수화물', value: `${detail.nutrition.carbs}g` },
              { label: '지방',     value: `${detail.nutrition.fat}g` },
            ] as { label: string; value: string }[]).map(item => (
              <div key={item.label} className="bg-bg-input rounded-xl px-4 py-3">
                <p className="text-[11px] text-text-tertiary mb-1">{item.label}</p>
                <p className="text-[22px] font-black text-text-primary leading-none">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 4 — 리뷰 */}
        <div className="mx-base mb-3 rounded-xl bg-bg-card p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1.5">
              <span className="text-[15px] font-bold text-text-primary">리뷰</span>
              <span className="text-accent text-[14px] leading-none">★</span>
              <span className="text-[15px] font-bold text-text-primary">{detail.rating}</span>
              <span className="text-[13px] text-text-tertiary">({detail.reviewCount.toLocaleString()})</span>
            </div>
            <button className="text-[13px] text-text-tertiary">전체 보기 &gt;</button>
          </div>

          <div className="space-y-2">
            {detail.reviews.map(rv => (
              <div key={rv.id} className="bg-bg-input rounded-xl p-3">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[13px] font-semibold text-text-primary">{rv.nickname}</span>
                  <span className="text-[11px] text-text-tertiary">{rv.date}</span>
                </div>
                <div className="flex items-center gap-0.5 mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className={`text-[12px] leading-none ${i < rv.rating ? 'text-accent' : 'text-text-tertiary'}`}>★</span>
                  ))}
                </div>
                <p className="text-[13px] text-text-secondary leading-relaxed">{rv.text}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ── Fixed bottom CTA ── */}
      <div className="flex-none px-base py-3 bg-bg-primary border-t border-border-dark flex items-center gap-3">

        {/* Quantity stepper */}
        <div className="flex items-center border border-border-dark rounded-xl overflow-hidden flex-none">
          <button
            onClick={() => setQuantity(q => Math.max(1, q - 1))}
            className="w-10 h-[56px] flex items-center justify-center active:bg-bg-input transition-colors"
          >
            <Minus size={15} className="text-text-secondary" />
          </button>
          <span className="w-9 text-center text-[15px] font-semibold text-text-primary select-none">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity(q => q + 1)}
            className="w-10 h-[56px] flex items-center justify-center active:bg-bg-input transition-colors"
          >
            <Plus size={15} className="text-text-secondary" />
          </button>
        </div>

        {/* Cart button */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          transition={{ type: 'spring', stiffness: 500, damping: 25 }}
          className="flex-1 h-[56px] bg-accent text-text-on-accent rounded-xl
                     text-[16px] font-bold flex items-center justify-center gap-2"
        >
          <ShoppingCart size={20} weight="bold" />
          장바구니 담기
          <span className="font-normal text-[14px] opacity-80 ml-0.5">
            ({totalPrice.toLocaleString()}원)
          </span>
        </motion.button>

      </div>

    </div>
  )
}
