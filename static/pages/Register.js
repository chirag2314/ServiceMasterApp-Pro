const CRegister = {
    template : `<div> 
    <h1>Register as Customer</h1>
    <div class="d-flex justify-content-center align-items-center vh-100">
      <div class="card shadow p-4">
        <h3 class="card-title text-center mb-4">Sign Up</h3>
        <div class="form-group mb-3">
          <input v-model="email" type="email" class="form-control" placeholder="Email" required/>
        </div>
        <div class="form-group mb-4">
          <input v-model="password" type="password" class="form-control" placeholder="Password" required/>
        </div>
        <div class="form-group mb-4">
          <select v-model="role" class="form-control">
            <option value="stud">Customer</option>
            <option value="inst">Professional</option>
          </select>
        </div>
        <button class="btn btn-primary w-100" @click="submitInfo">Submit</button>
      </div>
    </div>
    `,
    data() {
        return {
          email: "",
          password: "",
          role: "",
        };
      },
    methods: {
        async submitInfo() {
        const origin = window.location.origin;
        const url = `${origin}/register`;
        const res = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: this.email,
              password: this.password,
              role: this.role,
            }),
            credentials: "same-origin",
        });
        if (res.ok) {
            const data = await res.json();
            console.log(data);
            router.push("/login");
        } 
        else {
            const errorData = await res.json();
            console.error("Sign up failed:", errorData);
        }
        },
    },
};

export default Register;