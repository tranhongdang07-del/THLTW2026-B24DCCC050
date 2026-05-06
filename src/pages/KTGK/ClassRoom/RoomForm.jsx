import { Form, Input, Select, InputNumber } from "antd";
import { roomTypes, managers } from "./data";

const { Option } = Select;

const RoomForm = ({ form }) => {
  return (
    <Form form={form} layout="vertical">
      <Form.Item
        name="code"
        label="Mã phòng"
        rules={[
          { required: true, message: "Không được để trống" },
          { max: 10, message: "Tối đa 10 ký tự" },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="name"
        label="Tên phòng"
        rules={[
          { required: true, message: "Không được để trống" },
          { max: 50, message: "Tối đa 50 ký tự" },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="manager"
        label="Người phụ trách"
        rules={[{ required: true }]}
      >
        <Select>
          {managers.map((item) => (
            <Option key={item.value}>{item.label}</Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="seats"
        label="Số chỗ ngồi"
        rules={[
          { required: true },
          { type: "number", min: 10, max: 200 },
        ]}
      >
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item
        name="type"
        label="Loại phòng"
        rules={[{ required: true }]}
      >
        <Select>
          {roomTypes.map((item) => (
            <Option key={item.value}>{item.label}</Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  );
};

export default RoomForm;