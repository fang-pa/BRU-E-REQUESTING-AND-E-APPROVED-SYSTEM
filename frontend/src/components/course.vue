<template>
  <div class="flex w-full h-screen space-x-5">
    <div
      class="
        grid
        flex-grow
        card
        rounded-box
        place-items-top
        my-5
        justify-center
      "
    >
      <div class="card bg-base-200 shadow-xl">
        <h2 class="text-center my-2 text-2xl text-black">หลักสูตร</h2>
        <table
          class="
            border-collapse
            table-fixed
            text-lg
            whitespace-nowrap
            bg-white
            divide-y divide-gray-300
            overflow-hidden
            rounded-xl
            mb-8
            mx-8
            text-black
          "
        >
          <thead class="bg-primary-focus">
            <tr class="text-black">
              <th class="font-Trirong uppercase px-1 py-1">รหัสวิชา</th>
              <th class="font-Trirong uppercase px-1 py-1">Sec</th>
              <th class="font-Trirong uppercase px-1 py-1">น.ก.</th>
              <th class="font-Trirong uppercase px-1 py-1">ชื่อวิชา</th>
              <th class="font-Trirong uppercase px-1 py-1">ชื่อผู้สอน</th>
              <th class="font-Trirong uppercase px-1 py-1" />
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 text-center text-neutral">
            <tr v-if="courses.course.length == 0">
              <td>ไม่มีข้อมูล</td>
            </tr>
            <tr v-else v-for="(Course, index) in courses.course" :key="index">
              <td class="px-1 py-1">{{ Course.subject.SubJID }}</td>
              <td class="px-1 py-1">{{ Course.subject.SubJSec }}</td>
              <td class="px-1 py-1">{{ Course.subject.SubCredit }}</td>
              <td class="px-1 py-1">{{ Course.subject.SubJName }}</td>
              <td class="px-1 py-1">
                {{ Course.teacher.name }} {{ Course.teacher.surName }}
              </td>
              <td class="px-1 py-1">
                <button
                  @click.prevent="removeItem(index)"
                  class="btn bg-white text-black"
                >
                  ลบ
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div
      class="
        grid
        flex-grow
        card
        rounded-box
        place-items-top
        my-5
        justify-center
      "
    >
      <div class="card bg-base-200 shadow-xl">
        <form @submit="insertCourse" class="mb-8 mx-8">
          <h1 class="text-center my-2 text-2xl text-black">จัดการหลักสูตร</h1>
          <div class="form-control text-lg space-y-4 mb-3 text-black">
            <div class="grid grid-cols-2 space-x-1">
              <div>
                <label class="input-group input-group-vertical">
                  <span>ภาคการศึกษาปัจจุบัน</span>
                  <input
                    v-model="courses.term"
                    required
                    type="text"
                    placeholder="ภาคการศึกษาปัจจุบัน"
                    class="input input-bordered bg-white"
                  />
                </label>
              </div>
              <div>
                <label class="input-group input-group-vertical">
                  <span>ภาคการศึกษาก่อนหน้า</span>
                  <input
                    v-model="courses.ex_term"
                    required
                    type="text"
                    placeholder="ภาคการศึกษาก่อนหน้า"
                    class="input input-bordered bg-white"
                  />
                </label>
              </div>
            </div>
            <label class="input-group input-group-vertical">
              <span>สาขา</span>
              <select
              v-model="courses.major"
              class="select w-full max-w-xs bg-white text-black"
              required
            >
              <option disabled selected>สาขา</option>
              <option
                v-for="MaJor in MaJ"
                :key="MaJor._id"
                :value="MaJor._id"
                selected
              >
                {{ MaJor.majorName }}
              </option>
            </select>
            </label>
            <div class="grid grid-cols-2 space-x-1">
              <div>
                <label class="input-group input-group-vertical">
                  <span>รุ่น</span>
                  <input
                    v-model="courses.classOf"
                    required
                    type="text"
                    placeholder="รุ่น"
                    class="input input-bordered bg-white"
                  />
                </label>
              </div>
              <div>
                <label class="input-group input-group-vertical">
                  <span>หมู่</span>
                  <input
                    v-model="courses.group"
                    required
                    type="text"
                    placeholder="หมู่"
                    class="input input-bordered bg-white"
                  />
                </label>
              </div>
            </div>
            <div class="grid grid-cols-2 space-x-1">
              <div>
                <label class="input-group input-group-vertical">
                  <span>วันเปิดภาคการศึกษา</span>
                  <input v-model="courses.startTerm" type="date" placeholder="วันเปิดภาคการศึกษา">
                </label>
              </div>
              <div>
                <label class="input-group input-group-vertical">
                  <span>วันปิดภาคการศึกษา</span>
                  <input v-model="courses.endTerm" type="date" placeholder="วันเปิดภาคการศึกษา">
                </label>
              </div>
            </div>
            <label class="input-group input-group-vertical">
              <span>ชื่อรายวิชา</span>
              <select
              v-model="PrePost.subject"
              class="select w-full max-w-xs bg-white text-black"
              required
            >
              <option disabled selected>ชื่อรายวิชา</option>
              <option
                v-for="SubJect in SubJ"
                :key="SubJect._id"
                :value="SubJect._id"
                selected
              >
                {{ SubJect.SubJName }}
              </option>
            </select>
            </label>
            <label class="input-group input-group-vertical">
              <span>ชื่ออาจารย์</span>
              <select
              v-model="PrePost.teacher"
              class="select w-full max-w-xs bg-white text-black"
              required
            >
              <option disabled selected>ชื่ออาจารย์</option>
              <option
                v-for="Teachers in Teach"
                :key="Teachers._id"
                :value="Teachers._id"
                selected
              >
                {{ Teachers.name }} {{ Teachers.surName }}
              </option>
            </select>
            </label>
            <a class="rounded-full btn btn-info mb-2 ml-auto" @click="addPre()">
              เพิ่มแผนรายวิชา
            </a>
            <button class="btn btn-primary rounded-full bg-white" type="submit">
              บันทึกแผนรายวิชา
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <div class="container-2xl text-center min-h-screen py-5">
    <div class="overflow-x-auto w-full">
      <h1 class="text-4xl mb-5 text-primary-content">แผนวิชา</h1>
      <table
        class="
          border-collapse
          mx-auto
          max-w-4xl
          w-full
          whitespace-nowrap
          rounded-lg
          bg-white
          divide-y divide-gray-300
          overflow-hidden
        "
      >
        <thead class="bg-primary-focus">
          <tr class="text-white">
            <th class="font-Trirong uppercase px-6 py-4">ภาคการศึกษา</th>
            <th class="font-Trirong uppercase px-6 py-4">
              วันเปิดภาคการศึกษา - วันปิดภาคการศึกษา
            </th>
            <th class="font-Trirong uppercase px-6 py-4">สาขา/รุ่น/หมู่</th>
            <th class="font-Trirong uppercase px-6 py-4"></th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 text-center">
          <tr v-if="showCourse.length == 0">
            <td class="px-6 py-4">ไม่มีข้อมูล</td>
          </tr>
          <tr v-else v-for="Co in showCourse" :key="Co._id">
            <td class="px-6 py-4">{{ Co.term }}</td>
            <td class="px-6 py-4">
              {{ format_date(Co.startTerm) }} - {{ format_date(Co.endTerm) }}
            </td>
            <td class="px-6 py-4">
              {{ Co.major.majorName }}/{{ Co.classOf }}/{{ Co.group }}
            </td>
            <td class="px-6 py-4">
              <a
                href="#List"
                class="btn modal-button rounded-full bg-info"
                @click="sendData(Co._id)"
                >ดูข้อมูล</a
              >
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <div class="modal justify-items-center" id="List" data-theme="dark">
    <div class="modal-box">
      <h1 class="text-center my-2 text-2xl text-white">รายวิชา</h1>
      <table
        class="
          border-collapse
          mx-auto
          max-w-4xl
          w-full
          whitespace-nowrap
          rounded-lg
          bg-white
          divide-y divide-gray-300
          text-black
        "
      >
        <thead class="bg-primary-focus">
          <tr class="text-white">
            <th class="font-Trirong uppercase px-3 py-2">รหัสรายวิชา</th>
            <th class="font-Trirong uppercase px-3 py-2">Sec</th>
            <th class="font-Trirong uppercase px-3 py-2">หน่วยกิต</th>
            <th class="font-Trirong uppercase px-3 py-2">ชื่อรายวิชา</th>
            <th class="font-Trirong uppercase px-3 py-2">ผู้สอน</th>
            <th class="font-Trirong uppercase px-3 py-2">วัน/เวลา</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 text-center">
          <tr v-if="courseDetail.length == 0">
            <td class="px-6 py-4">ไม่มีข้อมูล</td>
          </tr>
          <tr v-else v-for="(Co, index) in courseDetail" :key="index">
            <td class="px-6 py-4">{{ Co.subject.SubJID }}</td>
            <td class="px-6 py-4">{{ Co.subject.SubJSec }}</td>
            <td class="px-6 py-4">{{ Co.subject.SubCredit }}</td>
            <td class="px-6 py-4">{{ Co.subject.SubJName }}</td>
            <td class="px-6 py-4">
              {{ Co.teacher.name }} - {{ Co.teacher.surName }}
            </td>
            <td class="px-6 py-4">
              {{ nameDateTH(Co.subject.NameDate) }}/{{ Co.subject.StartH }} -
              {{ Co.subject.EndH }}
            </td>
          </tr>
        </tbody>
      </table>
      <div class="modal-action">
        <a href="#" class="btn bg-white text-black">กลับ</a>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import swal from "sweetalert2";
