import { useState } from 'react'
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons'
import { Button, Checkbox, Form, Input, Typography, Card, message } from 'antd'

// ✅ Use API URL from .env
const API_URL = import.meta.env.VITE_API_URL

export default function RegisterPage() {
  const [loading, setLoading] = useState(false)

  const onFinish = async (values: any) => {
    setLoading(true)

    try {
      const res = await fetch(`${API_URL}/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.username,
          email: values.email,
          password: values.password
        })
      })

      const data = await res.json()

      if (res.ok) {
        message.success("✅ Registration successful. You can now login.")
        window.location.href = "/login"
      } else {
        message.error(data.message || "❌ Registration failed")
      }
    } catch (err) {
      console.error(err)
      message.error("⚠️ Server error. Try again later.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      background: '#f0f2f5'
    }}>
      <Card style={{
        width: 400,
        borderRadius: 12,
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
      }}>
        <Typography.Title level={3} style={{ textAlign: 'center', marginBottom: 24 }}>
          Register
        </Typography.Title>

        <Form
          name="register"
          layout="vertical"
          onFinish={onFinish}
        >
          {/* Username */}
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Enter username" />
          </Form.Item>

          {/* Email */}
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Invalid email format!' }
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Enter email" />
          </Form.Item>

          {/* Password */}
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: 'Please input your password!' }]}
            hasFeedback
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Enter password" />
          </Form.Item>

          {/* Confirm Password */}
          <Form.Item
            name="confirmPassword"
            label="Confirm Password"
            dependencies={['password']}
            hasFeedback
            rules={[
              { required: true, message: 'Please confirm your password!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error('Passwords do not match!'))
                },
              }),
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Confirm password" />
          </Form.Item>

          {/* Terms */}
          <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value ? Promise.resolve() : Promise.reject(new Error('You must accept the terms')),
              },
            ]}
          >
            <Checkbox>
              I agree to the <a href="#">Terms & Conditions</a>
            </Checkbox>
          </Form.Item>

          {/* Submit */}
          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Register
            </Button>
          </Form.Item>
        </Form>

        <Typography.Paragraph style={{ textAlign: 'center' }}>
          Already have an account? <a href="/login">Login here</a>
        </Typography.Paragraph>
      </Card>
    </div>
  )
}