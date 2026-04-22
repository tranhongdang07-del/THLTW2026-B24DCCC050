import React, { useState } from "react";
import {
  Table,
  Button,
  Input,
  Select,
  Modal,
  Form,
  message,
  Space,
  Card,
  Typography
} from "antd";

import {
  PlusOutlined,
  SearchOutlined
} from "@ant-design/icons";

import columns from "./columns";
import RoomForm from "./RoomForm";
import { roomTypes, managers } from "./data";
import { checkDuplicate, filterRooms } from "./utils";

const { Title } = Typography;

const ClassRoom = () => {

  const [data, setData] = useState([
    {
      code: "P101",
      name: "Phòng học A",
      seats: 40,
      type: "Lý thuyết",
      manager: "Nguyễn Văn A",
    },
    {
      code: "P102",
      name: "Phòng máy B",
      seats: 25,
      type: "Thực hành",
      manager: "Trần Văn B",
    },
  ]);

  const [filteredData, setFilteredData] = useState(data);

  const [typeFilter, setTypeFilter] = useState();
  const [managerFilter, setManagerFilter] = useState();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);

  const [form] = Form.useForm();

  // SEARCH
  const handleSearch = (value) => {

    const result = data.filter(
      (item) =>
        item.code.toLowerCase().includes(value.toLowerCase()) ||
        item.name.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredData(result);
  };

  // FILTER
  const handleFilter = (type, manager) => {

    const result = filterRooms(data, type, manager);
    setFilteredData(result);
  };

  // ADD
  const showAddModal = () => {
    setEditingRoom(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  // EDIT
  const editRoom = (record) => {
    setEditingRoom(record);
    form.setFieldsValue(record);
    setIsModalOpen(true);
  };

  // DELETE
  const deleteRoom = (record) => {

    if (record.seats >= 30) {
      message.error("Chỉ được xóa phòng dưới 30 chỗ");
      return;
    }

    Modal.confirm({
      title: "Xác nhận xóa phòng?",
      okText: "Xóa",
      cancelText: "Hủy",

      onOk() {

        const newData = data.filter((item) => item.code !== record.code);

        setData(newData);
        setFilteredData(newData);

        message.success("Xóa phòng thành công");
      },
    });
  };

  // SUBMIT FORM
  const handleSubmit = () => {

    form.validateFields().then((values) => {

      if (!editingRoom) {

        if (checkDuplicate(data, values)) {
          message.error("Mã phòng hoặc tên phòng đã tồn tại");
          return;
        }

        const newData = [...data, values];

        setData(newData);
        setFilteredData(newData);

      } else {

        const newData = data.map((item) =>
          item.code === editingRoom.code ? values : item
        );

        setData(newData);
        setFilteredData(newData);
      }

      setIsModalOpen(false);

      message.success("Lưu thành công");
    });
  };

  return (

    <Card>

      <Title level={3}>
        Quản lý phòng học
      </Title>

      <Space
        style={{
          marginBottom: 20,
          display: "flex",
          justifyContent: "space-between"
        }}
      >

        <Space>

          <Input
            prefix={<SearchOutlined />}
            placeholder="Tìm mã phòng hoặc tên phòng"
            style={{ width: 250 }}
            allowClear
            onChange={(e) => handleSearch(e.target.value)}
          />

          <Select
            placeholder="Loại phòng"
            allowClear
            style={{ width: 160 }}
            onChange={(value) => {

              setTypeFilter(value);
              handleFilter(value, managerFilter);
            }}
          >
            {roomTypes.map((item) => (
              <Select.Option key={item.value}>
                {item.label}
              </Select.Option>
            ))}
          </Select>

          <Select
            placeholder="Người phụ trách"
            allowClear
            style={{ width: 200 }}
            onChange={(value) => {

              setManagerFilter(value);
              handleFilter(typeFilter, value);
            }}
          >
            {managers.map((item) => (
              <Select.Option key={item.value}>
                {item.label}
              </Select.Option>
            ))}
          </Select>

        </Space>

        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={showAddModal}
        >
          Thêm phòng
        </Button>

      </Space>

      <Table
        bordered
        columns={columns(editRoom, deleteRoom)}
        dataSource={filteredData}
        rowKey="code"
        pagination={{
          pageSize: 5
        }}
      />

      <Modal
        title={editingRoom ? "Sửa phòng học" : "Thêm phòng học"}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleSubmit}
        okText="Lưu"
        cancelText="Hủy"
      >
        <RoomForm form={form} />
      </Modal>

    </Card>
  );
};

export default ClassRoom;