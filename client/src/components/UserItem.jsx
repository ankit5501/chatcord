import styles from './UserItem.module.css'

export default function UserItem({ user, isAI = false }) {
  const initials = user.username
    .split(' ')
    .map(w => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  const avatarColor = isAI
    ? 'linear-gradient(135deg, #00d4aa, #0094ff)'
    : `hsl(${(user.username.charCodeAt(0) * 37) % 360}, 65%, 55%)`

  return (
    <li className={`${styles.item} animate-in`}>
      <div className={styles.avatarWrap}>
        <div
          className={styles.avatar}
          style={{ background: avatarColor }}
        >
          {isAI ? '🤖' : initials}
        </div>
        <span className={`${styles.onlineDot} ${isAI ? styles.aiDot : styles.userDot}`} />
      </div>
      <span className={styles.name}>{user.username}</span>
      {isAI && <span className={styles.aiBadge}>AI</span>}
    </li>
  )
}
