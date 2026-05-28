import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, House, Scan, User } from '@phosphor-icons/react'

const TABS = [
  { id: 'shop-home', label: '홈',      icon: House },
  { id: 'shop-scan', label: '안심스캔', icon: Scan  },
  { id: 'shop-my',   label: '마이',     icon: User  },
]

export default function ShopSubNav({
  activeId,
  onBack,
  onNavigate,
}: {
  activeId: string
  onBack: () => void
  onNavigate: (id: string) => void
}) {
  const [exiting, setExiting] = useState(false)

  const handleBack = () => {
    setExiting(true)
    setTimeout(onBack, 220)
  }

  return (
    <motion.div
      initial={false}
      animate={exiting
        ? { y: 72, opacity: 0, transition: { duration: 0.22, ease: [0.4, 0, 1, 1] } }
        : { y: 0, opacity: 1, transition: { duration: 0 } }
      }
      className="absolute bottom-5 left-0 right-0 mx-auto w-fit
                 bg-lt-card border border-lt-border rounded-2xl shadow-2xl
                 flex items-center px-2 py-2 h-[60px]"
    >
      <motion.button
        whileTap={{ scale: 0.88 }}
        transition={{ type: 'spring', stiffness: 500, damping: 25 }}
        onClick={handleBack}
        className="w-10 h-10 flex items-center justify-center flex-none ml-1"
      >
        <ArrowLeft size={20} weight="bold" className="text-lt-secondary" />
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
              ${isActive ? 'text-accent' : 'text-lt-tertiary'}`}
          >
            <Icon size={22} weight={isActive ? 'fill' : 'regular'} />
            <span className="text-[11px] font-medium">{label}</span>
          </motion.button>
        )
      })}
    </motion.div>
  )
}
