import { Form, Input, DatePicker, Select, Button } from "antd";
import { useContext } from "react";
import { TaskContext } from "./context";

export default function TaskForm() {
  const { tasks, setTasks } = useContext(TaskContext);

  const onFinish = (values) => {
    const newTask = {
      id: Date.now().toString(),
      title: values.title,
      description: values.description,
      deadline: values.deadline.format("YYYY-MM-DD"),
      priority: values.priority,
      tags: values.tags,
      status: "todo",
    };

    setTasks([...tasks, newTask]);
  };

  return (
    <Form layout="vertical" onFinish={onFinish}>
      <Form.Item name="title" label="Tên công việc" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item name="description" label="Mô tả">
        <Input.TextArea />
      </Form.Item>

      <Form.Item name="deadline" label="Deadline" rules={[{ required: true }]}>
        <DatePicker style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item name="priority" label="Độ ưu tiên">
        <Select>
          <Select.Option value="high">Cao</Select.Option>
          <Select.Option value="medium">Trung bình</Select.Option>
          <Select.Option value="low">Thấp</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item name="tags" label="Tag">
        <Select mode="tags" placeholder="Nhập tag..." />
      </Form.Item>

      <Button type="primary" htmlType="submit" block>
        Thêm công việc
      </Button>
    </Form>
  );
}