import React, { useState } from 'react';
import { Table, Button, Input, InputNumber, Space } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { employees, reviews } from './data';

const NhanVien = () => {
	const [data, setData] = useState([...employees]);
	const [showForm, setShowForm] = useState(false);
	const [name, setName] = useState('');
	const [specialties, setSpecialties] = useState('');
	const [workSchedule, setWorkSchedule] = useState('');
	const [maxCustomer, setMaxCustomer] = useState('');
	const [editKey, setEditKey] = useState(null);

	const handleAdd = () => {
		if (!name || !specialties || !workSchedule || !maxCustomer) {
			alert('Vui lòng nhập đầy đủ thông tin!');
			return;
		}

		if (editKey) {
			const updated = data.map((item) =>
				item.key === editKey
					? { key: editKey, name, specialties, workSchedule, maxCustomer: parseInt(maxCustomer) }
					: item,
			);
			setData(updated);
			alert('✅ Cập nhật thành công!');
		} else {
			setData([...data, { key: Date.now(), name, specialties, workSchedule, maxCustomer: parseInt(maxCustomer) }]);
			alert('✅ Thêm thành công!');
		}
		setName('');
		setSpecialties('');
		setWorkSchedule('');
		setMaxCustomer('');
		setShowForm(false);
		setEditKey(null);
	};

	const handleEdit = (record) => {
		setName(record.name);
		setSpecialties(record.specialties);
		setWorkSchedule(record.workSchedule);
		setMaxCustomer(record.maxCustomer);
		setEditKey(record.key);
		setShowForm(true);
	};

	const handleDelete = (key) => {
		if (window.confirm('Xóa nhân viên này?')) {
			setData(data.filter((item) => item.key !== key));
			alert('✅ Xóa thành công!');
		}
	};

	const getAvgRating = (empId) => {
		const empReviews = reviews.filter((r) => r.employeeId === empId);
		if (!empReviews.length) return 'Chưa có';
		const avg = (empReviews.reduce((sum, r) => sum + r.rating, 0) / empReviews.length).toFixed(1);
		return (
			<span>
				{Array(Math.round(avg))
					.fill(0)
					.map((_, i) => (
						<span key={`star-${record.key}-${i}`}>⭐</span>
					))}{' '}
				({avg}/5)
			</span>
		);
	};

	const columns = [
		{ title: 'Tên', dataIndex: 'name', key: 'name' },
		{ title: 'Chuyên môn', dataIndex: 'specialties', key: 'specialties' },
		{ title: 'Lịch làm', dataIndex: 'workSchedule', key: 'workSchedule' },
		{ title: 'Max khách/ngày', dataIndex: 'maxCustomer', key: 'maxCustomer' },
		{ title: 'Đánh giá', key: 'rating', render: (_, record) => getAvgRating(record.key) },
		{
			title: 'Thao tác',
			key: 'action',
			render: (_, record) => (
				<Space>
					<Button type='primary' size='small' onClick={() => handleEdit(record)}>
						Sửa
					</Button>
					<Button danger size='small' onClick={() => handleDelete(record.key)}>
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
					setName('');
					setSpecialties('');
					setWorkSchedule('');
					setMaxCustomer('');
					setEditKey(null);
				}}
				style={{ marginBottom: '16px' }}
			>
				{showForm ? '❌ Đóng' : '✏️ + Thêm nhân viên'}
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
					<h3>{editKey ? 'Cập nhật nhân viên' : 'Thêm nhân viên mới'}</h3>
					<div style={{ marginBottom: '12px' }}>
						<label>Tên:</label>
						<Input
							value={name}
							onChange={(e) => setName(e.target.value)}
							placeholder='VD: Nguyễn Thị A'
							style={{ marginTop: '4px' }}
						/>
					</div>
					<div style={{ marginBottom: '12px' }}>
						<label>Chuyên môn:</label>
						<Input
							value={specialties}
							onChange={(e) => setSpecialties(e.target.value)}
							placeholder='VD: Cắt tóc nam, nhuộm'
							style={{ marginTop: '4px' }}
						/>
					</div>
					<div style={{ marginBottom: '12px' }}>
						<label>Lịch làm:</label>
						<Input
							value={workSchedule}
							onChange={(e) => setWorkSchedule(e.target.value)}
							placeholder='VD: Thứ 2-6 (8h-17h)'
							style={{ marginTop: '4px' }}
						/>
					</div>
					<div style={{ marginBottom: '12px' }}>
						<label>Max khách/ngày:</label>
						<InputNumber
							value={maxCustomer}
							onChange={(val) => setMaxCustomer(val)}
							placeholder='VD: 5'
							style={{ width: '100%', marginTop: '4px' }}
							min={1}
						/>
					</div>
					<Space>
						<Button type='primary' onClick={handleAdd}>
							{editKey ? '💾 Cập nhật' : '➕ Thêm'}
						</Button>
						<Button
							onClick={() => {
								setShowForm(false);
								setName('');
								setSpecialties('');
								setWorkSchedule('');
								setMaxCustomer('');
								setEditKey(null);
							}}
						>
							Hủy
						</Button>
					</Space>
				</div>
			)}

			<Table dataSource={data} rowKey='key' columns={columns} pagination={{ pageSize: 10 }} />
		</div>
	);
};

export default NhanVien;
