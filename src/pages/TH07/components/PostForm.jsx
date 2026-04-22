import { Form, Input, Select, Button } from "antd";
import { useEffect } from "react";
import { getTags, addTag } from "../services/tagService";

const { TextArea } = Input;

export default function PostForm({ initial, onSubmit }) {
  const [form] = Form.useForm();

  // lấy danh sách tag từ hệ thống
  const tags = getTags();

  useEffect(() => {
    if (initial) {
      form.setFieldsValue(initial);
    }
  }, [initial]);

  const handleFinish = (values) => {
    // 🔥 Đồng bộ tag: thêm tag mới vào hệ thống
    (values.tags || []).forEach((tag) => {
      addTag(tag);
    });

    const data = {
      ...initial,
      ...values,
      id: initial?.id || Date.now(),
      views: initial?.views || 0,
      createdAt:
        initial?.createdAt ||
        new Date().toISOString().slice(0, 10),
    };

    onSubmit(data);
    form.resetFields();
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleFinish}
    >
      {/* Tiêu đề */}
      <Form.Item
        name="title"
        label="Tiêu đề"
        rules={[{ required: true, message: "Nhập tiêu đề" }]}
      >
        <Input placeholder="Nhập tiêu đề bài viết..." />
      </Form.Item>

      {/* Slug */}
      <Form.Item
        name="slug"
        label="Đường dẫn (slug)"
        rules={[{ required: true, message: "Nhập slug" }]}
      >
        <Input placeholder="vd: react-co-ban" />
      </Form.Item>

      {/* Ảnh */}
      <Form.Item
        name="thumbnail"
        label="Ảnh đại diện"
        rules={[{ required: true, message: "Nhập link ảnh" }]}
      >
        <Input placeholder="https://..." />
      </Form.Item>

      {/* TAGS (QUAN TRỌNG NHẤT) */}
      <Form.Item
        name="tags"
        label="Thẻ"
        rules={[{ required: true, message: "Nhập ít nhất 1 thẻ" }]}
      >
        <Select
          mode="tags"
          placeholder="Nhập hoặc chọn thẻ"
        >
          {tags.map((tag) => (
            <Select.Option key={tag}>
              {tag}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      {/* Trạng thái */}
      <Form.Item
        name="status"
        label="Trạng thái"
        rules={[{ required: true }]}
      >
        <Select>
          <Select.Option value="draft">Nháp</Select.Option>
          <Select.Option value="published">
            Đã đăng
          </Select.Option>
        </Select>
      </Form.Item>

      {/* Nội dung */}
      <Form.Item
        name="content"
        label="Nội dung"
        rules={[{ required: true }]}
      >
        <TextArea
          rows={6}
          placeholder="Viết nội dung (Markdown)..."
        />
      </Form.Item>

      <Button type="primary" htmlType="submit">
        Lưu bài viết
      </Button>
    </Form>
  );
}