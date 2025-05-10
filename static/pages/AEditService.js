import router from "../utils/router.js";

const AEditService = {
    template: `
    <div class="container mt-4">
    <!-- Title -->
    <h1 class="text-center mb-4">Edit Service</h1>

    <!-- Confirmation Message -->
    <h2 class="text-center mb-4 text-danger">
        You are editing the service: <strong>{{ services.name }}</strong>?
    </h2>

    <!-- Edit Form -->
    <div class="row justify-content-center">
        <div class="col-lg-6">
            <div class="card shadow-sm">
                <div class="card-body">
                    <h4 class="text-center mb-4">Edit Service Details</h4>
                    <form @submit.prevent="submitinfo">
                        <!-- Service Name -->
                        <div class="form-group mb-3">
                            <label for="servicename" class="form-label">Service Name</label>
                            <input v-model="servicename" type="text" id="servicename" class="form-control" required>
                        </div>

                        <!-- Service Price -->
                        <div class="form-group mb-3">
                            <label for="serviceprice" class="form-label">Price</label>
                            <input v-model="serviceprice" type="text" id="serviceprice" class="form-control" required>
                        </div>

                        <!-- Service Description -->
                        <div class="form-group mb-3">
                            <label for="servicedescription" class="form-label">Description</label>
                            <input v-model="servicedescription" type="text" id="servicedescription" class="form-control" required>
                        </div>

                        <!-- Service Time -->
                        <div class="form-group mb-4">
                            <label for="servicetime" class="form-label">Time</label>
                            <input v-model="servicetime" type="text" id="servicetime" class="form-control" required>
                        </div>

                        <!-- Submit Button -->
                        <div class="form-group text-center">
                            <button type="submit" class="btn btn-success" @click="submitinfo">
                                <i class="fas fa-save"></i> Edit Service
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>

    `,
    props: ['serviceId'],

    data(){
        return {
            services: [],
            servicename: "",
            serviceprice: "",
            servicedescription: "",
            servicetime: "",
        };
    },  
    async mounted(){
        const resService = await fetch(`${window.location.origin}/api/editservice/${this.serviceId}`,{
            headers: {
                'Authentication-Token' : sessionStorage.getItem('token'),
            },
        })
        if(resService.ok) {
            const data = await resService.json();
            this.services=data;
        };
    },
    methods: {
        async submitinfo() {
            const url = window.location.origin;
            const res = await fetch(url+`/api/editservice/${this.serviceId}`, {
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
    },
}

export default AEditService