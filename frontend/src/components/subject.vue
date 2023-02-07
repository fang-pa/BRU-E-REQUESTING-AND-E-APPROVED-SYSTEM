<template>
  <div class="flex w-full h-screen space-x-5" data-theme="dark">
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
      <div class="card bg-base-200 shadow-xl overflow-auto">
        <h2 class="text-center my-2 text-2xl text-white">รายวิชา</h2>
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
          "
        >
          <thead class="bg-primary-focus">
            <tr class="text-white">
              <th class="font-Trirong uppercase px-3 py-2">รหัสรายวิชา</th>
              <th class="font-Trirong uppercase px-3 py-2">Sec</th>
              <th class="font-Trirong uppercase px-3 py-2">หน่วยกิต</th>
              <th class="font-Trirong uppercase px-3 py-2">ชื่อรายวิชา</th>
              <th class="font-Trirong uppercase px-3 py-2">เวลา</th>
              <th class="font-Trirong uppercase px-3 py-2">สถานะ</th>
              <th class="font-Trirong uppercase px-3 py-2" />
              <th class="font-Trirong uppercase px-3 py-2" />
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 text-center text-neutral">
            <tr v-for="subj in showSubJ" :key="subj._id">
              <td class="px-2 py-2">{{ subj.SubJID }}</td>
              <td class="px-2 py-2">{{ subj.SubJSec }}</td>
              <td class="px-2 py-2">{{ subj.SubCredit }}</td>
              <td class="px-2 py-2">{{ subj.SubJName }}</td>
              <td class="px-2 py-2">
                {{ nameDateTH(subj.NameDate) }}
                {{ subj.StartH }} - {{ subj.EndH }}
              </td>              
              <td class="px-2 py-2">{{ subj.status ? 'เปิดสอน': 'ไม่มีสอน' }}</td>
              <td class="px-2 py-2">
                <a
                  @click="sendData(subj._id)"
                  href="#Edit"
                  class="btn modal-button"
                >
                  แก้ไข
                </a>
              </td>
              <td class="px-2 py-2">
                <button @click="deleteSubject(subj._id)" class="btn bg-white">
                  ลบ
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="grid flex-grow card rounded-box place-items-top justify-center">
      <div class="card w-96 bg-base-200 shadow-xl">
        <form @submit="insertSubject" class="mb-8 mx-8">
          <h1 class="text-center my-2 text-2xl text-white">จัดการรายวิชา</h1>
          <div class="form-control text-lg space-y-4 text-white mb-3">
            <div class="grid grid-cols-3 space-x-1">
              <div>
                <label class="input-group input-group-vertical">
                  <span>รหัสวิชา</span>
                  <input
                    v-model="subject.SubJID"
                    required
                    type="text"
                    placeholder="รหัสรายวิชา"
                    class="input input-bordered bg-white text-black"
                  />
                </label>
              </div>
              <div>
                <label class="input-group input-group-vertical">
                  <span>Section</span>
                  <input
                    v-model="subject.SubJSec"
                    required
                    type="text"
                    placeholder="Section"
                    class="input input-bordered bg-white text-black"
                  />
                </label>
              </div>
              <div>
                <label class="input-group input-group-vertical">
                  <span>หน่วยกิต</span>
                  <input
                    v-model="subject.SubCredit"
                    required
                    type="text"
                    placeholder="หน่วยกิต"
                    class="input input-bordered bg-white text-black"
                  />
                </label>
              </div>
            </div>
            <div class="grid grid-cols-3 space-x-1">
              <div class="col-span-2">
                <label class="input-group input-group-vertical">
                  <span>ชื่อรายวิชา</span>
                  <input
                    v-model="subject.SubJName"
                    required
                    type="text"
                    placeholder="ชื่อรายวิชา"
                    class="input input-bordered bg-white text-black"
                  />
                </label>
              </div>
              <div>
                <label class="input-group input-group-vertical">
                  <span>วัน</span>
                  <select
                    v-model="subject.NameDate"
                    class="select w-full max-w-xs bg-white text-black"
                  >
                    <option value="sunday">อาทิตย์</option>
                    <option value="monday">จันทร์</option>
                    <option value="tuesday">อังคาร</option>
                    <option value="wednesday">พุธ</option>
                    <option value="thursday">พฤหัสบดี</option>
                    <option value="friday">ศุกร์</option>
                    <option value="saturday">เสาร์</option>
                  </select>
                </label>
              </div>
            </div>
            <div class="grid grid-cols-2 space-x-2">
              <label class="input-group input-group-vertical">
                <span>เวลาเริ่ม</span>
                <input
                  v-model="subject.StartH"
                  required
                  type="time"
                  placeholder="H"
                  class="input input-bordered bg-white text-black"
                  min="0" max="24"
                />
              </label>
              <label class="input-group input-group-vertical">
                <span>เวลาสิ้นสุด</span>
                <input
                  v-model="subject.EndH"
                  required
                  type="time"
                  placeholder="H"
                  class="input input-bordered bg-white text-black"
                />
              </label>
            </div>
            <button class="btn btn-primary rounded-full" type="submit">
              เพิ่มรายวิชา
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <div class="modal" id="Edit" data-theme="dark">
    <div class="modal-box">
      <form>
        <h1 class="text-center my-2 text-2xl text-white">แก้ไขรายวิชา</h1>
        <div class="form-control text-lg space-y-4 text-white mb-3">
          <div class="grid grid-cols-3 space-x-1">
            <div>
              <label class="input-group input-group-vertical">
                <span>รหัสวิชา</span>
                <input
                  v-model="updateSubJ.SubJID"
                  required
                  type="text"
                  placeholder="รหัสรายวิชา"
                  class="input input-bordered bg-white text-black"
                />
              </label>
            </div>
            <div>
              <label class="input-group input-group-vertical">
                <span>Section</span>
                <input
                  v-model="updateSubJ.SubJSec"
                  required
                  type="text"
                  placeholder="Section"
                  class="input input-bordered bg-white text-black"
                />
              </label>
            </div>
            <div>
              <label class="input-group input-group-vertical">
                <span>หน่วยกิต</span>
                <input
                  v-model="updateSubJ.SubCredit"
                  required
                  type="text"
                  placeholder="หน่วยกิต"
                  class="input input-bordered bg-white text-black"
                />
              </label>
            </div>
          </div>
          <div class="grid grid-cols-3 space-x-1">
            <div class="col-span-2">
              <label class="input-group input-group-vertical">
                <span>ชื่อรายวิชา</span>
                <input
                  v-model="updateSubJ.SubJName"
                  required
                  type="text"
                  placeholder="ชื่อรายวิชา"
                  class="input input-bordered bg-white text-black"
                />
              </label>
            </div>
            <div>
              <label class="input-group input-group-vertical">
                <span>วัน</span>
                <select
                  v-model="updateSubJ.NameDate"
                  class="select w-full max-w-xs bg-white text-black"
                >
                  <option value="sunday">อาทิตย์</option>
                  <option value="monday">จันทร์</option>
                  <option value="tuesday">อังคาร</option>
                  <option value="wednesday">พุธ</option>
                  <option value="thursday">พฤหัสบดี</option>
                  <option value="friday">ศุกร์</option>
                  <option value="saturday">เสาร์</option>
                </select>
              </label>
            </div>
          </div>
          <div class="grid grid-cols-2 space-x-2">
            <label class="input-group input-group-vertical">
              <span>เวลาเริ่ม</span>
              <input
                v-model="updateSubJ.StartH"
                required
                type="time"
                placeholder="H"
                class="input input-bordered bg-white text-black"
              />
            </label>
            <label class="input-group input-group-vertical">
              <span>เวลาสิ้นสุด</span>
              <input
                v-model="updateSubJ.EndH"
                required
                type="time"
                placeholder="H"
                class="input input-bordered bg-white text-black"
              />
            </label>
          </div>
        </div>
        <label class="input-group input-group-vertical">
          <span>สถานะ</span>
          <select
            v-model="updateSubJ.status"
            class="select w-full max-w-xs bg-white text-black"
          >
            <option value="true">เปิดสอน</option>
            <option value="false">ปิดวิชา</option>
          </select>
        </label>
      </form>
      <div class="modal-action">
        <a href="#" class="btn bg-white">ยกเลิก</a>
        <a
          @click="updateSubject(updateSubJ._id)"
          type="submit"
          class="btn btn-primary"
          href="#"
        >
          บันทึก
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import swal from "sweetalert2";

