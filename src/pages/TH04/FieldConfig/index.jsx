import { ProTable, ModalForm, ProFormText, ProFormSelect } from '@ant-design/pro-components';
import { useState } from 'react';
import { fields } from '../data';

export default () => {
	const [data, setData] = useState([...fields]);

	return (
		<ProTable
			rowKey='name'
			columns={[
				{ title: 'Tên', dataIndex: 'name' },
				{ title: 'Kiểu', dataIndex: 'type' },
			]}
			dataSource={data}
			toolBarRender={() => [
				<ModalForm
					title='Thêm field'
					trigger={<button>+ Thêm</button>}
					onFinish={async (values) => {
						fields.push(values);
						setData([...fields]);
						return true;
					}}
				>
					<ProFormText name='name' label='Tên' required />
					<ProFormSelect
						name='type'
						label='Kiểu'
						options={[
							{ label: 'String', value: 'string' },
							{ label: 'Number', value: 'number' },
							{ label: 'Date', value: 'date' },
						]}
					/>
				</ModalForm>,
			]}
		/>
	);
};
