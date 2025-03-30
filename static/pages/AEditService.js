import router from "../utils/router.js";

const AEditService = {
    template: `
    <div>
        <h1>Edit Service</h1>
        <h2 class="text-center text-danger">
            You are editing the service: {{ services.name }}?
        </h2>
        <div class="form-group">
            <div>
                <label for="servicename" class="form-label">Name
                    <input v-model="servicename" type="text" id="servicename" required>
                </label>
                <br>

                <label for="serviceprice" class="form-label">Price
                    <input v-model="serviceprice" type="text" id="serviceprice" required>
                </label>
                <br>

                <label for="servicedescription" class="form-label">Description
                    <input v-model="servicedescription" type="text" id="servicedescription" required>
                </label>
                <br>

                <label for="servicetime" class="form-label">Time
                    <input v-model="servicetime" type="text" id="servicetime"  required>
                </label>
                <br>
                <input type="submit" value="Edit Service" class="btn btn-success" @click="submitinfo">
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
// commenting to resolve commit errors

export default AEditService