from pathlib import Path

base = Path(r'c:\Users\GIGABYTE\baseltw\src\pages\TH06')
files = {
    'Planner/index.jsx': '''import {
  List,
  Button,
  Card,
  Select,
  Row,
  Col,
  Space,
  Statistic,
  Alert,
  message,
} from "antd";
import { useEffect, useMemo, useState } from "react";
import {
  loadDestinations,
  loadPlan,
  savePlan,
  estimateTravelTime,
} from "../data";

const { Option } = Select;

export default function Planner() {
  const [destinations, setDestinations] = useState([]);
  const [plan, setPlan] = useState(() => loadPlan());
  const [selectedDay, setSelectedDay] = useState(1);

  useEffect(() => {
    setDestinations(loadDestinations());
  }, []);

  useEffect(() => {
    savePlan(plan);
  }, [plan]);

  const add = (item) => {
    if (plan.some((entry) => entry.id === item.id)) {
      message.warning("Điểm đến này đã có trong lịch trình.");
      return;
    }
    setPlan([...plan, { ...item, day: selectedDay }]);
  };

  const remove = (index) => {
    const newPlan = [...plan];
    newPlan.splice(index, 1);
    setPlan(newPlan);
  };

  const changeDay = (id, day) => {
    setPlan(plan.map((item) => (item.id === id ? { ...item, day } : item)));
  };

  const moveItem = (index, direction) => {
    const nextIndex = index + direction;
    if (nextIndex < 0 || nextIndex >= plan.length) {
      return;
    }
    const newPlan = [...plan];
    [newPlan[index], newPlan[nextIndex]] = [newPlan[nextIndex], newPlan[index]];
    setPlan(newPlan);
  };

  const planByDay = useMemo(() => {
    return plan.reduce((groups, item) => {
      const key = item.day || 1;
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(item);
      return groups;
    }, {});
  }, [plan]);

  const totalBudget = plan.reduce(
    (sum, item) => sum + item.cost.food + item.cost.stay + item.cost.travel,
    0,
  );

  const totalVisitTime = plan.reduce((sum, item) => sum + item.visitTime, 0);
  const totalTravelTime = plan.reduce((sum, item, index) => {
    if (index === 0) {
      return sum;
    }
    return sum + estimateTravelTime(plan[index - 1], item);
  }, 0);
  const totalDuration = totalVisitTime + totalTravelTime;

  return (
    <div>
      <Row gutter={16}>
        <Col xs={24} lg={16}>
          <Card title="Danh sách điểm đến">
            <p>Chọn ngày để thêm vào lịch trình</p>
            <Space wrap style={{ marginBottom: 16 }}>
              <Select
                value={selectedDay}
                onChange={setSelectedDay}
                style={{ width: 120 }}
              >
                {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                  <Option key={day} value={day}>
                    Ngày {day}
                  </Option>
                ))}
              </Select>
            </Space>

            <List
              dataSource={destinations}
              renderItem={(item) => (
                <List.Item
                  actions={[
                    <Button type="primary" onClick={() => add(item)}>
                      Thêm
                    </Button>,
                  ]}
                >
                  <List.Item.Meta
                    title={item.name}
                    description={
                      item.type +
                      " · " +
                      item.visitTime +
                      " giờ tham quan · Giá " +
                      item.price +
                      "$"
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card title="Tóm tắt lịch trình">
            <Statistic title="Tổng ngân sách dự kiến" value={totalBudget} suffix="$" />
            <Statistic
              title="Tổng thời gian dự kiến"
              value={totalDuration}
              suffix="giờ"
              style={{ marginTop: 16 }}
            />
            <Statistic
              title="Tổng thời gian di chuyển"
              value={totalTravelTime}
              suffix="giờ"
              style={{ marginTop: 16 }}
            />
            <Alert
              style={{ marginTop: 16 }}
              message={`Tổng số điểm đến: ${plan.length}`}
              type={plan.length ? "info" : "warning"}
              showIcon
            />
          </Card>
        </Col>
      </Row>

      <Card title="Lịch trình" style={{ marginTop: 20 }}>
        {!plan.length && (
          <Alert type="info" message="Thêm điểm đến từ danh sách để bắt đầu tạo lịch trình." />
        )}

        {Object.keys(planByDay)
          .sort((a, b) => a - b)
          .map((day) => (
            <Card
              type="inner"
              title={"Ngày " + day}
              key={day}
              style={{ marginBottom: 16 }}
            >
              <List
                dataSource={planByDay[day]}
                renderItem={(item) => {
                  const globalIndex = plan.findIndex((entry) => entry.id === item.id);
                  return (
                    <List.Item
                      actions={[
                        <Select
                          value={item.day}
                          onChange={(value) => changeDay(item.id, value)}
                          style={{ width: 100 }}
                        >
                          {[1, 2, 3, 4, 5, 6, 7].map((dayValue) => (
                            <Option key={dayValue} value={dayValue}>
                              Ngày {dayValue}
                            </Option>
                          ))}
                        </Select>,
                        <Button onClick={() => moveItem(globalIndex, -1)}>
                          Lên
                        </Button>,
                        <Button onClick={() => moveItem(globalIndex, 1)}>
                          Xuống
                        </Button>,
                        <Button danger onClick={() => remove(globalIndex)}>
                          Xóa
                        </Button>,
                      ]}
                    >
                      <List.Item.Meta
                        title={item.name}
                        description={
                          "Ăn uống: $" +
                          item.cost.food +
                          " · Lưu trú: $" +
                          item.cost.stay +
                          " · Di chuyển: $" +
                          item.cost.travel
                        }
                      />
                    </List.Item>
                  );
                }}
              />
            </Card>
          ))}
      </Card>
    </div>
  );
}
''',
    'Budget/index.jsx': '''import { useEffect, useMemo, useState } from "react";
import { Table, Alert, InputNumber, Row, Col, Card, Statistic } from "antd";
import { Pie } from "@ant-design/plots";
import { loadPlan } from "../data";

export default function Budget() {
  const [plan, setPlan] = useState([]);
  const [budgetLimit, setBudgetLimit] = useState(1200);

  useEffect(() => {
    setPlan(loadPlan());
  }, []);

  const totals = useMemo(() => {
    return plan.reduce(
      (summary, item) => {
        summary.food += item.cost.food;
        summary.travel += item.cost.travel;
        summary.stay += item.cost.stay;
        return summary;
      },
      { food: 0, travel: 0, stay: 0 },
    );
  }, [plan]);

  const data = [
    { type: "Ăn uống", cost: totals.food },
    { type: "Di chuyển", cost: totals.travel },
    { type: "Lưu trú", cost: totals.stay },
  ];

  const totalBudget = data.reduce((sum, item) => sum + item.cost, 0);

  const config = {
    appendPadding: 10,
    data,
    angleField: "cost",
    colorField: "type",
    radius: 0.8,
    label: {
      type: "outer",
      content: "{name}: {percentage}",
    },
    interactions: [{ type: "element-active" }],
  };

  const alertType = totalBudget > budgetLimit ? "error" : "success";
  const alertMessage = totalBudget > budgetLimit
    ? `Bạn đã vượt ngân sách ${totalBudget - budgetLimit}$`
    : `Ngân sách còn lại: ${budgetLimit - totalBudget}$`;

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card title="Ngân sách dự kiến">
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Statistic title="Ngân sách giới hạn" value={budgetLimit} suffix="$" />
              </Col>
              <Col span={12}>
                <Statistic title="Tổng chi phí" value={totalBudget} suffix="$" />
              </Col>
            </Row>
            <div style={{ marginTop: 16 }}>
              <span style={{ marginRight: 12 }}>Hạn mức ngân sách:</span>
              <InputNumber
                min={0}
                value={budgetLimit}
                onChange={(value) => setBudgetLimit(value || 0)}
                formatter={(value) => `${value}`}
                style={{ width: 140 }}
              />
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card title="Phân bổ ngân sách">
            <Pie {...config} />
          </Card>
        </Col>
      </Row>

      <Alert
        message={alertMessage}
        type={alertType}
        showIcon
        style={{ marginTop: 20 }}
      />

      <Table
        style={{ marginTop: 20 }}
        dataSource={data}
        columns={[
          { title: "Hạng mục", dataIndex: "type" },
          { title: "Chi phí", dataIndex: "cost" },
        ]}
        pagination={false}
        rowKey="type"
      />

      {!plan.length && (
        <Alert
          message="Chưa có lịch trình. Vui lòng tạo lịch trình trong trang Planner để xem ngân sách chi tiết."
          type="info"
          style={{ marginTop: 16 }}
        />
      )}
    </div>
  );
}
''',
    'Admin/index.jsx': '''import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  Rate,
  Upload,
  Space,
  Row,
  Col,
  Statistic,
  Tabs,
  Popconfirm,
  message,
} from "antd";
import { useEffect, useState } from "react";
import { loadDestinations, saveDestinations } from "../data";

const { TextArea } = Input;
const { TabPane } = Tabs;

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export default function Admin() {
  const [destinations, setDestinations] = useState([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const [activeTab, setActiveTab] = useState("manage");
  const [form] = Form.useForm();

  useEffect(() => {
    setDestinations(loadDestinations());
  }, []);

  const saveList = (list) => {
    setDestinations(list);
    saveDestinations(list);
  };

  const removeItem = (id) => {
    saveList(destinations.filter((item) => item.id !== id));
    message.success("Đã xóa điểm đến");
  };

  const openModal = (item = null) => {
    setEditing(item);
    setPreviewImage(item?.image || "");
    setOpen(true);
    if (item) {
      form.setFieldsValue({
        ...item,
        price: item.price,
        visitTime: item.visitTime,
        food: item.cost.food,
        stay: item.cost.stay,
        travel: item.cost.travel,
      });
    } else {
      form.resetFields();
    }
  };

  const onFinish = (values) => {
    const newItem = {
      id: editing?.id || Date.now(),
      name: values.name,
      type: values.type,
      description: values.description,
      price: values.price,
      rating: values.rating,
      visitTime: values.visitTime,
      image: previewImage || values.image || "https://picsum.photos/400/200?random",
      cost: {
        food: values.food,
        stay: values.stay,
        travel: values.travel,
      },
    };

    if (editing) {
      saveList(destinations.map((item) => (item.id === editing.id ? newItem : item)));
      message.success("Cập nhật điểm đến thành công");
    } else {
      saveList([newItem, ...destinations]);
      message.success("Đã thêm điểm đến mới");
    }

    setOpen(false);
    setEditing(null);
    setPreviewImage("");
    form.resetFields();
  };

  const uploadProps = {
    name: "file",
    listType: "picture",
    beforeUpload: async (file) => {
      const src = await getBase64(file);
      setPreviewImage(src);
      return false;
    },
    showUploadList: false,
  };

  const columns = [
    {
      title: "Tên điểm đến",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Loại hình",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (value) => `$${value}`,
    },
    {
      title: "Thao tác",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button type="link" onClick={() => openModal(record)}>
            Sửa
          </Button>
          <Popconfirm
            title="Bạn có chắc muốn xóa?"
            onConfirm={() => removeItem(record.id)}
          >
            <Button danger type="link">
              Xóa
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const totalBudget = destinations.reduce(
    (sum, item) => sum + item.cost.food + item.cost.stay + item.cost.travel,
    0,
  );

  const averageRating =
    destinations.length > 0
      ? (destinations.reduce((sum, item) => sum + item.rating, 0) / destinations.length).toFixed(1)
      : 0;

  return (
    <div>
      <Tabs activeKey={activeTab} onChange={(key) => setActiveTab(key)}>
        <TabPane tab="Quản lý điểm đến" key="manage">
          <Button type="primary" onClick={() => openModal()} style={{ marginBottom: 16 }}>
            Thêm điểm đến
          </Button>

          <Table
            columns={columns}
            dataSource={destinations.map((item) => ({ ...item, key: item.id }))}
            pagination={{ pageSize: 6 }}
          />

          <Modal
            title={editing ? "Chỉnh sửa điểm đến" : "Thêm điểm đến"}
            open={open}
            footer={null}
            onCancel={() => {
              setOpen(false);
              setEditing(null);
              setPreviewImage("");
            }}
          >
            <Form form={form} layout="vertical" onFinish={onFinish}>
              <Form.Item
                label="Tên điểm đến"
                name="name"
                rules={[{ required: true, message: "Vui lòng nhập tên điểm đến" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Mô tả"
                name="description"
                rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
              >
                <TextArea rows={3} />
              </Form.Item>

              <Form.Item
                label="Loại hình"
                name="type"
                rules={[{ required: true, message: "Vui lòng chọn loại hình" }]}
              >
                <Select>
                  <Select.Option value="Biển">Biển</Select.Option>
                  <Select.Option value="Núi">Núi</Select.Option>
                  <Select.Option value="Thành phố">Thành phố</Select.Option>
                </Select>
              </Form.Item>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="Giá"
                    name="price"
                    rules={[{ required: true, message: "Vui lòng nhập giá" }]}
                  >
                    <InputNumber min={0} style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Rating"
                    name="rating"
                    rules={[{ required: true, message: "Vui lòng nhập rating" }]}
                  >
                    <Rate count={5} />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="Thời gian tham quan (giờ)"
                    name="visitTime"
                    rules={[{ required: true, message: "Vui lòng nhập thời gian tham quan" }]}
                  >
                    <InputNumber min={1} style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Ảnh URL" name="image">
                    <Input placeholder="https://..." />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item
                    label="Ăn uống"
                    name="food"
                    rules={[{ required: true, message: "Nhập chi phí ăn uống" }]}
                  >
                    <InputNumber min={0} style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="Lưu trú"
                    name="stay"
                    rules={[{ required: true, message: "Nhập chi phí lưu trú" }]}
                  >
                    <InputNumber min={0} style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="Di chuyển"
                    name="travel"
                    rules={[{ required: true, message: "Nhập chi phí di chuyển" }]}
                  >
                    <InputNumber min={0} style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item label="Upload ảnh">
                <Upload {...uploadProps}>
                  <Button>Chọn file</Button>
                </Upload>
                {previewImage && (
                  <div style={{ marginTop: 12 }}>
                    <img src={previewImage} alt="preview" style={{ width: "100%" }} />
                  </div>
                )}
              </Form.Item>

              <Form.Item>
                <Space>
                  <Button onClick={() => setOpen(false)}>Hủy</Button>
                  <Button type="primary" htmlType="submit">
                    Lưu
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          </Modal>
        </TabPane>

        <TabPane tab="Thống kê" key="stats">
          <Row gutter={16}>
            <Col xs={24} md={8}>
              <Statistic title="Tổng điểm đến" value={destinations.length} />
            </Col>
            <Col xs={24} md={8}>
              <Statistic title="Tổng chi phí dự kiến" value={totalBudget} suffix="$" />
            </Col>
            <Col xs={24} md={8}>
              <Statistic title="Đánh giá trung bình" value={averageRating} />
            </Col>
          </Row>

          <div style={{ marginTop: 24 }}>
            <h3>Địa điểm nổi bật</h3>
            <Table
              columns={columns.filter((column) => column.key !== "actions")}
              dataSource={destinations
                .slice()
                .sort((a, b) => b.rating - a.rating)
                .slice(0, 5)
                .map((item) => ({ ...item, key: item.id }))}
              pagination={false}
            />
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
}
''',
}

for relative_path, content in files.items():
    path = base / relative_path
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content, encoding="utf-8")

print('written', [str(base / p) for p in files])
