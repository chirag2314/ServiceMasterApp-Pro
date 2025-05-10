import router from "../utils/router.js";

const CEditServiceRequest = {
    template :  `
    <div class="container mt-4">
    <!-- Title -->
    <h1 class="text-center mb-4">Update Service Request</h1>

    <!-- Status Update Message -->
    <h2 class="text-center mb-4">
        You are currently updating the status for the request.
    </h2>

    <!-- Update Form -->
    <div class="row justify-content-center">
        <div class="col-lg-6">
            <div class="card shadow-sm">
                <div class="card-body">
                    <!-- Service Date Input -->
                    <div class="form-group mb-3">
                        <label for="serviceDate" class="form-label">Service Date:</label>
                        <input v-model="serviceDate" type="date" id="serviceDate" class="form-control" required>
                    </div>

                    <!-- Submit Button -->
                    <div class="form-group text-center mt-4">
                        <button type="submit" class="btn btn-success" @click="updateservice">
                            <i class="fas fa-sync-alt"></i> Update Request
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

    `,

    props: ['srid'],

    data(){
      return {
        serviceDate: ""
      };
    },
    methods: {
      async updateservice(){
        const res = await fetch(window.location.origin + `/ceditservicerequest/` + this.srid, {
          method: 'POST',
          headers : {
              "Content-Type" : "application/json",
              'Authentication-Token' : sessionStorage.getItem('token'),
          },
          body: JSON.stringify({
            servicedate: this.serviceDate
          }),
        });
        if(res.ok){
          router.push("/cdashboard")
        }
        else{
          console.log("someerror")
        };
      },
    },

}

export default CEditServiceRequest;