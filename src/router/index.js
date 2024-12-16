import { createRouter, createWebHistory } from "vue-router";
import StudentList from "../views/student-management/StudentList.vue";
import StudentAdd from "@/views/student-management/StudentAdd.vue";
import StudentEddit from "@/views/student-management/StudentEddit.vue";
import StudentShow from "@/views/student-management/StudentShow.vue";
import RegistrationList from "@/views/registration-management/RegistrationList.vue";
import RegistrationAdd from "@/views/registration-management/RegistrationAdd.vue";
import RegistrationEddit from "@/views/registration-management/RegistrationEddit.vue";
import RegistrationShow from "@/views/registration-management/RegistrationShow.vue";
import ModuleList from "@/views/module-management/ModuleList.vue";
import ModuleAdd from "@/views/module-management/ModuleAdd.vue";
import ModuleEddit from "@/views/module-management/ModuleEddit.vue";
import ModuleShow from "@/views/module-management/ModuleShow.vue";
import PaymentList from "@/views/payment-management/PaymentList.vue";
import PaymentAdd from "@/views/payment-management/PaymentAdd.vue";
import PaymentEdit from "@/views/payment-management/PaymentEdit.vue";
import PaymentShow from "@/views/payment-management/PaymentShow.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "student-list",
      component: StudentList,
    },
    {
      path: "/module",
      name: "module-list",
      component: ModuleList,
    },
    {
      path: "/module-add",
      name: "module-add",
      component: ModuleAdd,
    },
    {
      path: "/module-eddit/:id",
      name: "module-eddit",
      component: ModuleEddit,
    },
    {
      path: "/module-show/:id",
      name: "module-show",
      component: ModuleShow,
    },
    // {
    //   path: "/student",
    //   name: "student-list",
    //   component: StudentList,
    // },
    {
      path: "/student-add",
      name: "student-add",
      component: StudentAdd,
    },
    {
      path: "/student-eddit/:id",
      name: "student-eddit",
      component: StudentEddit,
    },
    {
      path: "/student-show/:id",
      name: "student-show",
      component: StudentShow,
    },
    {
      path: "/registration",
      name: "registration-list",
      component: RegistrationList,
    },
    {
      path: "/registration-add",
      name: "registration-add",
      component: RegistrationAdd,
    },
    {
      path: "/registration-eddit/:id",
      name: "registration-eddit",
      component: RegistrationEddit,
    },
    {
      path: "/registration-show/:id",
      name: "registration-show",
      component: RegistrationShow,
    },
    {
      path: "/payments",
      name: "payment-list",
      component: PaymentList,
    },
    {
      path: "/payment-add",
      name: "payment-add",
      component: PaymentAdd,
    },
    {
      path: "/payment-edit/:id",
      name: "payment-edit",
      component: PaymentEdit,
    },
    {
      path: "/payment-show/:id",
      name: "payment-show",
      component: PaymentShow,
    },
  ],
});

export default router;
