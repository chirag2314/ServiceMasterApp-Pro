import router from "../utils/router.js";
import store from "../utils/store.js"

const Login = {
  template: `
    <div class="container vh-100">
  <div class="row justify-content-center align-items-center h-100">
    <div class="col-lg-4 col-md-6 col-sm-8">
      <div class="card p-4 shadow-sm">
        <!-- Login Title -->
        <h3 class="text-center mb-4">Login</h3>
        
        <!-- Email Input -->
        <div class="form-group mb-3">
          <label for="email">Email</label>
          <input type="email" v-model="email" class="form-control" id="email" placeholder="Enter your email" required />
        </div>
        
        <!-- Password Input -->
        <div class="form-group mb-3">
          <label for="password">Password</label>
          <input type="password" v-model="password" class="form-control" id="password" placeholder="Enter your password" required />
        </div>
        
        <!-- Submit Button -->
        <div class="form-group text-center mt-4">
          <button class="btn btn-dark w-100" @click="submitinfo">LOGIN</button>
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
          sessionStorage.setItem('active',data.active);
          
          this.$store.commit("setLogin",true);
          this.$store.commit("setRole",data.role);
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
// commenting to resolve commit errors

export default Login;