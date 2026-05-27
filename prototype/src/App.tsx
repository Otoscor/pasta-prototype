import { useState } from 'react'
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

const SHOP_TABS = new Set<Screen>(['shop-home', 'food-scan', 'shop-my'])

export default function App() {
  const [authed, setAuthed] = useState(() => localStorage.getItem('pasta_auth') === 'true')
  const [screen, setScreen] = useState<Screen>('home')
  const [prevScreen, setPrevScreen] = useState<Screen>('home')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [scannedFood, setScannedFood] = useState<FoodItem | undefined>(undefined)

  const navigate = (next: Screen) => {
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
          onResult={() => {
            setScannedFood(undefined)
            navigate('food-scan-result')
          }}
        />
      )
      case 'food-scan-search': return (
        <FoodScanSearch
          onBack={() => navigate('food-scan')}
          onSelect={(food) => {
            setScannedFood(food)
            navigate('food-scan-result')
          }}
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
    return (
      <MobileFrame>
        <Login onLogin={() => setAuthed(true)} />
      </MobileFrame>
    )
  }

  return (
    <MobileFrame>
      {renderScreen()}
    </MobileFrame>
  )
}
