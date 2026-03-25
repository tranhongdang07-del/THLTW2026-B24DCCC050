import { Form, Input, Button, message } from 'antd';
import { certificates, decisions } from '../data';

export default () => {
	const [form] = Form.useForm();

	const onSearch = () => {
		const values = form.getFieldsValue();
		const filled = Object.values(values).filter((v) => v);

		if (filled.length < 2) {
			message.error('Nhập ít nhất 2 điều kiện!');
			return;
		}

		const result = certificates.filter(
			(c) => (!values.soHieu || c.soHieu === values.soHieu) && (!values.msv || c.msv === values.msv),
		);

		result.forEach((r) => {
			const d = decisions.find((d) => d.soQD === r.decisionId);
			if (d) d.searchCount++;
		});

		console.log(result);
	};

	return (
		<Form form={form}>
			<Form.Item name='soHieu'>
				<Input placeholder='Số hiệu' />
			</Form.Item>

			<Form.Item name='msv'>
				<Input placeholder='MSV' />
			</Form.Item>

			<Button type='primary' onClick={onSearch}>
				Tra cứu
			</Button>
		</Form>
	);
};
