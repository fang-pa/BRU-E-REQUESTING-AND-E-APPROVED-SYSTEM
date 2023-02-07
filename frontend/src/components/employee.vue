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
        <h2 class="text-center my-2 text-2xl text-white">รายชื่อพนักงาน</h2>
        <table
          class="
            border-collapse
            table-fixed
            text-lg
            whitespace-nowrap
            bg-white
            divide-y divide-gray-300
            rounded-xl
            mb-8
            mx-8
          "
        >
          <thead class="bg-primary-focus">
            <tr class="text-white">
              <th class="font-Trirong uppercase px-3 py-2">รหัส</th>
              <th class="font-Trirong uppercase px-3 py-2">ชื่อ - นามสกุล</th>
              <th class="font-Trirong uppercase px-3 py-2">ตำแหน่ง</th>
              <th class="font-Trirong uppercase px-3 py-2" />
              <th class="font-Trirong uppercase px-3 py-2" />
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 text-center text-neutral">
            <tr v-for="emp in showEmployee" :key="emp._id">
              <td class="px-2 py-2">{{ emp.userID }}</td>
              <td class="px-2 py-2">{{ emp.name }} {{ emp.surName }}</td>
              <td class="px-2 py-2">{{ emp.role.roleTh }}</td>
              <td class="px-2 py-2">
                <a
                  @click="sendData(emp._id)"
                  href="#Edit"
                  class="btn modal-button"
                >
                  แก้ไข
                </a>
              </td>
              <td class="px-2 py-2">
                <button @click="deleteEmployee(emp._id)" class="btn bg-white">
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
      <div class="card w-96 bg-base-200 shadow-xl">
        <form @submit.prevent="insertEmployee" class="mb-8 mx-8">
          <h1 class="text-center my-2 text-2xl text-white">
            จัดการข้อมูลพนักงาน
          </h1>
          <div class="form-control text-lg space-y-4 text-white mb-3">
            <label class="input-group input-group-vertical">
              <span>รหัสพนักงาน</span>
              <input
                v-model="Employee.userID"
                required
                type="text"
                placeholder="รหัสพนักงาน"
                class="input input-bordered bg-white text-black"
              />
            </label>
            <label class="input-group input-group-vertical">
              <span>รหัสผ่าน</span>
              <input
                v-model="Employee.password"
                required
                type="password"
                placeholder="รหัสผ่าน"
                class="input input-bordered bg-white  text-black"
              />
            </label>
            <div class="grid grid-cols-2 space-x-1">
              <div>
                <label class="input-group input-group-vertical">
                  <span>ชื่อ</span>
                  <input
                    v-model="Employee.name"
                    required
                    type="text"
                    placeholder="ชื่อ"
                    class="input input-bordered bg-white  text-black"
                  />
                </label>
              </div>
              <div>
                <label class="input-group input-group-vertical">
                  <span>นามสกุล</span>
                  <input
                    v-model="Employee.surName"
                    required
                    type="text"
                    placeholder="นามสกุล"
                    class="input input-bordered bg-white  text-black"
                  />
                </label>
              </div>
            </div>

            <label class="input-group input-group-vertical">
              <span>ตำแหน่งพนักงาน</span>
              <select
                v-model="Employee.role"
                class="select w-full max-w-xs bg-white text-black"
                required
              >
                <option disabled selected>ตำแหน่งพนักงาน</option>
                <option
                  v-for="Roles in role"
                  :key="Roles._id"
                  :value="Roles._id"
                  selected
                >
                  {{ Roles.roleTh }}
                </option>
              </select>
            </label>
            <button class="btn btn-primary rounded-full" type="submit">
              เพิ่มพนักงาน
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>

  <div class="modal" id="Edit" data-theme="dark">
    <div class="modal-box">
      <form>
        <h1 class="text-center my-2 text-2xl text-white">แก้ไขข้อมูลพนักงาน</h1>
        <div class="form-control text-lg space-y-4 text-white mb-3">
          <label class="input-group input-group-vertical">
            <span>รหัสพนักงาน</span>
            <input
              v-model="updateEmployee.userID"
              required
              type="text"
              placeholder="รหัสพนักงาน"
              class="input input-bordered bg-white text-black"
            />
          </label>
          <label class="input-group input-group-vertical">
            <span>ชื่อพนักงาน</span>
            <input
              v-model="updateEmployee.name"
              required
              type="text"
              placeholder="ชื่อพนักงาน"
              class="input input-bordered bg-white text-black"
            />
          </label>
          <label class="input-group input-group-vertical">
            <span>นามสกุลพนักงาน</span>
            <input
              v-model="updateEmployee.surName"
              required
              type="text"
              placeholder="นามสกุลพนักงาน"
              class="input input-bordered bg-white text-black"
            />
          </label>
          <label class="input-group input-group-vertical">
            <span>ตำแหน่งพนักงาน</span>
            <select
              v-model="updateEmployee.role"
              class="select w-full max-w-xs bg-white text-black"
              required
            >
              <option disabled selected>ตำแหน่งพนักงาน</option>
              <option
                v-for="Roles in role"
                :key="Roles._id"
                :value="Roles._id"
                selected
              >
                {{ Roles.roleTh }}
              </option>
            </select>
          </label>
        </div>
      </form>
      <div class="modal-action">
        <a href="#" class="btn bg-white">ยกเลิก</a>
        <a
          @click="updateEmp(updateEmployee._id)"
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
  name: "EmploYee",
  data() {
    return {
      Employee: {
        lineToken: {
          thereIs: false,
        },
      },
      showEmployee: [],
      role: [],
      updateEmployee: {},
    };
  },
  created() {
    const token = localStorage.getItem("token");
    if (!token) {
      swal.fire("โปรดเข้าสู่ระบบ");
      this.$router.push("/");
    }
    axios
      .get("/user/employee")
      .then((res) => {
        this.showEmployee = res.data;
      })
      .catch((err) => {
        console.log(err);
      }),
      axios
        .get("/data/role")
        .then((res) => {
          this.role = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
  },
  methods: {
    async insertEmployee() {
      try {
        const res = await axios.post("/user/regis", this.Employee);
        if (res.status == 200) {
          swal.fire("เพิ่มพนักงานเสร็จสิ้น");
          location.reload();
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
      const res = await axios.get("/user/employee/" + id);
      if (res) {
        this.updateEmployee = res.data;
      }
    },
    async updateEmp(id) {
      try {
        const res = await axios.put(
          "/user/update-employee/" + id,
          this.updateEmployee
        );
        if (res) {
          swal.fire("แก้ไขข้อมูลพนักงานเสร็จสิ้น");
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
    async deleteEmployee(id) {
      const indexOfArrayItem = this.showEmployee.findIndex((i) => i._id == id);
      if (window.confirm("Do you really want to delete?")) {
        if (await axios.delete("/user/delete-employee/" + id)) {
          this.showEmployee.splice(indexOfArrayItem, 1);
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

.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
