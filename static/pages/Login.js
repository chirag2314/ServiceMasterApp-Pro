import router from "../utils/router.js";
import store from "../utils/store.js"

const Login = {
  template: `
    <div class="row">
      <div class="col-lg-6"></div>
      <div class="col-lg-6">
        <div class="row justify-content-center">
          <div class="col-lg-4">
            <div style="margin-top: 300px">
              <h3 class="text-center">Login</h3>
              <div class="form-group">
                <label>Email</label>
                <input type="email" v-model="email" class="form-control" />
              </div>
              <div class="form-group">
                <label>Password</label>
                <input type="password" v-model="password" class="form-control" />
              </div>
              <div class="form-group mt-3">
                <button class="btn btn-dark" @click="submitinfo">
                  LOGIN
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  data() {
    return {
        email: "",
        password: "",
    };
  },
  methods: {
    async submitinfo() {
        const url = window.location.origin;
        const res = await fetch(url+"/mylogin", {
            method : 'POST',
            headers : {
                "Content-Type" : "application/json",
            },
            body : JSON.stringify({ email: this.email, password: this.password}),

        });
        if(res.ok){
          store.commit('setLogin');
          const data = await res.json()
          sessionStorage.setItem('token', data.token);
          sessionStorage.setItem('role', data.role);
          sessionStorage.setItem('email', data.email);
          sessionStorage.setItem('id', data.id);
          sessionStorage.setItem('name', data.name);
          
          //console.log(sessionStorage.getItem('token'))

          switch (data.role){
            case "admin":
              router.push("/adashboard");
              break;
            case "professional":
              router.push("/pdashboard");
              break;
            case "customer":
              router.push("/cdashboard");
              break;
          }
        }
        else{
          console.error("Login Failed")
        }
    },
  },
};

export default Login;