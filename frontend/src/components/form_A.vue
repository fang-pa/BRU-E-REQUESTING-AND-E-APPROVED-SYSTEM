<template>
  <div class="container-center my-6">
    <div class="flex w-full">
      <div class="grid flex-grow card rounded-box place-items-center">
        <div class="card bg-base-100 shadow-xl text-neutral" data-theme="light">
          <div class="card-body card-bordered text-lg">
            <h3 class="card-title text-center">คำร้อง{{ formReq.title }}</h3>
            <h3 class="text-center">
              ภาคการศึกษาที่ {{ formReq.requireInfo.term }}
            </h3>
            <p class="text-lg">เรื่อง {{ formReq.title }}</p>
            <p class="text-lg">
              เรียน ผู้อำนวยการสำนักส่งเสริมวิชาการและงานทะเบียน
            </p>
            <div class="divider">ข้อมูลนักศึกษา</div>
            <h5 class="mb-1">รหัสนักศึกษา : {{ user.userID }}</h5>
            <h5 class="mb-1">
              ชื่อ-นามสกุล : {{ user.name }} {{ user.surname }}
            </h5>
            <div class="divider">
              รายละเอียดวิชาที่ต้องการ{{ formReq.title }}
            </div>
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
                border-black
                text-center
              "
            >
              <thead class="bg-primary-focus">
                <tr class="text-white">
                  <th class="font-Trirong uppercase px-3 py-2">รหัสวิชา</th>
                  <th class="font-Trirong uppercase px-3 py-2">Sec</th>
                  <th class="font-Trirong uppercase px-3 py-2">
                    หน่วยกิต/ชั่วโมง
                  </th>
                  <th class="font-Trirong uppercase px-3 py-2">ชื่อวิชา</th>
                  <th class="font-Trirong uppercase px-3 py-2">ผู้สอน</th>
                  <th class="font-Trirong uppercase px-3 py-2">เวลา</th>
                  <th class="font-Trirong uppercase px-3 py-2">
                    ร่วมกับสาขา/รุ่น/หมู่
                  </th>
                  <th class="font-Trirong uppercase px-3 py-2" />
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 text-center">
                <tr v-if="requireInfo.sub_teach.length == 0">
                  <td class="px-6 py-4">ไม่มีข้อมูล</td>
                </tr>
                <tr
                  v-else
                  v-for="(SubTeach, index) in requireInfo.sub_teach"
                  :key="index"
                >
                  <td class="px-2 py-2">{{ SubTeach.subject.SubJID }}</td>
                  <td class="px-2 py-2">{{ SubTeach.subject.SubJSec }}</td>
                  <td class="px-2 py-2">{{ SubTeach.subject.SubCredit }}</td>
                  <td class="px-2 py-2">{{ SubTeach.subject.SubJName }}</td>
                  <td class="px-1 py-1">
                    {{ SubTeach.teacher.name }} {{ SubTeach.teacher.surName }}
                  </td>
                  <td class="px-2 py-2">
                    {{ nameDateTH(SubTeach.subject.NameDate) }}
                    {{ SubTeach.subject.StartH }} - {{ SubTeach.subject.EndH }}
                  </td>
                  <td class="px-2 py-2">
                    {{ SubTeach.major.majorName }}/{{ SubTeach.classOf }}/{{
                      SubTeach.group
                    }}
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
      <div class="grid flex-grow card rounded-box place-items-top">
        <div class="card w-11/12 bg-base-100 shadow-xl" data-theme="garden">
          <div class="card-body card-bordered text-lg">
            <h3 class="card-title text-center">
              แบบฟอร์มคำร้อง{{ formReq.title }}
            </h3>
            <h3 class="text-center">
              ภาคการศึกษาที่ {{ formReq.requireInfo.term }}
            </h3>
            <div class="divider">เรื่อง</div>
            <label class="label cursor-pointer">
              <span class="label-text text-xl">
                <input
                  v-model="formReq.title"
                  :value="'ขอซ่อม F'"
                  type="radio"
                  name="title"
                  class="radio checked:bg-primary bg-white"
                />
                ขอซ่อม F</span
              >
            </label>
            <label class="label cursor-pointer">
              <span class="label-text text-xl">
                <input
                  v-model="formReq.title"
                  :value="'ขอเพิ่มรายวิชาเรียน'"
                  type="radio"
                  name="title"
                  class="radio checked:bg-secondary bg-white"
                />
                ขอเพิ่มรายวิชาเรียน</span
              >
            </label>
            <div class="divider">มีความประสงค์{{ formReq.title }}</div>
            <form @submit.prevent="insertFormRequest">
              <div class="form-control">
                <button
                  class="rounded-full btn btn-info mb-2 ml-auto bg-white"
                  type="button"
                  @click="addPre()"
                >
                  เพิ่มวิชาที่ต้องการ{{ formReq.title }}
                </button>
                <label class="input-group input-group-vertical">
                  <span>ชื่อรายวิชา</span>
                  <VueMultiselect
                    v-model="PrePost.subject"
                    :options="SubJ"
                    :custom-label="subjectWithLang"
                    :close-on-select="true"
                    :clear-on-select="true"
                    placeholder="รายวิชา"
                    track-by="_id"
                    data-theme="light"
                    required
                  >
                  </VueMultiselect>
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
  {{ formReq.requireInfo.sub_teach }}