export default {
  name: "SubJect",
  data() {
    return {
      showSubJ: [],
      subject: {
        SubCredit:3,
        status: true
      },
      updateSubJ: {},
    };
  },
  created() {
    const token = localStorage.getItem("token");
    if (!token) {
      swal.fire("โปรดเข้าสู่ระบบ");
      this.$router.push("/");
    }
    axios
      .get("/data/subject")
      .then((res) => {
        this.showSubJ = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
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
    async insertSubject() {
      try {
        const res = await axios.post("/data/create-subject", this.subject);
        if (res) {
          swal.fire("เพิ่มรายวิชาเสร็จสิ้น");
        } else {
          swal.fire("โปรดตรวจสอบข้อมูลให้ถูกต้อง");
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
    async sendData(id) {
      const res = await axios.get("/data/subject/" + id);
      if (res) {
        this.updateSubJ = res.data;
      }
    },
    async updateSubject(id) {
      try {
        const res = await axios.put(
          "/data/update-subject/" + id,
          this.updateSubJ
        );
        if (res) {
          swal.fire("แก้ไขรายวิชาเสร็จสิ้น");
        } else {
          swal.fire("โปรดตรวจสอบข้อมูลให้ถูกต้อง");
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
    async deleteSubject(id) {
      const indexOfArrayItem = this.showSubJ.findIndex((i) => i._id == id);
      if (window.confirm("Do you really want to delete?")) {
        if (await axios.delete("/data/delete-subject/" + id)) {
          this.showSubJ.splice(indexOfArrayItem, 1);
        }
      }
    },
  },
};
</script>

<style scoped>
body {
  height: 100%;
}

body {
  display: flex;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 10px;
}

.form-signin {
  max-width: 330px;
  padding: 15px;
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}

.form-signin input[type="text"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
</style>