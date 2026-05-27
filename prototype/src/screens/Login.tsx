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
    <div style={{
      width: '100vw',
      height: '100svh',
      background: '#0a0a0a',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <form
        onSubmit={handleSubmit}
        style={{
          width: '100%',
          maxWidth: '320px',
          padding: '0 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}
      >
        <p style={{
          fontFamily: "'Pretendard', -apple-system, sans-serif",
          fontSize: '20px',
          fontWeight: 700,
          color: '#ffffff',
          marginBottom: '24px',
          letterSpacing: '-0.3px',
        }}>
          pasta
        </p>

        <input
          type="text"
          placeholder="아이디"
          value={id}
          autoComplete="username"
          onChange={e => { setId(e.target.value); setError(false) }}
          style={{
            width: '100%',
            height: '48px',
            background: '#161616',
            border: '1px solid #222',
            borderRadius: '10px',
            padding: '0 16px',
            fontSize: '14px',
            color: '#ffffff',
            fontFamily: "'Pretendard', -apple-system, sans-serif",
            outline: 'none',
            boxSizing: 'border-box',
          }}
        />

        <input
          type="password"
          placeholder="비밀번호"
          value={pw}
          autoComplete="current-password"
          onChange={e => { setPw(e.target.value); setError(false) }}
          style={{
            width: '100%',
            height: '48px',
            background: '#161616',
            border: '1px solid #222',
            borderRadius: '10px',
            padding: '0 16px',
            fontSize: '14px',
            color: '#ffffff',
            fontFamily: "'Pretendard', -apple-system, sans-serif",
            outline: 'none',
            boxSizing: 'border-box',
          }}
        />

        {error && (
          <p style={{
            fontSize: '12px',
            color: '#ff4d4d',
            margin: '0',
            fontFamily: "'Pretendard', -apple-system, sans-serif",
          }}>
            아이디 또는 비밀번호를 확인해주세요.
          </p>
        )}

        <button
          type="submit"
          style={{
            width: '100%',
            height: '48px',
            background: '#ffffff',
            color: '#0a0a0a',
            border: 'none',
            borderRadius: '10px',
            fontSize: '14px',
            fontWeight: 600,
            fontFamily: "'Pretendard', -apple-system, sans-serif",
            cursor: 'pointer',
            marginTop: '4px',
          }}
        >
          로그인
        </button>
      </form>
    </div>
  )
}
