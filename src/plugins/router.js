import { createRouter, createWebHistory } from "vue-router";
import Library from '@/views/Library.vue'
import HomeView from "../views/Home.vue";

const routes = [
  {
    path: "",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("@/views/Profile.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("@/views/Register.vue"),
  },
  {
    path: "/library",
    name: "Library",
    component: Library,
  },
  {
    path: "/readPdf/:id",
    name: "Pdf",
    component: () => import("@/views/ReadPdf.vue"),
  },
  {
    path:"/readEpub/:id",
    name:"Epub",
    component: () => import("@/views/ReadEpub.vue"),
  },
  {
    path:"/paiement/:id",
    name:"Paiement",
    component:() => import("@/views/Paiement.vue")
  },
  {
    path:"/ProlongerPaiement/:id",
    name:"Prolonger",
    component:()=>import("@/views/ProlongementPaiement.vue")
  },
  {
    path:"/search/:searchID",
    name:"Search",
    component:()=>import("@/views/Search.vue")
  },
  {
    path:"/searchByTag/:searchTag",
    name:"SearchByTag",
    component:()=>import("@/views/SearchTag.vue")
  },
  {
    path:"/setting",
    name:"Setting",
    component:()=>import("@/views/setting.vue")
  }
];

const router = createRouter({
  routes,
  history: createWebHistory(import.meta.env.BASE_URL),
});

export default router;
