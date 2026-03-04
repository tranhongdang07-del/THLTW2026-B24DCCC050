import { Card, Statistic, Row, Col } from 'antd';
import { useModel } from '@umijs/max';

export default function Dashboard() {
  const { statistics } = useModel('useStore');

  return (
    <Row gutter={16}>
      <Col span={6}><Card><Statistic title="Tổng sản phẩm" value={statistics.totalProducts} /></Card></Col>
      <Col span={6}><Card><Statistic title="Giá trị tồn kho" value={statistics.inventoryValue} /></Card></Col>
      <Col span={6}><Card><Statistic title="Tổng đơn hàng" value={statistics.totalOrders} /></Card></Col>
      <Col span={6}><Card><Statistic title="Doanh thu" value={statistics.revenue} /></Card></Col>
    </Row>
  );
}