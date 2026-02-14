import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Modal, Form, Input, Alert } from 'antd'
import { Lock, X } from 'lucide-react'
import { motion } from 'framer-motion'
import { useAuth } from '@/contexts/AuthContextCore'
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
    <div className="flex flex-col min-h-screen w-full relative overflow-hidden bg-[#020617] text-white selection:bg-blue-500/30">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 z-0">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover opacity-40 brightness-75 transition-opacity"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/60 via-[#020617]/30 to-[#020617]" />
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-600/10 blur-[120px] rounded-full animate-float" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 brightness-50 contrast-150" />
      </div>

      {/* Header */}
      <header className="relative z-20 w-full flex-shrink-0">
        <div className="max-w-7xl mx-auto px-6 py-6 lg:px-12 flex items-center justify-between">
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex items-center gap-3"
          >
            <div className="w-12 h-12 bg-white/10 border border-white/20 rounded-xl flex items-center justify-center glass-panel shadow-xl">
              <img src={logo} alt="ROTCS" className="h-8 w-auto brightness-110" />
            </div>
            <div className="hidden sm:block">
              <span className="text-xl font-black tracking-tighter text-white block leading-none">ROTCS</span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-emerald-400 font-bold">Regulatory System</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Button 
              onClick={openModal}
              className="h-11 px-6 bg-emerald-600 hover:bg-emerald-500 border-none font-bold text-sm rounded-xl shadow-2xl shadow-emerald-600/40 transition-all flex items-center gap-2"
            >
              <Lock size={16} />
              Sign In
            </Button>
          </motion.div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 flex-1 flex items-center overflow-y-auto w-full">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-12 lg:gap-24 items-center w-full py-12 lg:py-24">
          
          {/* Left Content */}
          <motion.div
            initial={{ x: -40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="space-y-10 md:space-y-12 order-2 lg:order-1"
          >
            <div>
              <h1 className="text-5xl md:text-7xl lg:text-[88px] bold-heading mb-8 md:mb-10 text-white leading-tight">
                <span className="drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">Revenue</span><br />
                <span className="bg-gradient-to-r from-emerald-400 via-white to-blue-400 bg-[length:200%_auto] animate-gradient bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(16,185,129,0.3)]">Transparency.</span>
              </h1>
              
              <p className="text-lg md:text-xl lg:text-2xl text-[#94A3B8] max-w-xl mb-12 md:mb-16 leading-relaxed font-semibold">
                Real-time monitoring and automated auditing for state-wide gaming revenue. Secure, precise, and transparent reporting.
              </p>

               <div className="flex flex-col sm:flex-row flex-wrap gap-5 md:gap-8">
                <button
                  onClick={openModal}
                  className="h-14 md:h-16 px-10 md:px-12 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-base md:text-lg rounded-xl hover:scale-105 active:scale-95 transition-all shadow-[0_0_25px_rgba(16,185,129,0.5)] flex items-center justify-center gap-3"
                >
                  <Lock size={20} />
                  Sign In
                </button>
              </div>
            </div>

            {/* Operator Logos */}
            <div className="pt-10 md:pt-14 border-t-2 border-white/[0.05]">
              <p className="text-[11px] font-black uppercase tracking-[0.3em] text-[#64748B] mb-8 md:mb-12 text-center lg:text-left">Validated Terminal Integrations</p>
              <div className="grid grid-cols-4 items-center gap-4 sm:gap-6 md:gap-8 max-w-2xl">
                {[
                  { img: betkingLogo, name: 'BetKing' },
                  { img: sportybetLogo, name: 'SportyBet' },
                  { img: onexbetLogo, name: '1xBet' },
                  { img: bet9jaLogo, name: 'Bet9ja' }
                ].map((op, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ scale: 1.1, y: -5 }}
                    className="aspect-square rounded-xl bg-white/5 border border-white/10 p-3 md:p-4 flex items-center justify-center shadow-2xl transition-all cursor-pointer group hover:border-emerald-500/50"
                  >
                    <img 
                      src={op.img} 
                      alt={op.name} 
                      className="max-w-full max-h-full object-contain brightness-110 transition-transform group-hover:scale-110" 
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Visual - Massive High-Impact Gauge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease: 'backOut' }}
            className="relative order-1 lg:order-2 flex justify-center"
          >
            <div className="relative z-10 bg-[#0F172A] border-2 border-white/[0.05] rounded-[48px] p-10 md:p-14 aspect-square flex flex-col items-center justify-center shadow-[0_0_100px_rgba(0,0,0,0.8)] overflow-hidden group w-full max-w-[500px] lg:max-w-none">
              {/* Massive Glow Orb */}
              <div className="absolute top-[-20%] right-[-20%] w-[80%] h-[80%] bg-emerald-600/20 blur-[120px] pointer-events-none rounded-full" />
              <div className="absolute bottom-[-20%] left-[-20%] w-[80%] h-[80%] bg-blue-600/10 blur-[120px] pointer-events-none rounded-full" />
              
              {/* Visual Gauge Mockup - Holographic Layers */}
              <div className="relative w-72 h-72 md:w-[420px] md:h-[420px]">
                {/* Background Rings */}
                <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                  <circle cx="50%" cy="50%" r="42%" stroke="currentColor" strokeWidth="2" fill="transparent" className="text-white/5" />
                  <circle cx="50%" cy="50%" r="45%" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/[0.02]" />
                  <circle cx="50%" cy="50%" r="45%" stroke="currentColor" strokeWidth="1" fill="transparent" className="text-white/10" strokeDasharray="2 6" />
                </svg>

                {/* Main Progress Ring with Scanning Effect */}
                <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                  {/* Glowing Track */}
                  <circle 
                    cx="50%" cy="50%" r="45%" stroke="url(#holographic-gradient)" strokeWidth="22" fill="transparent" 
                    strokeLinecap="round" strokeDasharray="282.7%" strokeDashoffset="70.5%"
                    className="opacity-20 blur-sm"
                  />
                  {/* Sharp Progress */}
                  <circle 
                    cx="50%" cy="50%" r="45%" stroke="url(#holographic-gradient)" strokeWidth="18" fill="transparent" 
                    strokeLinecap="round" strokeDasharray="282.7%" strokeDashoffset="70.5%"
                    className="drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]"
                  />
                  <defs>
                    <linearGradient id="holographic-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#10b981" />
                      <stop offset="50%" stopColor="#34d399" />
                      <stop offset="100%" stopColor="#60a5fa" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Scanning Ray */}
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 origin-center pointer-events-none"
                >
                  <div className="absolute top-1/2 left-1/2 w-[50%] h-[2px] bg-gradient-to-r from-transparent via-emerald-500/40 to-emerald-400 -translate-y-1/2 origin-left" />
                </motion.div>

                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.5em] text-[#64748B] mb-2 drop-shadow-sm">Total Revenue Index</span>
                  <motion.span 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="text-6xl md:text-9xl font-black text-white tabular-nums tracking-tighter drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)] leading-none"
                  >
                    ₦14.2B
                  </motion.span>
                  <div className="mt-8 px-6 py-2 rounded-full bg-emerald-500/10 backdrop-blur-md border border-emerald-500/20 text-emerald-400 text-xs md:text-sm font-black flex items-center gap-3 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                    <span className="animate-pulse w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]" />
                    Live Auditing Active
                  </div>
                </div>
              </div>

              {/* Data Grid Mockup - Industrial */}
              <div className="grid grid-cols-2 gap-5 md:gap-8 w-full mt-14 md:mt-20">
                <div className="p-5 md:p-6 rounded-2xl bg-black/40 border border-white/10">
                  <span className="text-[10px] md:text-xs uppercase font-black tracking-widest text-[#64748B] block mb-2">Endpoint Status</span>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                    <span className="text-lg md:text-2xl font-black text-white italic">OPERATIONAL</span>
                  </div>
                </div>
                <div className="p-5 md:p-6 rounded-2xl bg-black/40 border border-white/10">
                  <span className="text-[10px] md:text-xs uppercase font-black tracking-widest text-[#64748B] block mb-2">Tax Accuracy</span>
                  <div className="flex items-center gap-2">
                    <span className="text-lg md:text-2xl font-black italic text-emerald-400">99.99%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Data Decor */}
            <div className="absolute -top-10 -left-10 w-24 h-24 bg-white/5 border border-white/10 rounded-2xl -rotate-12 blur-[1px] hidden lg:block" />
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-emerald-600/10 border border-emerald-500/20 rounded-[50%] rotate-45 blur-[1px] hidden lg:block" />
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full border-t border-white/5 glass-panel">
        <div className="max-w-7xl mx-auto px-6 py-8 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#64748B] uppercase tracking-widest">Powered by</span>
            <span className="text-xs font-black text-white uppercase tracking-tighter">Northernreach</span>
          </div>
          <p className="text-[10px] md:text-xs font-medium text-[#64748B] text-center md:text-right">
            © 2026 Regulatory Oversight & Tax Calculation System. All Rights Reserved.
          </p>
        </div>
      </footer>

      {/* Authentication Modal */}
      <Modal
        open={isModalOpen}
        onCancel={closeModal}
        footer={null}
        closeIcon={<X size={18} className="text-[#94A3B8]" />}
        centered
        width={440}
        styles={{
          content: {
            backgroundColor: '#0F172A',
            borderRadius: '24px',
            padding: 0,
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            overflow: 'hidden'
          }
        }}
      >
        <div className="relative">
          {/* Top Flare */}
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-blue-600/20 to-transparent -z-0" />
          
          <div className="p-10 relative z-10">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600/20 border border-blue-500/20 rounded-2xl mb-6 shadow-inner">
                <Lock className="text-blue-500" size={28} />
              </div>
              <h2 className="text-2xl font-black text-white mb-2 tracking-tight">System Portal</h2>
              <p className="text-[#94A3B8] text-sm font-medium">Log in to your dashboard</p>
            </div>

            {error && (
              <Alert
                message={error}
                type="error"
                showIcon
                className="mb-6 rounded-xl border-red-500/20 bg-red-500/10 text-red-500 font-bold"
              />
            )}

            <Form
              form={form}
              onFinish={handleSignIn}
              layout="vertical"
              size="large"
              requiredMark={false}
            >
              <Form.Item
                name="email"
                rules={[{ required: true, message: 'Identity required' }]}
              >
                <Input 
                  placeholder="Government Email / ID" 
                  className="h-12 bg-black/40 border-white/10 text-white rounded-xl focus:border-blue-500/50"
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[{ required: true, message: 'Credentials required' }]}
              >
                <Input.Password 
                  placeholder="Access Key" 
                  className="h-12 bg-black/40 border-white/10 text-white rounded-xl focus:border-blue-500/50"
                />
              </Form.Item>

              <Button 
                type="primary" 
                htmlType="submit" 
                block 
                loading={loading}
                className="h-12 bg-blue-600 hover:bg-blue-500 border-none font-bold text-base rounded-xl mt-4 shadow-lg shadow-blue-600/20"
              >
                Sign In to Dashboard
              </Button>
            </Form>

            <div className="mt-8 pt-8 border-t border-white/5 text-center">
              <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#64748B]">System Credentials</span>
              <div className="mt-4 grid grid-cols-1 gap-2">
                <p className="text-[11px] font-medium text-[#94A3B8]">Admin: admin@rotcs.gov / admin123</p>
                <p className="text-[11px] font-medium text-[#94A3B8]">Consultant: consultant@rotcs.gov / consultant123</p>
                <p className="text-[11px] font-medium text-[#94A3B8]">Operator: operator@rotcs.gov / operator123</p>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default LandingPage
