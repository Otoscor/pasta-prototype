import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  MagnifyingGlass, Funnel, Heart, Lightning,
  ArrowLeft, House, Scan, User,
} from '@phosphor-icons/react'

interface Product {
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

const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    brand: '뉴트리데이',
    name: '고단백 그릭요거트 드링크',
    price: 12900,
    originalPrice: 18000,
    discountRate: 28,
    rating: 4.8,
    reviewCount: 1240,
    nutriTags: ['고단백', '저당', '비건'],
    pastaScore: 92,
    recommendReason: '내 단백질 섭취량에 딱 맞아요',
    badge: '베스트',
    isLiked: false,
    freeShipping: true,
    imageUrl: '/images/product-1.jpg',
  },
  {
    id: '2',
    brand: '바이오나',
    name: '프리미엄 유청 단백질 파우더 초코맛',
    price: 34900,
    originalPrice: 49000,
    discountRate: 29,
    rating: 4.6,
    reviewCount: 892,
    nutriTags: ['고단백', '무설탕'],
    pastaScore: 87,
    recommendReason: '운동 후 회복에 최적화된 제품이에요',
    badge: '신상',
    isLiked: true,
    freeShipping: true,
    imageUrl: '/images/product-2.jpg',
  },
  {
    id: '3',
    brand: '네이처메이드',
    name: '멀티비타민 90정 (3개월분)',
    price: 22000,
    originalPrice: 28000,
    discountRate: 21,
    rating: 4.9,
    reviewCount: 3150,
    nutriTags: ['비타민', '미네랄'],
    pastaScore: 95,
    recommendReason: '영양소 분석 결과 비타민D 부족이 감지됐어요',
    isLiked: false,
    freeShipping: false,
    imageUrl: '/images/product-3.jpg',
  },
  {
    id: '4',
    brand: '슬림앤핏',
    name: '다이어트 쉐이크 바나나맛 14팩',
    price: 19800,
    originalPrice: 25000,
    discountRate: 21,
    rating: 4.3,
    reviewCount: 567,
    nutriTags: ['저칼로리', '식이섬유', '포만감'],
    pastaScore: 78,
    recommendReason: '목표 체중 달성에 도움되는 제품이에요',
    badge: '한정',
    isLiked: false,
    freeShipping: true,
    imageUrl: '/images/product-4.jpg',
  },
]

const CATEGORIES = ['전체', '단백질', '비타민', '다이어트', '음료']

const SHOP_SUB_NAV = [
  { id: 'shop-home', label: '홈',      icon: House },
  { id: 'shop-scan', label: '푸드스캔', icon: Scan },
  { id: 'shop-my',   label: '마이',     icon: User },
]

const BADGE_STYLES: Record<string, string> = {
  '신상': 'bg-accent-mint text-text-on-accent',
  '베스트': 'bg-accent text-text-on-accent',
  '한정': 'bg-accent-red text-white',
}

function ProductCard({ product, onPress }: { product: Product; onPress: () => void }) {
  const [liked, setLiked] = useState(product.isLiked)

  return (
    <div
      className="bg-bg-card rounded-xl overflow-hidden mx-base mb-4 cursor-pointer"
      onClick={onPress}
    >
      {/* Image */}
      <div className="relative w-full h-[200px]">
        <img src={product.imageUrl} alt={product.name} className="absolute inset-0 w-full h-full object-cover" />

        {product.badge && (
          <div className={`absolute top-3 left-3 px-2.5 py-1 rounded-md text-[11px] font-bold ${BADGE_STYLES[product.badge]}`}>
            {product.badge}
          </div>
        )}

        <button
          onClick={(e) => { e.stopPropagation(); setLiked(l => !l) }}
          className="absolute top-3 right-3 w-9 h-9 bg-black/40 rounded-full flex items-center justify-center"
        >
          <Heart
            size={18}
            weight={liked ? 'fill' : 'regular'}
            className={liked ? 'text-accent-red' : 'text-white'}
          />
        </button>
      </div>

      {/* Info */}
      <div className="px-4 pt-3 pb-1">
        <p className="text-[12px] text-text-secondary mb-0.5">{product.brand}</p>

        <p className="text-[15px] font-semibold text-text-primary leading-snug mb-2 line-clamp-2">
          {product.name}
        </p>

        {/* Nutri tags */}
        <div className="flex flex-wrap gap-1.5 mb-2">
          {product.nutriTags.map(tag => (
            <span key={tag} className="px-2 py-0.5 rounded-full bg-bg-input text-text-secondary text-[11px]">
              {tag}
            </span>
          ))}
        </div>

        {/* Rating + free shipping */}
        <div className="flex items-center gap-1.5 mb-3">
          <span className="text-accent text-[13px]">★</span>
          <span className="text-[13px] font-semibold text-text-primary">{product.rating}</span>
          <span className="text-[12px] text-text-tertiary">({product.reviewCount.toLocaleString()})</span>
          {product.freeShipping && (
            <span className="ml-1 text-[11px] text-accent-mint font-medium">무료배송</span>
          )}
        </div>

        {/* Price */}
        <div className="flex items-end justify-between">
          <div>
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="text-[12px] text-text-tertiary line-through">
                {product.originalPrice.toLocaleString()}원
              </span>
              <span className="text-[12px] font-bold text-accent-red">-{product.discountRate}%</span>
            </div>
            <p className="text-[18px] font-bold text-text-primary">
              {product.price.toLocaleString()}원
            </p>
          </div>
          <button
            onClick={(e) => e.stopPropagation()}
            className="mb-0.5 px-4 py-2 bg-accent text-text-on-accent rounded-lg text-[13px] font-bold"
          >
            담기
          </button>
        </div>
      </div>

      {/* PASTA Score */}
      <div className="mx-4 mb-4 mt-3 bg-bg-input rounded-lg px-3 py-2.5 flex items-start gap-2">
        <Lightning size={15} weight="fill" className="text-accent flex-none mt-[1px]" />
        <div className="flex-1 min-w-0">
          <span className="text-accent font-bold text-[13px]">PASTA {product.pastaScore}점</span>
          <p className="text-[12px] text-text-secondary mt-0.5 leading-snug">{product.recommendReason}</p>
        </div>
      </div>
    </div>
  )
}

