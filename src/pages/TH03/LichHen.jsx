import React, { useState } from 'react';
import { Table, Button, Input, Select, DatePicker, Tag, Space } from 'antd';
import dayjs from 'dayjs';
import { employees, services, appointments } from './data';

const LichHen = () => {
	const [data, setData] = useState([...appointments]);
	const [showForm, setShowForm] = useState(false);
	const [customerName, setCustomerName] = useState('');
	const [employeeId, setEmployeeId] = useState(null);
	const [serviceId, setServiceId] = useState(null);
	const [date, setDate] = useState(null);
	const [editKey, setEditKey] = useState(null);

	const isDuplicate = (empId, apptDate, excludeKey = null) => {
		return data.some(
			(item) =>
				item.key !== excludeKey &&
				item.employeeId === empId &&
				dayjs(item.date).format('YYYY-MM-DD HH:mm') === dayjs(apptDate).format('YYYY-MM-DD HH:mm'),
		);
	};

	const handleAdd = () => {
		if (!customerName || !employeeId || !serviceId || !date) {
			alert('Vui lòng nhập đầy đủ thông tin!');
			return;
		}

		if (isDuplicate(employeeId, date, editKey)) {
			alert('❌ Trùng lịch!');
			return;
		}

		const emp = employees.find((e) => e.key === employeeId);
		const ser = services.find((s) => s.key === serviceId);

		if (!emp || !ser) {
			alert('❌ Nhân viên hoặc dịch vụ không tồn tại');
			return;
		}

		if (editKey) {
			const updated = data.map((item) =>
				item.key === editKey
					? {
							key: editKey,
							customerName,
							employeeId,
							employeeName: emp.name,
							serviceId,
							serviceName: ser.name,
							date,
							status: data.find((d) => d.key === editKey)?.status,
					  }
					: item,
			);
			setData(updated);
			alert('✅ Cập nhật thành công!');
		} else {
			setData([
				...data,
				{
					key: Date.now(),
					customerName,
					employeeId,
					employeeName: emp.name,
					serviceId,
					serviceName: ser.name,
					date,
					status: 'pending',
				},
			]);
			alert('✅ Thêm thành công!');
		}
		setCustomerName('');
		setEmployeeId(null);
		setServiceId(null);
		setDate(null);
		setShowForm(false);
		setEditKey(null);
	};

	const handleEdit = (record) => {
		setCustomerName(record.customerName);
		setEmployeeId(record.employeeId);
		setServiceId(record.serviceId);
		setDate(dayjs(record.date));
		setEditKey(record.key);
		setShowForm(true);
	};

	const handleDelete = (key) => {
		if (window.confirm('Xóa lịch hẹn này?')) {
			setData(data.filter((item) => item.key !== key));
			alert('✅ Xóa thành công!');
		}
	};

	const updateStatus = (key, status) => {
		setData(data.map((item) => (item.key === key ? { ...item, status } : item)));
		alert('✅ Cập nhật trạng thái!');
	};

	const columns = [
		{ title: 'Khách', dataIndex: 'customerName', key: 'customerName' },
		{ title: 'Nhân viên', dataIndex: 'employeeName', key: 'employeeName' },
		{ title: 'Dịch vụ', dataIndex: 'serviceName', key: 'serviceName' },
		{ title: 'Thời gian', dataIndex: 'date', key: 'date', render: (d) => dayjs(d).format('DD/MM HH:mm') },
		{
			title: 'Trạng thái',
			dataIndex: 'status',
			key: 'status',
			render: (s) => (
				<Tag color={s === 'done' ? 'green' : s === 'confirmed' ? 'blue' : s === 'pending' ? 'orange' : 'red'}>{s}</Tag>
			),
		},
		{
			title: 'Thao tác',
			key: 'action',
			render: (_, record) => (
				<Space size='small'>
					<Button size='small' onClick={() => updateStatus(record.key, 'confirmed')}>
						Xác nhận
					</Button>
					<Button size='small' type='primary' onClick={() => updateStatus(record.key, 'done')}>
						Hoàn thành
					</Button>
					<Button size='small' onClick={() => handleEdit(record)}>
						Sửa
					</Button>
					<Button size='small' danger onClick={() => handleDelete(record.key)}>
						Xóa
					</Button>
				</Space>
			),
		},
	];

	return (
		<div style={{ padding: '20px' }}>
			<Button
				type='primary'
				onClick={() => {
					setShowForm(!showForm);
					setCustomerName('');
					setEmployeeId(null);
					setServiceId(null);
					setDate(null);
					setEditKey(null);
				}}
				style={{ marginBottom: '16px' }}
			>
				{showForm ? '❌ Đóng' : '✏️ + Đặt lịch'}
			</Button>

			{showForm && (
				<div
					style={{
						padding: '16px',
						border: '1px solid #d9d9d9',
						borderRadius: '4px',
						marginBottom: '16px',
						maxWidth: '500px',
					}}
				>
					<h3>{editKey ? 'Cập nhật lịch hẹn' : 'Thêm lịch hẹn mới'}</h3>
					<div style={{ marginBottom: '12px' }}>
						<label>Tên khách:</label>
						<Input
							value={customerName}
							onChange={(e) => setCustomerName(e.target.value)}
							placeholder='VD: Nguyễn Văn A'
							style={{ marginTop: '4px' }}
						/>
					</div>
					<div style={{ marginBottom: '12px' }}>
						<label>Nhân viên:</label>
						<Select
							value={employeeId}
							onChange={(val) => setEmployeeId(val)}
							placeholder='Chọn nhân viên'
							style={{ marginTop: '4px' }}
						>
							{employees.map((e) => (
								<Select.Option key={e.key} value={e.key}>
									{e.name}
								</Select.Option>
							))}
						</Select>
					</div>
					<div style={{ marginBottom: '12px' }}>
						<label>Dịch vụ:</label>
						<Select
							value={serviceId}
							onChange={(val) => setServiceId(val)}
							placeholder='Chọn dịch vụ'
							style={{ marginTop: '4px' }}
						>
							{services.map((s) => (
								<Select.Option key={s.key} value={s.key}>
									{s.name}
								</Select.Option>
							))}
						</Select>
					</div>
					<div style={{ marginBottom: '12px' }}>
						<label>Ngày giờ:</label>
						<DatePicker
							value={date}
							onChange={(val) => setDate(val)}
							showTime
							style={{ width: '100%', marginTop: '4px' }}
						/>
					</div>
					<Space>
						<Button type='primary' onClick={handleAdd}>
							{editKey ? '💾 Cập nhật' : '➕ Thêm'}
						</Button>
						<Button
							onClick={() => {
								setShowForm(false);
								setCustomerName('');
								setEmployeeId(null);
								setServiceId(null);
								setDate(null);
								setEditKey(null);
							}}
						>
							Hủy
						</Button>
					</Space>
				</div>
			)}

			<Table dataSource={data} columns={columns} rowKey='key' pagination={{ pageSize: 10 }} />
		</div>
	);
};

export default LichHen;
