<template>
    <div class="wrapper">
      <main class="form-signin w-100 m-auto">
        <div class="logo">
          <img src="../assets/bru-logo-color.png" alt="" />
        </div>
        <div class="text-center mt-4 name font-Trirong">ลงชื่อเข้าใช้งาน</div>
        <form class="p-3 mt-3 font-Trirong" @submit.prevent="LoginUser">
          <div class="form-field d-flex align-items-center">
            <span class="far fa-user"></span>
            <input
              name="userName"
              v-model="login.userID"
              type="text"
              class="form-control"
              id="userName"
              placeholder="รหัสนักศึกษา"
              required
            />
          </div>
          <div class="form-field d-flex align-items-center">
            <span class="fas fa-key"></span>
            <input
              v-model="login.password"
              name="password"
              type="password"
              class="form-control"
              id="pwd"
              placeholder="รหัสผ่าน"
              required
            />
          </div>
          <button class="btn mt-3 btn-primary" type="submit">
            เข้าสู่ระบบ
          </button>
        </form>
      </main>
    </div>

</template>

<script>
import axios from "axios";
import swal from "sweetalert2";

export default {
  name: "LogIn",
  data() {
    return {
      login: {},
    };
  },
  methods: {
    async LoginUser() {
      try {
        const res = await axios.post("/user/login", this.login);
        console.log(res)
        const token = res.data.token;
        if (token) {
          localStorage.setItem("token", token);
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

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}

.wrapper {
  max-width: 350px;
  min-height: 500px;
  margin: 80px auto;
  padding: 40px 30px 30px 30px;
  background-color: #f9f9f9;
  border-radius: 15px;
  box-shadow: 13px 13px 20px #cccccc;
}

.logo {
  width: 80px;
  margin: auto;
}

.logo img {
  width: 100%;
  height: 80px;
  object-fit: cover;
  border-radius: 50%;
  box-shadow: 0px 0px 3px #5f5f5f, 0px 0px 0px 5px #ecf0f3, 8px 8px 15px #a7aaa7,
    -8px -8px 15px #fff;
}

.wrapper .name {
  font-weight: 600;
  font-size: 1.4rem;
  letter-spacing: 1.3px;
  padding-top: 20px;
  padding-bottom: 20px;
  color: rgb(0, 0, 0);
}

.wrapper .form-field input {
  width: 100%;
  display: block;
  border: none;
  outline: none;
  background: none;
  font-size: 1.2rem;
  color: #666;
  padding: 10px 15px 10px 10px;
  /* border: 1px solid red; */
}

.wrapper .form-field {
  padding-left: 10px;
  margin-bottom: 20px;
  border-radius: 20px;
  box-shadow: inset 8px 8px 8px #e2e2e2, inset -8px -8px 8px #fff;
}

.wrapper .form-field .fas {
  color: #555;
}

.wrapper .btn {
  box-shadow: none;
  width: 100%;
  height: 40px;
  background-color: #000000;
  color: #fff;
  border-radius: 25px;
  box-shadow: 3px 3px 3px #b1b1b1, -3px -3px 3px #fff;
  letter-spacing: 1.3px;
}

.wrapper .btn:hover {
  background-color: #868686;
}

.wrapper a {
  text-decoration: none;
  font-size: 0.8rem;
  color: #03a9f4;
}

.wrapper a:hover {
  color: #039be5;
}

@media (max-width: 380px) {
  .wrapper {
    margin: 30px 20px;
    padding: 40px 15px 15px 15px;
  }
}
</style>