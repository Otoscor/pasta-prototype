import { useState } from 'react'
import {
  MagnifyingGlass, Funnel, Heart, Lightning,
} from '@phosphor-icons/react'
import ShopSubNav from '../components/ShopSubNav'

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
  category: '단백질' | '비타민' | '다이어트' | '음료'
}

const B = (path: string) => `${import.meta.env.BASE_URL}images/${path}`

const MOCK_PRODUCTS: Product[] = [
  // ── 단백질 ──────────────────────────────────────────────
  {
    id: '1', category: '단백질',
    brand: '뉴트리데이', name: '고단백 그릭요거트 드링크',
    price: 12900, originalPrice: 18000, discountRate: 28,
    rating: 4.8, reviewCount: 1240,
    nutriTags: ['고단백', '저당', '비건'],
    pastaScore: 92, recommendReason: '내 단백질 섭취량에 딱 맞아요',
    badge: '베스트', isLiked: false, freeShipping: true,
    imageUrl: B('product-1.jpg'),
  },
  {
    id: '2', category: '단백질',
    brand: '바이오나', name: '프리미엄 유청 단백질 파우더 초코맛',
    price: 34900, originalPrice: 49000, discountRate: 29,
    rating: 4.6, reviewCount: 892,
    nutriTags: ['고단백', '무설탕'],
    pastaScore: 87, recommendReason: '운동 후 회복에 최적화된 제품이에요',
    badge: '신상', isLiked: true, freeShipping: true,
    imageUrl: B('product-2.jpg'),
  },
  {
    id: '5', category: '단백질',
    brand: '허닭', name: '닭가슴살 스테이크 5종 혼합 10팩',
    price: 24900, originalPrice: 32000, discountRate: 22,
    rating: 4.7, reviewCount: 2310,
    nutriTags: ['고단백', '저지방', '무방부제'],
    pastaScore: 90, recommendReason: '하루 단백질 목표 달성에 딱 맞아요',
    isLiked: false, freeShipping: true,
    imageUrl: B('product-5.jpg'),
  },
  {
    id: '6', category: '단백질',
    brand: '풀무원', name: '국산콩 두부 단백질 한끼 세트',
    price: 8900, originalPrice: 12000, discountRate: 26,
    rating: 4.5, reviewCount: 445,
    nutriTags: ['식물성단백질', '비건', '저칼로리'],
    pastaScore: 83, recommendReason: '식물성 단백질 보충에 좋은 선택이에요',
    badge: '신상', isLiked: false, freeShipping: false,
    imageUrl: B('product-6.jpg'),
  },
  // ── 비타민 ──────────────────────────────────────────────
  {
    id: '3', category: '비타민',
    brand: '네이처메이드', name: '멀티비타민 90정 (3개월분)',
    price: 22000, originalPrice: 28000, discountRate: 21,
    rating: 4.9, reviewCount: 3150,
    nutriTags: ['비타민', '미네랄'],
    pastaScore: 95, recommendReason: '영양소 분석 결과 비타민D 부족이 감지됐어요',
    isLiked: false, freeShipping: false,
    imageUrl: B('product-3.jpg'),
  },
  {
    id: '7', category: '비타민',
    brand: '고려은단', name: '비타민C 1000mg 이중정 120정',
    price: 15800, originalPrice: 21000, discountRate: 25,
    rating: 4.7, reviewCount: 5820,
    nutriTags: ['비타민C', '항산화', '면역'],
    pastaScore: 88, recommendReason: '면역력 강화에 꾸준히 드시면 좋아요',
    badge: '베스트', isLiked: false, freeShipping: true,
    imageUrl: B('product-7.jpg'),
  },
  {
    id: '8', category: '비타민',
    brand: '닥터스베스트', name: '오메가3 피쉬오일 1000mg 180캡슐',
    price: 28000, originalPrice: 38000, discountRate: 26,
    rating: 4.8, reviewCount: 1674,
    nutriTags: ['오메가3', 'EPA', 'DHA'],
    pastaScore: 91, recommendReason: '혈중 중성지방 관리에 도움이 돼요',
    isLiked: true, freeShipping: true,
    imageUrl: B('product-8.jpg'),
  },
  // ── 다이어트 ─────────────────────────────────────────────
  {
    id: '4', category: '다이어트',
    brand: '슬림앤핏', name: '다이어트 쉐이크 바나나맛 14팩',
    price: 19800, originalPrice: 25000, discountRate: 21,
    rating: 4.3, reviewCount: 567,
    nutriTags: ['저칼로리', '식이섬유', '포만감'],
    pastaScore: 78, recommendReason: '목표 체중 달성에 도움되는 제품이에요',
    badge: '한정', isLiked: false, freeShipping: true,
    imageUrl: B('product-4.jpg'),
  },
  {
    id: '9', category: '다이어트',
    brand: '켈로그', name: '저당 그래놀라 오리지널 500g',
    price: 11900, originalPrice: 15000, discountRate: 21,
    rating: 4.4, reviewCount: 934,
    nutriTags: ['저당', '식이섬유', '통곡물'],
    pastaScore: 80, recommendReason: '아침 대용으로 포만감 있게 드세요',
    isLiked: false, freeShipping: false,
    imageUrl: B('product-9.jpg'),
  },
  {
    id: '10', category: '다이어트',
    brand: '제로컷', name: '식물성 식이섬유 파우더 녹차맛 30포',
    price: 16500, originalPrice: 22000, discountRate: 25,
    rating: 4.2, reviewCount: 381,
    nutriTags: ['식이섬유', '저칼로리', '장건강'],
    pastaScore: 75, recommendReason: '장 건강과 다이어트를 동시에 챙기세요',
    badge: '신상', isLiked: false, freeShipping: true,
    imageUrl: B('product-10.jpg'),
  },
  // ── 음료 ────────────────────────────────────────────────
  {
    id: '11', category: '음료',
    brand: '네이처리퍼블릭', name: '야채 착즙 그린주스 7종 혼합 30포',
    price: 29800, originalPrice: 39000, discountRate: 24,
    rating: 4.6, reviewCount: 1120,
    nutriTags: ['비타민', '미네랄', '저당'],
    pastaScore: 86, recommendReason: '하루 채소 섭취량이 부족해요. 보완해드려요',
    badge: '베스트', isLiked: false, freeShipping: true,
    imageUrl: B('product-11.jpg'),
  },
  {
    id: '12', category: '음료',
    brand: '에버콜라겐', name: '저분자 콜라겐 드링크 20병',
    price: 32000, originalPrice: 45000, discountRate: 29,
    rating: 4.5, reviewCount: 2240,
    nutriTags: ['콜라겐', '피부', '관절'],
    pastaScore: 82, recommendReason: '피부 탄력과 관절 건강을 함께 챙겨요',
    isLiked: true, freeShipping: true,
    imageUrl: B('product-12.jpg'),
  },
  {
    id: '13', category: '음료',
    brand: '셀렉스', name: '마시는 프로틴 우유 딸기맛 10팩',
    price: 18900, originalPrice: 24000, discountRate: 21,
    rating: 4.7, reviewCount: 788,
    nutriTags: ['고단백', '칼슘', '저지방'],
    pastaScore: 89, recommendReason: '단백질과 칼슘을 맛있게 동시에!',
    badge: '신상', isLiked: false, freeShipping: true,
    imageUrl: B('product-13.jpg'),
  },
]

