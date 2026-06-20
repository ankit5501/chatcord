import { useEffect, useRef, useState } from 'react'
import { io } from 'socket.io-client'

/**
 * Custom hook that manages a Socket.IO connection lifecycle.
 * Connects on mount, disconnects on unmount.
 */
export function useSocket(serverUrl = '/') {
  const socketRef = useRef(null)
  const [connected, setConnected] = useState(false)

  useEffect(() => {
    const socket = io(serverUrl, {
      transports: ['websocket', 'polling'],
    })

    socketRef.current = socket

    socket.on('connect',    () => setConnected(true))
    socket.on('disconnect', () => setConnected(false))

    return () => {
      socket.disconnect()
    }
  }, [serverUrl])

  return { socket: socketRef.current, connected }
}
