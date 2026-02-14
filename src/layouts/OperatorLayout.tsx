import { useState } from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import { Layout, Menu, Drawer, Button } from 'antd'
import { Home, FileText, CreditCard, Settings, LogOut, Menu as MenuIcon, MessageCircle } from 'lucide-react'
import { useLogoutConfirm } from '@/hooks/useLogoutConfirm'
import logoImage from '@/assets/logo.png'

const { Header, Sider, Content } = Layout

const OperatorLayout = () => {
  const location = useLocation()
  const { showLogoutConfirm } = useLogoutConfirm()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const menuItems = [
    {
      key: '/operator/home',
      icon: <Home size={22} />,
      label: <Link to="/operator/home" className="text-[14px] font-medium transition-colors">Home</Link>,
    },
    {
      key: '/operator/billing',
      icon: <FileText size={22} />,
      label: <Link to="/operator/billing" className="text-[14px] font-medium transition-colors">Billing</Link>,
    },
    {
      key: '/operator/payment',
      icon: <CreditCard size={22} />,
      label: <Link to="/operator/payment" className="text-[14px] font-medium transition-colors">Payment</Link>,
    },
    {
      key: '/operator/api-config',
      icon: <Settings size={22} />,
      label: <Link to="/operator/api-config" className="text-[14px] font-medium transition-colors">API Config</Link>,
    },
    {
      key: '/operator/support',
      icon: <MessageCircle size={22} />,
      label: <Link to="/operator/support" className="text-[14px] font-medium transition-colors">Support</Link>,
    },
  ]

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-[#050811] border-r-2 border-emerald-500/10 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-3xl -mr-16 -mt-16 rounded-full" />
      
      <div className="h-[160px] flex flex-col items-center justify-center border-b border-white/5 relative z-10 gap-4">
        <div className="w-20 h-20 rounded-2xl bg-emerald-600/20 border-2 border-emerald-500/30 flex items-center justify-center shadow-neon relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 to-transparent" />
          <img 
            src={logoImage} 
            alt="ROTCS Logo" 
            className="h-12 w-auto brightness-110 relative z-10 transition-transform group-hover:scale-110 duration-500"
          />
        </div>
        <div className="text-center">
          <span className="text-[10px] uppercase font-black tracking-[0.5em] text-emerald-500/90 drop-shadow-[0_0_8px_rgba(16,185,129,0.3)]">Revenue Management</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-8 relative z-10 px-4 scrollbar-hide">
        <span className="px-4 text-[10px] font-black text-[#475569] uppercase tracking-[0.4em] block mb-6">System Modules</span>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          className="bg-transparent border-none"
          onClick={() => setMobileMenuOpen(false)}
        />
      </div>

      <div className="p-6 border-t border-white/5 bg-black/20 relative z-10">
        <button 
          onClick={showLogoutConfirm}
          className="power-button w-full h-12 bg-red-600/10 hover:bg-red-600 border border-red-500/30 hover:border-red-500 text-red-500 hover:text-white transition-all shadow-none hover:shadow-[0_0_20px_rgba(239,68,68,0.3)]"
        >
          <LogOut size={18} />
          <span className="text-sm font-black uppercase tracking_widest text-shadow-sm">Sign Out</span>
        </button>
      </div>
    </div>
  )

  return (
    <>
      <Layout className="h-screen overflow-hidden">
        {/* Desktop Sidebar */}
        <Sider
          width={280}
          className="hidden lg:block fixed left-0 top-0 bottom-0 z-30"
          style={{ background: '#050811' }}
        >
          <SidebarContent />
        </Sider>

        {/* Mobile Drawer */}
        <Drawer
          placement="left"
          onClose={() => setMobileMenuOpen(false)}
          open={mobileMenuOpen}
          styles={{ body: { padding: 0, background: '#050811' } }}
          width={280}
          closeIcon={null}
        >
          <SidebarContent />
        </Drawer>

        <Layout className="main-content-layout">
            <Header
              className="fixed top-4 right-4 left-4 lg:left-[296px] z-20 px-8 flex items-center justify-between bg-[#0F172A]/90 backdrop-blur-2xl h-[88px] border-2 border-emerald-500/20 shadow-[0_20px_50px_rgba(0,0,0,0.8)] rounded-[24px]"
            >
            <div className="flex items-center gap-6">
              <Button
                type="text"
                icon={<MenuIcon size={24} className="text-emerald-500" />}
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-0 w-10 h-10 flex items-center justify-center hover:bg-emerald-500/10 rounded-xl"
              />
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <div className="relative flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse relative z-10" />
                    <div className="absolute w-4 h-4 rounded-full bg-emerald-500/40 animate-ping" />
                  </div>
                  <h1 className="m-0 text-xl md:text-2xl bold-heading text-white truncate tracking-tight uppercase italic leading-none">
                    Dashboard
                  </h1>
                </div>
                <span className="hidden md:block text-[10px] font-black tracking-[0.4em] text-[#64748B] uppercase pl-5 leading-none mt-1.5">Real-time Revenue Monitoring</span>
              </div>
            </div>

            <div className="flex items-center gap-6 shrink-0">
              <div className="hidden sm:flex flex-col items-end gap-1.5 border-r border-white/10 pr-6 mr-6">
                <span className="text-[10px] font-black text-white uppercase tracking-tighter opacity-40 leading-none">Operator ID: #8821</span>
                <span className="text-xs text-emerald-400 font-black uppercase tracking-widest italic leading-none">ACTIVE STATUS</span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                <div className="w-1 h-4 bg-emerald-500/40 rounded-full" />
              </div>
            </div>
          </Header>
          <Content
            className="h-screen overflow-auto p-4 md:p-10 bg-[#020617] pt-[160px] md:pt-[120px]"
          >
            <div className="bg-[#0F172A]/40 backdrop-blur-md rounded-[32px] p-6 md:p-12 min-h-[calc(100vh-200px)] md:min-h-[calc(100vh-160px)] border-2 border-white/[0.03] shadow-[0_48px_96px_rgba(0,0,0,0.8)] relative overflow-hidden">
              {/* Internal Scanline Effect */}
              <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[length:100%_4px,3px_100%] z-50 opacity-20" />
              <Outlet />
            </div>
          </Content>
        </Layout>
      </Layout>
      
      <style>{`
        @media (min-width: 1024px) {
          .main-content-layout {
            margin-left: 280px !important;
          }
        }
      `}</style>
    </>
  )
}

export default OperatorLayout
