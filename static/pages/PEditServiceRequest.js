import router from "../utils/router.js";

const PEditServiceRequest = {
    template :  `
    <div class="container mt-5">
      <!-- Page Title -->
      <h1 class="text-center mb-4">Update Service Request</h1>
      <h2 class="text-center text-muted mb-4">You are currently updating the Status for Service Request</h2>

      <!-- Service Request Update Form -->
      <div class="card p-4 shadow-sm">
          <form @submit.prevent="updateservice">
              <!-- Status Dropdown -->
              <div class="form-group mb-4">
                  <label for="status" class="form-label">Service Request Status</label>
                  <select v-model="status" name="status" id="status" class="form-control" required>
                      <option value="Accepted">Accepted</option>
                      <option value="Declined">Declined</option>
                      <option value="Closed">Closed</option>
                  </select>
              </div>

              <!-- Submit Button -->
              <div class="text-center">
                  <input type="submit" value="Update Request" class="btn btn-success" @click="updateservice">
              </div>
          </form>
      </div>
    </div>

    `,

    props: ['srid'],

    data(){
      return {
        status: ""
      };
    },
    methods: {
      async updateservice(){
        const res = await fetch(window.location.origin + `/peditservicerequest/` + this.srid, {
          method: 'POST',
          headers : {
              "Content-Type" : "application/json",
              'Authentication-Token' : sessionStorage.getItem('token'),
          },
          body: JSON.stringify({
              status: this.status
          }),
        });
        if(res.ok){
          router.push("/pdashboard")
        }
        else{
          console.log("someerror")
        };
      },
    },

}

export default PEditServiceRequest;