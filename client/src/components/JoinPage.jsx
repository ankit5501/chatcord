import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './JoinPage.module.css'

const ROOMS = [
  { value: 'JavaScript', icon: '⚡' },
  { value: 'Python',     icon: '🐍' },
  { value: 'PHP',        icon: '🐘' },
  { value: 'C#',         icon: '🎯' },
  { value: 'Ruby',       icon: '💎' },
  { value: 'Java',       icon: '☕' },
  { value: 'AI Assistant', icon: '🤖' },
]

export default function JoinPage() {
  const navigate  = useNavigate()
  const [username, setUsername] = useState('')
  const [room,     setRoom]     = useState('JavaScript')
  const [error,    setError]    = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmed = username.trim()
    if (!trimmed) { setError('Please enter a username'); return }
    navigate(`/chat?username=${encodeURIComponent(trimmed)}&room=${encodeURIComponent(room)}`)
  }

  return (
    <div className={styles.page}>
      <div className={styles.card + ' glass animate-in'}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.logo}>
            <span className={styles.logoIcon}>💬</span>
            <span className={styles.logoText + ' gradient-text'}>ChatCord</span>
          </div>
          <p className={styles.tagline}>Real-time chat rooms · AI powered</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="username" className={styles.label}>Username</label>
            <div className={styles.inputWrapper}>
              <span className={styles.inputIcon}>👤</span>
              <input
                id="username"
                type="text"
                className={styles.input}
                placeholder="Enter your name..."
                value={username}
                onChange={e => { setUsername(e.target.value); setError('') }}
                autoComplete="off"
                maxLength={20}
              />
            </div>
            {error && <p className={styles.error}>{error}</p>}
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Choose a Room</label>
            <div className={styles.rooms}>
              {ROOMS.map(r => (
                <button
                  key={r.value}
                  type="button"
                  className={`${styles.roomBtn} ${room === r.value ? styles.roomBtnActive : ''}`}
                  onClick={() => setRoom(r.value)}
                >
                  <span>{r.icon}</span>
                  <span>{r.value}</span>
                </button>
              ))}
            </div>
          </div>

          <button type="submit" className={styles.joinBtn}>
            <span>Join Room</span>
            <span className={styles.joinArrow}>→</span>
          </button>
        </form>

        {/* Footer hint */}
        <p className={styles.hint}>
          🤖 Try the <strong>AI Assistant</strong> room for an AI-powered chat experience
        </p>
      </div>
    </div>
  )
}
