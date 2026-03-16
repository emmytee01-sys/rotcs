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

  const dashboardPaths: Record<string, string> = {
    admin: '/admin/revenue',
    state_admin: '/admin/revenue',
    consultant: '/consultant/hub',
    global_admin: '/consultant/hub',
    operator: '/operator/home',
    operator_admin: '/operator/home',
  }

  useEffect(() => {
    if (user) {
      const path = dashboardPaths[user.role] || '/admin/revenue'
      navigate(path, { replace: true })
    }
  }, [user, navigate])

  const handleSignIn = async (values: { email: string; password: string }) => {
    setError('')
    setLoading(true)
    try {
      // Backend expects username; modal field is "email" but user types username (e.g. taraba_admin)
      const loggedInUser = await login(values.email.trim(), values.password)
      setIsModalOpen(false)
      form.resetFields()
      const path = dashboardPaths[loggedInUser.role] || '/admin/revenue'
      navigate(path, { replace: true })
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
    <div className="flex flex-col h-screen w-full relative overflow-hidden bg-[#020617] text-white selection:bg-blue-500/30">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 z-0 bg-[#020617]">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
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
        <div className="max-w-7xl mx-auto px-6 py-3 lg:py-4 lg:px-12 flex items-center justify-between">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            style={{ willChange: 'auto' }}
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
            style={{ willChange: 'auto' }}
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
      <main className="relative z-10 flex-1 flex items-center w-full min-h-[650px] lg:min-h-0 pb-10 lg:pb-0">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-8 lg:gap-8 items-center w-full py-6 lg:py-6 h-full">

          {/* Left Content */}
          <motion.div
            initial={{ x: -40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="space-y-4 md:space-y-6 flex flex-col justify-center h-full order-1"
          >
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-5xl xl:text-6xl bold-heading mb-3 md:mb-4 text-white leading-tight">
                <span className="drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">Revenue</span><br />
                <span className="bg-gradient-to-r from-emerald-400 via-white to-blue-400 bg-[length:200%_auto] animate-gradient bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(16,185,129,0.3)]">Transparency.</span>
              </h1>

              <p className="text-sm md:text-base lg:text-lg xl:text-xl text-[#94A3B8] max-w-xl mb-4 md:mb-6 leading-relaxed font-semibold">
                Real-time monitoring and automated auditing for state-wide gaming revenue. Secure, precise, and transparent reporting.
              </p>

              <div className="flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4">
                <button
                  onClick={openModal}
                  className="h-10 md:h-12 px-6 md:px-8 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm rounded-xl hover:scale-105 active:scale-95 transition-all shadow-[0_0_25px_rgba(16,185,129,0.5)] flex items-center justify-center gap-2"
                >
                  <Lock size={20} />
                  Sign In
                </button>
              </div>
            </div>

            {/* Operator Logos */}
            <div className="border-t-2 border-white/[0.05]">
              <p className="text-[8px] xl:text-[9px] font-black uppercase tracking-[0.3em] text-[#64748B] mb-2 md:mb-3 text-center lg:text-left">Validated Terminal Integrations</p>
              <div className="grid grid-cols-4 items-center gap-2 max-w-[280px] md:max-w-sm mx-auto lg:mx-0">
                {[
                  { img: betkingLogo, name: 'BetKing' },
                  { img: sportybetLogo, name: 'SportyBet' },
                  { img: onexbetLogo, name: '1xBet' },
                  { img: bet9jaLogo, name: 'Bet9ja' }
                ].map((op, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.1, y: -5 }}
                    className="aspect-square rounded-xl bg-white/5 border border-white/10 p-1 md:p-1.5 lg:p-2 flex items-center justify-center shadow-2xl transition-all cursor-pointer group hover:border-emerald-500/50"
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
            className="relative flex justify-center items-center h-full w-full mt-4 lg:mt-0 order-2"
          >
            <div className="relative z-10 bg-[#0F172A] border-2 border-white/[0.05] rounded-[20px] lg:rounded-[32px] p-4 md:p-5 lg:p-6 aspect-[4/3] sm:aspect-square md:aspect-[4/3] lg:aspect-square flex flex-col items-center justify-center shadow-2xl md:shadow-[0_0_100px_rgba(0,0,0,0.8)] overflow-hidden group w-full max-w-[220px] sm:max-w-[280px] lg:max-w-[320px] xl:max-w-[380px]">
              {/* Massive Glow Orb */}
              <div className="absolute top-[-20%] right-[-20%] w-[80%] h-[80%] bg-emerald-600/20 blur-[120px] pointer-events-none rounded-full" />
              <div className="absolute bottom-[-20%] left-[-20%] w-[80%] h-[80%] bg-blue-600/10 blur-[120px] pointer-events-none rounded-full" />

              {/* Visual Gauge Mockup - Holographic Layers */}
              <div className="relative w-28 h-28 sm:w-36 sm:h-36 lg:w-44 lg:h-44 xl:w-[220px] xl:h-[220px]">
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
                  <span className="text-[7px] sm:text-[8px] xl:text-[9px] font-black uppercase tracking-[0.5em] text-[#64748B] mb-1 drop-shadow-sm text-center">System Integrity Pulse</span>
                  <motion.span
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-white tabular-nums tracking-tighter drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)] leading-none"
                  >
                    99.8<span className="text-lg sm:text-xl lg:text-2xl xl:text-3xl text-emerald-400/80">%</span>
                  </motion.span>
                  <div className="mt-2 lg:mt-3 xl:mt-4 px-2 lg:px-3 py-1 rounded-full bg-emerald-500/10 md:backdrop-blur-md border border-emerald-500/20 text-emerald-400 text-[7px] sm:text-[9px] xl:text-[10px] font-black flex items-center gap-1 sm:gap-1.5 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                    <span className="animate-pulse w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]" />
                    Sentinel-X Guard Active
                  </div>
                </div>
              </div>

              {/* Data Grid Mockup - Industrial */}
              <div className="grid grid-cols-2 gap-1.5 md:gap-2 xl:gap-3 w-full mt-2 sm:mt-3 lg:mt-5 max-w-[260px] sm:max-w-full">
                <div className="p-1.5 sm:p-2 xl:p-3 rounded-lg xl:rounded-xl bg-black/40 border border-white/10">
                  <span className="text-[6px] sm:text-[7px] xl:text-[8px] uppercase font-black tracking-widest text-[#64748B] block mb-0.5">Endpoint Status</span>
                  <div className="flex items-center gap-1 xl:gap-1.5">
                    <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                    <span className="text-[8px] sm:text-[10px] lg:text-xs xl:text-sm font-black text-white italic">OPERATIONAL</span>
                  </div>
                </div>
                <div className="p-1.5 sm:p-2 xl:p-3 rounded-lg xl:rounded-xl bg-black/40 border border-white/10">
                  <span className="text-[6px] sm:text-[7px] xl:text-[8px] uppercase font-black tracking-widest text-[#64748B] block mb-0.5">Tax Accuracy</span>
                  <div className="flex items-center gap-1 xl:gap-1.5">
                    <span className="text-[8px] sm:text-[10px] lg:text-xs xl:text-sm font-black italic text-emerald-400">99.99%</span>
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
      <footer className="relative z-10 w-full border-t border-white/5 glass-panel flex-shrink-0">
        <div className="max-w-7xl mx-auto px-6 py-2 lg:py-3 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-[10px] sm:text-xs font-bold text-[#64748B] uppercase tracking-widest">Powered by</span>
            <span className="text-[10px] sm:text-xs font-black text-white uppercase tracking-tighter">Northernreach</span>
          </div>
          <p className="text-[8px] sm:text-[10px] font-medium text-[#64748B] text-center md:text-right">
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
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-blue-600/20 to-transparent z-0" />

          <div className="p-6 md:p-8 relative z-10">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 border border-white/20 rounded-2xl mb-4 shadow-inner glass-panel">
                <img src={logo} alt="ROTCS Logo" className="w-10 h-10 object-contain brightness-110" />
              </div>
              <h2 className="text-2xl font-black text-white tracking-tight">ROTCS Portal</h2>
            </div>

            {error && (
              <Alert
                message={error}
                type="error"
                showIcon
                className="mb-4 rounded-xl border-red-500/20 bg-red-500/10 text-red-500 font-bold py-2"
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
                label={<span className="text-[#94A3B8]">Username</span>}
              >
                <Input
                  className="h-12 bg-black/40 border-white/10 text-white rounded-xl focus:border-blue-500/50"
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[{ required: true, message: 'Credentials required' }]}
                label={<span className="text-[#94A3B8]">Password</span>}
              >
                <Input.Password
                  className="h-12 bg-black/40 border-white/10 text-white rounded-xl focus:border-blue-500/50"
                />
              </Form.Item>

              <Button
                htmlType="button"
                block
                loading={loading}
                onClick={() => form.submit()}
                className="h-12 bg-emerald-600 hover:!bg-emerald-700 border !border-white/20 hover:!border-white/20 font-black !text-white hover:!text-white text-base rounded-xl mt-2 shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] active:scale-95"
              >
                Login
              </Button>
            </Form>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default LandingPage
