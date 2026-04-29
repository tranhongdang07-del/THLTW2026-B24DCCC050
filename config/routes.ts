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

	{
		path: '/',
		redirect: '/fitness/dashboard',
	},

	{
		name: 'Ứng dụng thể dục',
		path: '/fitness',
		icon: 'HeartOutlined',
		routes: [
			{
				path: '/fitness/dashboard',
				name: 'Trang chủ',
				icon: 'DashboardOutlined',
				component: './TH08',
			},
			{
				path: '/fitness/workout',
				name: 'Nhật ký tập luyện',
				icon: 'FireOutlined',
				component: './TH08/Workout',
			},
			{
				path: '/fitness/health',
				name: 'Nhật ký sức khỏe',
				icon: 'HeartOutlined',
				component: './TH08/Health',
			},
			{
				path: '/fitness/goals',
				name: 'Mục tiêu',
				icon: 'FlagOutlined',
				component: './TH08/Goals',
			},
			{
				path: '/fitness/exercises',
				name: 'Thư viện bài tập',
				icon: 'AppstoreOutlined',
				component: './TH08/Exercises',
			},
		],
	},

	{
		path: '/gioi-thieu',
		name: 'Giới thiệu',
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
