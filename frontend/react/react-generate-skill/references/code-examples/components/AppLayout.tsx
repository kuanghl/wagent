// src/components/AppLayout.tsx
// 全局布局组件（必备）：侧边栏 + 顶部栏 + 内容区

import { useMemo } from 'react';
import { Breadcrumb, Button, Dropdown, Layout, Menu, theme } from 'antd';
import type { MenuProps } from 'antd';
import {
  HomeOutlined,
  UserOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAppStore } from '@/stores/appStore';
import { useUserStore } from '@/stores/userStore';

interface AppLayoutProps {
  /** 是否显示侧边栏 */
  showSidebar?: boolean;
}

export function AppLayout({ showSidebar = true }: AppLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { token: themeToken } = theme.useToken();
  const { sidebarCollapsed, breadcrumb, toggleSidebar } = useAppStore();
  const userStore = useUserStore();

  const menuItems: MenuProps['items'] = useMemo(
    () => [
      { key: '/', icon: <HomeOutlined />, label: '首页' },
      { key: '/users', icon: <UserOutlined />, label: '用户管理' },
    ],
    [],
  );

  const handleLogout = (): void => {
    userStore.logout();
    navigate('/login');
  };

  const userMenuItems: MenuProps['items'] = [
    { key: 'logout', icon: <LogoutOutlined />, label: '退出登录', onClick: handleLogout },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {showSidebar && (
        <Layout.Sider
          width={240}
          collapsible
          collapsed={sidebarCollapsed}
          onCollapse={toggleSidebar}
          style={{ background: themeToken.colorBgContainer }}
        >
          <div
            style={{
              height: 32,
              margin: 16,
              color: themeToken.colorTextPrimary,
              fontWeight: 600,
              textAlign: 'center',
              lineHeight: '32px',
            }}
          >
            {sidebarCollapsed ? 'MA' : 'My App'}
          </div>
          <Menu
            mode="inline"
            selectedKeys={[location.pathname]}
            items={menuItems}
            onClick={({ key }) => navigate(key)}
          />
        </Layout.Sider>
      )}
      <Layout>
        <Layout.Header
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: themeToken.colorBgContainer,
            padding: '0 16px',
          }}
        >
          <Breadcrumb
            items={breadcrumb.map((item) => ({ title: item }))}
          />
          <Dropdown menu={{ items: userMenuItems }}>
            <Button type="text">
              {userStore.profile?.nickname ?? '未登录'} <LogoutOutlined />
            </Button>
          </Dropdown>
        </Layout.Header>
        <Layout.Content style={{ padding: 16 }}><Outlet /></Layout.Content>
      </Layout>
    </Layout>
  );
}
