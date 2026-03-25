import { ProTable, ModalForm, ProFormText } from '@ant-design/pro-components';
import { useState } from 'react';
import { books } from '../data';
import { message, Button } from 'antd';

export default () => {
	const [data, setData] = useState([]);

	return (
		<ProTable
			rowKey='year'
			columns={[
				{ title: 'Năm', dataIndex: 'year' },
				{ title: 'Số hiện tại', dataIndex: 'currentNumber' },
			]}
			dataSource={data}
			toolBarRender={() => [
				<ModalForm
					title='Thêm sổ văn bằng'
					trigger={<Button type='primary'>+ Thêm</Button>}
					onFinish={async (values) => {
						if (!values.year) {
							message.error('Phải nhập năm!');
							return false;
						}

						if (books.find((b) => b.year === values.year)) {
							message.error('Năm đã tồn tại!');
							return false;
						}

						const newBook = {
							year: values.year,
							currentNumber: 1,
						};

						books.push(newBook);
						setData([...books]);

						message.success('Thêm thành công!');
						return true;
					}}
				>
					<ProFormText name='year' label='Năm' placeholder='Nhập năm' rules={[{ required: true }]} />
				</ModalForm>,
			]}
		/>
	);
};
