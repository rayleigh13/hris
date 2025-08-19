import { useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Typography, Card, Alert } from 'antd';

const API_URL = import.meta.env.VITE_API_URL;

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const onFinish = async (values: any) => {
    setErrorMessage(null);
    setSuccessMessage(null);
    setLoading(true);

    // ⏳ Simulate 1 second loading effect
    setTimeout(async () => {
      try {
        const res = await fetch(`${API_URL}/users/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: values.email?.trim(),
            password: values.password,
          }),
        });

        const data = await res.json();

        if (res.ok) {
          setSuccessMessage(data.message || "✅ Login successful");
          localStorage.setItem("token", data.token);
          setTimeout(() => {
            window.location.href = "/dashboard";
          }, 1000);
        } else {
          setErrorMessage(data.message || "❌ Login failed");
        }
      } catch (err) {
        console.error("Login error:", err);
        setErrorMessage("⚠️ Server error. Try again later.");
      } finally {
        setLoading(false); // ✅ stop button loading after request
      }
    }, 1000); // wait 1 second before sending request
  };
  
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "#f0f2f5",
      }}
    >
      <Card
        style={{
          width: 350,
          borderRadius: 12,
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <Typography.Title level={3} style={{ textAlign: "center", marginBottom: 24 }}>
          Login
        </Typography.Title>

        {/* ✅ Show Alerts */}
        {errorMessage && (
          <Alert
            message={errorMessage}
            type="error"
            showIcon
            style={{ marginBottom: 16 }}
          />
        )}
        {successMessage && (
          <Alert
            message={successMessage}
            type="success"
            showIcon
            style={{ marginBottom: 16 }}
          />
        )}

        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please input your Email!" },
              { type: "email", message: "Enter a valid email address" },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Enter email" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Enter password" />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Log in
            </Button>
          </Form.Item>
        </Form>

        <Typography.Paragraph style={{ textAlign: "center" }}>
          Don’t have an account? <a href="/register">Register here</a>
        </Typography.Paragraph>
      </Card>
    </div>
  );
}