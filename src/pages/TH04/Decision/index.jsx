import { ProTable, ModalForm, ProFormText, ProFormDatePicker, ProFormSelect } from '@ant-design/pro-components';
import { useState } from 'react';
import { decisions, books } from '../data';
import { Button, message } from 'antd';

export default () => {
	const [data, setData] = useState([]);

	return (
		<ProTable
			rowKey='soQD'
			columns={[
				{ title: 'Số QĐ', dataIndex: 'soQD' },
				{ title: 'Trích yếu', dataIndex: 'trichYeu' },
				{ title: 'Sổ', dataIndex: 'bookYear' },
				{ title: 'Lượt tra cứu', dataIndex: 'searchCount' },
			]}
			dataSource={data}
			toolBarRender={() => [
				<ModalForm
					title='Thêm quyết định'
					trigger={<Button type='primary'>+ Thêm</Button>}
					onFinish={async (values) => {
						if (!values.soQD || !values.bookYear) {
							message.error('Thiếu dữ liệu!');
							return false;
						}

						const newItem = {
							...values,
							searchCount: 0,
						};

						decisions.push(newItem);
						setData([...decisions]);

						message.success('Thêm thành công!');
						return true;
					}}
				>
					<ProFormText name='soQD' label='Số quyết định' rules={[{ required: true }]} />

					<ProFormDatePicker name='ngayBanHanh' label='Ngày ban hành' />

					<ProFormText name='trichYeu' label='Trích yếu' />

					<ProFormSelect
						name='bookYear'
						label='Thuộc sổ'
						placeholder='Chọn sổ'
						options={books.map((b) => ({
							label: b.year,
							value: b.year,
						}))}
						rules={[{ required: true }]}
					/>
				</ModalForm>,
			]}
		/>
	);
};
