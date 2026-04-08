import React, { useState } from 'react';
import { Table, Button, Input, Rate, Space, Tag } from 'antd';
import { reviews } from './data';

const DanhGia = () => {
	const [data, setData] = useState([...reviews]);
	const [showForm, setShowForm] = useState(false);
	const [customerName, setCustomerName] = useState('');
	const [employeeName, setEmployeeName] = useState('');
	const [employeeId, setEmployeeId] = useState('');
	const [rating, setRating] = useState(5);
	const [comment, setComment] = useState('');
	const [editKey, setEditKey] = useState(null);
	const [replyingKey, setReplyingKey] = useState(null);
	const [replyText, setReplyText] = useState('');

	const handleAdd = () => {
		if (!customerName || !employeeName || !rating || !comment) {
			alert('Vui lòng nhập đầy đủ thông tin!');
			return;
		}

		if (editKey) {
			const updated = data.map((item) =>
				item.key === editKey
					? {
							key: editKey,
							customerName,
							employeeName,
							employeeId,
							rating,
							comment,
							createdAt: item.createdAt,
							reply: item.reply,
							replyDate: item.replyDate,
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
					employeeName,
					employeeId,
					rating,
					comment,
					createdAt: new Date(),
					reply: '',
					replyDate: null,
				},
			]);
			alert('✅ Thêm thành công!');
		}
		setCustomerName('');
		setEmployeeName('');
		setEmployeeId('');
		setRating(5);
		setComment('');
		setShowForm(false);
		setEditKey(null);
	};

	const handleEdit = (record) => {
		setCustomerName(record.customerName);
		setEmployeeName(record.employeeName);
		setEmployeeId(record.employeeId);
		setRating(record.rating);
		setComment(record.comment);
		setEditKey(record.key);
		setShowForm(true);
	};

	const handleDelete = (key) => {
		if (window.confirm('Xóa đánh giá này?')) {
			setData(data.filter((item) => item.key !== key));
			alert('✅ Xóa thành công!');
		}
	};

	const handleReply = (key) => {
		if (!replyText) {
			alert('Vui lòng nhập phản hồi!');
			return;
		}
		setData(data.map((item) => (item.key === key ? { ...item, reply: replyText, replyDate: new Date() } : item)));
		alert('✅ Phản hồi thành công!');
		setReplyingKey(null);
		setReplyText('');
	};

	const columns = [
		{ title: 'Nhân viên', dataIndex: 'employeeName', key: 'employeeName' },
		{ title: 'Khách hàng', dataIndex: 'customerName', key: 'customerName' },
		{
			title: 'Đánh giá',
			dataIndex: 'rating',
			key: 'rating',
			render: (r) => (
				<span>
					{Array(r)
						.fill(0)
						.map((_, i) => (
							<span key={`star-${record.key}-${i}`}>⭐</span>
						))}{' '}
					({r}/5)
				</span>
			),
		},
		{ title: 'Bình luận', dataIndex: 'comment', key: 'comment', width: 150, ellipsis: true },
		{
			title: 'Phản hồi',
			key: 'reply',
			render: (_, record) => (record.reply ? <Tag color='green'>✅ Có</Tag> : <Tag color='orange'>❌ Chưa</Tag>),
		},
		{
			title: 'Thao tác',
			key: 'action',
			render: (_, record) => (
				<Space size='small'>
					<Button size='small' onClick={() => setReplyingKey(record.key)}>
						Phản hồi
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
					setEmployeeName('');
					setEmployeeId('');
					setRating(5);
					setComment('');
					setEditKey(null);
				}}
				style={{ marginBottom: '16px' }}
			>
				{showForm ? '❌ Đóng' : '✏️ + Thêm đánh giá'}
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
					<h3>{editKey ? 'Cập nhật đánh giá' : 'Thêm đánh giá mới'}</h3>
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
						<label>Tên nhân viên:</label>
						<Input
							value={employeeName}
							onChange={(e) => setEmployeeName(e.target.value)}
							placeholder='VD: Nguyễn Thị A'
							style={{ marginTop: '4px' }}
						/>
					</div>
					<div style={{ marginBottom: '12px' }}>
						<label>Đánh giá:</label>
						<div style={{ marginTop: '4px' }}>
							<Rate value={rating} onChange={(val) => setRating(val)} />
						</div>
					</div>
					<div style={{ marginBottom: '12px' }}>
						<label>Bình luận:</label>
						<Input.TextArea
							value={comment}
							onChange={(e) => setComment(e.target.value)}
							rows={3}
							placeholder='Nhập ý kiến...'
							style={{ marginTop: '4px' }}
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
								setEmployeeName('');
								setEmployeeId('');
								setRating(5);
								setComment('');
								setEditKey(null);
							}}
						>
							Hủy
						</Button>
					</Space>
				</div>
			)}

			{replyingKey && (
				<div
					style={{
						padding: '16px',
						border: '1px solid #ffbe6b',
						borderRadius: '4px',
						marginBottom: '16px',
						maxWidth: '500px',
						backgroundColor: '#fffbe6',
					}}
				>
					<h4>Phản hồi đánh giá</h4>
					<Input.TextArea
						value={replyText}
						onChange={(e) => setReplyText(e.target.value)}
						rows={3}
						placeholder='Nhập phản hồi...'
						style={{ marginBottom: '12px' }}
					/>
					<Space>
						<Button type='primary' onClick={() => handleReply(replyingKey)}>
							✅ Gửi
						</Button>
						<Button
							onClick={() => {
								setReplyingKey(null);
								setReplyText('');
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

export default DanhGia;
