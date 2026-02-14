import { Input, Button, Badge } from 'antd'
import { Send, MessageCircle, User } from 'lucide-react'
import React, { useState, useEffect, useRef } from 'react'

const { TextArea } = Input

interface Message {
  id: string
  senderId: string
  senderName: string
  senderRole: 'admin' | 'operator' | 'consultant'
  content: string
  timestamp: Date
  read: boolean
}

interface Conversation {
  id: string
  participantName: string
  participantRole: 'admin' | 'operator' | 'consultant'
  messages: Message[]
  lastMessage?: Message
  unreadCount: number
  status: 'online' | 'offline'
}

interface SupportChatProps {
  userRole: 'admin' | 'operator' | 'consultant'
  userName: string
}

// Mock initial conversations
const getInitialConversations = (userRole: string): Conversation[] => {
  if (userRole === 'consultant') {
    return [
      {
        id: '1',
        participantName: 'Lagos State Admin',
        participantRole: 'admin',
        messages: [
          {
            id: 'm1',
            senderId: 'admin1',
            senderName: 'Lagos State Admin',
            senderRole: 'admin',
            content: 'Hello, I need help exporting the revenue report for Q4 2025.',
            timestamp: new Date(Date.now() - 3600000),
            read: true
          },
          {
            id: 'm2',
            senderId: 'consultant1',
            senderName: 'Support Consultant',
            senderRole: 'consultant',
            content: 'Hi! I can help you with that. Go to Revenue Center, click the "Export" button in the top right corner, and select your date range.',
            timestamp: new Date(Date.now() - 3000000),
            read: true
          }
        ],
        unreadCount: 0,
        status: 'online'
      },
      {
        id: '2',
        participantName: 'Bet9ja Operator',
        participantRole: 'operator',
        messages: [
          {
            id: 'm3',
            senderId: 'operator1',
            senderName: 'Bet9ja Operator',
            senderRole: 'operator',
            content: 'My API integration is returning error 401. Can you help?',
            timestamp: new Date(Date.now() - 1800000),
            read: false
          }
        ],
        unreadCount: 1,
        status: 'online'
      }
    ]
  } else {
    return [
      {
        id: '1',
        participantName: 'Support Consultant',
        participantRole: 'consultant',
        messages: [],
        unreadCount: 0,
        status: 'online'
      }
    ]
  }
}

