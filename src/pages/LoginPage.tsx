import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Checkbox, Form, Input, Typography, Card } from 'antd'

export default function LoginPage() {
  const onFinish = (values: any) => {
    console.log('Login success:', values)
    // TODO: call backend API for authentication
  }

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',   // full screen height
      background: '#f0f2f5' // light gray background like Ant Design demo
    }}>
      <Card style={{
        width: 350,
        borderRadius: 12,
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
      }}>
        <Typography.Title level={3} style={{ textAlign: 'center', marginBottom: 24 }}>
          Login
        </Typography.Title>

        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Enter username" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Enter password" />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}