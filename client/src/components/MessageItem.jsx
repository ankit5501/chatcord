import styles from './MessageItem.module.css'

const BOT_NAME = 'ChatCord Bot'

export default function MessageItem({ message, isOwn }) {
  const isBot = message.username === BOT_NAME
  const isAI  = message.isAI || message.username === 'AI Assistant 🤖'

  const getInitials = (name) =>
    name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)

  const avatarBg = isAI
    ? 'linear-gradient(135deg, #00d4aa, #0094ff)'
    : isBot
    ? 'linear-gradient(135deg, #6c63ff, #8b7fff)'
    : `hsl(${(message.username.charCodeAt(0) * 37) % 360}, 65%, 55%)`

  if (isBot || isAI) {
    return (
      <div className={`${styles.row} ${styles.rowBot} animate-in`}>
        <div className={styles.avatar} style={{ background: avatarBg }}>
          {isAI ? '🤖' : '🤖'}
        </div>
        <div className={styles.bubbleWrap}>
          <div className={styles.meta}>
            <span className={isAI ? styles.aiLabel : styles.botLabel}>
              {message.username}
            </span>
            <span className={styles.time}>{message.time}</span>
          </div>
          <div className={`${styles.bubble} ${isAI ? styles.bubbleAI : styles.bubbleBot}`}>
            {message.text}
          </div>
        </div>
      </div>
    )
  }

  if (isOwn) {
    return (
      <div className={`${styles.row} ${styles.rowOwn} animate-in`}>
        <div className={styles.bubbleWrap + ' ' + styles.bubbleWrapOwn}>
          <div className={styles.meta + ' ' + styles.metaOwn}>
            <span className={styles.time}>{message.time}</span>
            <span className={styles.ownLabel}>You</span>
          </div>
          <div className={`${styles.bubble} ${styles.bubbleOwn}`}>
            {message.text}
          </div>
        </div>
        <div className={styles.avatar} style={{ background: avatarBg }}>
          {getInitials(message.username)}
        </div>
      </div>
    )
  }

  return (
    <div className={`${styles.row} animate-in`}>
      <div className={styles.avatar} style={{ background: avatarBg }}>
        {getInitials(message.username)}
      </div>
      <div className={styles.bubbleWrap}>
        <div className={styles.meta}>
          <span className={styles.username}>{message.username}</span>
          <span className={styles.time}>{message.time}</span>
        </div>
        <div className={`${styles.bubble} ${styles.bubbleOther}`}>
          {message.text}
        </div>
      </div>
    </div>
  )
}
