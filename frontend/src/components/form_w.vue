<template>
  <div class="container-center my-6">
    <div class="flex w-full">
      <div class="grid flex-grow card rounded-box place-items-center">
        <div
          class="card bg-base-100 shadow-xl text-neutral"
          data-theme="garden"
        >
          <div class="card-body card-bordered text-lg">
            <h3 class="card-title text-center">คำร้องขอถอนวิชาเรียน</h3>
            <h3 class="text-center">
              ภาคการศึกษาที่ {{ formReq.requireInfo.term }}
            </h3>
            <p class="text-lg">เรื่อง ขอถอนวิชาเรียน</p>
            <p class="text-lg">เรียน อธิการบดีมหาวิทยาลัยราชภัฏบุรีรัมย์</p>
            <div class="divider">ข้อมูลนักศึกษา</div>
            <h5 class="mb-1">รหัสนักศึกษา : {{ user.userID }}</h5>
            <h5 class="mb-1">
              ชื่อ-นามสกุล : {{ user.name }} {{ user.surname }}
            </h5>
            <div class="divider">รายละเอียดวิชาที่ต้องการถอน</div>
            <h5 class="mb-1">
              รวมหน่วยกิตที่ขอถอนวิชาเรียน จำนวน {{ unit }} หน่วยกิต
            </h5>
            <h5 class="mb-1">เหตุผล : {{ formReq.requireInfo.because }}</h5>
            <table
              class="
                border-collapse
                table-fixed
                text-base
                whitespace-nowrap
                rounded-lg
                bg-white
                divide-y divide-gray-300
                overflow-hidden
              "
            >
              <thead class="bg-primary-focus">
                <tr class="text-white">
                  <th class="font-Trirong uppercase px-1 py-1">รหัสวิชา</th>
                  <th class="font-Trirong uppercase px-1 py-1">Section</th>
                  <th class="font-Trirong uppercase px-1 py-1">
                    หน่วยกิต/ชั่วโมง
                  </th>
                  <th class="font-Trirong uppercase px-1 py-1">ชื่อวิชา</th>
                  <th class="font-Trirong uppercase px-1 py-1">
                    ชื่ออาจารย์ผู้สอน
                  </th>
                  <th class="font-Trirong uppercase px-1 py-1" />
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 text-center">
                <tr v-if="formReq.requireInfo.sub_teach.length == 0">
                  <td class="px-6 py-4">ไม่มีข้อมูล</td>
                </tr>
                <tr
                  v-else
                  v-for="(SubTeach, index) in formReq.requireInfo.sub_teach"
                  :key="index"
                >
                  <td class="px-1 py-1">{{ SubTeach.subject.SubJID }}</td>
                  <td class="px-1 py-1">{{ SubTeach.subject.SubJSec }}</td>
                  <td class="px-1 py-1">{{ SubTeach.subject.SubCredit }}</td>
                  <td class="px-1 py-1">{{ SubTeach.subject.SubJName }}</td>
                  <td class="px-1 py-1">
                    {{ SubTeach.teacher.name }} {{ SubTeach.teacher.surName }}
                  </td>
                  <td class="px-2 py-2">
                    <button
                      class="btn bg-red-500"
                      type="button"
                      @click.prevent="removeItem(index)"
                    >
                      ลบ
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="grid flex-grow card rounded-box place-items-center">
        <div class="card w-11/12 bg-base-100 shadow-xl" data-theme="garden">
          <div class="card-body card-bordered text-lg">
            <h3 class="card-title text-center">แบบฟอร์มคำร้องขอถอนวิชาเรียน</h3>
            <h3 class="text-center">
              ภาคการศึกษาที่ {{ formReq.requireInfo.term }}
            </h3>
            <div class="divider">มีความประสงค์ขอถอนวิชาเรียน</div>
            <form @submit.prevent="insertFormRequest">
              <div class="form-control">
                <button
                  class="rounded-full btn btn-info mb-2 ml-auto bg-white"
                  type="button"
                  @click="addPre()"
                >
                  เพิ่มวิชาที่ต้องการถอน
                </button>
                <label class="input-group input-group-vertical">
                  <span>ชื่อรายวิชา</span>
                  <select
                  v-model="PrePost"
                  class="select w-full max-w-xs bg-white text-black"
                  required
                >
                  <option disabled selected>ชื่อรายวิชา</option>
                  <option
                    v-for="SubJect in SubJ_Teach"
                    :key="SubJect._id"
                    :value="SubJect._id"
                    selected
                  >
                    {{ SubJect.SubJName }}
                  </option>
                </select>
                </label>
                <label class="input-group input-group-vertical mt-6">
                  <span>เหตุผล</span>
                  <input
                    v-model="formReq.requireInfo.because"
                    type="text"
                    placeholder="เหตุผล"
                    class="input input-bordered bg-white"
                    required
                  />
                </label>
                <div class="card-actions items-center">
                  <button
                    class="rounded-full btn btn-success mt-6 ml-auto bg-white"
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
  </div>
</template>

<script>
import axios from "axios";
import swal from "sweetalert2";

export default {
  name: "FormReq",
  data() {
    return {
      formReq: {
        titleID: "W",
        title: "ขอถอนรายวิชา",
        course: "",
        studentInfo: {},
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
          office: {
            Approved: "unknown",
            AcessDoc: false,
            sign: null,
          },
        },
        endState: "3",
        docStat: "รอการอนุมัติจากผู้สอน",
      },
      PrePost: {
        subject: {},
        teacher: {},
      },
      SubJ_Teach: {},
      user: {},
      unit: 0,
    };
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
    axios.get("/data/course_W").then((res) => {
      this.SubJ_Teach = res.data.course;
      this.formReq.requireInfo.term = res.data.term;
    });
    this.formReq.requireInfo.sub_teach.splice(0, 1);
  },
  methods: {
    addPre() {
      if (
        this.formReq.requireInfo.sub_teach.length ==
        this.SubJ_Teach.length - 1
      ) {
        swal.fire("ไม่สามารถเพิ่มได้");
        this.formReq.requireInfo.sub_teach.splice(
          this.formReq.requireInfo.sub_teach.length,
          1
        );
        this.unit -=
          this.formReq.requireInfo.sub_teach[
            this.formReq.requireInfo.sub_teach.length
          ].subject.SubCredit;
      } else if (
        this.PrePost.subject.SubJID != "" &&
        this.PrePost.teacher._id != ""
      ) {
        this.formReq.requireInfo.sub_teach.push({
          subject: this.PrePost.subject,
          teacher: this.PrePost.teacher,
        });
        this.PrePost = {
          subject: {},
          teacher: {},
        };
        this.unit +=
          this.formReq.requireInfo.sub_teach[
            this.formReq.requireInfo.sub_teach.length - 1
          ].subject.SubCredit;
      } else {
        swal.fire("โปรดเลือกรายวิชา");
      }
    },
    removeItem(index) {
      const indexOfArrayItem = this.formReq.requireInfo.sub_teach.findIndex(
        (i) => i.index == index
      );
      this.unit -= this.formReq.requireInfo.sub_teach[index].subject.SubCredit;
      this.formReq.requireInfo.sub_teach.splice(indexOfArrayItem, 1);
    },
    async insertFormRequest() {
      try {
        if (this.unit != 0) {
          this.formReq.requireInfo.totalCredit = this.unit;
          this.formReq.studentInfo = this.user._id;
          const res = await axios.post("/form/req", this.formReq);
          if (res.status == 200) {
            swal.fire("ยื่นคำร้องเสร็จสิ้น");
            this.$router.push("/home");
          }
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

