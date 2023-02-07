<template>
  <div class="navbar bg-base-300">
    <div class="navbar-start">
      <img src="../assets/bru-logo-color.png" width="35" height="35" />
      <a href="/home" class="btn btn-ghost normal-case text-xl"
        >BRU Request and Appove Online</a
      >
    </div>
    <div
      v-show="this.$route.path != '/'"
      class="navbar-center text-base-content hidden lg:flex"
    >
      <ul class="menu menu-horizontal p-0">
        <li><a href="/home">หน้าแรก</a></li>
        <li v-show="user.role == 'Student'" tabindex="0">
          <a>
            ยื่นคำร้อง<svg
              class="fill-current"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
            >
              <path
                d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"
              /></svg
          ></a>

          <ul class="p-2 bg-base-300">
            <li><a href="/formW">คำร้องขอถอนรายวิชา</a></li>
            <li><a href="/formI">คำร้องขอแก้ "I"</a></li>
            <li><a href="/formA">คำร้องขอแก้ "F" หรือเพิ่มรายวิชา</a></li>
          </ul>
        </li>
        <li v-show="user.role == 'Admin'" tabindex="0">
          <a>
            จัดการข้อมูล<svg
              class="fill-current"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
            >
              <path
                d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"
              /></svg
          ></a>
          <ul class="p-2 bg-base-300">
            <li><a href="/subject">ข้อมูลรายวิชา</a></li>
            <li><a href="/employee">ข้อมูลพนักงาน</a></li>
            <li><a href="/course">ข้อมูลหลักสูตร</a></li>
            <li><a href="/major">ข้อมูลสาขา</a></li>
          </ul>
        </li>
        <li>
          <a href="/history">{{
            user.role == "Student"
              ? "ประวัติการยื่นคำร้อง"
              : "ประวัติการอนุมัติคำร้อง"
          }}</a>
        </li>
      </ul>
    </div>
    <div v-show="this.$route.path != '/'" class="navbar-end">
      <p class="text-lg mr-4 text-primary-content">
        {{ user.name }} {{ user.surname }}
      </p>
      <a
        href="/profile"
        class="btn btn-info mr-5 rounded-full"
        v-show="user.role != 'Admin' && this.$route.path != '/'"
      >
        ข้อมูลส่วนตัว
      </a>
      <a
        href="/"
        class="btn btn-error py-2 rounded-full"
        v-show="this.$route.path != '/'"
        @click.prevent="LogoutUser"
      >
        ออกจากระบบ
      </a>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "NavBar",

  data() {
    return {
      user: {},
    };
  },
  created() {
    axios
      .get("/auth")
      .then((res) => {
        this.user = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    async LogoutUser() {
      this.user = {};
      await localStorage.clear();
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
#nav {
  z-index: 9999;
}
</style>