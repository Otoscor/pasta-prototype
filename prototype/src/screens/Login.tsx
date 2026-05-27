import { useState } from 'react'

export default function Login({ onLogin }: { onLogin: () => void }) {
  const [id, setId] = useState('')
  const [pw, setPw] = useState('')
  const [error, setError] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (
      id === import.meta.env.VITE_AUTH_ID &&
      pw === import.meta.env.VITE_AUTH_PW
    ) {
      localStorage.setItem('pasta_auth', 'true')
      onLogin()
    } else {
      setError(true)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-full bg-bg-primary px-8">
      <div className="mb-10 text-center">
        <p className="text-[32px] font-black text-text-primary tracking-tight">pasta</p>
        <p className="text-[13px] text-text-tertiary mt-1">프로토타입 미리보기</p>
      </div>

      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3">
        <input
          type="text"
          placeholder="아이디"
          value={id}
          onChange={e => { setId(e.target.value); setError(false) }}
          className="w-full h-[52px] bg-bg-input rounded-xl px-4 text-[15px] text-text-primary placeholder:text-text-tertiary outline-none border border-transparent focus:border-accent transition-colors"
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={pw}
          onChange={e => { setPw(e.target.value); setError(false) }}
          className="w-full h-[52px] bg-bg-input rounded-xl px-4 text-[15px] text-text-primary placeholder:text-text-tertiary outline-none border border-transparent focus:border-accent transition-colors"
        />

        {error && (
          <p className="text-[12px] text-accent-red text-center">아이디 또는 비밀번호가 올바르지 않습니다.</p>
        )}

        <button
          type="submit"
          className="w-full h-[52px] bg-accent text-text-on-accent rounded-xl text-[15px] font-bold mt-1"
        >
          로그인
        </button>
      </form>
    </div>
  )
}
