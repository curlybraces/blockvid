const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "/index",
        alias: "/",
        name: "index",
        component: () => import("pages/Index.vue")
      },
      {
        path: "/blockchain",
        name: "blockchain",
        component: () => import("pages/Blockchain.vue")
      },
      {
        path: "/graphs",
        alias: "/",
        name: "graphs",
        component: () => import("components/Graphs.vue")
      },
      {
        path: "/auth",
        name: "login",
        component: () => import("pages/Login.vue"),
        meta: {
          redirectLogged: "index"
        }
      },
      {
        path: "/cookies",
        name: "cookies",
        component: () => import("pages/Cookies.vue"),
        meta: {
          redirectLogged: "index"
        }
      },
      {
        path: "/admin",
        component: () => import("layouts/AdminLayout.vue"),
        meta: {
          requiresAuth: true
        },
        children: [
          {
            path: "/admin",
            name: "admin",
            component: () => import("pages/Admin.vue")
          }
        ]
      }
    ]
  }
];

// // Always leave this as last one
// if (process.env.MODE !== "ssr") {
//   routes.push({
//     path: "*",
//     component: () => import("pages/Error404.vue")
//   });
// }

export default routes;
