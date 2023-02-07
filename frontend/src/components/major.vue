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
        <h2 class="text-center my-2 text-2xl text-white">สาขา</h2>
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
              <th class="font-Trirong uppercase px-3 py-2">รหัส</th>
              <th class="font-Trirong uppercase px-3 py-2">ชื่อ</th>
              <th class="font-Trirong uppercase px-3 py-2" />
              <th class="font-Trirong uppercase px-3 py-2" />
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 text-center text-neutral">
            <tr v-for="MaJ in showM" :key="MaJ._id">
              <td class="px-2 py-2">{{ MaJ.majorID }}</td>
              <td class="px-2 py-2">{{ MaJ.majorName }}</td>
              <td class="px-2 py-2">
                <a
                  @click="sendData(MaJ._id)"
                  href="#Edit"
                  class="btn modal-button"
                >
                  แก้ไข
                </a>
              </td>
              <td class="px-2 py-2">
                <button @click="deleteMJ(MaJ._id)" class="btn bg-white">
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
        <form @submit="insertMJ" class="mb-8 mx-8">
          <h1 class="text-center my-2 text-2xl text-white">จัดการข้อมูลสาขา</h1>
          <div class="form-control text-lg space-y-4 text-white mb-3">
            <label class="input-group input-group-vertical">
              <span>รหัส</span>
              <input
                v-model="major.majorID"
                required
                type="text"
                placeholder="รหัส"
                class="input input-bordered bg-white text-black"
              />
            </label>
            <label class="input-group input-group-vertical">
              <span>ชื่อ</span>
              <input
                v-model="major.majorName"
                required
                type="text"
                placeholder="ชื่อ"
                class="input input-bordered bg-white text-black"
              />
            </label>
            <button class="btn btn-primary rounded-full" type="submit">
              เพิ่มสาขา
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>

  <div class="modal" id="Edit" data-theme="dark">
    <div class="modal-box">
      <form>
        <h1 class="text-center my-2 text-2xl text-white">แก้ไขสาขา</h1>
        <div class="form-control text-lg space-y-4 text-white mb-3">
          <label class="input-group input-group-vertical">
            <span>รหัส</span>
            <input
              v-model="updateM.majorID"
              required
              type="text"
              placeholder="รหัส"
              class="input input-bordered bg-white text-black"
            />
          </label>
          <label class="input-group input-group-vertical">
            <span>ชื่อ</span>
            <input
              v-model="updateM.majorName"
              required
              type="text"
              placeholder="ชื่อ"
              class="input input-bordered bg-white text-black"
            />
          </label>
        </div>
      </form>
      <div class="modal-action">
        <a href="#" class="btn bg-white">ยกเลิก</a>
        <a
          @click="updateMJ(updateM._id)"
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
  name: "MaJor",
  data() {
    return {
      showM: [],
      major: {},
      updateM: {},
    };
  },
  created() {
    const token = localStorage.getItem("token");
    if (!token) {
      swal.fire("โปรดเข้าสู่ระบบ");
      this.$router.push("/");
    }
    axios
      .get("/data/major")
      .then((res) => {
        this.showM = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    async insertMJ() {
      try {
        const res = await axios.post("/data/create-major", this.major);
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
      const res = await axios.get("/data/major/" + id);
      if (res) {
        this.updateM = res.data;
      }
    },
    async updateMJ(id) {
      try {
        const res = await axios.put(
          "/data/update-major/" + id,
          this.updateM
        );
        if (res) {
          swal.fire("แก้ไขสาขาเสร็จสิ้น");
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
    async deleteMJ(id) {
      const indexOfArrayItem = this.showM.findIndex((i) => i._id == id);
      if (window.confirm("Do you really want to delete?")) {
        if (await axios.delete("/data/delete-major/" + id)) {
          this.showM.splice(indexOfArrayItem, 1);
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