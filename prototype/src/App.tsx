import { useState, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import MobileFrame from './components/layout/MobileFrame'
import Login from './screens/Login'
import Home from './screens/Home'
import MealRecord from './screens/MealRecord'
import Dashboard from './screens/Dashboard'
import Challenge from './screens/Challenge'
import ContentDetail from './screens/ContentDetail'
import ShopHome from './screens/ShopHome'
import ShopDetail from './screens/ShopDetail'
import FoodScan from './screens/FoodScan'
import FoodScanCamera from './screens/FoodScanCamera'
import FoodScanSearch from './screens/FoodScanSearch'
import FoodScanResult from './screens/FoodScanResult'
import ShopMy from './screens/ShopMy'
import type { FoodItem } from './screens/FoodScanSearch'

type Screen =
  | 'home' | 'meal' | 'dash' | 'challenge' | 'content'
  | 'shop-home' | 'shop-detail' | 'shop-my'
  | 'food-scan' | 'food-scan-camera' | 'food-scan-search' | 'food-scan-result'

const SHOP_TABS = new Set<Screen>(['shop-home', 'food-scan', 'shop-my', 'shop-detail'])

export default function App() {
  const [authed, setAuthed] = useState(() => localStorage.getItem('pasta_auth') === 'true')
  const [screen, setScreen] = useState<Screen>('home')
  const [prevScreen, setPrevScreen] = useState<Screen>('home')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [scannedFood, setScannedFood] = useState<FoodItem | undefined>(undefined)
  // 1 = shop-home→detail (슬라이드 레프트), -1 = detail→shop-home (슬라이드 라이트)
  const [shopDir, setShopDir] = useState(1)
  const shopInited = useRef(false)

  const navigate = (next: Screen) => {
    if (next === 'shop-detail') {
      setShopDir(1)
      shopInited.current = true
    } else if (screen === 'shop-detail') {
      setShopDir(-1)
    }
    if (!SHOP_TABS.has(next)) {
      shopInited.current = false
    }
    setPrevScreen(screen)
    setScreen(next)
  }

  const goHome = () => navigate('home')
  const subNavAnimated = !SHOP_TABS.has(prevScreen)

  const renderScreen = () => {
    switch (screen) {
      case 'meal':        return <MealRecord    onBack={goHome} />
      case 'dash':        return <Dashboard />
      case 'challenge':   return <Challenge     onBack={goHome} />
      case 'content':     return <ContentDetail onBack={goHome} />
      case 'shop-home':   return (
        <ShopHome
          onBack={goHome}
          subNavAnimated={subNavAnimated}
          onNavigate={(s, data) => {
            if (s === 'shop-detail' && data) setSelectedProduct(data)
            navigate((s === 'shop-scan' ? 'food-scan' : s) as Screen)
          }}
        />
      )
      case 'shop-detail': return selectedProduct ? (
        <ShopDetail product={selectedProduct} onBack={() => navigate('shop-home')} />
      ) : null
      case 'shop-my': return (
        <ShopMy
          onBack={goHome}
          subNavAnimated={subNavAnimated}
          onNavigate={(id) => navigate((id === 'shop-scan' ? 'food-scan' : id) as Screen)}
        />
      )
      case 'food-scan': return (
        <FoodScan
          onBack={goHome}
          subNavAnimated={subNavAnimated}
          onScan={() => navigate('food-scan-camera')}
          onSearch={() => navigate('food-scan-search')}
          onNavigate={(id) => navigate((id === 'shop-scan' ? 'food-scan' : id) as Screen)}
        />
      )
      case 'food-scan-camera': return (
        <FoodScanCamera
          onBack={() => navigate('food-scan')}
          onResult={() => { setScannedFood(undefined); navigate('food-scan-result') }}
        />
      )
      case 'food-scan-search': return (
        <FoodScanSearch
          onBack={() => navigate('food-scan')}
          onSelect={(food) => { setScannedFood(food); navigate('food-scan-result') }}
        />
      )
      case 'food-scan-result': return (
        <FoodScanResult
          food={scannedFood}
          onBack={() => navigate(scannedFood ? 'food-scan-search' : 'food-scan-camera')}
          onAdded={goHome}
        />
      )
      default: return (
        <Home onNavigate={(s) => {
          navigate((s === 'shop-scan' ? 'food-scan' : s) as Screen)
        }} />
      )
    }
  }

  if (!authed) {
    return <Login onLogin={() => setAuthed(true)} />
  }

  const isShop = SHOP_TABS.has(screen)
  const homeNav = (s: string) => navigate((s === 'shop-scan' ? 'food-scan' : s) as Screen)

  return (
    <MobileFrame>
      {/* 베이스 레이어: 샵 진입 시 홈이 뒤에 남아 있어 slide-down 시 드러남 */}
      <div className="absolute inset-0">
        {isShop
          ? <Home key="bg" onNavigate={homeNav} />
          : renderScreen()
        }
      </div>

      {/* 샵 오버레이: 아래에서 슬라이드업, 탭 전환 시 key 유지로 애니메이션 없음 */}
      <AnimatePresence>
        {isShop && (
          <motion.div
            key="shop-overlay"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%', transition: { duration: 0.68, ease: [0.16, 1, 0.3, 1] } }}
            transition={{ duration: 0.52, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
            style={{ zIndex: 10 }}
          >
            {/* 좌우 슬라이드: tab ↔ detail 전환 시에만 애니메이션 */}
            <AnimatePresence custom={shopDir}>
              <motion.div
                key={screen === 'shop-detail' ? 'detail' : 'tab'}
                custom={shopDir}
                variants={{
                  initial: (d: number) => ({ x: d > 0 ? '100%' : '-100%' }),
                  animate: { x: 0 },
                  exit:    (d: number) => ({ x: d > 0 ? '-100%' : '100%' }),
                }}
                initial={shopInited.current ? 'initial' : false}
                animate="animate"
                exit="exit"
                transition={{ duration: 0.36, ease: [0.32, 0.72, 0, 1] }}
                className="absolute inset-0"
              >
                {renderScreen()}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </MobileFrame>
  )
}
