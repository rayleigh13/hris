import { Card, Col, Row, Statistic, Typography, Calendar } from "antd";
import { UserOutlined, AppstoreOutlined, SettingOutlined, CalendarOutlined, BarChartOutlined, TeamOutlined } from "@ant-design/icons";

export default function Dashboard() {
  return (
    <div>
        <Typography.Title level={3}>
            <BarChartOutlined style={{ marginRight: 8 }} />
            Dashboard Overview
        </Typography.Title>
        <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={6}>
            <Card>
                <Statistic
                title="Total Users"
                value={120}
                prefix={<UserOutlined />}
                valueStyle={{ color: "#3f8600" }}
                />
            </Card>
            </Col>

            <Col xs={24} sm={12} md={6}>
            <Card>
                <Statistic
                title="Products"
                value={50}
                prefix={<AppstoreOutlined />}
                valueStyle={{ color: "#1677ff" }}
                />
            </Card>
            </Col>

            <Col xs={24} sm={12} md={6}>
            <Card>
                <Statistic
                title="System Settings"
                value={8}
                prefix={<SettingOutlined />}
                valueStyle={{ color: "#faad14" }}
                />
            </Card>
            </Col>

            {/* ✅ New Card */}
            <Col xs={24} sm={12} md={6}>
            <Card>
                <Statistic
                title="Active Sessions"
                value={34}
                prefix={<TeamOutlined />}
                valueStyle={{ color: "#eb2f96" }}
                />
            </Card>
            </Col>
        </Row>

      {/* ✅ Calendar Section */}
      <Card style={{ marginTop: 24 }}>
        <Typography.Title level={4}>
            <CalendarOutlined style={{ marginRight: 8 }} />
            Event Calendar
        </Typography.Title>
        <Calendar fullscreen={true} /> 
        {/* Use fullscreen={true} if you want the full page calendar */}
      </Card>
    </div>
  );
}