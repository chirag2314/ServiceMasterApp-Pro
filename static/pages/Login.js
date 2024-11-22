import router from "../utils/router.js";

const Login = {
  template: `
    <div>
    <h1>Login</h1>
    <form method="post">
    <input v-model="usertype" type="radio" id="customer" name="usertype" value="Customer" required>
    <label for="customer">Customer</label>
    <input v-model="usertype" type="radio" id="professional" name="usertype" value="Professional" required>
    <label for="professional">Professional</label>
    <br>
    <label for="username" class="form-label">Username
    <input v-model="username" type="text" name="username" id="username" class="form-control" required>
    </label>
    <br>
    <label for="password" class="form-label">Password
    <input v-model="password" type="password" name="password" id="password" class="form-control" required>
    </label>
    <input type="submit" value="Login" class="btn btn-success" @click="submit1">
    </form>
    </div> 
  `,
  data() {
    return {
        usertype: "",
        username: "",
        password: "",
    };
  },
  methods: {
    async submit1() {
        const url = window.location.origin
        const res = await fetch(url+'/login', {
            method : 'POST',
            headers : {
                "Content-Type" : 'application/json'
            },
            body : JSON.stringify({utype: this.usertype, username: this.username, password: this.password}),

        });
        if(res.ok){
            console.log('allok')
        }
    },
  },
};

export default Login;