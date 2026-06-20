import { useState, useRef, useEffect, useCallback } from 'react'
import EmojiPicker from 'emoji-picker-react'
import styles from './ChatInput.module.css'

const TYPING_TIMEOUT = 1500

export default function ChatInput({ onSendMessage, onTyping, disabled }) {
  const [text,        setText]        = useState('')
  const [showEmoji,   setShowEmoji]   = useState(false)
  const typingTimer                   = useRef(null)
  const isTypingRef                   = useRef(false)
  const inputRef                      = useRef(null)
  const pickerRef                     = useRef(null)

  // Close emoji picker on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target)) {
        setShowEmoji(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const handleChange = useCallback((e) => {
    setText(e.target.value)

    // Typing events
    if (!isTypingRef.current) {
      isTypingRef.current = true
      onTyping(true)
    }
    clearTimeout(typingTimer.current)
    typingTimer.current = setTimeout(() => {
      isTypingRef.current = false
      onTyping(false)
    }, TYPING_TIMEOUT)
  }, [onTyping])

  const handleSubmit = useCallback((e) => {
    e?.preventDefault()
    if (!text.trim() || disabled) return
    onSendMessage(text)
    setText('')
    // stop typing
    clearTimeout(typingTimer.current)
    isTypingRef.current = false
    onTyping(false)
    inputRef.current?.focus()
  }, [text, disabled, onSendMessage, onTyping])

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  const onEmojiClick = (emojiData) => {
    setText(prev => prev + emojiData.emoji)
    inputRef.current?.focus()
  }

  return (
    <div className={styles.container + ' glass'}>
      <form className={styles.form} onSubmit={handleSubmit}>
        {/* Emoji button */}
        <div className={styles.emojiWrap} ref={pickerRef}>
          <button
            type="button"
            className={styles.emojiBtn}
            onClick={() => setShowEmoji(v => !v)}
            title="Emoji"
            id="emoji-btn"
          >
            😊
          </button>
          {showEmoji && (
            <div className={styles.pickerPopup}>
              <EmojiPicker
                onEmojiClick={onEmojiClick}
                theme="dark"
                searchDisabled={false}
                skinTonesDisabled
                height={380}
                width={310}
                previewConfig={{ showPreview: false }}
              />
            </div>
          )}
        </div>

        {/* Text input */}
        <input
          ref={inputRef}
          id="chat-input"
          className={styles.input}
          type="text"
          value={text}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={disabled ? 'Connecting...' : 'Type a message... (Enter to send)'}
          disabled={disabled}
          autoComplete="off"
          maxLength={500}
        />

        {/* Character count */}
        {text.length > 400 && (
          <span className={`${styles.charCount} ${text.length > 480 ? styles.charCountWarn : ''}`}>
            {500 - text.length}
          </span>
        )}

        {/* Send button */}
        <button
          type="submit"
          id="send-btn"
          className={`${styles.sendBtn} ${text.trim() && !disabled ? styles.sendBtnActive : ''}`}
          disabled={!text.trim() || disabled}
          title="Send message"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </button>
      </form>
    </div>
  )
}
