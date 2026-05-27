import { ArrowLeft, ShareNetwork, ChatCircle } from '@phosphor-icons/react'

const BODY_TEXT = `부드럽게 볶아낸 마파두부는 밥 위에 얹어 먹으면 됩니다. 이때 찬밥을 활용해보세요. 냉장고에 넣어둔 찬밥을 전자레인지에 데워 사용하면 됩니다.

찬밥에는 저항성 전분이 생깁니다. 전분은 소화되는 속도에 따라 종류를 구분하는데, 그 중 소화되지 않는 것을 저항성 전분이라고 합니다.

저항성 전분은 혈당을 천천히 올리고 포만감을 오래 유지시켜주기 때문에 다이어트 식단에 적합합니다.`

export default function ContentDetail({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex flex-col h-full bg-white text-lt-text">
      {/* Top Nav */}
      <div className="flex items-center justify-between px-base pt-2 pb-3">
        <button onClick={onBack} className="p-2 -ml-2 text-lt-text">
          <ArrowLeft size={22} strokeWidth={1.5} />
        </button>
        <button className="p-2 text-lt-text">
          <ShareNetwork size={20} weight="regular" />
        </button>
      </div>

      {/* Food Photo */}
      <div className="mx-base rounded-xl overflow-hidden bg-lt-bg h-52 flex items-center justify-center mb-xl">
        <span className="text-7xl">🍛</span>
      </div>

      {/* Body text */}
      <div className="px-base flex-1 overflow-y-auto">
        {BODY_TEXT.split('\n\n').map((para, i) => (
          <p key={i} className="text-base leading-relaxed text-lt-text mb-5">
            {para}
          </p>
        ))}
      </div>

      {/* Comment bar */}
      <div className="flex-shrink-0 border-t border-gray-100 px-base py-3 flex items-center gap-3">
        <ChatCircle size={20} weight="regular" className="text-lt-secondary" />
        <span className="text-lt-secondary text-sm">댓글을 남겨주세요.</span>
      </div>
    </div>
  )
}
