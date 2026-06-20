import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import JoinPage from './components/JoinPage'
import ChatPage from './components/ChatPage'

export default function App() {
  return (
    <BrowserRouter>
      <div className="animated-bg" />
      <Routes>
        <Route path="/" element={<JoinPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
