import styles from './TypingIndicator.module.css'

export default function TypingIndicator({ typingUsers, currentUser }) {
  const others = typingUsers.filter(u => u !== currentUser)

  if (others.length === 0) return null

  const label =
    others.length === 1
      ? `${others[0]} is typing`
      : others.length === 2
      ? `${others[0]} and ${others[1]} are typing`
      : `${others[0]} and ${others.length - 1} others are typing`

  return (
    <div className={styles.wrapper + ' animate-in'}>
      <div className={styles.dots}>
        <span className={styles.dot} style={{ animationDelay: '0ms' }} />
        <span className={styles.dot} style={{ animationDelay: '160ms' }} />
        <span className={styles.dot} style={{ animationDelay: '320ms' }} />
      </div>
      <span className={styles.label}>{label}...</span>
    </div>
  )
}