</template>

<script>
import axios from "axios";
import swal from "sweetalert2";
import VueMultiselect from "vue-multiselect";

export default {
  name: "FormReq",
  components: { VueMultiselect },
  data() {
    return {
      formReq: {
        titleID: "A",
        title: "",
        studentInfo: "",
        requireInfo: {
          sub_teach: [
            {
              subject: "",
              teacher: "",
            },
          ],
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
            C_Approved: "unknown",
            C_sign: null
          },
        },
        endState:'4',
        docStat: "รอการอนุมัติจากผู้สอน",
      },
      requireInfo: {
        sub_teach: [
          {
            subject: {},
            teacher: {},
          },
        ],
      },
      PrePost: {
        subject: {},
      },
      SubJ: {},
      user: {},
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
    axios.get("/data/subject_A").then((res) => {
      this.SubJ = res.data;
    });
    axios.get("/data/course_A").then((res) => {
      this.formReq.requireInfo.term = res.data.term;
    });
    this.formReq.requireInfo.sub_teach.splice(0, 1);
    this.requireInfo.sub_teach.splice(0, 1);
  },
  methods: {
    subjectWithLang(sub) {
      return `${sub.SubJID} ${sub.SubJName}`;
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
    async addPre() {
      try {
        if (this.PrePost.SubJID != "" && this.formReq.title != "") {
          const res = await axios.post("/data/sub_A", this.PrePost);
          if (res.status == 200) {
            this.formReq.requireInfo.sub_teach.push({
              subject: this.PrePost.subject._id,
              teacher: res.data.teach._id,
              course: res.data._id,
            });
            this.requireInfo.sub_teach.push({
              subject: this.PrePost.subject,
              teacher: {
                name: res.data.teach.name,
                surName: res.data.teach.surName,
              },
              major: res.data.major,
              classOf: res.data.classOf,
              group: res.data.group,
            });
            this.PrePost = {
              subject: {},
            };
          }
        } else {
          swal.fire("โปรดเลือกรายวิชา หรือ เรื่อง");
        }
      } catch (err) {
        const error = err.response;
        if (error.status == 409) {
          swal.fire(error.data.msg);
        } else {
          swal.fire("เกิดข้อผิดพลาด", error.data.err.msg);
        }
      }
    },
    removeItem(index) {
      const indexOfArrayItem = this.formReq.requireInfo.sub_teach.findIndex(
        (i) => i.index == index
      );
      this.formReq.requireInfo.sub_teach.splice(indexOfArrayItem, 1);
      const indexArray = this.requireInfo.sub_teach.findIndex(
        (i) => i.index == index
      );
      this.requireInfo.sub_teach.splice(indexArray, 1);
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

<style>
@import url(vue-multiselect/dist/vue-multiselect.css);
</style>