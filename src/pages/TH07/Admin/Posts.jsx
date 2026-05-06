import {
  Table,
  Button,
  Modal,
  Popconfirm,
  Tag,
  Input,
  Select,
  Space,
} from "antd";
import { useEffect, useState } from "react";
import {
  getPosts,
  addPost,
  updatePost,
  deletePost,
} from "../services/postService";
import PostForm from "../components/PostForm";

export default function Posts() {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [keyword, setKeyword] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    setData(getPosts());
  }, []);

  const refresh = () => setData(getPosts());

  // 🔎 FILTER
  const filtered = data.filter((p) => {
    const matchKeyword = p.title
      .toLowerCase()
      .includes(keyword.toLowerCase());

    const matchStatus = status ? p.status === status : true;

    return matchKeyword && matchStatus;
  });

  return (
    <div>
      <h2>Quản lý bài viết</h2>

      {/* TOOLBAR */}
      <Space style={{ marginBottom: 16 }}>
        <Input
          placeholder="🔍 Tìm theo tiêu đề..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          style={{ width: 220 }}
        />

        <Select
          placeholder="Lọc trạng thái"
          allowClear
          style={{ width: 180 }}
          onChange={(v) => setStatus(v)}
        >
          <Select.Option value="draft">Nháp</Select.Option>
          <Select.Option value="published">Đã đăng</Select.Option>
        </Select>

        <Button
          type="primary"
          onClick={() => {
            setEditing(null);
            setOpen(true);
          }}
        >
          + Thêm bài viết
        </Button>
      </Space>

      {/* TABLE */}
      <Table
        rowKey="id"
        dataSource={filtered}
        pagination={{ pageSize: 5 }}
        columns={[
          {
            title: "Tiêu đề",
            dataIndex: "title",
          },
          {
            title: "Trạng thái",
            dataIndex: "status",
            render: (s) =>
              s === "published" ? (
                <Tag color="green">Đã đăng</Tag>
              ) : (
                <Tag color="orange">Nháp</Tag>
              ),
          },
          {
            title: "Thẻ",
            dataIndex: "tags",
            render: (tags) =>
              tags?.map((t) => <Tag key={t}>{t}</Tag>),
          },
          {
            title: "Lượt xem",
            dataIndex: "views",
          },
          {
            title: "Ngày tạo",
            dataIndex: "createdAt",
            render: (d) =>
              d ? new Date(d).toLocaleDateString() : "",
          },
          {
            title: "Hành động",
            render: (_, record) => (
              <Space>
                <Button
                  onClick={() => {
                    setEditing(record);
                    setOpen(true);
                  }}
                >
                  Sửa
                </Button>

                <Popconfirm
                  title="Bạn có chắc muốn xóa?"
                  okText="Xóa"
                  cancelText="Hủy"
                  onConfirm={() => {
                    deletePost(record.id);
                    refresh();
                  }}
                >
                  <Button danger>Xóa</Button>
                </Popconfirm>
              </Space>
            ),
          },
        ]}
      />

      {/* MODAL FORM */}
      <Modal
        open={open}
        footer={null}
        destroyOnClose
        onCancel={() => {
          setOpen(false);
          setEditing(null);
        }}
        title={editing ? "Sửa bài viết" : "Thêm bài viết"}
      >
        <PostForm
          initial={editing}
          onSubmit={(post) => {
            if (editing) {
              updatePost(post);
            } else {
              addPost(post);
            }
            refresh();
            setOpen(false);
            setEditing(null);
          }}
        />
      </Modal>
    </div>
  );
}