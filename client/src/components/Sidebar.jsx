import UserItem from './UserItem'
import styles from './Sidebar.module.css'

export default function Sidebar({ room, users, isOnline, connected, isAIRoom, onLeave }) {
  return (
    <aside className={styles.sidebar + ' glass'}>
      {/* Brand */}
      <div className={styles.brand}>
        <span className={styles.brandIcon}>💬</span>
        <span className={styles.brandText + ' gradient-text'}>ChatCord</span>
      </div>

      {/* Connection status banner */}
      <div className={`${styles.statusBanner} ${isOnline && connected ? styles.bannerOnline : styles.bannerOffline}`}>
        <span className={styles.statusDot} />
        <span>{isOnline && connected ? 'Connected' : !isOnline ? 'No Internet' : 'Reconnecting...'}</span>
      </div>

      {/* Room info */}
      <div className={styles.section}>
        <p className={styles.sectionLabel}>Current Room</p>
        <div className={`${styles.roomBadge} ${isAIRoom ? styles.roomBadgeAI : ''}`}>
          <span>{isAIRoom ? '🤖' : '💬'}</span>
          <span>{room}</span>
        </div>
      </div>

      {/* Users list */}
      <div className={styles.section + ' ' + styles.usersSection}>
        <p className={styles.sectionLabel}>
          Members
          <span className={styles.memberCount}>{users.length}</span>
        </p>
        <ul className={styles.userList}>
          {users.map(user => (
            <UserItem key={user.id} user={user} />
          ))}
          {isAIRoom && (
            <UserItem
              key="ai-bot"
              user={{ id: 'ai-bot', username: 'AI Assistant 🤖' }}
              isAI
            />
          )}
        </ul>
      </div>

      {/* Leave button */}
      <div className={styles.footer}>
        <button className={styles.leaveBtn} onClick={onLeave}>
          <span>← Leave Room</span>
        </button>
      </div>
    </aside>
  )
}
