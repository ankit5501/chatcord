import { useEffect, useRef, useState, useCallback } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { io } from 'socket.io-client'
import { useOnlineStatus } from '../hooks/useOnlineStatus'
import Sidebar        from './Sidebar'
import MessageList    from './MessageList'
import ChatInput      from './ChatInput'
import TypingIndicator from './TypingIndicator'
import styles from './ChatPage.module.css'

// Smart AI responses for the AI Assistant room
const AI_RESPONSES = [
  "That's a fascinating question! Let me think about that... 🤔",
  "Great point! Here's what I know: AI systems like me are trained on massive datasets to understand and generate text. Pretty wild, right? 🧠",
  "I can help with coding questions, explanations, brainstorming, and more! What would you like to explore? 💡",
  "Interesting! The intersection of human creativity and AI is one of the most exciting areas right now. 🚀",
  "Fun fact: The term 'Artificial Intelligence' was coined in 1956 at the Dartmouth Conference. How times have changed! ⚡",
  "I'm processing that... In short: yes, that's correct! But there are always nuances worth exploring. 🎯",
  "That's a deep question. Philosophy and AI intersect beautifully here — machines that can reason, yet lack consciousness. Fascinating! 🌌",
  "Here's a coding tip: Always write code as if the person who will maintain it knows where you live 😄. Clean code matters!",
  "Want me to explain that differently? I can break it down step by step. Just ask! 📚",
  "Absolutely! That approach would work well. You might also consider edge cases like null values or empty arrays. 🛡️",
]

let aiResponseIndex = 0
const getAIResponse = () => {
  const response = AI_RESPONSES[aiResponseIndex % AI_RESPONSES.length]
  aiResponseIndex++
  return response
}

export default function ChatPage() {
  const navigate             = useNavigate()
  const [searchParams]       = useSearchParams()
  const isOnline             = useOnlineStatus()

  const username = searchParams.get('username') || 'Anonymous'
  const room     = searchParams.get('room')     || 'JavaScript'
  const isAIRoom = room === 'AI Assistant'

  const socketRef      = useRef(null)
  const [messages,     setMessages]     = useState([])
  const [users,        setUsers]        = useState([])
  const [typingUsers,  setTypingUsers]  = useState([])
  const [connected,    setConnected]    = useState(false)

  // Redirect to join if no params
  useEffect(() => {
    if (!searchParams.get('username')) navigate('/')
  }, [])

  // Socket connection
  useEffect(() => {
    const socket = io('/', { transports: ['websocket', 'polling'] })
    socketRef.current = socket

    socket.on('connect',    () => setConnected(true))
    socket.on('disconnect', () => setConnected(false))

    socket.emit('joinRoom', { username, room })

    socket.on('message', (message) => {
      setMessages(prev => [...prev, { ...message, id: Date.now() + Math.random() }])
    })

    socket.on('roomUsers', ({ room: _room, users }) => {
      setUsers(users)
    })

    socket.on('userTyping', ({ username: typingUser }) => {
      setTypingUsers(prev =>
        prev.includes(typingUser) ? prev : [...prev, typingUser]
      )
    })

    socket.on('userStopTyping', ({ username: typingUser }) => {
      setTypingUsers(prev => prev.filter(u => u !== typingUser))
    })

    return () => socket.disconnect()
  }, [username, room])

  const sendMessage = useCallback((text) => {
    if (!text.trim() || !socketRef.current) return
    socketRef.current.emit('chatMessage', text)

    // AI room: simulate AI response after a delay
    if (isAIRoom) {
      setTimeout(() => {
        const aiMsg = {
          username: 'AI Assistant 🤖',
          text: getAIResponse(),
          time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
          id: Date.now() + Math.random(),
          isAI: true,
        }
        setMessages(prev => [...prev, aiMsg])
      }, 800 + Math.random() * 600)
    }
  }, [isAIRoom])

  const handleTyping = useCallback((isTyping) => {
    if (!socketRef.current) return
    socketRef.current.emit(isTyping ? 'typing' : 'stopTyping')
  }, [])

  const leaveRoom = () => navigate('/')

  return (
    <div className={styles.layout}>
      {/* Sidebar */}
      <Sidebar
        room={room}
        users={users}
        isOnline={isOnline}
        connected={connected}
        isAIRoom={isAIRoom}
        onLeave={leaveRoom}
      />

      {/* Main chat area */}
      <div className={styles.main}>
        {/* Header */}
        <header className={styles.header + ' glass'}>
          <div className={styles.headerLeft}>
            <button className={styles.menuBtn} onClick={leaveRoom} title="Leave room">←</button>
            <div>
              <h1 className={styles.roomTitle}>
                {isAIRoom ? '🤖 ' : '💬 '}
                {room}
              </h1>
              <p className={styles.roomSub}>
                {connected
                  ? `${users.length} member${users.length !== 1 ? 's' : ''} online`
                  : 'Connecting...'}
              </p>
            </div>
          </div>
          <div className={styles.headerRight}>
            <span className={`${styles.connDot} ${connected && isOnline ? styles.connDotOnline : styles.connDotOffline}`} />
            <span className={styles.connLabel}>
              {connected && isOnline ? 'Live' : 'Offline'}
            </span>
          </div>
        </header>

        {/* Messages */}
        <MessageList messages={messages} currentUser={username} />

        {/* Typing indicator */}
        <TypingIndicator typingUsers={typingUsers} currentUser={username} />

        {/* Input */}
        <ChatInput
          onSendMessage={sendMessage}
          onTyping={handleTyping}
          disabled={!connected}
        />
      </div>
    </div>
  )
}
