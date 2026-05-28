import { useState } from 'react'
import { X, Image, ArrowClockwise } from '@phosphor-icons/react'

type CameraState = 'idle' | 'analyzing' | 'failed'

export default function FoodScanCamera({
  onBack,
  onResult,
}: {
  onBack: () => void
  onResult: () => void
}) {
  const [state, setState] = useState<CameraState>('idle')

  const handleCapture = () => {
    setState('analyzing')
    setTimeout(() => {
      onResult()
    }, 1800)
  }

  return (
    <div className="relative flex flex-col h-full bg-black text-white overflow-hidden">

      {/* Camera viewfinder (simulated) */}
      <div className="absolute inset-0 bg-[#111] flex items-center justify-center">
        <span className="text-[13px] text-white/20">카메라 프리뷰</span>
      </div>

      {/* Overlay gradient top */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/70 to-transparent z-10" />

      {/* Overlay gradient bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black/80 to-transparent z-10" />

      {/* Header */}
      <div className="relative z-20 flex items-center justify-between px-base pt-9 pb-3">
        <button
          onClick={onBack}
          className="w-10 h-10 flex items-center justify-center"
        >
          <X size={22} weight="bold" className="text-white drop-shadow" />
        </button>
        <span className="text-[16px] font-semibold drop-shadow">음식 스캔</span>
        <button className="w-10 h-10 flex items-center justify-center">
          <Image size={22} weight="regular" className="text-white drop-shadow" />
        </button>
      </div>

      {/* Scan frame */}
      <div className="relative z-20 flex-1 flex flex-col items-center justify-center px-10">
        <div className="relative w-full aspect-square max-w-[280px]">
          {/* Corner markers */}
          {[
            'top-0 left-0 border-t-2 border-l-2 rounded-tl-lg',
            'top-0 right-0 border-t-2 border-r-2 rounded-tr-lg',
            'bottom-0 left-0 border-b-2 border-l-2 rounded-bl-lg',
            'bottom-0 right-0 border-b-2 border-r-2 rounded-br-lg',
          ].map((cls, i) => (
            <div key={i} className={`absolute w-6 h-6 border-white/70 ${cls}`} />
          ))}

          {/* Analyzing overlay */}
          {state === 'analyzing' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3
                            bg-black/40 rounded-xl backdrop-blur-sm">
              <div className="w-10 h-10 rounded-full border-2 border-accent border-t-transparent animate-spin" />
              <p className="text-[13px] text-white font-medium">AI가 분석 중이에요…</p>
            </div>
          )}

          {state === 'failed' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3
                            bg-black/40 rounded-xl">
              <p className="text-[13px] text-white/80">음식을 인식하지 못했어요</p>
              <button
                onClick={() => setState('idle')}
                className="flex items-center gap-1.5 px-4 py-2 bg-white/20 rounded-full text-[13px] text-white"
              >
                <ArrowClockwise size={14} />
                다시 시도
              </button>
            </div>
          )}
        </div>

        <p className="mt-6 text-[13px] text-white/60 text-center">
          음식을 프레임 안에 맞춰주세요
        </p>
      </div>

      {/* Bottom controls */}
      <div className="relative z-20 flex items-center justify-center pb-10 pt-4">
        <button
          onClick={handleCapture}
          disabled={state === 'analyzing'}
          className="w-[72px] h-[72px] rounded-full bg-white flex items-center justify-center
                     active:scale-95 transition-transform disabled:opacity-50"
        >
          <div className="w-[58px] h-[58px] rounded-full border-2 border-black/10" />
        </button>
      </div>

    </div>
  )
}
