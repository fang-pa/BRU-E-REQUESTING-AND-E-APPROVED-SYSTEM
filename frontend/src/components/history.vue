<template>
  <div class="container-2xl text-center min-h-screen py-5">
    <div class="overflow-x-auto w-full">      
    <h1 class="text-4xl mb-5 text-primary-content">{{ user.role == "Student" ? "ประวัติการยื่นคำร้อง" : "ประวัติการอนุมัติคำร้อง"}}</h1>
      <input v-if="user.role != 'Student'" v-model="search" type="text" placeholder="ค้นหารหัสนักศึกษา" class="rounded-full input-md mb-5 text-center bg-primary-contentinput input-bordered " />
      <table class="border-collapse mx-auto max-w-4xl w-full whitespace-nowrap rounded-lg bg-white divide-y divide-gray-300 overflow-hidden">
        <thead class="bg-secondary-focus">
          <tr class="text-white">
            <th class="font-Trirong uppercase px-6 py-4">หมายเลขคำร้อง</th>
            <th class="font-Trirong uppercase px-6 py-4">รหัสนักศึกษา</th>
            <th class="font-Trirong uppercase px-6 py-4">ชื่อ - นามสกุล</th>
            <th class="font-Trirong uppercase px-6 py-4">ประเภทคำร้อง</th>
            <th class="font-Trirong uppercase px-6 py-4">สถานะคำร้อง</th>
            <th class="font-Trirong uppercase px-6 py-4">วันที่ยื่น</th>
            <th class="font-Trirong uppercase px-6 py-4">เอกสาร</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 text-center">
        <tr v-if="showReq.length == 0">
            <td class="px-6 py-4">ไม่มีข้อมูล</td>
          </tr>
          <tr v-if="resultSearch.length == 0 && showReq.length != 0">
            <td class="px-6 py-4">ไม่มีข้อมูล</td>
          </tr>
          <tr v-for="Req in resultSearch"  :key="Req._id">
            <td class="px-6 py-4">{{ Req.docID }}</td>
            <td class="px-6 py-4">{{ Req.studentInfo.userID }}</td>
            <td class="px-6 py-4">
              {{ Req.studentInfo.nameTitle }}{{ Req.studentInfo.name }}
              {{ Req.studentInfo.surName }}
            </td>
            <td class="px-6 py-4">{{ Req.title }}</td>
            <td class="px-6 py-4">{{ Req.docStat }}</td>
            <td class="px-6 py-4">{{ format_date(Req.dateTime) }}</td>
            <td class="px-6 py-4">
              <router-link  :to="{ name: 'detail', params: { id: Req._id , show: 'false' } }">
                <a  class="btn btn-success rounded-full">ดูข้อมูล</a>
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <p>{{search}}</p>
</template>

<script>
import axios from "axios";
import swal from "sweetalert2";
import moment from "moment";

export default {
  name: "HomePage",
  data() {
    return {
      user: {},
      showReq: [],
      titleID: "",
      search: null,
    };
  },
  computed:{
    resultSearch(){
      if(this.search){
        return this.showReq.filter((item)=>{
          return this.search.toLowerCase().split(' ').every(v=> item.studentInfo.userID.toLowerCase().includes(v))
        })
      } else {
        return this.showReq;
      }
    }

  },
  created() {
    const token = localStorage.getItem("token");
    if (!token) {
      swal.fire("โปรดเข้าสู่ระบบ");
      this.$router.push("/");
    }
    const refresh = localStorage.getItem("refresh");
    if (!refresh) {
      window.location.reload();
      localStorage.setItem("refresh", "1");
    }
    axios
      .get("/history")
      .then((res) => {
        this.showReq = res.data;
      })
      .catch((err) => {
        console.log(err);
      }),
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
    format_date(date) {
      if (date) {
        return moment(String(date)).locale("th").add(543, 'years').format("LL");
      }
    },
  },
};
</script>

<style scoped>
</style>