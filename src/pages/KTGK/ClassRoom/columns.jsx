import { Button, Space } from "antd";

const columns = (editRoom, deleteRoom) => [
  {
    title: "Mã phòng",
    dataIndex: "code",
  },
  {
    title: "Tên phòng",
    dataIndex: "name",
  },
  {
    title: "Số chỗ",
    dataIndex: "seats",
    sorter: (a, b) => a.seats - b.seats,
  },
  {
    title: "Loại phòng",
    dataIndex: "type",
  },
  {
    title: "Người phụ trách",
    dataIndex: "manager",
  },
  {
    title: "Hành động",
    render: (_, record) => (
      <Space>
        <Button type="primary" onClick={() => editRoom(record)}>
          Sửa
        </Button>

        <Button danger onClick={() => deleteRoom(record)}>
          Xóa
        </Button>
      </Space>
    ),
  },
];

export default columns;