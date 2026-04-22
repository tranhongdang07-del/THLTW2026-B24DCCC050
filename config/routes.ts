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
  // 🔥 TH07 BLOG
  {
    path: '/th07',
    name: 'TH07 Blog',
    icon: 'ReadOutlined',
    routes: [
      {
        path: '/th07',
        exact: true,
        component: './TH07/index',
      },
      {
        path: '/th07/post/:slug',
        component: './TH07/Detail',
        hideInMenu: true,
      },
      {
        path: '/th07/about',
        name: 'About Blog',
        component: './TH07/About',
      },
      {
        path: '/th07/admin',
        name: 'Admin',
        routes: [
          {
            path: '/th07/admin/posts',
            name: 'Posts',
            component: './TH07/Admin/Posts',
          },
          {
            path: '/th07/admin/tags',
            name: 'Tags',
            component: './TH07/Admin/Tags',
          },
        ],
      },
    ],
  },

  ///////////////////////////////////
  // NOTIFICATION
  {
    path: '/notification',
    routes: [
      {
        path: '/notification/subscribe',
        exact: true,
        component: './ThongBao/Subscribe',
      },
      {
        path: '/notification/check',
        exact: true,
        component: './ThongBao/Check',
      },
      {
        path: '/notification',
        exact: true,
        component: './ThongBao/NotifOneSignal',
      },
    ],
    layout: false,
    hideInMenu: true,
  },

  ///////////////////////////////////
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