import router from "../utils/router.js";

const ADeleteService = {
    template: `
    <div class="container mt-4">
    <h1 class="text-center mb-4">Delete Service</h1>

    <h2 class="text-center text-danger mb-4">
        Are you sure you want to delete the service: <strong>{{ services.name }}</strong>?
    </h2>

        <div class="row justify-content-center">
            <div class="col-lg-6">
                <div class="card shadow-sm">
                    <div class="card-body">
                        <h3 class="text-center">{{ services.name }}</h3>
                        <p class="text-left"><strong>Description:</strong> {{ services.description }}</p>
                        <p class="text-left"><strong>Price:</strong> {{ services.price }}/-</p>
                        <p class="text-left"><strong>Time:</strong> {{ services.time }}</p>

                        <!-- Delete Button -->
                        <div class="form-group text-center mt-4">
                            <button class="btn btn-danger" @click="submitinfo">
                                <i class="fas fa-trash-alt"></i> Delete Service
                            </button>
                        </div>
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
        };
    },  
    async mounted(){
        const resService = await fetch(`${window.location.origin}/api/deleteservice/${this.serviceId}`)
        if(resService.ok) {
            const data = await resService.json();
            this.services=data;
        };
    },
    methods: {
        async submitinfo() {
            const url = window.location.origin;
            const res = await fetch(url+`/api/deleteservice/${this.serviceId}`, {
                method : 'POST',
                headers : {
                    "Content-Type" : "application/json",
                    'Authentication-Token' : sessionStorage.getItem('token'),
                },
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

// commenting to resolve commit errors

export default ADeleteService