import { createRouter, createWebHistory } from "vue-router";

// Default Pages
import Dashboard from "../views/Dashboard.vue";
import ManageMembers from "../views/ManageMenbers.vue"
import Ecommerce from "../views/Ecommerce.vue"
import HistoryEcommerce from "../views/HistoryEcommerce.vue"
import Referral from "../views/Referral.vue"
import Reward from "../views/Reward.vue"
// Component Pages
import Valert from "../views/components/alert.vue";
import Vaccrodion from "../views/components/accordion.vue";
import Vbadges from "../views/components/badges.vue";
import Vbreadcumb from "../views/components/breadcumbs.vue";
import Vbutton from "../views/components/button.vue";
import Vcard from "../views/components/card.vue";
import Vdropdown from "../views/components/dropdown.vue";
import Vmodal from "../views/components/modal.vue";
import Login from "../views/layouts/auth/Login.vue";
import Register from "../views/layouts/auth/Register.vue";
import ForgotPassword from "../views/layouts/auth/forgot-password.vue";

// layouts
import Blank from "../views/layouts/Blank.vue";

// error page
import Page404 from "../views/layouts/error/404.vue";
import Page500 from "../views/layouts/error/500.vue";
import PageMaintenance from "../views/layouts/error/maintenance.vue";
import Tables from "../views/tables.vue";
import Deposit from "@/views/Deposit.vue";

var appname = " - Windzo Dashboard Admin Template";

const routes = [
  // Routes
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
    meta: { title: "Dashboard " + appname },
    beforeEnter: (to, from) => {
      if (!localStorage.access_token) {
        return { name: 'Login' }
      }
    }
  },

  {
    path: "/members",
    name: "ManageMembers",
    component: ManageMembers,
    meta: { title: "Manage Members" + appname },
    beforeEnter: (to, from) => {
      if (!localStorage.access_token) {
        return { name: 'Login' }
      }
    }
  },

  {
    path: "/ecommerce/shopping",
    name: "Shop",
    component: Ecommerce,
    meta: { title: "E-commerce" + appname },
    beforeEnter: (to, from) => {
      if (!localStorage.access_token) {
        return { name: 'Login' }
      }
    }
  },
  {
    path: "/ecommerce/history",
    name: "History",
    component: HistoryEcommerce,
    meta: { title: "E-commerce" + appname },
    beforeEnter: (to, from) => {
      if (!localStorage.access_token) {
        return { name: 'Login' }
      }
    }
  },
  {
    path: "/rewards/referral",
    name: "Referral",
    component: Referral,
    meta: { title: "E-commerce" + appname },
    beforeEnter: (to, from) => {
      if (!localStorage.access_token) {
        return { name: 'Login' }
      }
    }
  },
  {
    path: "/rewards/reward",
    name: "Reward",
    component: Reward,
    beforeEnter: (to, from) => {
      if (!localStorage.access_token) {
        return { name: 'Login' }
      }
    }
  },
  {
    path: "/rewards/deposit",
    name: "Deposit",
    component: Deposit,
    beforeEnter: (to, from) => {
      if (!localStorage.access_token) {
        return { name: 'Login' }
      }
    }
  },
  // Components based Routes
  {
    path: "/component/alert",
    name: "Valert",
    component: Valert,
    meta: { title: "Alert" + appname },
  },
  {
    path: "/component/accordion",
    name: "Vaccordion",
    component: Vaccrodion,
    meta: { title: "Accordion" + appname },
  },
  {
    path: "/component/badge",
    name: "Vbadge",
    component: Vbadges,
    meta: { title: "Badge" + appname },
  },
  {
    path: "/component/breadcumb",
    name: "Vbreadcumb",
    component: Vbreadcumb,
    meta: { title: "Breadcumb" + appname },
  },
  {
    path: "/component/button",
    name: "Vbutton",
    component: Vbutton,
    meta: { title: "Button" + appname },
  },
  {
    path: "/component/card",
    name: "Vcard",
    component: Vcard,
    meta: { title: "Card" + appname },
  },
  {
    path: "/component/dropdown",
    name: "Vdropdown",
    component: Vdropdown,
    meta: { title: "Dropdown" + appname },
  },
  {
    path: "/component/modal",
    name: "Vmodal",
    component: Vmodal,
    meta: { title: "Modal" + appname },
  },
  // layouts

  {
    path: "/Blank",
    name: "Blank Page",
    component: Blank,
    meta: { title: "Blank Page" + appname },
  },

  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { title: "Login" + appname, hideNav: true },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: { title: "Register" + appname, hideNav: true },
  },
  {
    path: "/auth/forgot-password",
    name: "ForgotPassword",
    component: ForgotPassword,
    meta: { title: "i Forgot Password" + appname, hideNav: true },
  },
  // layout/error
  // default page 404
  {
    path: "/:pathMatch(.*)*",
    name: "Page404",
    component: Page404,
    meta: { title: "Upps! 404" + appname, hideNav: true },
  },
  {
    path: "/500",
    name: "Page500",
    component: Page500,
    meta: { title: "Server internal Error" + appname, hideNav: true },
  },
  {
    path: "/maintenance",
    name: "maintenance",
    component: PageMaintenance,
    meta: {
      title: "Sorry the app has been Maintenance" + appname,
      hideNav: true,
    },
  },
  {
    path: "/tables",
    name: "Tables",
    component: Tables,
    meta: {
      title: "Tables" + appname,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,

  linkExactActiveClass: "exact-active",
});

router.beforeEach(async (to, from) => {
  if (
    // make sure the user is authenticated
    localStorage.access_token && (to.name == 'Login' || to.name == 'Register')
  ) {
    // redirect the user to the login page
    return { name: 'Dashboard' }
  }
})

export default router;
