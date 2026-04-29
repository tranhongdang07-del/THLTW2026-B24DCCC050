import { Card, Row, Col, Tag, Modal, Input, Button, Form, Select, Space, Popconfirm } from 'antd';
import { useState, useEffect } from 'react';
import { getData, setData } from './utils';
import { initData } from './mockData';

export default function Exercises() {
	useEffect(() => {
		initData();
	}, []);

	const [data, setList] = useState(getData('exercises'));
	const [filtered, setFiltered] = useState(data);
	const [item, setItem] = useState(null);
	const [open, setOpen] = useState(false);
	const [editing, setEditing] = useState(null);
	const [form] = Form.useForm();
	const [searchText, setSearchText] = useState('');
	const [selectedMuscle, setSelectedMuscle] = useState(null);
	const [selectedLevel, setSelectedLevel] = useState(null);

	const applyFilters = (exercises = data, search = searchText, muscle = selectedMuscle, level = selectedLevel) => {
		let result = exercises;
		if (search) {
			result = result.filter((i) => i.name.toLowerCase().includes(search.toLowerCase()));
		}
		if (muscle) {
			result = result.filter((i) => i.muscle === muscle);
		}
		if (level) {
			result = result.filter((i) => i.level === level);
		}
		setFiltered(result);
	};

	const save = (v) => {
		let newData;
		if (editing) {
			newData = data.map((i) => (i.id === editing.id ? { ...editing, ...v } : i));
		} else {
			newData = [...data, { ...v, id: Date.now() }];
		}
		setList(newData);
		applyFilters(newData, searchText, selectedMuscle, selectedLevel);
		setData('exercises', newData);
		setOpen(false);
		setEditing(null);
		form.resetFields();
	};

	const muscles = ['Chest', 'Back', 'Legs', 'Shoulders', 'Arms', 'Core', 'Full Body'];
	const levels = ['Dễ', 'Trung bình', 'Khó'];

	return (
		<>
			<Row gutter={16} style={{ marginBottom: 16 }}>
				<Col span={6}>
					<Input
						placeholder='Tìm bài tập'
						value={searchText}
						onChange={(e) => {
							setSearchText(e.target.value);
							applyFilters(data, e.target.value, selectedMuscle, selectedLevel);
						}}
					/>
				</Col>
				<Col span={6}>
					<Select
						placeholder='Lọc nhóm cơ'
						allowClear
						value={selectedMuscle}
						onChange={(val) => {
							setSelectedMuscle(val);
							applyFilters(data, searchText, val, selectedLevel);
						}}
						options={muscles.map((m) => ({ value: m, label: m }))}
					/>
				</Col>
				<Col span={6}>
					<Select
						placeholder='Lọc mức độ khó'
						allowClear
						value={selectedLevel}
						onChange={(val) => {
							setSelectedLevel(val);
							applyFilters(data, searchText, selectedMuscle, val);
						}}
						options={levels.map((l) => ({ value: l, label: l }))}
					/>
				</Col>
				<Col span={6}>
					<Button
						type='primary'
						block
						onClick={() => {
							setEditing(null);
							form.resetFields();
							setOpen(true);
						}}
					>
						+ Thêm bài tập
					</Button>
				</Col>
			</Row>

			<Row gutter={16}>
				{filtered.map((e) => (
					<Col span={8} key={e.id}>
						<Card
							onClick={() => setItem(e)}
							hoverable
							title={<strong>{e.name}</strong>}
							extra={
								<Space>
									<Button
										size='small'
										onClick={(evt) => {
											evt.stopPropagation();
											setEditing(e);
											form.setFieldsValue(e);
											setOpen(true);
										}}
									>
										Sửa
									</Button>
									<Popconfirm
										title='Xóa bài tập?'
										onConfirm={(evt) => {
											evt?.stopPropagation?.();
											const newData = data.filter((i) => i.id !== e.id);
											setList(newData);
											applyFilters(newData, searchText, selectedMuscle, selectedLevel);
											setData('exercises', newData);
											setItem(null);
										}}
									>
										<Button size='small' danger onClick={(evt) => evt.stopPropagation()}>
											Xóa
										</Button>
									</Popconfirm>
								</Space>
							}
						>
							<div style={{ marginBottom: 8 }}>
								<Tag color='blue'>{e.muscle}</Tag>
								<Tag color={e.level === 'Dễ' ? 'green' : e.level === 'Trung bình' ? 'orange' : 'red'}>{e.level}</Tag>
							</div>
							<p>
								<strong>Calo/giờ:</strong> {e.calories}
							</p>
							<p>{e.description.substring(0, 50)}...</p>
						</Card>
					</Col>
				))}
			</Row>

			<Modal title='Chi tiết bài tập' open={!!item} onCancel={() => setItem(null)} footer={null}>
				{item && (
					<>
						<h3>{item.name}</h3>
						<p>
							<strong>Nhóm cơ:</strong> {item.muscle}
						</p>
						<p>
							<strong>Mức độ:</strong> <Tag>{item.level}</Tag>
						</p>
						<p>
							<strong>Calo đốt/giờ:</strong> {item.calories}
						</p>
						<h4>Hướng dẫn thực hiện:</h4>
						<p>{item.description}</p>
					</>
				)}
			</Modal>

			<Modal
				title={editing ? 'Sửa bài tập' : 'Thêm bài tập'}
				open={open}
				onCancel={() => setOpen(false)}
				onOk={() => form.submit()}
			>
				<Form form={form} onFinish={save} layout='vertical'>
					<Form.Item name='name' label='Tên bài tập' rules={[{ required: true, message: 'Nhập tên bài tập' }]}>
						<Input placeholder='Ví dụ: Push-up' />
					</Form.Item>
					<Form.Item name='muscle' label='Nhóm cơ tác động' rules={[{ required: true, message: 'Chọn nhóm cơ' }]}>
						<Select placeholder='Chọn nhóm cơ' options={muscles.map((m) => ({ value: m, label: m }))} />
					</Form.Item>
					<Form.Item name='level' label='Mức độ khó' rules={[{ required: true, message: 'Chọn mức độ' }]}>
						<Select placeholder='Chọn mức độ khó' options={levels.map((l) => ({ value: l, label: l }))} />
					</Form.Item>
					<Form.Item name='calories' label='Calo đốt/giờ' rules={[{ required: true, message: 'Nhập calo' }]}>
						<Input type='number' min='0' placeholder='Ví dụ: 5' />
					</Form.Item>
					<Form.Item
						name='description'
						label='Hướng dẫn thực hiện'
						rules={[{ required: true, message: 'Nhập hướng dẫn' }]}
					>
						<Input.TextArea rows={4} placeholder='Mô tả chi tiết cách thực hiện bài tập' />
					</Form.Item>
				</Form>
			</Modal>
		</>
	);
}
