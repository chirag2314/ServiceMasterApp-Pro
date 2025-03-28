import router from "../utils/router.js";

const AAddService = {
    template: `
    <div>
    <h1>Add Service</h1>
    <div class="form-group">
    <div @submit.prevent="submitService" >
      <!-- Service Name -->
      <label for="servicename" class="form-label">Name
        <input v-model="servicename" type="text" id="servicename" required>
      </label>
      <br>

      <!-- Service Price -->
      <label for="serviceprice" class="form-label">Price
        <input v-model="serviceprice" type="text" id="serviceprice" required>
      </label>
      <br>

      <!-- Service Description -->
      <label for="servicedescription" class="form-label">Description
        <input v-model="servicedescription" type="text" id="servicedescription" required>
      </label>
      <br>

      <!-- Service Time -->
      <label for="servicetime" class="form-label">Time
        <input v-model="servicetime" type="text" id="servicetime"  required>
      </label>
      <br>

      <!-- Submit Button -->
      <button class="btn btn-success" @click="submitinfo">
        Add Service
      </button>
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