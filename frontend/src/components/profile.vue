<template>
  <div class="flex w-50 mt-10">
    <div class="grid flex-grow card rounded-box place-items-center">
      <div v-if="user.role == 'Student'" class="card bg-base-300 shadow-xl ml-32 rounded-2xl" data-theme="corporate">
        <div class="card-body card-bordered text-lg ">
          <h2 class="card-title">ข้อมูลส่วนตัว</h2>
          <h5 class="mb-1">รหัสนักศึกษา : {{ user.userID }}</h5>
          <h5 class="mb-1">
            ชื่อ-นามสกุล : {{ user.name }} {{ user.surName }}
          </h5>
          <h5 class="mb-1">
            ตำแหน่ง : {{ user.role == "Student" ? "นักศึกษา" : "" }}
          </h5>
          <h5 class="mb-1">
            สาขา : {{ user.major.majorName }}
          </h5>
        </div>
      </div>
      <div v-else class="card bg-base-300 shadow-xl ml-32 rounded-2xl" data-theme="corporate">
        <div class="card-body card-bordered text-lg ">
          <h2 class="card-title">ข้อมูลส่วนตัว</h2>
          <h5 class="mb-1">รหัส : {{ user.userID }}</h5>
          <h5 class="mb-1">
            ชื่อ-นามสกุล : {{ user.name }} {{ user.surName }}
          </h5>
          <h5
            v-if="user.role == 'Admin' || user.role == 'Teacher'"
            class="mb-1"
          >
            ตำแหน่ง :
            {{ user.role == "Admin" ? "ผู้ดูแลระบบ" : "อาจารย์ผู้สอน" }}
          </h5>
          <h5
            v-if="user.role == 'Officer' || user.role == 'Registrar'"
            class="mb-1"
          >
            ตำแหน่ง :
            {{ user.role == "Officer" ? "เจ้าหน้าที่พนักงาน" : "นายทะเบียน" }}
          </h5>
          <h5 v-if="user.role == 'DirectorOfRegistration'" class="mb-1">
            ตำแหน่ง :
            {{
              user.role == "DirectorOfRegistration"
                ? "ผู้อำนวยการสำนักส่งเสริมวิชาการและงานทะเบียน"
                : ""
            }}
          </h5>
          <h5 v-show="user.role != 'Admin'" class="mb-1">
            ลายเซ็น : <img :src="user.sign"  class="bg-base-100 rounded-full"/>
          </h5>
        </div>
      </div>
    </div>
    <div class="grid flex-grow card rounded-box place-items-center">
      <div class="card w-96 bg-base-300 shadow-xl mr-32 rounded-2xl" data-theme="corporate">
        <div class="card-body card-bordered text-lg" >
          <h2 class="card-title">จัดการข้อมูลส่วนตัว</h2>
          <form @submit="update(user._id)">
            <div v-show="user.role != 'Registrar' && user.role != 'DirectorOfRegistration'" class="mb-3 form-floating">
              <label>แจ้งเตือนผ่าน Line</label>
              <input
                v-model="updateUser.lineToken.token"
                type="text"
                class="input input-bordered w-full max-w-xs"
                placeholder="Line Token"
              />
            </div>
            <div v-show="user.role != 'Admin' && user.role != 'Student'" class="mb-3 form-floating">
              <label>ลายเซ็น</label>
              <signature-pad
                :modelValue="signatureFile"
                @input="onInput"
                :width="300"
                :height="75"
                :customStyle="{ border: 'black 3px solid' }"
                :saveType="image / svg + xml"
                :saveOutput="data_url"
                ref="signaturePad"
                class="bg-base-100"
              >
              </signature-pad>
              <button
                @click.prevent="clearSignature"
                class="btn btn-sm bg-red-600 mt-3 rounded-full"
                style="float: right"
              >
                ล้าง
              </button>
            </div>
            <div class="card-actions">
              <button class="rounded-full btn btn-md bg-green-500" type="submit">
                บันทึก
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  {{ user }}
</template>

<script>
import axios from "axios";
import swal from "sweetalert2";
import SignaturePad from "vue3-signature-pad";
import { ref } from "vue";

export default {
  name: "ProFile",
  components: { SignaturePad },
  data() {
    return {
      user: {},
      updateUser: {
        lineToken: {},
      },
    };
  },
  created() {
    const token = localStorage.getItem("token");
    if (!token) {
      swal.fire("โปรดเข้าสู่ระบบ");
      this.$router.push("/");
    }
    axios
      .get("/user/profile")
      .then((res) => {
        this.user = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    async update(id) {
      try {
        if (!this.$refs.signaturePad.saveSignature().isEmpty) {
          this.updateUser.sign = this.$refs.signaturePad.saveSignature().data;
        }
        const res = await axios.put("/user/update-user/" + id, this.updateUser);
        if (res) {
          swal.fire("แก้ไขข้อมูลเสร็จสิ้น");
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
  },
  setup() {
    const signatureDataURL = ref(null);
    const signatureFile = ref(null);
    const signaturePad = ref(null);

    const getSignaturePad = () => {
      if (!signaturePad.value) {
        throw new Error("No signature pad ref could be found");
      }
      return signaturePad.value;
    };

    const clearSignature = () => {
      getSignaturePad().clearSignature();
    };

    const saveSignature = () => {
      const signature = getSignaturePad().saveSignature();
      return signature;
    };

    const onInput = (value) => {
      if (!value) {
        signatureDataURL.value = null;
        signatureFile.value = null;
      } else if (value instanceof File) {
        signatureDataURL.value = null;
        signatureFile.value = value;
      } else {
        signatureDataURL.value = value;
        signatureFile.value = null;
      }
    };
    return {
      // state
      signaturePad,
      signatureDataURL,
      signatureFile,
      // methods
      clearSignature,
      saveSignature,
      onInput,
    };
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