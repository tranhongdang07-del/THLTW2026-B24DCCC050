import { Table, Input, Tag } from "antd";
import { useContext, useState } from "react";
import { TaskContext } from "./context";

export default function TaskList() {
  const { tasks } = useContext(TaskContext);
  const [search, setSearch] = useState("");

  const filtered = tasks.filter(t =>
    t.title.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    {
      title: "Tên công việc",
      dataIndex: "title",
    },
    {
      title: "Độ ưu tiên",
      dataIndex: "priority",
      render: (p) => <Tag>{p}</Tag>
    },
    {
      title: "Deadline",
      dataIndex: "deadline",
      sorter: (a, b) => new Date(a.deadline) - new Date(b.deadline),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      filters: [
        { text: "Cần làm", value: "todo" },
        { text: "Đang làm", value: "doing" },
        { text: "Hoàn thành", value: "done" },
      ],
      onFilter: (v, r) => r.status === v,
    },
  ];

  return (
    <>
      <Input
        placeholder="🔍 Tìm công việc..."
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: 16 }}
      />

      <Table columns={columns} dataSource={filtered} rowKey="id" />
    </>
  );
}