const CATEGORIES = ['전체', '단백질', '비타민', '다이어트', '음료']


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
      <div className="px-4 pt-3 pb-4">

        {/* Brand + rating + free shipping */}
        <div className="flex items-center gap-1.5 mb-1">
          <span className="text-[12px] text-text-tertiary">{product.brand}</span>
          <span className="text-text-tertiary text-[10px]">·</span>
          <span className="text-accent text-[11px]">★</span>
          <span className="text-[12px] text-text-secondary">{product.rating}</span>
          <span className="flex-1" />
          {product.freeShipping && (
            <span className="text-[11px] text-white/60 font-medium">무료배송</span>
          )}
        </div>

        {/* Name */}
        <p className="text-[15px] font-semibold text-text-primary leading-snug mb-1 line-clamp-1">
          {product.name}
        </p>

        {/* PASTA score */}
        <div className="flex items-center gap-2 py-1 mb-1">
          <Lightning size={13} weight="fill" className="text-accent flex-none" />
          <span className="text-[12px] text-accent font-bold">{product.pastaScore}점</span>
          <span className="text-[12px] text-text-secondary truncate">"{product.recommendReason}"</span>
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="text-[13px] font-bold text-accent-red">-{product.discountRate}%</span>
            <span className="text-[22px] font-bold text-text-primary">
              {product.price.toLocaleString()}원
            </span>
          </div>
          <button
            onClick={(e) => e.stopPropagation()}
            className="px-4 py-2 bg-accent text-text-on-accent rounded-lg text-[13px] font-bold"
          >
            담기
          </button>
        </div>

      </div>
    </div>
  )
}

export default function ShopHome({
  onBack,
  onNavigate,
  subNavAnimated = true,
}: {
  onBack: () => void
  onNavigate?: (screen: string, data?: Product) => void
  subNavAnimated?: boolean
}) {
  const [activeCategory, setActiveCategory] = useState('전체')

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
        {MOCK_PRODUCTS.filter(p => activeCategory === '전체' || p.category === activeCategory).map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onPress={() => onNavigate?.('shop-detail', product)}
          />
        ))}
      </div>

      <ShopSubNav
        activeId="shop-home"
        onBack={onBack}
        onNavigate={(id) => { onNavigate?.(id) }}
        animated={subNavAnimated}
      />
    </div>
  )
}