import moment from "moment";

export default {
  name: "CoursE",
  data() {
    return {
      courses: {
        major: "",
        course: [
          {
            subject: "",
            teacher: "",
          },
        ],
        startTerm: new Date(),
        endTerm: new Date()
      },
      PrePost: {
        subject: {},
        teacher: {},
      },
      SubJ: [],
      Teach: [],
      MaJ: [],
      showCourse: [],
      courseDetail: [],
    };
  },
  created() {
    const token = localStorage.getItem("token");
    if (!token) {
      swal.fire("โปรดเข้าสู่ระบบ");
      this.$router.push("/");
    }
    axios.get("/data/subject_A").then((res) => {
      this.SubJ = res.data;
    });
    axios.get("/data/course").then((res) => {
      this.showCourse = res.data;
    });
    axios.get("/user/teacher").then((res) => {
      this.Teach = res.data;
    });
    axios.get("/data/major").then((res) => {
      this.MaJ = res.data;
    });
    this.courses.course.splice(0, 1);
  },
  methods: {
    format_date(date) {
      if (date) {
        return moment(String(date)).locale("th").add(543, "years").format("LL");
      }
    },
    nameDateTH(name) {
      const dayNames = [
        "sunday",
        "อาทิตย์",
        "monday",
        "จันทร์",
        "tuesday",
        "อังคาร",
        "wednesday",
        "พุธ",
        "thursday",
        "พฤหัสบดี",
        "friday",
        "ศุกร์",
        "saturday",
        "เสาร์",
      ];
      for (let i = 0; i < dayNames.length; i++) {
        if (dayNames[i] == name) {
          return dayNames[++i];
        }
      }
    },
    async sendData(id) {
      const res = await axios.get("/data/course_detail/" + id);
      if (res) {
        this.courseDetail = res.data;
      }
    },
    async insertCourse() {
      const res = await axios.post("/data/create-course", this.courses);
      if (res.status == 200) {
        swal.fire("บันทึกสำเร็จ");
      }
    },
    addPre() {
      if (this.PrePost.subject.SubJID != "" && this.PrePost.teacher._id != "") {
        this.courses.course.push({
          subject: this.PrePost.subject,
          teacher: this.PrePost.teacher,
        });
        this.PrePost = {
          subject: {},
          teacher: {},
        };
      } else {
        swal.fire("โปรดเลือกรายวิชา");
      }
    },
    removeItem(index) {
      const indexOfArrayItem = this.courses.course.findIndex(
        (i) => i.index == index
      );
      this.courses.course.splice(indexOfArrayItem, 1);
    },
  },
};
</script>