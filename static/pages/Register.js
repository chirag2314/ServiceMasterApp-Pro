import router from "../utils/router.js";

const Register = {
  template : `<div> 
    <div class="col-lg-6">
      <div class="d-flex justify-content-center align-items-center vh-100">
        <div class="card p-4">
          <div class="form-group mb-2">
            <h5>A few details, and you are onboard!</h5>
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
            <select v-model="service" class="service">
              <option v-for="s in services" :key="s.id" :value="s.id">{{ s.name }}</option>
            </select>
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
  </div>
  `,
  data() {
      return {
        services: [],
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
  async mounted(){
    const resServices = await fetch(window.location.origin + "/api/services")
    if (resServices.ok) {
        const data = await resServices.json();
        this.services = data;
    };
  },
  methods: {
    async submitInfo() {
      const url = window.location.origin;
      const res = await fetch(url + "/register", {
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
// commenting to resolve commit errors

export default Register;