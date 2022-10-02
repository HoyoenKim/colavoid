const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/alarm.vue") }],
  },
  {
    path: "/map",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/mapdata.vue") }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
