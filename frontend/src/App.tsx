import { useState } from "react";
import {
  Layout,
  Menu,
  Typography,
  Space,
  Switch,
  ConfigProvider,
  theme as antdTheme,
  Dropdown,
  Avatar,
  type MenuProps,
} from "antd";

import {
  AppstoreOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DownOutlined,
  SafetyOutlined,
  ExclamationCircleOutlined,
  SoundOutlined,
  StopOutlined,
  ToolOutlined,
  IdcardOutlined,
  ProfileOutlined,
  BellOutlined,
  TeamOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { Link, Routes, Route, useLocation, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";
import "./styles/Sidebar.css";

const { Header, Sider, Content, Footer } = Layout;

// Dummy auth state
const isAuthenticated = true;

// Sample pages
function Home() {
  return (
    <>
      <Dashboard />
    </>
  );
}

function Products() {
  return <Typography.Title level={3}>Products Management</Typography.Title>;
}

function Users() {
  return <Typography.Title level={3}>Users Management</Typography.Title>;
}

function Settings() {
  return <Typography.Title level={3}>System Settings ⚙️</Typography.Title>;
}

export default function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const location = useLocation();

  // ✅ If user is at /login or /register → show only the page (no layout)
  if (location.pathname === "/login") {
    return <LoginPage />;
  }
  if (location.pathname === "/register") {
    return <RegisterPage />;
  }

// Sidebar menu items (matching your image)
const sidebarMenu: MenuProps['items'] = [
  {
    type: "group",
    label: <span className="sidebar-title">MAIN</span>,
    children: [
      {
        key: "/",
        icon: <AppstoreOutlined />,
        label: <Link to="/">Dashboards</Link>,
      },
    ],
  },
  {
    type: "group",
    label: <span className="sidebar-title">PAGES</span>,
    children: [
      {
        key: "auth",
        icon: <SafetyOutlined />,
        label: "Authentication",
        type: "submenu",
        children: [
          {
            key: "/login",
            label: <Link to="/login">Login</Link>,
          },
          {
            key: "/register",
            label: <Link to="/register">Register</Link>,
          },
        ],
      },
      {
        key: "/error",
        icon: <ExclamationCircleOutlined />,
        label: "Error Page",
      },
      {
        key: "/coming-soon",
        icon: <SoundOutlined />,
        label: "Coming Soon",
      },
      {
        key: "/not-found",
        icon: <StopOutlined />,
        label: "Not Found",
      },
      {
        key: "/maintenance",
        icon: <ToolOutlined />,
        label: "Under Maintenance",
      },
      {
        key: "/profile",
        icon: <IdcardOutlined />,
        label: "User Profile",
      },
      {
        key: "/timeline",
        icon: <ProfileOutlined />,
        label: "User Timeline",
      },
      {
        key: "/notifications",
        icon: <BellOutlined />,
        label: "Notifications",
      },
      {
        key: "/contacts",
        icon: <TeamOutlined />,
        label: "Contacts",
      },
      {
        key: "/faq",
        icon: <QuestionCircleOutlined />,
        label: "Faq",
      },
      {
        key: "settings",
        icon: <SettingOutlined />,
        label: "Account settings",
        type: "submenu",
        children: [
          {
            key: "/settings",
            label: <Link to="/settings">Settings</Link>,
          },
        ],
      },
    ],
  },
];

// Profile dropdown menu
const profileMenu: MenuProps = {
  items: [
    {
      key: "user-info",
      label: (
        <Space>
          <Avatar style={{ backgroundColor: "#1677ff" }} icon={<UserOutlined />} />
          <Typography.Text strong>John Doe</Typography.Text>
        </Space>
      ),
      disabled: true,
    },
    { type: "divider" },
    { key: "1", label: <Link to="/profile">Profile</Link>, icon: <UserOutlined /> },
    { key: "2", label: "Logout", icon: <LogoutOutlined />, danger: true },
  ],
};

  return (
    <ConfigProvider
      theme={{
        algorithm: isDark ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
        token: {
          colorPrimary: "#1677ff",
          borderRadius: 10,
        },
      }}
    >
      <Layout style={{ minHeight: "100vh" }}>
        {/* Sidebar */}
        <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed} width={250}>
          <div
            style={{
              height: 48,
              margin: 16,
              background: "rgba(255,255,255,0.2)",
              borderRadius: 8,
              textAlign: "center",
              color: "#fff",
              lineHeight: "48px",
              fontWeight: 600,
            }}
          >
            {collapsed ? "HRIS" : "HRIS Admin"}
          </div>
          <Menu
            mode="inline"
            selectedKeys={[location.pathname]}
            items={sidebarMenu}
            style={{
              borderRight: 0,
              background: "#fff",
              fontSize: 15,
              color: "#1a2340",
            }}
            expandIcon={({ isOpen }) =>
              isOpen ? <DownOutlined style={{ fontSize: 12 }} /> : <DownOutlined rotate={-90} style={{ fontSize: 12 }} />
            }
          />
        </Sider>

        <Layout>
          {/* Header */}
          <Header
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 16px",
              background: isDark ? "#141414" : "#fff",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <Space>
              {collapsed ? (
                <MenuUnfoldOutlined onClick={() => setCollapsed(false)} style={{ fontSize: 20 }} />
              ) : (
                <MenuFoldOutlined onClick={() => setCollapsed(true)} style={{ fontSize: 20 }} />
              )}
              <Typography.Text style={{ fontWeight: 600 }}>
                HRIS Admin Panel
              </Typography.Text>
            </Space>

            <Space>
              <Typography.Text>Dark mode</Typography.Text>
              <Switch checked={isDark} onChange={setIsDark} />
              <Dropdown menu={profileMenu} placement="bottomRight">
                <Avatar style={{ backgroundColor: "#1677ff" }} icon={<UserOutlined />} />
              </Dropdown>
            </Space>
          </Header>

          {/* Content */}
          <Content style={{ margin: 16 }}>
            <div
              style={{
                padding: 24,
                background: isDark ? "rgba(255,255,255,0.05)" : "#fff",
                borderRadius: 8,
                minHeight: "70vh",
              }}
            >
              <Routes>
                <Route path="/" element={<Home />} />
                <Route
                  path="/products"
                  element={isAuthenticated ? <Products /> : <Navigate to="/login" replace />}
                />
                <Route
                  path="/users"
                  element={isAuthenticated ? <Users /> : <Navigate to="/login" replace />}
                />
                <Route
                  path="/settings"
                  element={isAuthenticated ? <Settings /> : <Navigate to="/login" replace />}
                />
              </Routes>
            </div>
          </Content>

          {/* Footer */}
          <Footer style={{ textAlign: "center" }}>
            © {new Date().getFullYear()} HRIS by DeadLuCk Inc.
          </Footer>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
}