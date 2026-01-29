import { Card, Typography, Input, Button, Avatar, Badge, Empty } from 'antd'
import { Send, MessageCircle, User } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'

const { Text } = Typography
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

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin': return 'blue'
      case 'operator': return 'green'
      case 'consultant': return 'purple'
      default: return 'default'
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
    <div className="flex flex-col md:flex-row gap-4" style={{ height: 'calc(100vh - 200px)' }}>
      {/* Conversations List - Hidden on mobile when conversation selected */}
      <Card 
        className={`${selectedConversation && currentConversation ? 'hidden md:block' : 'block'} w-full md:w-80 md:flex-shrink-0`}
        style={{ height: '100%', overflow: 'auto' }}
        title={
          <div className="flex items-center gap-2">
            <MessageCircle size={20} />
            <span>Conversations</span>
          </div>
        }
      >
        {conversations.length === 0 ? (
          <Empty description="No conversations yet" />
        ) : (
          <div className="space-y-2">
            {conversations.map(conv => (
              <div
                key={conv.id}
                onClick={() => setSelectedConversation(conv.id)}
                className={`p-3 rounded-lg cursor-pointer transition-all ${
                  selectedConversation === conv.id 
                    ? 'bg-blue-50 border-2 border-blue-500' 
                    : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                }`}
              >
                <div className="flex items-start gap-3">
                  <Badge dot={conv.status === 'online'} color="green">
                    <Avatar icon={<User size={20} />} style={{ backgroundColor: '#1890ff' }} />
                  </Badge>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <Text strong className="truncate">{conv.participantName}</Text>
                      {conv.unreadCount > 0 && (
                        <Badge count={conv.unreadCount} />
                      )}
                    </div>
                    <Text type="secondary" className="text-xs capitalize">
                      {conv.participantRole}
                    </Text>
                    {conv.lastMessage && (
                      <Text type="secondary" className="text-xs block truncate mt-1">
                        {conv.lastMessage.content}
                      </Text>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Chat Panel - Full screen on mobile */}
      <Card 
        className={`${selectedConversation && currentConversation ? 'block' : 'hidden md:block'} flex-1`}
        style={{ height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}
        title={
          currentConversation ? (
            <div className="flex items-center gap-3">
              {/* Back button for mobile */}
              <Button
                type="text"
                icon={<span>←</span>}
                onClick={() => setSelectedConversation(null)}
                className="md:hidden"
              />
              <Badge dot={currentConversation.status === 'online'} color="green">
                <Avatar icon={<User size={20} />} style={{ backgroundColor: '#1890ff' }} />
              </Badge>
              <div>
                <Text strong>{currentConversation.participantName}</Text>
                <Text type="secondary" className="text-xs block capitalize">
                  {currentConversation.participantRole} • {currentConversation.status}
                </Text>
              </div>
            </div>
          ) : (
            'Select a conversation'
          )
        }
      >
        {!currentConversation ? (
          <div className="flex items-center justify-center h-full">
            <Empty description="Select a conversation to start chatting" />
          </div>
        ) : (
          <div className="flex flex-col" style={{ height: 'calc(100% - 0px)' }}>
            {/* Messages - Scrollable area with padding for fixed input */}
            <div 
              className="flex-1 overflow-auto p-4 space-y-4" 
              style={{ paddingBottom: '100px' }}
            >
              {currentConversation.messages.map(message => {
                const isOwnMessage = message.senderRole === userRole
                return (
                  <div
                    key={message.id}
                    className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[85%] md:max-w-[70%] ${isOwnMessage ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
                      <div className="flex items-center gap-2 flex-wrap">
                        {!isOwnMessage && (
                          <Avatar size="small" icon={<User size={14} />} />
                        )}
                        <Text className="text-xs" type="secondary">
                          {message.senderName}
                        </Text>
                        <Badge 
                          count={message.senderRole.toUpperCase()} 
                          style={{ 
                            backgroundColor: getRoleBadgeColor(message.senderRole) === 'blue' ? '#1890ff' : 
                                           getRoleBadgeColor(message.senderRole) === 'green' ? '#52c41a' : '#722ed1',
                            fontSize: '10px',
                            height: '18px',
                            lineHeight: '18px'
                          }}
                        />
                      </div>
                      <div
                        className={`p-3 rounded-lg break-words ${
                          isOwnMessage
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        <Text className={isOwnMessage ? 'text-white' : ''}>
                          {message.content}
                        </Text>
                      </div>
                      <Text className="text-xs" type="secondary">
                        {formatTime(message.timestamp)}
                      </Text>
                    </div>
                  </div>
                )
              })}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <Text type="secondary" className="text-sm">Typing...</Text>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input - Fixed at bottom */}
            <div 
              className="border-t p-4 bg-white"
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 10
              }}
            >
              <div className="flex gap-2">
                <TextArea
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onPressEnter={(e) => {
                    if (!e.shiftKey) {
                      e.preventDefault()
                      handleSendMessage()
                    }
                  }}
                  placeholder="Type your message..."
                  autoSize={{ minRows: 1, maxRows: 3 }}
                  className="flex-1"
                  style={{ fontSize: '16px' }}
                />
                <Button
                  type="primary"
                  icon={<Send size={16} />}
                  onClick={handleSendMessage}
                  disabled={!messageInput.trim()}
                  className="flex-shrink-0"
                >
                  <span className="hidden sm:inline">Send</span>
                </Button>
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  )
}

export default SupportChat
