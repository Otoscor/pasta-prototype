import { motion } from 'framer-motion'
import { ArrowLeft, House, Scan, User } from '@phosphor-icons/react'

const TABS = [
  { id: 'shop-home', label: '홈',      icon: House },
  { id: 'shop-scan', label: '푸드스캔', icon: Scan  },
  { id: 'shop-my',   label: '마이',     icon: User  },
]

export default function ShopSubNav({
  activeId,
  onBack,
  onNavigate,
  animated = true,
}: {
  activeId: string
  onBack: () => void
  onNavigate: (id: string) => void
  animated?: boolean
}) {
  return (
    <motion.div
      initial={animated ? { opacity: 0, y: 24, scale: 0.92 } : false}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.22, ease: [0.34, 1.26, 0.64, 1] }}
      className="absolute bottom-5 left-0 right-0 mx-auto w-fit
                 bg-bg-card border border-border-dark rounded-2xl shadow-2xl
                 flex items-center px-2 py-2 h-[60px]"
    >
      {/* 뒤로가기 */}
      <motion.button
        whileTap={{ scale: 0.88 }}
        transition={{ type: 'spring', stiffness: 500, damping: 25 }}
        onClick={onBack}
        className="w-10 h-10 rounded-full bg-bg-input flex items-center justify-center flex-none ml-1"
      >
        <ArrowLeft size={20} weight="bold" className="text-text-secondary" />
      </motion.button>

      {TABS.map(({ id, label, icon: Icon }) => {
        const isActive = activeId === id
        return (
          <motion.button
            key={id}
            whileTap={{ scale: 0.88 }}
            transition={{ type: 'spring', stiffness: 500, damping: 25 }}
            onClick={() => onNavigate(id)}
            className={`flex flex-col items-center gap-0.5 w-[72px] justify-center
              ${isActive ? 'text-accent' : 'text-text-tertiary'}`}
          >
            <Icon size={22} weight={isActive ? 'fill' : 'regular'} />
            <span className="text-[11px] font-medium">{label}</span>
          </motion.button>
        )
      })}
    </motion.div>
  )
}
