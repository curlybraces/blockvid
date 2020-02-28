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
        path: "/news",
        name: "newsList",
        component: () => import("pages/News.vue")
      },
      {
        path: "/auth",
        name: "login",
        component: () => import("pages/Login.vue"),
        meta: {
          redirectLogged: "index"
        }
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
