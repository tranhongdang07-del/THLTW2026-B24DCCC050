export default [
	{ path: '/', redirect: '/th03/nhan-vien' },

	{
		path: '/th03/nhan-vien',
		name: 'Nhân viên',
		component: './TH03/NhanVien',
	},
	{
		path: '/th03/dich-vu',
		name: 'Dịch vụ',
		component: './TH03/DichVu',
	},
	{
		path: '/th03/lich-hen',
		name: 'Lịch hẹn',
		component: './TH03/LichHen',
	},
	{
		path: '/th03/thong-ke',
		name: 'Thống kê',
		component: './TH03/ThongKe',
	},

	{ component: './exception/404' },
];
