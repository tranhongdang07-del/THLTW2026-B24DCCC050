import {
	Card,
	Progress,
	Input,
	Drawer,
	Button,
	Form,
	Row,
	Col,
	Segmented,
	Popconfirm,
	Space,
	InputNumber,
	DatePicker,
	Select,
} from 'antd';
import { useState, useEffect } from 'react';
import { getData, setData } from './utils';
import { initData } from './mockData';
import dayjs from 'dayjs';

export default function Goals() {
	useEffect(() => {
		initData();
	}, []);

	const [data, setList] = useState(getData('goals'));
	const [open, setOpen] = useState(false);
	const [editing, setEditing] = useState(null);
	const [statusFilter, setStatusFilter] = useState('Đang thực hiện');
	const [form] = Form.useForm();

	const save = (v) => {
		let newData;
		if (editing) {
			newData = data.map((g) =>
				g.id === editing.id ? { ...editing, ...v, deadline: v.deadline.format('YYYY-MM-DD') } : g,
			);
		} else {
			newData = [...data, { ...v, id: Date.now(), current: 0, deadline: v.deadline.format('YYYY-MM-DD') }];
		}
		setList(newData);
		setData('goals', newData);
		setOpen(false);
		setEditing(null);
		form.resetFields();
	};

	const update = (id, val) => {
		const newData = data.map((g) => (g.id === id ? { ...g, current: val } : g));
		setList(newData);
		setData('goals', newData);
	};

	const filtered = statusFilter ? data.filter((g) => g.status === statusFilter) : data;

	const getStatusColor = (status) => {
		if (status === 'Đang thực hiện') return 'blue';
		if (status === 'Đã đạt') return 'green';
		return 'red';
	};

	return (
		<>
			<Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
				<Col span={24}>
					<Space>
						<span>Lọc theo trạng thái:</span>
						<Segmented
							value={statusFilter}
							onChange={setStatusFilter}
							options={[
								{ label: 'Tất cả', value: null },
								{ label: 'Đang thực hiện', value: 'Đang thực hiện' },
								{ label: 'Đã đạt', value: 'Đã đạt' },
								{ label: 'Đã hủy', value: 'Đã hủy' },
							]}
						/>
					</Space>
				</Col>
			</Row>

			<Row gutter={[16, 16]}>
				{filtered.map((g) => {
					const percent = Math.round((g.current / g.target) * 100);
					return (
						<Col span={24} key={g.id}>
							<Card
								title={
									<div>
										<strong>{g.name}</strong>
									</div>
								}
								extra={
									<Space>
										<Button size='small' type={getStatusColor(g.status)} ghost>
											{g.status}
										</Button>
										<Button
											size='small'
											onClick={() => {
												setEditing(g);
												form.setFieldsValue({ ...g, deadline: dayjs(g.deadline) });
												setOpen(true);
											}}
										>
											Sửa
										</Button>
										<Popconfirm
											title='Xóa mục tiêu?'
											onConfirm={() => {
												const newData = data.filter((i) => i.id !== g.id);
												setList(newData);
												setData('goals', newData);
											}}
										>
											<Button size='small' danger>
												Xóa
											</Button>
										</Popconfirm>
									</Space>
								}
							>
								<Row gutter={16} style={{ marginBottom: 12 }}>
									<Col span={12}>
										<div>
											<strong>Loại:</strong> {g.type}
										</div>
										<div>
											<strong>Deadline:</strong> {g.deadline}
										</div>
									</Col>
									<Col span={12} style={{ textAlign: 'right' }}>
										<div>
											<strong>Mục tiêu:</strong> {g.target}
										</div>
										<div>
											<strong>Hiện tại:</strong> {g.current}
										</div>
									</Col>
								</Row>
								<Progress percent={percent} />
								<Input
									placeholder='Nhập giá trị mới'
									type='number'
									min='0'
									value={g.current}
									onChange={(e) => update(g.id, +e.target.value)}
									style={{ marginTop: 12 }}
								/>
							</Card>
						</Col>
					);
				})}
			</Row>

			<Button
				type='primary'
				style={{ marginTop: 16 }}
				onClick={() => {
					setEditing(null);
					form.resetFields();
					setOpen(true);
				}}
			>
				+ Thêm mục tiêu
			</Button>

			<Drawer
				title={editing ? 'Sửa mục tiêu' : 'Thêm mục tiêu mới'}
				open={open}
				onClose={() => setOpen(false)}
				footer={
					<Space style={{ float: 'right' }}>
						<Button onClick={() => setOpen(false)}>Hủy</Button>
						<Button type='primary' onClick={() => form.submit()}>
							Lưu
						</Button>
					</Space>
				}
			>
				<Form form={form} onFinish={save} layout='vertical'>
					<Form.Item name='name' label='Tên mục tiêu' rules={[{ required: true, message: 'Nhập tên mục tiêu' }]}>
						<Input placeholder='Ví dụ: Giảm 5kg' />
					</Form.Item>
					<Form.Item name='type' label='Loại mục tiêu' rules={[{ required: true, message: 'Vui lòng chọn loại' }]}>
						<Select
							placeholder='Chọn loại mục tiêu'
							options={[
								{ value: 'Giảm cân', label: 'Giảm cân' },
								{ value: 'Tăng cơ', label: 'Tăng cơ' },
								{ value: 'Cải thiện sức bền', label: 'Cải thiện sức bền' },
								{ value: 'Khác', label: 'Khác' },
							]}
						/>
					</Form.Item>
					<Form.Item
						name='target'
						label='Giá trị mục tiêu'
						rules={[{ required: true, message: 'Nhập giá trị mục tiêu' }]}
					>
						<InputNumber min='0' placeholder='Ví dụ: 60' />
					</Form.Item>
					<Form.Item name='deadline' label='Hạn chế' rules={[{ required: true, message: 'Vui lòng chọn ngày' }]}>
						<DatePicker placeholder='Chọn deadline' style={{ width: '100%' }} />
					</Form.Item>
					<Form.Item name='status' label='Trạng thái' rules={[{ required: true, message: 'Vui lòng chọn trạng thái' }]}>
						<Select
							placeholder='Chọn trạng thái'
							options={[
								{ value: 'Đang thực hiện', label: 'Đang thực hiện' },
								{ value: 'Đã đạt', label: 'Đã đạt' },
								{ value: 'Đã hủy', label: 'Đã hủy' },
							]}
						/>
					</Form.Item>
				</Form>
			</Drawer>
		</>
	);
}
