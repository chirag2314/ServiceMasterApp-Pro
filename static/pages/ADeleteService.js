import router from "../utils/router.js";

const ADeleteService = {
    template: `
    <div>
        <h1>Delete Service</h1>
        <h2 class="text-center text-danger">
            Are you sure you want to delete the service: {{ services.name }}?
        </h2>
        <div class="col-lg-6"></div>
        <div class="col-lg-6">
            <div class="row justify-content-center">
            <div class="col-lg-4">
                <div style="margin-top: 100px">
                <h3 class="text-center">{{ services.name }}</h3>
                <p class="text-left">Description: {{ services.description }}</p>
                <p class="text-left">Price: {{ services.price }}</p>
                <p class="text-left">Time: {{ services.time }}</p>
                <div class="form-group mt-3">
                    <input type="submit" value="Delete" class="btn btn-success" @click="submitinfo">
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