import { useState } from 'react'
import MobileFrame from './components/layout/MobileFrame'
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

export default function App() {
  const [screen, setScreen] = useState<Screen>('home')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [scannedFood, setScannedFood] = useState<FoodItem | undefined>(undefined)

  const goHome = () => setScreen('home')

  const renderScreen = () => {
    switch (screen) {
      case 'meal':        return <MealRecord    onBack={goHome} />
      case 'dash':        return <Dashboard />
      case 'challenge':   return <Challenge     onBack={goHome} />
      case 'content':     return <ContentDetail onBack={goHome} />
      case 'shop-home':   return (
        <ShopHome
          onBack={goHome}
          onNavigate={(s, data) => {
            if (s === 'shop-detail' && data) setSelectedProduct(data)
            const mapped = s === 'shop-scan' ? 'food-scan' : s
            setScreen(mapped as Screen)
          }}
        />
      )
      case 'shop-detail': return selectedProduct ? (
        <ShopDetail product={selectedProduct} onBack={() => setScreen('shop-home')} />
      ) : null
      case 'shop-my': return <ShopMy onBack={() => setScreen('shop-home')} />

      case 'food-scan': return (
        <FoodScan
          onBack={goHome}
          onScan={() => setScreen('food-scan-camera')}
          onSearch={() => setScreen('food-scan-search')}
        />
      )
      case 'food-scan-camera': return (
        <FoodScanCamera
          onBack={() => setScreen('food-scan')}
          onResult={() => {
            setScannedFood(undefined)
            setScreen('food-scan-result')
          }}
        />
      )
      case 'food-scan-search': return (
        <FoodScanSearch
          onBack={() => setScreen('food-scan')}
          onSelect={(food) => {
            setScannedFood(food)
            setScreen('food-scan-result')
          }}
        />
      )
      case 'food-scan-result': return (
        <FoodScanResult
          food={scannedFood}
          onBack={() => setScreen(scannedFood ? 'food-scan-search' : 'food-scan-camera')}
          onAdded={goHome}
        />
      )

      default: return (
        <Home onNavigate={(s) => {
          // shop-scan nav item → food-scan screen
          setScreen((s === 'shop-scan' ? 'food-scan' : s) as Screen)
        }} />
      )
    }
  }

  return (
    <MobileFrame>
      {renderScreen()}
    </MobileFrame>
  )
}
