import router from "../utils/router.js";

const Register = {
  template : `
  <div class="container vh-100">
  <div class="row justify-content-center align-items-center h-100">
    <div class="col-lg-6 col-md-8 col-sm-12">
      <div class="card p-4 shadow-sm">
        <!-- Form Title -->
        <h5 class="text-center mb-4">A few details, and you are onboard!</h5>
        
        <!-- Role Selection -->
        <div class="form-group mb-3">
          <label for="role">Role:</label>
          <select v-model="role" class="form-control" id="role">
            <option value="customer">Customer</option>
            <option value="professional">Professional</option>
          </select>
        </div>

        <!-- Email -->
        <div class="form-group mb-3">
          <label for="email">Email</label>
          <input v-model="email" type="email" class="form-control" id="email" placeholder="Email" required />
        </div>

        <!-- Password -->
        <div class="form-group mb-3">
          <label for="password">Password</label>
          <input v-model="password" type="password" class="form-control" id="password" placeholder="Password" required />
        </div>

        <!-- Name -->
        <div class="form-group mb-3">
          <label for="name">Name</label>
          <input v-model="name" type="text" class="form-control" id="name" placeholder="Name" required />
        </div>

        <!-- Pincode -->
        <div class="form-group mb-3">
          <label for="pincode">Pincode</label>
          <input v-model="pincode" type="text" class="form-control" id="pincode" placeholder="Pincode" required />
        </div>

        <!-- Contact -->
        <div class="form-group mb-3">
          <label for="contact">Contact</label>
          <input v-model="contact" type="text" class="form-control" id="contact" placeholder="Contact" required />
        </div>

        <!-- Professional Details (Conditional) -->
        <div v-if="role === 'professional'">
          <!-- Service Selection -->
          <div class="form-group mb-3">
            <label for="service">Service</label>
            <select v-model="service" class="form-control" id="service">
              <option v-for="s in services" :key="s.id" :value="s.id">{{ s.name }}</option>
            </select>
          </div>

          <!-- Experience -->
          <div class="form-group mb-3">
            <label for="experience">Experience</label>
            <input v-model="experience" type="text" class="form-control" id="experience" placeholder="Experience" />
          </div>
        </div>

        <!-- Submit Button -->
        <div class="text-center">
          <button class="btn btn-primary w-100" @click="submitInfo">Submit</button>
        </div>
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