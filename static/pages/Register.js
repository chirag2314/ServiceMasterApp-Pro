const Register = {
  template : `<div> 
    <h1>Register</h1>
    <div class="d-flex justify-content-center align-items-center vh-100">
      <div class="card shadow p-4">
        <div class="form-group mb-2">
          <label>Role:</label>
          <select v-model="role" class="form-control">
            <option value="customer">Customer</option>
            <option value="professional">Professional</option>
          </select>
        </div>
        <div class="form-group mb-2">
          <label>Email</label>
          <input v-model="email" type="email" class="form-control" placeholder="Email" required/>
        </div>
        <div class="form-group mb-2">
          <label>Password</label>
          <input v-model="password" type="password" class="form-control" placeholder="Password" required/>
        </div>
        <div class="form-group mb-2">
          <label>Name</label>
          <input v-model="name" type="text" class="form-control" placeholder="Name" required/>
        </div>
        <div class="form-group mb-2">
          <label>Pincode</label>
          <input v-model="pincode" type="text" class="form-control" placeholder="Pincode" required/>
        </div>
        <div class="form-group mb-2">
          <label>Contact</label>
          <input v-model="contact" type="text" class="form-control" placeholder="Contact" required/>
        </div>
        <div v-if="role === 'professional'">
        <div class="form-group mb-2">
          <label>Service</label>
          <input v-model="service" type="text" class="form-control" placeholder="Service"/>
        </div>
        <div class="form-group mb-2">
          <label>Experience</label>
          <input v-model="experience" type="text" class="form-control" placeholder="Experience"/>
        </div>
        </div>
        <button class="btn btn-primary w-100" @click="submitInfo">Submit</button>
      </div>
    </div>
  </div>
  `,
  data() {
      return {
        role: "",
        email: "",
        password: "",
        name: "",
        pincode: "",
        contact: "",
        service: "",
        experience: "",
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
          role: this.role,
          email: this.email,
          password: this.password,
          name: this.name,
          pincode: this.pincode,
          contact: this.contact,
          service: this.role === 'professional' ? this.service : null,
          experience: this.role === 'professional' ? this.experience: null,
        }),
        credentials: "same-origin",
      });
      if(res.ok){
        router.push("/login");
      } 
      else {
        const errorData = await res.json();
        console.error("Registration failed:", errorData);
      }
    },
  },
};

export default Register;