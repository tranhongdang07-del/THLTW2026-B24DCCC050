export default [
	{
		path: '/user',
		layout: false,
		routes: [
			{
				path: '/user/login',
				layout: false,
				name: 'login',
				component: './user/Login',
			},
			{
				path: '/user',
				redirect: '/user/login',
			},
		],
	},

	///////////////////////////////////
	// DEFAULT MENU
	{
		path: '/dashboard',
		name: 'Dashboard',
		component: './TrangChu',
		icon: 'HomeOutlined',
	},
	{
		path: '/gioi-thieu',
		name: 'About',
		component: './TienIch/GioiThieu',
		hideInMenu: true,
	},
	{
		path: '/random-user',
		name: 'RandomUser',
		component: './RandomUser',
		icon: 'ArrowsAltOutlined',
	},
	{
		path: '/todo-list',
		name: 'TodoList',
		icon: 'OrderedListOutlined',
		component: './TodoList',
	},



	///////////////////////////////////
	// TH04
	{
		path: '/th04',
		name: 'TH04',
		icon: 'FileTextOutlined',
		routes: [
			{
				path: '/th04/book',
				name: 'Sổ văn bằng',
				component: './TH04/Book',
			},
			{
				path: '/th04/decision',
				name: 'Quyết định',
				component: './TH04/Decision',
			},
			{
				path: '/th04/field',
				name: 'Cấu hình field',
				component: './TH04/FieldConfig',
			},
			{
				path: '/th04/certificate',
				name: 'Văn bằng',
				component: './TH04/Certificate',
			},
			{
				path: '/th04/search',
				name: 'Tra cứu',
				component: './TH04/Search',
			},
		],
	},

	///////////////////////////////////
	// TH05
	{
		path: '/th05',
		name: 'TH05',
		icon: 'TeamOutlined',
		routes: [
			{
				path: '/th05/clubs',
				name: 'Câu lạc bộ',
				component: './TH05/Clubs',
			},
			{
				path: '/th05/applications',
				name: 'Đơn đăng ký',
				component: './TH05/Applications',
			},
			{
				path: '/th05/members',
				name: 'Thành viên',
				component: './TH05/Members',
			},
			{
				path: '/th05/report',
				name: 'Báo cáo',
				component: './TH05/Report',
			},
		],
	},

	///////////////////////////////////

	{
		path: '/notification',
		routes: [
			{
				path: './subscribe',
				exact: true,
				component: './ThongBao/Subscribe',
			},
			{
				path: './check',
				exact: true,
				component: './ThongBao/Check',
			},
			{
				path: './',
				exact: true,
				component: './ThongBao/NotifOneSignal',
			},
		],
		layout: false,
		hideInMenu: true,
	},
	{
		path: '/',
	},
	{
		path: '/403',
		component: './exception/403/403Page',
		layout: false,
	},
	{
		path: '/hold-on',
		component: './exception/DangCapNhat',
		layout: false,
	},
	{
		component: './exception/404',
	},
];