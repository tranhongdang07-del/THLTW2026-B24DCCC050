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
	// TH06 TRAVEL PLANNER

	{
		name: 'TH06 Travel Planner',
		path: '/th06',
		icon: 'GlobalOutlined',
		routes: [
			{
				name: 'Khám phá điểm đến',
				path: 'applications',
				component: './TH06/Applications',
			},
			{
				name: 'Tạo lịch trình',
				path: 'planner',
				component: './TH06/Planner',
			},
			{
				name: 'Quản lý ngân sách',
				path: 'budget',
				component: './TH06/Budget',
			},
			{
				name: 'Admin điểm đến',
				path: 'admin',
				component: './TH06/Admin',
			},
		],
	},

	///////////////////////////////////
{
	name: 'KTGK - Quản lý phòng học',
	path: '/ktgk',
	icon: 'TableOutlined',
	routes: [
		{
			name: 'Danh sách phòng học',
			path: 'classroom',
			component: './KTGK/ClassRoom',
		},
	],
},
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
		redirect: '/dashboard',
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