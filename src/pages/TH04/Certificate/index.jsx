import {
	ProTable,
	ModalForm,
	ProFormText,
	ProFormDatePicker,
	ProFormDigit,
	ProFormSelect,
} from '@ant-design/pro-components';
import { useState } from 'react';
import { certificates, books, fields, decisions } from '../data';

export default () => {
	const [data, setData] = useState([...certificates]);

	const createCertificate = (values) => {
		const book = books.find((b) => b.year === values.bookYear);
		if (!book) return null;

		const soVaoSo = book.currentNumber;
		book.currentNumber++;

		return {
			...values,
			soVaoSo,
		};
	};

	return (
		<ProTable
			rowKey='soVaoSo'
			columns={[
				{ title: 'Số vào sổ', dataIndex: 'soVaoSo' },
				{ title: 'Số hiệu', dataIndex: 'soHieu' },
				{ title: 'Họ tên', dataIndex: 'hoTen' },
			]}
			dataSource={data}
			toolBarRender={() => [
				<ModalForm
					title='Thêm văn bằng'
					trigger={<button>+ Thêm</button>}
					onFinish={async (values) => {
						const newItem = createCertificate(values);
						if (!newItem) return false;

						certificates.push(newItem);
						setData([...certificates]);
						return true;
					}}
				>
					<ProFormText name='soHieu' label='Số hiệu' required />
					<ProFormText name='msv' label='MSV' required />
					<ProFormText name='hoTen' label='Họ tên' required />
					<ProFormDatePicker name='ngaySinh' label='Ngày sinh' required />

					<ProFormSelect
						name='bookYear'
						label='Sổ'
						options={books.map((b) => ({
							label: b.year,
							value: b.year,
						}))}
					/>

					<ProFormSelect
						name='decisionId'
						label='Quyết định'
						options={decisions.map((d) => ({
							label: d.soQD,
							value: d.soQD,
						}))}
					/>

					{/* Dynamic */}
					{fields.map((f) => {
						if (f.type === 'string') return <ProFormText name={['dynamic', f.name]} label={f.name} />;

						if (f.type === 'number') return <ProFormDigit name={['dynamic', f.name]} label={f.name} />;

						if (f.type === 'date') return <ProFormDatePicker name={['dynamic', f.name]} label={f.name} />;
					})}
				</ModalForm>,
			]}
		/>
	);
};
