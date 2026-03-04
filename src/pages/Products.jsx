import { Table, Tag } from 'antd';
import { useModel } from '@umijs/max';

const getStatus = (q) => {
  if (q === 0) return { text: 'Hết hàng', color: 'red' };
  if (q <= 10) return { text: 'Sắp hết', color: 'orange' };
  return { text: 'Còn hàng', color: 'green' };
};

export default function Products() {
  const { products } = useModel('useStore');

  const columns = [
    { title: 'STT', render: (_, __, i) => i + 1 },
    { title: 'Tên', dataIndex: 'name', sorter: (a,b)=>a.name.localeCompare(b.name) },
    { title: 'Danh mục', dataIndex: 'category' },
    { title: 'Giá', dataIndex: 'price', sorter:(a,b)=>a.price-b.price },
    { title: 'Tồn kho', dataIndex: 'quantity', sorter:(a,b)=>a.quantity-b.quantity },
    {
      title: 'Trạng thái',
      render: (_, r) => {
        const s = getStatus(r.quantity);
        return <Tag color={s.color}>{s.text}</Tag>;
      }
    }
  ];

  return (
    <Table
      rowKey="id"
      columns={columns}
      dataSource={products}
      pagination={{ pageSize: 5 }}
    />
  );
}