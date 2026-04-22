import { useState, useEffect } from 'react';
import {
  Card,
  Input,
  Button,
  Table,
  Modal,
  DatePicker,
  InputNumber,
  Progress,
  Select,
} from 'antd';
import dayjs from 'dayjs';

export default function Bai2() {
  const [subjects, setSubjects] = useState(
    JSON.parse(localStorage.getItem('subjects')) || []
  );

  const [monthlyTarget, setMonthlyTarget] = useState(
    Number(localStorage.getItem('monthlyTarget')) || 0
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const [form, setForm] = useState({
    name: '',
    date: null,
    duration: 0,
    content: '',
    note: '',
  });

  useEffect(() => {
    localStorage.setItem('subjects', JSON.stringify(subjects));
  }, [subjects]);

  useEffect(() => {
    localStorage.setItem('monthlyTarget', monthlyTarget);
  }, [monthlyTarget]);

  const openModal = (record = null) => {
    setEditingItem(record);
    if (record) {
      setForm({
        ...record,
        date: dayjs(record.date),
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (!form.name || !form.date) return;

    if (editingItem) {
      setSubjects(
        subjects.map((item) =>
          item.id === editingItem.id
            ? { ...form, id: editingItem.id, date: form.date.toISOString() }
            : item
        )
      );
    } else {
      setSubjects([
        ...subjects,
        { ...form, id: Date.now(), date: form.date.toISOString() },
      ]);
    }

    setIsModalOpen(false);
    setForm({
      name: '',
      date: null,
      duration: 0,
      content: '',
      note: '',
    });
  };

  const deleteItem = (id) => {
    setSubjects(subjects.filter((item) => item.id !== id));
  };

  const totalDuration = subjects.reduce(
    (sum, item) => sum + Number(item.duration),
    0
  );

  const percent =
    monthlyTarget > 0 ? Math.min((totalDuration / monthlyTarget) * 100, 100) : 0;

  const columns = [
    { title: 'Môn', dataIndex: 'name' },
    {
      title: 'Ngày',
      dataIndex: 'date',
      render: (date) => dayjs(date).format('DD/MM/YYYY HH:mm'),
    },
    { title: 'Thời lượng (giờ)', dataIndex: 'duration' },
    { title: 'Nội dung', dataIndex: 'content' },
    { title: 'Ghi chú', dataIndex: 'note' },
    {
      title: 'Hành động',
      render: (_, record) => (
        <>
          <Button onClick={() => openModal(record)} style={{ marginRight: 5 }}>
            Sửa
          </Button>
          <Button danger onClick={() => deleteItem(record.id)}>
            Xóa
          </Button>
        </>
      ),
    },
  ];

  return (
    <Card>
      <h2>Quản lý tiến độ học tập</h2>

      <Button type="primary" onClick={() => openModal()}>
        Thêm lịch học
      </Button>

      <Table
        columns={columns}
        dataSource={subjects}
        rowKey="id"
        style={{ marginTop: 20 }}
      />

      <Card style={{ marginTop: 20 }}>
        <h3>Mục tiêu tháng (giờ)</h3>
        <InputNumber
          value={monthlyTarget}
          onChange={setMonthlyTarget}
        />
        <Progress percent={percent} style={{ marginTop: 10 }} />
      </Card>

      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleSave}
        title="Thông tin học tập"
      >
        <Select
          placeholder="Chọn môn"
          style={{ width: '100%', marginBottom: 10 }}
          value={form.name}
          onChange={(value) => setForm({ ...form, name: value })}
        >
          <Select.Option value="Toán">Toán</Select.Option>
          <Select.Option value="Văn">Văn</Select.Option>
          <Select.Option value="Anh">Anh</Select.Option>
          <Select.Option value="Khoa học">Khoa học</Select.Option>
          <Select.Option value="Công nghệ">Công nghệ</Select.Option>
        </Select>

        <DatePicker
          showTime
          style={{ width: '100%', marginBottom: 10 }}
          value={form.date}
          onChange={(value) => setForm({ ...form, date: value })}
        />

        <InputNumber
          placeholder="Thời lượng (giờ)"
          style={{ width: '100%', marginBottom: 10 }}
          value={form.duration}
          onChange={(value) => setForm({ ...form, duration: value })}
        />

        <Input
          placeholder="Nội dung"
          style={{ marginBottom: 10 }}
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
        />

        <Input
          placeholder="Ghi chú"
          value={form.note}
          onChange={(e) => setForm({ ...form, note: e.target.value })}
        />
      </Modal>
    </Card>
  );
}