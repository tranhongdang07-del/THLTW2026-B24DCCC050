import { Card, Row, Col } from "antd";
import { useContext } from "react";
import { TaskContext } from "./context";

export default function Dashboard() {
  const { tasks } = useContext(TaskContext);

  const total = tasks.length;
  const done = tasks.filter(t => t.status === "done").length;
  const overdue = tasks.filter(
    t => new Date(t.deadline) < new Date() && t.status !== "done"
  ).length;

  return (
    <Row gutter={16}>
      <Col span={8}><Card title="Tổng công việc">{total}</Card></Col>
      <Col span={8}><Card title="Đã hoàn thành">{done}</Card></Col>
      <Col span={8}><Card title="Quá hạn">{overdue}</Card></Col>
    </Row>
  );
}