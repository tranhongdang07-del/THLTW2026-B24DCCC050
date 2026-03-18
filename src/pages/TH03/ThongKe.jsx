import React, { useState } from 'react';
import { Card, Row, Col, Statistic, Table, DatePicker } from 'antd';
import { appointments, services, employees, reviews } from './data';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(isBetween);

const ThongKe = () => {
	const [dateRange, setDateRange] = useState([dayjs().subtract(30, 'days'), dayjs()]);

	const filteredAppointments = dateRange
		? appointments.filter((a) => dayjs(a.date).isBetween(dateRange[0], dateRange[1], null, '[]'))
		: appointments;

	const totalAppointments = filteredAppointments.length;
	const completedAppointments = filteredAppointments.filter((a) => a.status === 'done').length;
	const pendingAppointments = filteredAppointments.filter((a) => a.status === 'pending').length;
	const confirmedAppointments = filteredAppointments.filter((a) => a.status === 'confirmed').length;
	const cancelledAppointments = filteredAppointments.filter((a) => a.status === 'cancel').length;

	const totalRevenue = filteredAppointments
		.filter((a) => a.status === 'done')
		.reduce((sum, a) => {
			const service = services.find((s) => s.key === a.serviceId);
			return sum + (service?.price || 0);
		}, 0);

	const appointmentsByService = services.map((service) => ({
		key: service.key,
		name: service.name,
		price: service.price,
		count: filteredAppointments.filter((a) => a.serviceId === service.key).length,
		completed: filteredAppointments.filter((a) => a.serviceId === service.key && a.status === 'done').length,
		revenue:
			filteredAppointments.filter((a) => a.serviceId === service.key && a.status === 'done').length *
			(service.price || 0),
	}));

	const appointmentsByEmployee = employees.map((emp) => {
		const empAppointments = filteredAppointments.filter((a) => a.employeeId === emp.key);
		const empReviews = reviews.filter((r) => r.employeeId === emp.key);
		const avgRating =
			empReviews.length > 0 ? (empReviews.reduce((sum, r) => sum + r.rating, 0) / empReviews.length).toFixed(1) : 0;
		return {
			key: emp.key,
			name: emp.name,
			total: empAppointments.length,
			completed: empAppointments.filter((a) => a.status === 'done').length,
			revenue: empAppointments
				.filter((a) => a.status === 'done')
				.reduce((sum, a) => {
					const service = services.find((s) => s.key === a.serviceId);
					return sum + (service?.price || 0);
				}, 0),
			reviews: empReviews.length,
			avgRating,
		};
	});

	const appointmentsByDay = {};
	filteredAppointments.forEach((a) => {
		const day = dayjs(a.date).format('DD/MM/YYYY');
		if (!appointmentsByDay[day]) appointmentsByDay[day] = { date: day, count: 0, revenue: 0 };
		appointmentsByDay[day].count++;
		if (a.status === 'done') {
			const service = services.find((s) => s.key === a.serviceId);
			appointmentsByDay[day].revenue += service?.price || 0;
		}
	});
	const appointmentsByDayData = Object.values(appointmentsByDay).sort((a, b) =>
		dayjs(a.date, 'DD/MM/YYYY').isBefore(dayjs(b.date, 'DD/MM/YYYY')) ? -1 : 1,
	);

	const serviceColumns = [
		{ title: 'Dịch vụ', dataIndex: 'name', key: 'name' },
		{ title: 'Giá', dataIndex: 'price', key: 'price', render: (p) => (p ? p.toLocaleString('vi-VN') : 0) },
		{ title: 'Tổng lịch', dataIndex: 'count', key: 'count' },
		{ title: 'Hoàn thành', dataIndex: 'completed', key: 'completed' },
		{ title: 'Doanh thu', dataIndex: 'revenue', key: 'revenue', render: (r) => (r ? r.toLocaleString('vi-VN') : 0) },
	];

	const employeeColumns = [
		{ title: 'Nhân viên', dataIndex: 'name', key: 'name' },
		{ title: 'Tổng lịch', dataIndex: 'total', key: 'total' },
		{ title: 'Hoàn thành', dataIndex: 'completed', key: 'completed' },
		{ title: 'Doanh thu', dataIndex: 'revenue', key: 'revenue', render: (r) => (r ? r.toLocaleString('vi-VN') : 0) },
		{ title: 'Đánh giá', dataIndex: 'reviews', key: 'reviews' },
		{
			title: 'Điểm',
			dataIndex: 'avgRating',
			key: 'avgRating',
			render: (rating) => (
				<span>
					{Array(Math.round(rating))
						.fill(0)
						.map((_, i) => (
							<span key={i}>⭐</span>
						))}{' '}
					({rating}/5)
				</span>
			),
		},
	];

	const dayColumns = [
		{ title: 'Ngày', dataIndex: 'date', key: 'date' },
		{ title: 'Tổng lịch', dataIndex: 'count', key: 'count' },
		{ title: 'Doanh thu', dataIndex: 'revenue', key: 'revenue', render: (r) => (r ? r.toLocaleString('vi-VN') : 0) },
	];

	return (
		<div style={{ padding: '20px', position: 'relative', zIndex: 1 }}>
			<Card style={{ marginBottom: '20px' }}>
				<Row gutter={16}>
					<Col xs={24} sm={12}>
						<label>
							<strong>Từ ngày:</strong>
						</label>
						<DatePicker
							value={dateRange ? dateRange[0] : null}
							onChange={(date) => setDateRange(date ? [date, dateRange?.[1] || dayjs()] : null)}
							style={{ width: '100%', marginTop: '4px' }}
						/>
					</Col>
					<Col xs={24} sm={12}>
						<label>
							<strong>Đến ngày:</strong>
						</label>
						<DatePicker
							value={dateRange ? dateRange[1] : null}
							onChange={(date) => setDateRange(date ? [dateRange?.[0] || dayjs(), date] : null)}
							style={{ width: '100%', marginTop: '4px' }}
						/>
					</Col>
				</Row>
			</Card>

			<Row gutter={16} style={{ marginBottom: '20px' }}>
				<Col xs={24} sm={12} md={6}>
					<Card>
						<Statistic title='Tổng lịch' value={totalAppointments} />
					</Card>
				</Col>
				<Col xs={24} sm={12} md={6}>
					<Card>
						<Statistic title='Hoàn thành' value={completedAppointments} valueStyle={{ color: '#52c41a' }} />
					</Card>
				</Col>
				<Col xs={24} sm={12} md={6}>
					<Card>
						<Statistic title='Chờ xác nhận' value={pendingAppointments} valueStyle={{ color: '#faad14' }} />
					</Card>
				</Col>
				<Col xs={24} sm={12} md={6}>
					<Card>
						<Statistic title='Doanh thu' value={totalRevenue ? totalRevenue.toLocaleString('vi-VN') : 0} />
					</Card>
				</Col>
			</Row>

			<Row gutter={16} style={{ marginBottom: '20px' }}>
				<Col xs={24} sm={12} md={6}>
					<Card>
						<Statistic title='Đã xác nhận' value={confirmedAppointments} valueStyle={{ color: '#1890ff' }} />
					</Card>
				</Col>
				<Col xs={24} sm={12} md={6}>
					<Card>
						<Statistic title='Đã hủy' value={cancelledAppointments} valueStyle={{ color: '#f5222d' }} />
					</Card>
				</Col>
				<Col xs={24} sm={12} md={6}>
					<Card>
						<Statistic
							title='Tỷ lệ hoàn thành'
							value={totalAppointments > 0 ? ((completedAppointments / totalAppointments) * 100).toFixed(1) : 0}
							suffix='%'
						/>
					</Card>
				</Col>
			</Row>

			<Card title='Thống kê doanh thu theo dịch vụ' style={{ marginBottom: '20px' }}>
				<Table dataSource={appointmentsByService} columns={serviceColumns} rowKey='key' pagination={false} />
			</Card>

			<Card title='Thống kê theo nhân viên' style={{ marginBottom: '20px' }}>
				<Table dataSource={appointmentsByEmployee} columns={employeeColumns} rowKey='key' pagination={false} />
			</Card>

			<Card title='Thống kê theo ngày'>
				<Table dataSource={appointmentsByDayData} columns={dayColumns} rowKey='date' pagination={{ pageSize: 10 }} />
			</Card>
		</div>
	);
};

export default ThongKe;
