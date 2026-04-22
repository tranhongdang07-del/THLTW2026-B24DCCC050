import { Card, Avatar, Typography, Tag, Space, Button } from "antd";
import {
  GithubOutlined,
  FacebookOutlined,
  MailOutlined,
} from "@ant-design/icons";

const { Title, Paragraph } = Typography;

export default function About() {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card
        style={{ width: 500 }}
        hoverable
      >
        {/* Avatar */}
        <div style={{ textAlign: "center" }}>
          <Avatar
            size={120}
            src="https://i.pravatar.cc/150"
          />
        </div>

        {/* Tên */}
        <Title level={3} style={{ textAlign: "center", marginTop: 10 }}>
          Nguyễn Văn A
        </Title>

        {/* Mô tả */}
        <Paragraph style={{ textAlign: "center" }}>
          Sinh viên ngành Công nghệ thông tin. Đam mê lập trình web và phát triển ứng dụng hiện đại.
        </Paragraph>

        {/* Kỹ năng */}
        <div style={{ textAlign: "center", marginBottom: 16 }}>
          <Tag color="blue">React</Tag>
          <Tag color="green">JavaScript</Tag>
          <Tag color="purple">HTML/CSS</Tag>
        </div>

        {/* Mạng xã hội */}
        <Space style={{ display: "flex", justifyContent: "center" }}>
          <Button icon={<GithubOutlined />} href="#">
            GitHub
          </Button>
          <Button icon={<FacebookOutlined />} href="#">
            Facebook
          </Button>
          <Button icon={<MailOutlined />} href="#">
            Email
          </Button>
        </Space>
      </Card>
    </div>
  );
}