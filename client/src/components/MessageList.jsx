import { useEffect, useRef } from 'react'
import MessageItem from './MessageItem'
import styles from './MessageList.module.css'

export default function MessageList({ messages, currentUser }) {
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className={styles.list} id="message-list">
      {messages.length === 0 && (
        <div className={styles.empty}>
          <span className={styles.emptyIcon}>💬</span>
          <p>No messages yet. Say hello!</p>
        </div>
      )}
      {messages.map((msg) => (
        <MessageItem
          key={msg.id}
          message={msg}
          isOwn={msg.username === currentUser}
        />
      ))}
      <div ref={bottomRef} />
    </div>
  )
}
