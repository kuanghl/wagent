// src/pages/Login.tsx
// 登录页（完整示例：表单校验 + API 调用 + 错误处理 + 路由跳转）

import { useState } from 'react';
import type { FormEvent } from 'react';
import { Button, Card, Form, Input, theme } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { login } from '@/services/auth.service';
import { showError } from '@/utils/toast';
import type { LoginRequest } from '@/types/api';

interface LoginFormValues {
  username: string;
  password: string;
}

export function Login() {
  const [form] = Form.useForm<LoginFormValues>();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { token: themeToken } = theme.useToken();

  async function handleSubmit(event: FormEvent): Promise<void> {
    event.preventDefault();
    let values: LoginFormValues;
    try {
      values = await form.validateFields();
    } catch {
      return;
    }

    setLoading(true);
    try {
      const credentials: LoginRequest = {
        username: values.username,
        password: values.password,
      };
      await login(credentials);
      navigate((location.state?.from as string | undefined) ?? '/', { replace: true });
    } catch (err: unknown) {
      // 业务错误由 request.ts → utils/toast.showError 显示；
      // 401 由 request.ts → auth.service.handleUnauthorized 处理（清状态 + 跳登录）
      showError(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: themeToken.colorBgLayout,
      }}
    >
      <Card style={{ width: 400 }}>
        <h2 style={{ textAlign: 'center' }}>登录</h2>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          requiredMark={false}
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[
              { required: true, message: '请输入用户名' },
              { min: 3, max: 32, message: '长度 3-32 个字符' },
            ]}
          >
            <Input placeholder="请输入用户名" allowClear autoComplete="username" />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[
              { required: true, message: '请输入密码' },
              { min: 6, max: 64, message: '长度 6-64 个字符' },
            ]}
          >
            <Input.Password placeholder="请输入密码" allowClear autoComplete="current-password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
