import { useState } from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import { Layout, Menu, Drawer, Button } from 'antd'
import { BarChart3, Map, Building2, LogOut, User, Menu as MenuIcon, MessageCircle } from 'lucide-react'
import { useLogoutConfirm } from '@/hooks/useLogoutConfirm'
import logoImage from '@/assets/logo.png'

const { Header, Sider, Content } = Layout

const AdminLayout = () => {
  const location = useLocation()
  const { showLogoutConfirm } = useLogoutConfirm()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const menuItems = [
    {
      key: '/admin/revenue',
      icon: <BarChart3 size={24} />,
      label: <Link to="/admin/revenue" style={{ fontSize: '15px', fontWeight: 500 }}>Revenue Center</Link>,
    },
    {
      key: '/admin/geospatial',
      icon: <Map size={24} />,
      label: <Link to="/admin/geospatial" style={{ fontSize: '15px', fontWeight: 500 }}>Geospatial Intel</Link>,
    },
    {
      key: '/admin/operators',
      icon: <Building2 size={24} />,
      label: <Link to="/admin/operators" style={{ fontSize: '15px', fontWeight: 500 }}>Operators</Link>,
    },
    {
      key: '/admin/support',
      icon: <MessageCircle size={24} />,
      label: <Link to="/admin/support" style={{ fontSize: '15px', fontWeight: 500 }}>Support</Link>,
    },
    {
      key: '/admin/profile',
      icon: <User size={24} />,
      label: <Link to="/admin/profile" style={{ fontSize: '15px', fontWeight: 500 }}>Profile Settings</Link>,
    },
  ]

  const SidebarContent = () => (
    <>
      <div className="h-16 flex items-center justify-center text-white border-b" style={{ 
        background: '#008751',
        borderBottomColor: 'rgba(255,255,255,0.1)',
      }}>
        <div className="flex items-center justify-center px-4">
          <img 
            src={logoImage} 
            alt="ROTCS Logo" 
            style={{ 
              height: '48px',
              width: 'auto',
              objectFit: 'contain'
            }}
          />
        </div>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[location.pathname]}
        items={menuItems}
        className="mt-4 sidebar-menu"
        style={{ 
          background: 'transparent',
          border: 'none',
        }}
        onClick={() => setMobileMenuOpen(false)}
      />
    </>
  )

  return (
    <>
      <Layout className="h-screen overflow-hidden">
        {/* Desktop Sidebar */}
        <Sider
          width={260}
          className="desktop-sidebar"
          style={{
            background: '#006b3f',
            boxShadow: '2px 0 12px rgba(0,0,0,0.08)',
            position: 'fixed',
            left: 0,
            top: 0,
            bottom: 0,
            overflow: 'auto',
            display: 'none',
          }}
        >
          <SidebarContent />
        </Sider>

        {/* Mobile Drawer */}
        <Drawer
          placement="left"
          onClose={() => setMobileMenuOpen(false)}
          open={mobileMenuOpen}
          styles={{
            body: { padding: 0, background: '#006b3f' }
          }}
          width={260}
        >
          <SidebarContent />
        </Drawer>

        <Layout className="main-content-layout">
          <Header
            className="main-header"
            style={{
              background: '#fff',
              padding: '0 16px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
              borderBottom: '1px solid #e7e5e4',
              position: 'fixed',
              top: 0,
              right: 0,
              left: 0,
              zIndex: 10,
            }}
          >
            <div className="flex items-center gap-3">
              <Button
                type="text"
                icon={<MenuIcon size={20} />}
                onClick={() => setMobileMenuOpen(true)}
                className="mobile-menu-btn"
              />
              <h1 className="m-0 text-base md:text-lg lg:text-xl" style={{ 
                fontWeight: 600,
                color: '#1c1917',
                fontFamily: 'Source Serif 4, serif',
                letterSpacing: '-0.01em',
              }}>
                Government Admin Dashboard
              </h1>
            </div>
            <button 
              onClick={showLogoutConfirm}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 bg-transparent border-none cursor-pointer"
            >
              <LogOut size={20} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </Header>
          <Content
            style={{
              marginTop: 64,
              height: 'calc(100vh - 64px)',
              overflow: 'auto',
              padding: '16px',
            }}
            className="md:p-6"
          >
            <div style={{
              background: '#fff',
              borderRadius: '8px',
              padding: '16px',
              minHeight: '100%',
            }}
            className="md:p-6"
            >
              <Outlet />
            </div>
          </Content>
        </Layout>
      </Layout>
      
      <style>{`
        @media (min-width: 1024px) {
          .desktop-sidebar {
            display: block !important;
          }
          .mobile-menu-btn {
            display: none !important;
          }
          .main-content-layout {
            margin-left: 260px !important;
          }
          .main-header {
            left: 260px !important;
          }
        }
      `}</style>
    </>
  )
}

export default AdminLayout
