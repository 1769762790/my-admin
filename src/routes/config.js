import loadable from "./loadable";
import LoginLoading from "../components/loginLoading";

const CONSTANTS_ROUTERS = [
  {
    path: "/error",
    meta: {
      title: "错误页面",
    },
    redirect: "/error/404",
    children: [
      {
        path: "/error/404",
        auth: false,
        meta: {
          title: "页面不存在",
        },
        component: loadable(() => import("../pages/errorPages/404")),
      },
      {
        path: "/error/403",
        auth: false,
        meta: {
          title: "暂无权限",
        },
        component: loadable(() => import("../pages/errorPages/403")),
      },
    ],
  },
  {
    path: "/*",
    meta: {
      title: "错误页面",
    },
    redirect: "/error/404",
  },
];

// 系统路由
const sysRoutes = [
  {
    path: "/system",
    component: loadable(() => import("../layouts/UserLayout")),
    meta: {
      title: "系统路由",
    },
    redirect: "/system/login",
    children: [
      {
        path: "/system/login",
        exact: true,
        component: loadable(() => import("../pages/user"), LoginLoading),
        meta: {
          title: "登录",
        },
      },
    ],
  },
];
const businessRoutes = [
  {
    path: "/",
    component: loadable(() => import("../layouts")),
    meta: {
      title: "系统",
    },
    redirect: "/dashboard",
    children: [
      {
        path: "/dashboard",
        component: loadable(() => import("../pages/dashboard")),
        meta: {
          title: "首页",
          affix: true,
          icon: "<DashboardOutlined />",
        },
      },
      {
        path: "/list",
        meta: {
          title: "列表管理",
          icon: "<MenuUnfoldOutlined />",
        },
        redirect: "/list/userList",
        children: [
          {
            path: "/list/userList",
            meta: {
              title: "用户列表",
              icon: "<UserOutlined />",
            },
            component: loadable(() => import("../pages/list/userList")),
          },
        ],
      },
      {
        path: "/echarts",
        meta: {
          title: "Echarts",
          icon: "<BarChartOutlined />",
        },
        component: loadable(() => import("../pages/echarts")),
      },
      {
        path: "/animate",
        meta: {
          title: "Animated",
          icon: "<ShakeOutlined />",
        },
        component: loadable(() => import("../pages/animate")),
      },
      ...CONSTANTS_ROUTERS
    ],
  },
];

const newRoutes = [...sysRoutes, ...businessRoutes];
// const routes = [
//   {
//     title: "首页",
//     path: "/home",
//     component: loadable(() => import("../layouts")),
//     children: [
//       {
//         title: "仪表盘",
//         path: "/home/dashboard",
//         component: loadable(() => import("../pages/dashboard")),
//       },
//       {
//         title: "列表管理",
//         path: "/home/list",
//         component: loadable(() => import("../pages/list")),
//         children: [
//           {
//             title: "用户列表",
//             exact: true,
//             path: "/home/list/userList",
//             component: loadable(() => import("../pages/list/userList")),
//             children: [
//               {
//                 title: "用户详细信息",
//                 path: "/home/list/userList/:id",
//                 component: loadable(() => import("../pages/list/userList/userDetail")),
//               },
//             ]
//           },
//           {
//             path: "/home/list",
//             redirect: "/home/list/userList",
//           },
//         ],
//       },
//       {
//         title: 'Echarts',
//         path: '/home/echarts',
//         component: loadable(() => import('../pages/echarts'))
//       },
//       {
//         title: 'Animated',
//         path: '/home/animate',
//         component: loadable(() => import('../pages/animate'))
//       },
//       {
//         path: "/home",
//         redirect: "/home/dashboard",
//       },
//       {
//         path: '/home/redirect',
//         component: loadable(() => import('../pages/redirect'))
//       }
//     ],
//   },
//   {
//     title: "登陆",
//     path: "/login",
//     component: loadable(() => import("../pages/user"), LoginLoading),
//   },
//   {
//     path: "/404",
//     component: loadable(() => import("../pages/errorPages/404")),
//   },
//   {
//     path: "/403",
//     exact: true,
//     component: loadable(() => import("../pages/errorPages/403")),
//   },
//   {
//     path: "/",
//     redirect: "/home",
//   },
// ];
export default newRoutes;
