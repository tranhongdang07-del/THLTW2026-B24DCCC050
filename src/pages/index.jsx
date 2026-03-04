import { Tabs } from 'antd';
import Dashboard from './Dashboard';
import Products from './Products';
import Orders from './Orders';

export default function Home() {
  return (
    <Tabs defaultActiveKey="1">
      <Tabs.TabPane tab="Dashboard" key="1">
        <Dashboard />
      </Tabs.TabPane>

      <Tabs.TabPane tab="Sản phẩm" key="2">
        <Products />
      </Tabs.TabPane>

      <Tabs.TabPane tab="Đơn hàng" key="3">
        <Orders />
      </Tabs.TabPane>
    </Tabs>
  );
}