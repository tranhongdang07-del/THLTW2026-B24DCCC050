import { useState, useEffect, useMemo, useCallback } from 'react';
import dayjs from 'dayjs';

const PRODUCT_KEY = 'products_data';
const ORDER_KEY = 'orders_data';

export default function useStore() {
  const initialProducts = [
    { id: 1, name: 'Laptop Dell XPS 13', category: 'Laptop', price: 25000000, quantity: 15 },
    { id: 2, name: 'iPhone 15 Pro Max', category: 'Điện thoại', price: 30000000, quantity: 8 },
    { id: 3, name: 'Samsung Galaxy S24', category: 'Điện thoại', price: 22000000, quantity: 20 },
    { id: 4, name: 'iPad Air M2', category: 'Máy tính bảng', price: 18000000, quantity: 5 },
    { id: 5, name: 'MacBook Air M3', category: 'Laptop', price: 28000000, quantity: 12 },
    { id: 6, name: 'AirPods Pro 2', category: 'Phụ kiện', price: 6000000, quantity: 0 },
    { id: 7, name: 'Samsung Galaxy Tab S9', category: 'Máy tính bảng', price: 15000000, quantity: 7 },
    { id: 8, name: 'Logitech MX Master 3', category: 'Phụ kiện', price: 2500000, quantity: 25 },
  ];

  const [products, setProducts] = useState(
    () => JSON.parse(localStorage.getItem(PRODUCT_KEY)) || initialProducts
  );

  const [orders, setOrders] = useState(
    () => JSON.parse(localStorage.getItem(ORDER_KEY)) || []
  );

  useEffect(() => {
    localStorage.setItem(PRODUCT_KEY, JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem(ORDER_KEY, JSON.stringify(orders));
  }, [orders]);

  const createOrder = useCallback((order) => {
    setOrders(prev => [...prev, order]);
  }, []);

  const updateOrderStatus = useCallback((orderId, newStatus) => {
    setOrders(prev =>
      prev.map(order => {
        if (order.id !== orderId) return order;

        const oldStatus = order.status;
        if (oldStatus === newStatus) return order;

        if (newStatus === 'Hoàn thành') {
          setProducts(p =>
            p.map(prod => {
              const item = order.products.find(x => x.productId === prod.id);
              if (!item) return prod;
              return { ...prod, quantity: prod.quantity - item.quantity };
            })
          );
        }

        if (oldStatus === 'Hoàn thành' && newStatus === 'Đã hủy') {
          setProducts(p =>
            p.map(prod => {
              const item = order.products.find(x => x.productId === prod.id);
              if (!item) return prod;
              return { ...prod, quantity: prod.quantity + item.quantity };
            })
          );
        }

        return { ...order, status: newStatus };
      })
    );
  }, []);

  const statistics = useMemo(() => {
    return {
      totalProducts: products.length,
      inventoryValue: products.reduce((s, p) => s + p.price * p.quantity, 0),
      totalOrders: orders.length,
      revenue: orders
        .filter(o => o.status === 'Hoàn thành')
        .reduce((s, o) => s + o.totalAmount, 0),
    };
  }, [products, orders]);

  return {
    products,
    orders,
    createOrder,
    updateOrderStatus,
    statistics,
  };
}