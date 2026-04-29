import { Table, Button, Modal, Form, Input, Select, DatePicker, Popconfirm, Space, Tag, Row, Col } from 'antd';
import { useState, useEffect } from 'react';
import { getData, setData } from './utils';
import { initData } from './mockData';
import dayjs from 'dayjs';

export default function Workout() {
	useEffect(() => {
		initData();
	}, []);

	const [data, setList] = useState(getData('workouts'));
	const [filtered, setFiltered] = useState(data);
	const [open, setOpen] = useState(false);
	const [editing, setEditing] = useState(null);
	const [searchText, setSearchText] = useState('');
	const [selectedType, setSelectedType] = useState(null);
	const [dateRange, setDateRange] = useState([null, null]);
	const [form] = Form.useForm();

	const applyFilters = (workoutData = data, type = selectedType, search = searchText, dates = dateRange) => {
		let result = workoutData;
		if (search) {
			result = result.filter((i) => i.type.toLowerCase().includes(search.toLowerCase()));
		}
		if (type) {
			result = result.filter((i) => i.type === type);
		}
		if (dates[0] && dates[1]) {
			result = result.filter((i) => {
				const itemDate = dayjs(i.date);
				return itemDate.isAfter(dates[0]) && itemDate.isBefore(dates[1].add(1, 'day'));
			});
		}
		setFiltered(result);
	};

	const save = (v) => {
		let newData;
		if (editing) {
			newData = data.map((i) => (i.id === editing.id ? { ...editing, ...v, date: v.date.format('YYYY-MM-DD') } : i));
		} else {
			newData = [...data, { ...v, id: Date.now(), date: v.date.format('YYYY-MM-DD') }];
		}
		setList(newData);
		applyFilters(newData, selectedType, searchText, dateRange);
		setData('workouts', newData);
		setOpen(false);
		setEditing(null);
		form.resetFields();
	};

	const columns = [
		{ title: 'Ngày', dataIndex: 'date', width: 100 },
		{ title: 'Loại', dataIndex: 'type', width: 100 },
		{ title: 'Thời lượng (phút)', dataIndex: 'duration', width: 120 },
		{ title: 'Calo', dataIndex: 'calories', width: 80 },
		{ title: 'Ghi chú', dataIndex: 'note', width: 150 },
		{
			title: 'Trạng thái',
			width: 120,
			render: (_, r) => <Tag color={r.status === 'Hoàn thành' ? 'green' : 'red'}>{r.status}</Tag>,
		},
		{
			title: 'Hành động',
			width: 140,
			render: (_, r) => (
				<Space>
					<Button
						size='small'
						onClick={() => {
							setEditing(r);
							form.setFieldsValue({ ...r, date: dayjs(r.date) });
							setOpen(true);
						}}
					>
						Sửa
					</Button>
					<Popconfirm
						title='Xóa buổi tập?'
						onConfirm={() => {
							const newData = data.filter((i) => i.id !== r.id);
							setList(newData);
							applyFilters(newData, selectedType, searchText, dateRange);
							setData('workouts', newData);
						}}
					>
						<Button size='small' danger>
							Xóa
						</Button>
					</Popconfirm>
				</Space>
			),
		},
	];

	return (
		<>
			<Row gutter={16} style={{ marginBottom: 16 }}>
				<Col span={6}>
					<Input
						placeholder='Tìm loại tập...'
						value={searchText}
						onChange={(e) => {
							setSearchText(e.target.value);
							applyFilters(data, selectedType, e.target.value, dateRange);
						}}
					/>
				</Col>
				<Col span={6}>
					<Select
						placeholder='Lọc loại tập'
						allowClear
						value={selectedType}
						onChange={(val) => {
							setSelectedType(val);
							applyFilters(data, val, searchText, dateRange);
						}}
						options={[
							{ value: 'Cardio', label: 'Cardio' },
							{ value: 'Strength', label: 'Strength' },
							{ value: 'Yoga', label: 'Yoga' },
							{ value: 'HIIT', label: 'HIIT' },
							{ value: 'Other', label: 'Khác' },
						]}
					/>
				</Col>
				<Col span={8}>
					<DatePicker.RangePicker
						style={{ width: '100%' }}
						onChange={(dates) => {
							setDateRange(dates);
							applyFilters(data, selectedType, searchText, dates);
						}}
					/>
				</Col>
				<Col span={4}>
					<Button
						type='primary'
						block
						onClick={() => {
							setEditing(null);
							form.resetFields();
							setOpen(true);
						}}
					>
						+ Thêm
					</Button>
				</Col>
			</Row>

			<Table
				columns={columns}
				dataSource={filtered}
				rowKey='id'
				scroll={{ x: 1000 }}
				locale={{ emptyText: 'Chưa có dữ liệu' }}
			/>

			<Modal
				title={editing ? 'Sửa buổi tập' : 'Thêm buổi tập'}
				open={open}
				onCancel={() => setOpen(false)}
				onOk={() => form.submit()}
			>
				<Form form={form} onFinish={save} layout='vertical'>
					<Form.Item name='date' label='Ngày tập' rules={[{ required: true, message: 'Vui lòng chọn ngày' }]}>
						<DatePicker placeholder='Chọn ngày tập' style={{ width: '100%' }} />
					</Form.Item>
					<Form.Item name='type' label='Loại bài tập' rules={[{ required: true, message: 'Vui lòng chọn loại' }]}>
						<Select
							placeholder='Chọn loại bài tập'
							options={[
								{ value: 'Cardio', label: 'Cardio' },
								{ value: 'Strength', label: 'Strength' },
								{ value: 'Yoga', label: 'Yoga' },
								{ value: 'HIIT', label: 'HIIT' },
								{ value: 'Other', label: 'Khác' },
							]}
						/>
					</Form.Item>
					<Form.Item name='duration' label='Thời lượng (phút)' rules={[{ required: true, message: 'Nhập thời lượng' }]}>
						<Input type='number' min='0' placeholder='Ví dụ: 30' />
					</Form.Item>
					<Form.Item name='calories' label='Calo đốt' rules={[{ required: true, message: 'Nhập calo' }]}>
						<Input type='number' min='0' placeholder='Ví dụ: 250' />
					</Form.Item>
					<Form.Item name='note' label='Ghi chú'>
						<Input.TextArea rows={3} placeholder='Nhập ghi chú (không bắt buộc)' />
					</Form.Item>
					<Form.Item name='status' label='Trạng thái' rules={[{ required: true, message: 'Vui lòng chọn trạng thái' }]}>
						<Select
							placeholder='Chọn trạng thái'
							options={[
								{ value: 'Hoàn thành', label: 'Hoàn thành' },
								{ value: 'Bỏ lỡ', label: 'Bỏ lỡ' },
							]}
						/>
					</Form.Item>
				</Form>
			</Modal>
		</>
	);
}
