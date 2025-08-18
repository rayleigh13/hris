import { useState } from 'react'
import { Link, Routes, Route, useLocation, Navigate } from 'react-router-dom'
import {
  Layout, Menu, Typography, Space, Switch, ConfigProvider, theme as antdTheme
} from 'antd'
import { HomeOutlined, AppstoreOutlined, LoginOutlined } from '@ant-design/icons'
import LoginPage from './pages/LoginPage'

const { Header, Sider, Content, Footer } = Layout

// Dummy auth state
const isAuthenticated = false

function Home() {
  return <Typography.Title level={3}>Welcome 👋</Typography.Title>
}

function Products() {
  return <Typography.Title level={3}>Products</Typography.Title>
}

export default function App() {
  const [collapsed, setCollapsed] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const location = useLocation()

  // ✅ If user is at /login → show LoginPage only (no layout)
  if (location.pathname === '/login') {
    return <LoginPage />
  }

  const items = [
    { key: '/', icon: <HomeOutlined />, label: <Link to="/">Home</Link> },
    { key: '/products', icon: <AppstoreOutlined />, label: <Link to="/products">Products</Link> },
    { key: '/login', icon: <LoginOutlined />, label: <Link to="/login">Login</Link> },
  ]

  return (
    <ConfigProvider
      theme={{
        algorithm: isDark ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
        token: {
          colorPrimary: '#1677ff',
          borderRadius: 10,
        },
      }}
    >
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
          <div style={{
            height: 48, margin: 16, background: 'rgba(255,255,255,0.2)',
            borderRadius: 8
          }} />
          <Menu
            mode="inline"
            selectedKeys={[location.pathname]}
            items={items}
          />
        </Sider>

        <Layout>
          <Header
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 16px'
            }}
          >
            <Typography.Text style={{ fontWeight: 600 }}>
              React + Ant Design Starter
            </Typography.Text>
            <Space>
              <Typography.Text>Dark mode</Typography.Text>
              <Switch checked={isDark} onChange={setIsDark} />
            </Space>
          </Header>

          <Content style={{ margin: 16 }}>
            <div style={{ padding: 24, background: 'rgba(0,0,0,0.02)', borderRadius: 12 }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={
                  isAuthenticated ? <Products /> : <Navigate to="/login" replace />
                } />
                {/* /login is handled outside */}
              </Routes>
            </div>
          </Content>

          <Footer style={{ textAlign: 'center' }}>
            © {new Date().getFullYear()} My AntD App
          </Footer>
        </Layout>
      </Layout>
    </ConfigProvider>
  )
}