const SupportChat = ({ userRole, userName }: SupportChatProps) => {
  const [conversations, setConversations] = useState<Conversation[]>(() => getInitialConversations(userRole))
  const [selectedConversation, setSelectedConversation] = useState<string | null>(conversations[0]?.id || null)
  const [messageInput, setMessageInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const currentConversation = conversations.find(c => c.id === selectedConversation)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [currentConversation?.messages])

  const handleSendMessage = () => {
    if (!messageInput.trim() || !selectedConversation) return

    const newMessage: Message = {
      id: `m${Date.now()}`,
      senderId: 'current-user',
      senderName: userName,
      senderRole: userRole,
      content: messageInput,
      timestamp: new Date(),
      read: false
    }

    setConversations(prev => prev.map(conv => {
      if (conv.id === selectedConversation) {
        return {
          ...conv,
          messages: [...conv.messages, newMessage],
          lastMessage: newMessage
        }
      }
      return conv
    }))

    setMessageInput('')

    // Simulate consultant auto-reply (only if user is not consultant)
    if (userRole !== 'consultant') {
      setIsTyping(true)
      setTimeout(() => {
        const autoReply: Message = {
          id: `m${Date.now() + 1}`,
          senderId: 'consultant1',
          senderName: 'Support Consultant',
          senderRole: 'consultant',
          content: 'Thank you for your message. A consultant will respond shortly. In the meantime, you can check our documentation or FAQs.',
          timestamp: new Date(),
          read: false
        }

        setConversations(prev => prev.map(conv => {
          if (conv.id === selectedConversation) {
            return {
              ...conv,
              messages: [...conv.messages, autoReply],
              lastMessage: autoReply
            }
          }
          return conv
        }))
        setIsTyping(false)
      }, 2000)
    }
  }


  const formatTime = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    
    if (minutes < 1) return 'Just now'
    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    return date.toLocaleDateString()
  }

  return (
    <div className="flex flex-col md:flex-row gap-6" style={{ height: 'calc(100vh - 420px)', minHeight: '600px' }}>
      {/* Conversations List */}
      <div 
        className={`${selectedConversation && currentConversation ? 'hidden md:flex' : 'flex'} flex-col w-full md:w-80 md:flex-shrink-0 bg-black/40 border-2 border-white/[0.05] rounded-[24px] overflow-hidden shadow-2xl`}
      >
        <div className="p-6 border-b border-white/5 bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
              <MessageCircle size={20} className="text-emerald-500" />
            </div>
            <span className="text-sm font-black text-white uppercase tracking-widest">Active Links</span>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
          {conversations.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center opacity-20 italic text-xs uppercase tracking-widest text-[#64748B]">
              No secure uplinks
            </div>
          ) : (
            conversations.map(conv => (
              <div
                key={conv.id}
                onClick={() => setSelectedConversation(conv.id)}
                className={`p-4 rounded-2xl cursor-pointer transition-all border-2 group ${
                  selectedConversation === conv.id 
                    ? 'bg-emerald-500/10 border-emerald-500/30 shadow-neon' 
                    : 'bg-white/[0.02] border-transparent hover:bg-white/[0.05] hover:border-white/5'
                }`}
              >
                <div className="flex items-start gap-4">
                  <Badge dot={conv.status === 'online'} color="#10B981" offset={[-2, 32]}>
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center border-2 transition-colors ${
                      selectedConversation === conv.id ? 'bg-emerald-500/20 border-emerald-500/40' : 'bg-black/20 border-white/10'
                    }`}>
                      <User size={24} className={selectedConversation === conv.id ? 'text-emerald-400' : 'text-[#64748B]'} />
                    </div>
                  </Badge>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-sm font-black uppercase tracking-tight truncate ${selectedConversation === conv.id ? 'text-emerald-400' : 'text-white'}`}>
                        {conv.participantName}
                      </span>
                      {conv.unreadCount > 0 && (
                        <div className="px-2 py-0.5 rounded-full bg-emerald-500 text-[10px] font-black text-black animate-pulse">
                          {conv.unreadCount}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black text-[#64748B] uppercase tracking-widest leading-none">
                        {conv.participantRole}
                      </span>
                      <span className="text-[9px] font-bold text-[#475569] tabular-nums">
                        {conv.lastMessage ? formatTime(conv.lastMessage.timestamp) : ''}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Chat Panel */}
      <div 
        className={`${selectedConversation && currentConversation ? 'flex' : 'hidden md:flex'} flex-1 flex-col bg-black/40 border-2 border-white/[0.05] rounded-[24px] overflow-hidden shadow-2xl relative`}
      >
        {currentConversation ? (
          <div className="p-6 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                type="text"
                icon={<span className="text-emerald-500 font-black text-lg">←</span>}
                onClick={() => setSelectedConversation(null)}
                className="md:hidden p-0 w-8 h-8 flex items-center justify-center hover:bg-emerald-500/10"
              />
              <Badge dot={currentConversation.status === 'online'} color="#10B981" offset={[-2, 34]}>
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                  <User size={24} className="text-emerald-400" />
                </div>
              </Badge>
              <div>
                <h3 className="m-0 text-white text-base font-black uppercase tracking-tight leading-tight">
                  {currentConversation.participantName}
                </h3>
                <span className="text-[10px] font-black text-[#64748B] uppercase tracking-[0.2em] italic">
                  {currentConversation.participantRole} Hub • {currentConversation.status}
                </span>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[9px] font-black text-emerald-500/50 uppercase tracking-widest">Secure Link Established</span>
            </div>
          </div>
        ) : null}

        {!currentConversation ? (
          <div className="flex-1 flex flex-col items-center justify-center space-y-6 opacity-40">
            <div className="w-20 h-20 rounded-3xl border-4 border-dashed border-white/10 flex items-center justify-center">
              <MessageCircle size={32} className="text-[#64748B]" />
            </div>
            <span className="text-xs font-black uppercase tracking-[0.3em] text-[#64748B]">
              Awaiting Secure Uplink
            </span>
          </div>
        ) : (
          <div className="flex-1 flex flex-col min-h-0 bg-black/20">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
              {currentConversation.messages.map(message => {
                const isOwnMessage = message.senderRole === userRole
                return (
                  <div
                    key={message.id}
                    className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[85%] md:max-w-[70%] flex flex-col ${isOwnMessage ? 'items-end' : 'items-start'} gap-2`}>
                      <div className="flex items-center gap-3">
                        {!isOwnMessage && (
                          <div className="w-6 h-6 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                            <User size={12} className="text-[#64748B]" />
                          </div>
                        )}
                        <span className="text-[10px] font-black text-[#64748B] uppercase tracking-widest">
                          {message.senderName}
                        </span>
                        <span className={`px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-tighter ${
                          message.senderRole === 'admin' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 
                          message.senderRole === 'consultant' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 
                          'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        }`}>
                          {message.senderRole}
                        </span>
                      </div>
                      
                      <div
                        className={`p-4 rounded-2xl text-sm font-medium leading-relaxed relative group transition-all ${
                          isOwnMessage
                            ? 'bg-emerald-600 border border-emerald-500/50 text-white rounded-tr-none'
                            : 'bg-white/[0.03] border border-white/10 text-[#94A3B8] rounded-tl-none'
                        }`}
                      >
                        {message.content}
                      </div>
                      
                      <span className="text-[9px] font-bold text-[#475569] uppercase tracking-tighter tabular-nums">
                        {formatTime(message.timestamp)}
                      </span>
                    </div>
                  </div>
                )
              })}
              {isTyping && (
                <div className="flex justify-start items-center gap-3 animate-pulse">
                  <div className="w-6 h-6 rounded-lg bg-white/5 flex items-center justify-center">
                    <div className="w-1 h-1 rounded-full bg-emerald-500 animate-bounce" />
                  </div>
                  <span className="text-[9px] font-black text-emerald-500/50 uppercase tracking-widest italic">Decrypting incoming transmission...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-6 border-t border-white/5 bg-white/[0.01]">
              <div className="relative group">
                <TextArea
                  value={messageInput}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setMessageInput(e.target.value)}
                  onPressEnter={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
                    if (!e.shiftKey) {
                      e.preventDefault()
                      handleSendMessage()
                    }
                  }}
                  placeholder="Communicate with command center..."
                  autoSize={{ minRows: 1, maxRows: 4 }}
                  className="w-full bg-black/40 border-2 border-white/10 rounded-2xl px-6 py-4 text-white text-sm placeholder:text-[#475569] focus:border-emerald-500/50 transition-all pr-24"
                  style={{ resize: 'none' }}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!messageInput.trim()}
                  className="absolute right-3 bottom-3 p-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:bg-white/5 disabled:text-[#475569] text-white transition-all shadow-neon-sm active:scale-95 flex items-center gap-2 group/btn"
                >
                  <Send size={18} />
                  <span className="text-[10px] font-black uppercase tracking-widest mr-1 sm:block hidden">Transmit</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SupportChat
