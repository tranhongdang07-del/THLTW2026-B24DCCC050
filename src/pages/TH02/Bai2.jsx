import { Card, Form, Input, Select, Button, Table, Typography, message } from 'antd';
import { useState, useEffect } from 'react';

const { Title } = Typography;

export default function Bai2() {
	const [form] = Form.useForm();
	const [questions, setQuestions] = useState([]);

	useEffect(() => {
		const data = localStorage.getItem('questions');
		if (data) setQuestions(JSON.parse(data));
	}, []);

	const saveData = (data) => {
		setQuestions(data);
		localStorage.setItem('questions', JSON.stringify(data));
	};

	const onFinish = (values) => {
		const newData = [
			...questions,
			{
				key: Date.now(),
				...values,
			},
		];

		saveData(newData);
		form.resetFields();
		message.success('Thêm câu hỏi thành công');
	};

	const deleteQuestion = (key) => {
		const newData = questions.filter((q) => q.key !== key);
		saveData(newData);
	};

	const columns = [
		{ title: 'Mã', dataIndex: 'key' },
		{ title: 'Môn học', dataIndex: 'subject' },
		{ title: 'Khối kiến thức', dataIndex: 'category' },
		{ title: 'Nội dung', dataIndex: 'content' },
		{ title: 'Mức độ', dataIndex: 'level' },
		{
			title: 'Hành động',
			render: (_, record) => (
				<Button danger onClick={() => deleteQuestion(record.key)}>
					Xóa
				</Button>
			),
		},
	];

	return (
		<Card>
			<Title level={3}>📚 Quản lý ngân hàng câu hỏi</Title>

			<Form form={form} layout='vertical' onFinish={onFinish}>
				<Form.Item name='subject' label='Môn học' rules={[{ required: true }]}>
					<Input placeholder='Ví dụ: Lập trình Web' />
				</Form.Item>

				<Form.Item name='category' label='Khối kiến thức' rules={[{ required: true }]}>
					<Select
						options={[
							{ value: 'Tổng quan', label: 'Tổng quan' },
							{ value: 'Chuyên sâu', label: 'Chuyên sâu' },
						]}
					/>
				</Form.Item>

				<Form.Item name='content' label='Nội dung câu hỏi' rules={[{ required: true }]}>
					<Input.TextArea />
				</Form.Item>

				<Form.Item name='level' label='Mức độ khó' rules={[{ required: true }]}>
					<Select
						options={[
							{ value: 'Dễ', label: 'Dễ' },
							{ value: 'Trung bình', label: 'Trung bình' },
							{ value: 'Khó', label: 'Khó' },
							{ value: 'Rất khó', label: 'Rất khó' },
						]}
					/>
				</Form.Item>

				<Button type='primary' htmlType='submit'>
					Thêm câu hỏi
				</Button>
			</Form>

			<Table style={{ marginTop: 30 }} columns={columns} dataSource={questions} />
		</Card>
	);
}
