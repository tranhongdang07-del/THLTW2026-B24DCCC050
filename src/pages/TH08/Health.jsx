import { Table, Tag, Button, Modal, Form, Input, InputNumber, Popconfirm, Space, DatePicker } from 'antd';
import { useState, useEffect } from 'react';
import { getData, setData, calcBMI, bmiTag } from './utils';
import { initData } from './mockData';

export default function Health() {
	useEffect(() => {
		initData();
	}, []);

	const [data, setList] = useState(getData('health'));
	const [open, setOpen] = useState(false);
	const [editing, setEditing] = useState(null);
	const [form] = Form.useForm();

	const save = (v) => {
		let newData;
		if (editing) {
			newData = data.map((i) => (i.id === editing.id ? { ...editing, ...v } : i));
		} else {
			newData = [...data, { ...v, id: Date.now() }];
		}
		setList(newData);
		setData('health', newData);
		setOpen(false);
		setEditing(null);
		form.resetFields();
	};

	const columns = [
		{ title: 'Ngày', dataIndex: 'date', width: 120 },
		{ title: 'Cân nặng (kg)', dataIndex: 'weight', width: 120 },
		{ title: 'Chiều cao (cm)', dataIndex: 'height', width: 120 },
		{
			title: 'BMI',
			width: 150,
			render: (_, r) => {
				const bmi = calcBMI(r.weight, r.height);
				const t = bmiTag(bmi);
				return (
					<Tag color={t.color}>
						{bmi.toFixed(1)} - {t.text}
					</Tag>
				);
			},
		},
		{ title: 'Nhịp tim (bpm)', dataIndex: 'heartRate', width: 130 },
		{ title: 'Giờ ngủ', dataIndex: 'sleep', width: 100 },
		{
			title: 'Hành động',
			width: 140,
			render: (_, r) => (
				<Space>
					<Button
						size='small'
						onClick={() => {
							setEditing(r);
							form.setFieldsValue(r);
							setOpen(true);
						}}
					>
						Sửa
					</Button>
					<Popconfirm
						title='Xóa chỉ số này?'
						onConfirm={() => {
							const newData = data.filter((i) => i.id !== r.id);
							setList(newData);
							setData('health', newData);
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
			<Button
				type='primary'
				style={{ marginBottom: 16 }}
				onClick={() => {
					setEditing(null);
					form.resetFields();
					setOpen(true);
				}}
			>
				+ Thêm chỉ số
			</Button>

			<Table
				dataSource={data}
				rowKey='id'
				scroll={{ x: 1000 }}
				locale={{ emptyText: 'Chưa có dữ liệu' }}
				columns={columns}
			/>

			<Modal
				title={editing ? 'Sửa chỉ số' : 'Thêm chỉ số sức khỏe'}
				open={open}
				onCancel={() => setOpen(false)}
				onOk={() => form.submit()}
			>
				<Form form={form} onFinish={save} layout='vertical'>
					<Form.Item name='date' label='Ngày' rules={[{ required: true, message: 'Vui lòng chọn ngày' }]}>
						<Input type='date' placeholder='Chọn ngày' />
					</Form.Item>
					<Form.Item name='weight' label='Cân nặng (kg)' rules={[{ required: true, message: 'Nhập cân nặng' }]}>
						<InputNumber min={0} step={0.1} placeholder='Ví dụ: 65.5' />
					</Form.Item>
					<Form.Item name='height' label='Chiều cao (cm)' rules={[{ required: true, message: 'Nhập chiều cao' }]}>
						<InputNumber min={0} placeholder='Ví dụ: 170' />
					</Form.Item>
					<Form.Item
						name='heartRate'
						label='Nhịp tim lúc nghỉ (bpm)'
						rules={[{ required: true, message: 'Nhập nhịp tim' }]}
					>
						<InputNumber min={0} placeholder='Ví dụ: 70' />
					</Form.Item>
					<Form.Item name='sleep' label='Giờ ngủ' rules={[{ required: true, message: 'Nhập giờ ngủ' }]}>
						<InputNumber min={0} max={24} step={0.5} placeholder='Ví dụ: 7.5' />
					</Form.Item>
				</Form>
			</Modal>
		</>
	);
}
