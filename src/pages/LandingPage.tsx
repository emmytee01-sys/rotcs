import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Modal, Form, Input, Alert } from 'antd'
import { Lock, X } from 'lucide-react'
import { motion } from 'framer-motion'
import { useAuth } from '@/contexts/AuthContext'
import logo from '@/assets/logo.png'
import heroVideo from '@/assets/hero-video.mp4'
import betkingLogo from '@/assets/betking.webp'
import sportybetLogo from '@/assets/sportybet.jpg'
import onexbetLogo from '@/assets/1xbet.jpg'
import bet9jaLogo from '@/assets/bet9ja.png'

const LandingPage = () => {
  const navigate = useNavigate()
  const { login, user } = useAuth()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()

  // Redirect when user logs in
  useEffect(() => {
    if (user) {
      const dashboardPaths = {
        admin: '/admin/revenue',
        consultant: '/consultant/hub',
        operator: '/operator/home',
      }
      navigate(dashboardPaths[user.role], { replace: true })
    }
  }, [user, navigate])

  const handleSignIn = async (values: { email: string; password: string }) => {
    setError('')
    setLoading(true)

    try {
      await login(values.email, values.password)
      setIsModalOpen(false)
      form.resetFields()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Authentication failed')
    } finally {
      setLoading(false)
    }
  }

  const openModal = () => {
    setIsModalOpen(true)
    setError('')
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setError('')
    form.resetFields()
  }

  return (
    <div className="h-screen w-full relative overflow-hidden bg-black">
      {/* Video Background - Full Height on Right Side */}
      <div className="absolute inset-0 flex">
        {/* Left side - Black background with green glow (desktop only) */}
        <div 
          className="hidden lg:block lg:w-1/2 bg-black relative overflow-hidden"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(16, 185, 129, 0.15) 0%, rgba(0, 0, 0, 1) 60%)'
          }}
        >
          {/* Randomly scattered particle dots */}
          {Array.from({ length: 80 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: `${Math.random() * 3 + 1}px`,
                height: `${Math.random() * 3 + 1}px`,
                background: 'rgba(255, 255, 255, 0.3)',
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.5 + 0.3
              }}
            />
          ))}
          
          {/* Floating glow effects */}
          <div 
            className="absolute w-32 h-32 rounded-full blur-3xl animate-pulse"
            style={{
              background: 'rgba(16, 185, 129, 0.3)',
              top: '20%',
              left: '15%',
              animation: 'float 6s ease-in-out infinite'
            }}
          />
          <div 
            className="absolute w-24 h-24 rounded-full blur-2xl animate-pulse"
            style={{
              background: 'rgba(16, 185, 129, 0.2)',
              top: '60%',
              left: '70%',
              animation: 'float 8s ease-in-out infinite 2s'
            }}
          />
          <div 
            className="absolute w-20 h-20 rounded-full blur-2xl animate-pulse"
            style={{
              background: 'rgba(16, 185, 129, 0.25)',
              top: '40%',
              left: '40%',
              animation: 'float 7s ease-in-out infinite 1s'
            }}
          />
        </div>
        
        {/* Right side - Video background with curvy border */}
        <div className="w-full lg:w-1/2 relative overflow-hidden lg:[clip-path:ellipse(100%_100%_at_100%_50%)]">
          <video 
            autoPlay
            loop
            muted
            playsInline
            controls={false}
            preload="auto"
            disablePictureInPicture
            disableRemotePlayback
            className="w-full h-full object-cover"
            style={{ pointerEvents: 'none' }}
          >
            <source src={heroVideo} type="video/mp4" />
          </video>
        </div>
      </div>

      {/* Content Layer - Positioned above video */}
      <div className="relative z-10 h-full flex flex-col">
        
        {/* Header */}
        <header className="w-full px-6 lg:px-12 py-6 flex-shrink-0 relative z-20">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <motion.div 
              className="flex items-center gap-3 cursor-pointer ml-0 lg:ml-8" 
              onClick={() => navigate('/')}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <img src={logo} alt="ROTCS Logo" className="h-[50px] sm:h-[60px] lg:h-[100px] w-auto" />
            </motion.div>

            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Button 
                onClick={openModal}
                className="h-10 sm:h-12 px-4 sm:px-8 text-sm sm:text-base font-bold border-2 border-green-400 hover:border-green-300 transition-all"
                style={{
                  background: 'transparent',
                  color: 'white',
                  borderRadius: '8px',
                }}
              >
                <span className="text-white">Get Started</span>
              </Button>
            </motion.div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex items-center overflow-hidden relative z-20">
          <div className="w-full max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2">
            {/* Left Side - Hero Content */}
            <motion.div 
              className="flex items-center"
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="max-w-xl space-y-4 sm:space-y-6 lg:space-y-8">
                {/* Hero Title */}
                <h1 className="text-2xl sm:text-3xl lg:text-5xl xl:text-6xl font-black leading-tight">
                  <span className="text-green-400">Regulatory</span>
                  <br />
                  <span className="text-white">Oversights and </span>
                  <span className="text-green-400">Gaming Tax</span>
                  <br />
                  <span className="text-white">Calculation System</span>
                </h1>

                {/* CTA Button */}
                <div>
                  <motion.button
                    onClick={openModal}
                    className="h-12 sm:h-14 px-6 sm:px-10 text-sm sm:text-base font-bold border-0 cursor-pointer"
                    style={{
                      background: '#10b981',
                      color: 'white',
                      borderRadius: '8px',
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="text-white">Get Started</span>
                  </motion.button>
                </div>

                {/* Betting Company Logos Section */}
                <div className="pt-6 sm:pt-10 lg:pt-16">
                  <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full bg-white flex items-center justify-center overflow-hidden">
                      <img src={betkingLogo} alt="BetKing" className="w-full h-full object-cover" />
                    </div>
                    <div className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full bg-white flex items-center justify-center overflow-hidden">
                      <img src={sportybetLogo} alt="SportyBet" className="w-full h-full object-cover" />
                    </div>
                    <div className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full bg-white flex items-center justify-center overflow-hidden">
                      <img src={onexbetLogo} alt="1xBet" className="w-full h-full object-cover" />
                    </div>
                    <div className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full bg-white flex items-center justify-center overflow-hidden">
                      <img src={bet9jaLogo} alt="Bet9ja" className="w-full h-full object-cover" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Side - Empty space (video is in background) */}
            <div className="hidden lg:block" />
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="relative z-10 w-full px-6 py-3 flex-shrink-0">
        <div className="max-w-7xl mx-auto flex items-center justify-center">
          <p className="text-sm text-white/70 text-center">
            © 2026 ROTCS. Developed by <span className="text-green-400 font-semibold">Northernreach</span>
          </p>
        </div>
      </footer>

      {/* Authentication Modal */}
      <Modal
        open={isModalOpen}
        onCancel={closeModal}
        footer={null}
        closeIcon={<X size={20} />}
        centered
        width={480}
        styles={{
          content: {
            borderRadius: '16px',
            padding: 0,
          }
        }}
      >
        <div className="p-8">
          {/* Modal Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-green-600 to-green-700 rounded-2xl mb-4">
              <Lock className="text-white" size={24} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h2>
            <p className="text-gray-600">Sign in to access your dashboard</p>
          </div>

          {/* Error Alert */}
          {error && (
            <Alert
              message="Authentication Failed"
              description={error}
              type="error"
              showIcon
              closable
              onClose={() => setError('')}
              className="mb-4"
            />
          )}

          {/* Sign In Form */}
          <Form
            form={form}
            name="signin"
            onFinish={handleSignIn}
            layout="vertical"
            size="large"
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Please input your email!' },
                { type: 'email', message: 'Please enter a valid email!' },
              ]}
            >
              <Input placeholder="Enter your email" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password placeholder="Enter your password" />
            </Form.Item>

            <Form.Item className="mb-4">
              <Button 
                type="primary" 
                htmlType="submit" 
                block 
                loading={loading}
                className="h-12 text-base font-semibold"
                style={{ 
                  background: loading ? undefined : 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  border: 'none',
                  borderRadius: '8px'
                }}
              >
                Sign In
              </Button>
            </Form.Item>
          </Form>

          {/* Test Credentials */}
          <div className="text-center mt-6 pt-6 border-t border-gray-100">
            <p className="text-xs text-gray-500 mb-2 font-medium">Test Credentials:</p>
            <div className="space-y-1">
              <p className="text-xs text-gray-600">Admin: admin@rotcs.gov / admin123</p>
              <p className="text-xs text-gray-600">Consultant: consultant@rotcs.gov / consultant123</p>
              <p className="text-xs text-gray-600">Operator: operator@rotcs.gov / operator123</p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default LandingPage
