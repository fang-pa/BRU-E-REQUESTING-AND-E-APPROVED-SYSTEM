<template>
  <div class="container-center mt-6">
    <div class="flex w-full">
      <div
        class="grid flex-grow card rounded-box place-items-center"
      >
        <div
          class="card bg-base-100 shadow-xl ml-80 text-neutral"
          data-theme="winter"
        >
          <div class="card-body card-bordered text-lg">
            <h3 class="card-title text-center">คำร้องขอแก้ระดับคะแนน “I”</h3>
            <h3 class="text-center">
              เมื่อภาคการศึกษาที่ {{ formReq.requireInfo.term }}
            </h3>
            <p class="text-lg">เรื่อง คำร้องขอแก้ระดับคะแนน “I”</p>
            <p class="text-lg">
              เรียน ผู้อำนวยการสำนักส่งเสริมวิชาการและงานทะเบียน
            </p>
            <div class="divider">ข้อมูลนักศึกษา</div>
            <h5 class="mb-1">รหัสนักศึกษา : {{ user.userID }}</h5>
            <h5 class="mb-1">
              ชื่อ-นามสกุล : {{ user.name }} {{ user.surname }}
            </h5>
            <div class="divider">ข้อมูลคำร้อง</div>
            <h5 class="mb-1">
              วิชา : {{ formReq.requireInfo.sub_teach[0].subject.SubJName }}
            </h5>
            <h5 class="mb-1">
              ผู้สอน : {{ formReq.requireInfo.sub_teach[0].teacher.name }}
              {{ formReq.requireInfo.sub_teach[0].teacher.surName }}
            </h5>
            <h5 class="mb-1">สาเหตุ : {{ formReq.requireInfo.because }}</h5>
          </div>
        </div>
      </div>
      <div
        class="grid flex-grow card rounded-box place-items-center"
      >
        <div class="card w-96 bg-base-100 shadow-xl mr-80" data-theme="winter">
          <div class="card-body card-bordered text-lg">
            <h3 class="card-title text-center">แบบฟอร์มคำร้องขอแก้ระดับคะแนน “I”</h3>
            <h3 class="text-center">
              เมื่อภาคการศึกษาที่ {{ formReq.requireInfo.term }}
            </h3>
            <div class="divider">มีความประสงค์ขอแก้ระดับคะแนน “I”</div>
            <form @submit.prevent="insertFormRequest">
              <div class="form-control text-black">
                <label class="input-group input-group-vertical ">
                  <span>ชื่อรายวิชา</span>
                  <select
                  v-model="formReq.requireInfo.sub_teach[0]"
                  class="select w-full max-w-xs bg-white text-black"
                  required
                >
                  <option disabled selected>ชื่อรายวิชา</option>
                  <option
                    v-for="SubJect in SubJ_Teach"
                    @change="pushvalue(SubJect.subject._id,SubJect.teacher._id)"
                    :key="SubJect._id"
                    :value="SubJect.subject._id"
                    selected
                  >
                    {{ SubJect.subject.SubJName }}
                  </option>
                </select>
                </label>
                <label class="input-group input-group-vertical mt-6 ">
                  <span>สาเหตุที่ติด “I”</span>
                  <label class="label cursor-pointer ">
                    <input
                      v-model="formReq.requireInfo.because"
                      :value="'ไม่ส่งงาน/ขาดสอบกลางภาค'"
                      type="radio"
                      name="cause"
                      class="radio checked:bg-primary"
                    />
                    <span class="label-text text-xl"
                      >ไม่ส่งงาน/ขาดสอบกลางภาค</span
                    >
                  </label>
                  <label class="label cursor-pointer">
                    <input
                      v-model="formReq.requireInfo.because"
                      :value="'ขาดสอบปลายภาค'"
                      type="radio"
                      name="cause"
                      class="radio checked:bg-secondary"
                    />
                    <span class="label-text text-xl ">ขาดสอบปลายภาค</span>
                  </label>
                  <label class="label cursor-pointer">
                    <input
                      v-model="formReq.requireInfo.because"
                      :value="'ฝนรหัสประจำตัวผิด'"
                      type="radio"
                      name="cause"
                      class="radio checked:bg-primary"
                    />
                    <span class="label-text text-xl">ฝนรหัสประจำตัวผิด</span>
                  </label>
                </label>
                <div class="card-actions items-center">
                  <button
                    class="rounded-full btn btn-success mt-6 ml-auto"
                    type="submit"
                  >
                    ยื่นคำร้อง
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    {{ SubJ_Teach }}
  </div>
</template>

<script>
import axios from "axios";
import swal from "sweetalert2";

export default {
  name: "FormWithdraw",
  data() {
    return {
      formReq: {
        titleID: "I",
        title: "ขอแก้ระดับคะแนน “I”",
        studentInfo: "",
        requireInfo: {
          sub_teach: [
            {
              subject: "",
              teacher: "",
            },
          ],
          term: "",
        },
        reqStatus: {
          sign: {
            Approved: "unknown",
            AcessDoc: false,
          },
          regis: {
            Approved: "unknown",
            AcessDoc: false,
            sign: null,
          },
        },
        endState: '3',
        docStat: "รอการอนุมัติจากผู้สอน",
      },
      SubJ_Teach: {},
      user: {},
    }
  },
  created() {
    const token = localStorage.getItem("token");
    if (!token) {
      swal.fire("โปรดเข้าสู่ระบบ");
      this.$router.push("/");
    }
    axios.get("/auth").then((res) => {
      this.user = res.data;
    });
    axios.get("/data/course_I").then((res) => {
      this.SubJ_Teach = res.data.course;
      this.formReq.requireInfo.term = res.data.term
    });
  },
  methods: {
    async pushvalue(){
        
    },
    async insertFormRequest() {
      try {
        this.formReq.studentInfo = this.user._id
        const res = await axios.post("/form/req", this.formReq);
        if (res.status == 200) {
          swal.fire("ยื่นคำร้องเสร็จสิ้น");
          this.$router.push("/home");
        }
      } catch (err) {
        const error = err.response;
        if (error.status == 401) {
          swal.fire(error.data.msg);
        } else {
          swal.fire("เกิดข้อผิดพลาด", error.data.err.msg);
        }
      }
    },
  },
};
</script>