export default function ShopHome({
  onBack,
  onNavigate,
}: {
  onBack: () => void
  onNavigate?: (screen: string, data?: Product) => void
}) {
  const [activeCategory, setActiveCategory] = useState('전체')
  const [activeSubNav, setActiveSubNav] = useState('shop-home')

  return (
    <div className="relative flex flex-col h-full bg-bg-primary text-text-primary overflow-hidden">
      {/* Header */}
      <div className="flex-none px-base pt-2 pb-3 flex items-center justify-between">
        <span className="text-[20px] font-bold">pasta shop</span>
        <div className="flex items-center gap-4">
          <MagnifyingGlass size={22} weight="regular" className="text-text-secondary" />
          <Funnel size={22} weight="regular" className="text-text-secondary" />
        </div>
      </div>

      {/* Category tabs */}
      <div className="flex-none flex mb-2">
        {CATEGORIES.map(cat => {
          const isActive = activeCategory === cat
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="flex-1 flex flex-col items-center pb-2.5 pt-1 relative"
            >
              <span className={`text-[14px] transition-colors ${isActive ? 'font-bold text-text-primary' : 'font-medium text-text-tertiary'}`}>
                {cat}
              </span>
              {isActive && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-[2px] rounded-full bg-text-primary" />
              )}
            </button>
          )
        })}
      </div>

      {/* Product list */}
      <div className="flex-1 overflow-y-auto pb-[100px]" style={{ scrollbarWidth: 'none' } as React.CSSProperties}>
        {MOCK_PRODUCTS.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onPress={() => onNavigate?.('shop-detail', product)}
          />
        ))}
      </div>

      {/* Floating contextual sub-nav */}
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.92 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.22, ease: [0.34, 1.26, 0.64, 1] }}
        className="absolute bottom-5 left-0 right-0 mx-auto w-fit bg-bg-card border border-border-dark rounded-2xl shadow-2xl flex items-center px-2 py-2 h-[60px]"
      >
        <motion.button
          whileTap={{ scale: 0.88 }}
          transition={{ type: 'spring', stiffness: 500, damping: 25 }}
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-bg-input flex items-center justify-center flex-none ml-1"
        >
          <ArrowLeft size={20} weight="bold" className="text-text-secondary" />
        </motion.button>

        {SHOP_SUB_NAV.map(({ id, label, icon: Icon }) => {
          const isActive = activeSubNav === id
          return (
            <motion.button
              key={id}
              whileTap={{ scale: 0.88 }}
              transition={{ type: 'spring', stiffness: 500, damping: 25 }}
              onClick={() => { setActiveSubNav(id); onNavigate?.(id) }}
              className={`flex flex-col items-center gap-0.5 w-[72px] justify-center
                ${isActive ? 'text-accent' : 'text-text-tertiary'}`}
            >
              <Icon size={22} weight={isActive ? 'fill' : 'regular'} />
              <span className="text-[11px] font-medium">{label}</span>
            </motion.button>
          )
        })}
      </motion.div>
    </div>
  )
}
