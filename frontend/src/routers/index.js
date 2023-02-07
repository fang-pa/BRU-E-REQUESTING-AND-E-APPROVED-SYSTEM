import { createWebHistory, createRouter } from "vue-router";

import home from "@/components/home.vue";
import login from "@/components/login.vue";
import formI from "@/components/form_I.vue";
import subject from "@/components/subject.vue";
import employee from "@/components/employee.vue";
import course from "@/components/course.vue";
import formW from "@/components/form_w.vue";
import profile from "@/components/profile.vue";
import detail from "@/components/detail.vue";
import history from "@/components/history.vue";
import formA from "@/components/form_A.vue";
import major from "@/components/major.vue";


const routes = [  
  {
    path: "/major",
    name: "major",
    component: major
  },
  {
    path: "/formA",
    name: "formA",
    component: formA
  },
  {
    path: "/course",
    name: "course",
    component: course
  },
  {
    path: "/history",
    name: "history",
    component: history
  },
  {
    path: "/detail/:id/:show",
    name: "detail",
    component: detail
  },
  {
    path: "/",
    name: "login",
    component: login
  },
  {
    path: "/home",
    name: "home",
    component: home
  },
  {
    path: "/formI",
    name: "formI",
    component: formI
  },
  {
    path: "/subject",
    name: "subject",
    component: subject
  }
  ,
  {
    path: "/employee",
    name: "employee",
    component: employee
  }
  ,
  {
    path: "/formW",
    name: "formW",
    component: formW
  },
  {
    path: "/profile",
    name: "profile",
    component: profile
  }
];

const router = createRouter({ history: createWebHistory(),routes});

export default router;