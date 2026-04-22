import React, { useState } from 'react';
import { Table, Button, Input, InputNumber, Space } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { services } from './data';

const DichVu = () => {
	const [data, setData] = useState([...services]);
	const [showForm, setShowForm] = useState(false);
	const [name, setName] = useState('');
	const [price, setPrice] = useState('');
	const [duration, setDuration] = useState('');
	const [editKey, setEditKey] = useState(null);

	const handleAdd = () => {
		if (!name || !price || !duration) {
			alert('Vui lòng nhập đầy đủ thông tin!');
			return;
		}

		if (editKey) {
			const updated = data.map((item) =>
				item.key === editKey ? { key: editKey, name, price: parseInt(price), duration: parseInt(duration) } : item,
			);
			setData(updated);
			alert('✅ Cập nhật thành công!');
		} else {
			setData([...data, { key: Date.now(), name, price: parseInt(price), duration: parseInt(duration) }]);
			alert('✅ Thêm thành công!');
		}

		setName('');
		setPrice('');
		setDuration('');
		setShowForm(false);
		setEditKey(null);
	};

	const handleEdit = (record) => {
		setName(record.name);
		setPrice(record.price);
		setDuration(record.duration);
		setEditKey(record.key);
		setShowForm(true);
	};

	const handleDelete = (key) => {
		if (window.confirm('Xóa dịch vụ này?')) {
			setData(data.filter((item) => item.key !== key));
			alert('✅ Xóa thành công!');
		}
	};

	const columns = [
		{ title: 'Tên', dataIndex: 'name', key: 'name' },
		{ title: 'Giá (VND)', dataIndex: 'price', key: 'price', render: (p) => (p ? p.toLocaleString('vi-VN') : '-') },
		{ title: 'Thời gian (phút)', dataIndex: 'duration', key: 'duration' },
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
					setPrice('');
					setDuration('');
					setEditKey(null);
				}}
				style={{ marginBottom: '16px' }}
			>
				{showForm ? '❌ Đóng' : '✏️ + Thêm dịch vụ'}
			</Button>

			{showForm && (
				<div
					style={{
						padding: '16px',
						border: '1px solid #d9d9d9',
						borderRadius: '4px',
						marginBottom: '16px',
						maxWidth: '400px',
					}}
				>
					<h3>{editKey ? 'Cập nhật dịch vụ' : 'Thêm dịch vụ mới'}</h3>
					<div style={{ marginBottom: '12px' }}>
						<label>Tên dịch vụ:</label>
						<Input
							value={name}
							onChange={(e) => setName(e.target.value)}
							placeholder='VD: Cắt tóc'
							style={{ marginTop: '4px' }}
						/>
					</div>
					<div style={{ marginBottom: '12px' }}>
						<label>Giá (VND):</label>
						<InputNumber
							value={price}
							onChange={(val) => setPrice(val)}
							placeholder='VD: 150000'
							style={{ width: '100%', marginTop: '4px' }}
							min={0}
						/>
					</div>
					<div style={{ marginBottom: '12px' }}>
						<label>Thời gian (phút):</label>
						<InputNumber
							value={duration}
							onChange={(val) => setDuration(val)}
							placeholder='VD: 30'
							style={{ width: '100%', marginTop: '4px' }}
							min={0}
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
								setPrice('');
								setDuration('');
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

export default DichVu;
