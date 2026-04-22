import {
  Table,
  Button,
  Input,
  Space,
  Popconfirm,
  Form,
} from "antd";
import { useEffect, useState } from "react";
import {
  getTags,
  addTag,
  deleteTag,
  updateTag,
} from "../services/tagService";
import { getPosts, updatePost } from "../services/postService";

export default function Tags() {
  const [data, setData] = useState([]);
  const [value, setValue] = useState("");
  const [editing, setEditing] = useState(null);
  const [form] = Form.useForm();

  const load = () => {
    const tags = getTags();
    const posts = getPosts();

    const result = tags.map(t => ({
      key: t,
      name: t,
      count: posts.filter(p => p.tags?.includes(t)).length,
    }));

    setData(result);
  };

  useEffect(() => {
    load();
  }, []);

  // ➕ ADD
  const handleAdd = () => {
    if (!value) return;
    addTag(value);
    setValue("");
    load();
  };

  // ❌ DELETE (xóa khỏi post luôn)
  const handleDelete = (tag) => {
    deleteTag(tag);

    const posts = getPosts();
    posts.forEach(p => {
      p.tags = (p.tags || []).filter(t => t !== tag);
      updatePost(p);
    });

    load();
  };

  // ✏️ EDIT
  const save = async (oldTag) => {
    const { name } = await form.validateFields();

    updateTag(oldTag, name);

    const posts = getPosts();
    posts.forEach(p => {
      p.tags = (p.tags || []).map(t =>
        t === oldTag ? name : t
      );
      updatePost(p);
    });

    setEditing(null);
    load();
  };

  const columns = [
    {
      title: "Tên thẻ",
      dataIndex: "name",
      render: (_, r) =>
        editing === r.name ? (
          <Form.Item name="name" style={{ margin: 0 }}>
            <Input />
          </Form.Item>
        ) : (
          r.name
        ),
    },
    {
      title: "Số bài",
      dataIndex: "count",
    },
    {
      title: "Hành động",
      render: (_, r) =>
        editing === r.name ? (
          <Space>
            <Button onClick={() => save(r.name)}>Lưu</Button>
            <Button onClick={() => setEditing(null)}>Hủy</Button>
          </Space>
        ) : (
          <Space>
            <Button
              onClick={() => {
                setEditing(r.name);
                form.setFieldsValue({ name: r.name });
              }}
            >
              Sửa
            </Button>

            <Popconfirm
              title="Xóa thẻ?"
              onConfirm={() => handleDelete(r.name)}
            >
              <Button danger>Xóa</Button>
            </Popconfirm>
          </Space>
        ),
    },
  ];

  return (
    <div>
      <h2>Quản lý thẻ</h2>

      <Space style={{ marginBottom: 16 }}>
        <Input
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder="Nhập thẻ..."
        />
        <Button type="primary" onClick={handleAdd}>
          Thêm
        </Button>
      </Space>

      <Form form={form}>
        <Table columns={columns} dataSource={data} />
      </Form>
    </div>
  );
}