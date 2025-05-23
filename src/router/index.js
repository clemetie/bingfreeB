import { createRouter, createWebHistory } from "vue-router";
import BingFree from "@/views/BingFree.vue";
import BingPrime from "@/views/BingPrime.vue";
import FreeMall from "@/views/FreeMall.vue";
import IntroBing from "@/views/IntroBing.vue";
import Check from "@/views/Check.vue";
import Review from "@/views/Review.vue";
import Reservation from "@/views/Reservation.vue";
import Error from "@/views/Error.vue";
import SignUp from "@/views/SignUp.vue";
import Login from "@/views/Login.vue";

// 회원가입 관련
import BingprimeJoin from "@/views/BingprimeJoin.vue"; // 경로 실제 파일로 수정 필요
import PersonulAgree from "@/views/PersonulAgree.vue";
import PersonalJoin from "@/views/PersonalJoin.vue";
import BusinessJoin from "@/views/BusinessJoin.vue";
import SubSelect from "@/views/SubSelect.vue";
import SubReservation from "@/views/SubReservation.vue";
import CleanerAgree from "@/views/CleanerAgree.vue";
import CleanerJoin from "@/views/CleanerJoin.vue";

// 고객 관련
import BingprimeReservation from "@/views/BingprimeReservation.vue";
import SubBenefit from "@/views/SubBenefit.vue";
import Faq from "@/views/Faq.vue";
import CustomerProfile from "@/views/CustomerProfile.vue";

// 관리자
import AdminHome from "@/Pages/Admin/AdminHome.vue";
import Dashboard from "@/Pages/Admin/Dashboard.vue";
import Customers from "@/Pages/Admin/Customers.vue";
import AdminReservation from "@/Pages/Admin/AdminReservation.vue";
import Workers from "@/Pages/Admin/Workers.vue";
import Sales from "@/Pages/Admin/Sales.vue";
import Settings from "@/Pages/Admin/Settings.vue";
import Claim from "@/Pages/Admin/Claim.vue";
import Board from "@/Pages/Admin/Board.vue";

// 기사
import WorkerHome from "@/Pages/Worker/WorkerHome.vue";
import DDashboard from "@/Pages/Worker/DDashboard.vue";
import WorkerBoard from "@/Pages/Worker/WorkerBoard.vue";
import WorkerCustomers from "@/Pages/Worker/WorkerCustomers.vue";
import WorkerHistory from "@/Pages/Worker/WorkerHistory.vue";
import WorkerProfile from "@/Pages/Worker/WorkerProfile.vue";
import WorkerSale from "@/Pages/Worker/WorkerSale.vue";
import WorkerSetting from "@/Pages/Worker/WorkerSetting.vue";

const routes = [
  { path: "/", component: BingFree },
  { path: "/BingPrime", component: BingPrime },
  { path: "/FreeMall", component: FreeMall },
  { path: "/IntroBing", component: IntroBing },
  { path: "/Check", component: Check },
  { path: "/Review", component: Review },
  { path: "/Reservation", component: Reservation },
  { path: "/SignUp", component: SignUp },
  { path: "/Login", component: Login },
  { path: "/BingprimeJoin", component: BingprimeJoin },
  { path: "/PersonulAgree", component: PersonulAgree },
  { path: "/PersonalJoin", component: PersonalJoin },
  { path: "/BusinessJoin", component: BusinessJoin },
  { path: "/SubSelect", component: SubSelect },
  { path: "/SubReservation", component: SubReservation },
  { path: "/CleanerAgree", component: CleanerAgree },
  { path: "/CleanerJoin", component: CleanerJoin },
  { path: "/BingprimeReservation", component: BingprimeReservation },
  { path: "/SubBenefit", component: SubBenefit },
  { path: "/Faq", component: Faq },
  { path: "/CustomerProfile", component: CustomerProfile },

  // 관리자 라우트
  {
    path: "/Admin",
    component: AdminHome,
    children: [
      { path: "Dashboard", component: Dashboard },
      { path: "AdminReservation", component: AdminReservation },
      { path: "Customers", component: Customers },
      { path: "Workers", component: Workers },
      { path: "Claim", component: Claim },
      { path: "Sales", component: Sales },
      { path: "Board", component: Board },
      { path: "Settings", component: Settings },
    ],
  },

  // 기사 라우트
  {
    path: "/Worker",
    component: WorkerHome,
    redirect: "/Worker/ddashboard",
    children: [
      { path: "ddashboard", component: DDashboard },
      { path: "WorkerHome", component: WorkerHome },
      { path: "WorkerCustomers", component: WorkerCustomers },
      { path: "WorkerHistory", component: WorkerHistory },
      { path: "WorkerBoard", component: WorkerBoard },
      { path: "WorkerSale", component: WorkerSale },
      { path: "WorkerProfile", component: WorkerProfile },
      { path: "WorkerSetting", component: WorkerSetting },
    ],
  },

  // 404 에러 처리
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: Error,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 };
  },
});

export default router;
