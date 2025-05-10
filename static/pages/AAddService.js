import router from "../utils/router.js";

const AAddService = {
    template: `
    <div class="container mt-5">
    <h1 class="text-center mb-4">Add Service</h1>
    <div class="card p-4">
      <div @submit.prevent="submitService">
      
        <!-- Service Name -->
        <div class="form-group mb-3">
          <label for="servicename" class="form-label">Service Name</label>
          <input v-model="servicename" type="text" id="servicename" class="form-control" required>
        </div>

        <!-- Service Price -->
        <div class="form-group mb-3">
          <label for="serviceprice" class="form-label">Service Price</label>
          <input v-model="serviceprice" type="text" id="serviceprice" class="form-control" required>
        </div>

        <!-- Service Description -->
        <div class="form-group mb-3">
          <label for="servicedescription" class="form-label">Service Description</label>
          <input v-model="servicedescription" type="text" id="servicedescription" class="form-control" required>
        </div>

        <!-- Service Time -->
        <div class="form-group mb-3">
          <label for="servicetime" class="form-label">Service Time</label>
          <input v-model="servicetime" type="text" id="servicetime" class="form-control" required>
        </div>

        <!-- Submit Button -->
        <div class="form-group">
          <button type="submit" class="btn btn-success w-100" @click="submitinfo">
            Add Service
          </button>
        </div>
      </div>
    </div>
  </div>
    `,
    data(){
      return {
        servicename: "",
        serviceprice: "",
        servicedescription: "",
        servicetime: "",
      };
    },
    methods: {
      async submitinfo(){
        const url = window.location.origin;
        const res = await fetch(url+"/api/services", {
            method : 'POST',
            headers : {
                "Content-Type" : "application/json",
                'Authentication-Token' : sessionStorage.getItem('token'),
            },
            body : JSON.stringify({ name: this.servicename, description: this.servicedescription, price: this.serviceprice, time: this.servicetime}),
        });
        if(res.ok){
          router.push("/adashboard")
        }
        else{
          console.log("someerror")
        }
      }
    }
}
export default AAddService