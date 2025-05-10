import router from "../utils/router.js";

const CBookAService = {
    template :  `
    <div class="container mt-4">
    <!-- Title -->
    <h1 class="text-center mb-4">Book Your Service</h1>

    <!-- Booking Details -->
    <h4 class="text-center mb-3">Check your booking</h4>

    <!-- Booking Information -->
    <div class="row justify-content-center">
        <div class="col-lg-6">
            <div class="card shadow-sm">
                <div class="card-body">
                    <p><strong>Service Name:</strong> {{ services.name }}</p>
                    <p><strong>Professional Name:</strong> {{ professional.name }}</p>
                    <p><strong>Customer Name:</strong> {{ customer_name }}</p>
                    <p><strong>Price:</strong> Rs {{ services.price }}/-</p>

                    <!-- Service Date Input -->
                    <div class="form-group mb-3">
                        <label for="serviceDate" class="form-label">Service Date:</label>
                        <input v-model="serviceDate" type="date" id="serviceDate" class="form-control" required>
                    </div>

                    <!-- Booking Date -->
                    <p><strong>Booking Date:</strong> {{ bookingDate }}</p>

                    <!-- Book Button -->
                    <div class="form-group text-center mt-4">
                        <button class="btn btn-success" @click="bookService()">
                            <i class="fas fa-calendar-check"></i> Book Service
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

    `,

    props: ['professionalId','serviceId'],

    data() {
        return {
            services: [],
            professional: [],
            customer_id: "",
            customer_name: "",
            bookingDate: "",
            serviceDate: "",
        };
    },
    async mounted(){
        const resService = await fetch(`${window.location.origin}/api/editservice/${this.serviceId}`,{
            headers:{
                'Authentication-Token' : sessionStorage.getItem('token'),
            },
        });
        if(resService.ok) {
            const data = await resService.json();
            this.services=data;
        };
        const resProf = await fetch(`${window.location.origin}/api/aupdateprofessional/${this.professionalId}`,{
            headers:{
                'Authentication-Token' : sessionStorage.getItem('token'),
            },
        });
        if(resProf.ok) {
            const data = await resProf.json();
            this.professional=data;
        };
        const currentDate = new Date();
        this.bookingDate = currentDate.toLocaleDateString();
        this.customer_id = sessionStorage.getItem('id');
        this.customer_name = sessionStorage.getItem('name');
    },
    methods: {
        async bookService(){
            const servBook = await fetch(window.location.origin + "/cbookaservice" ,{
                method: "POST",
                headers: {
                    "Authentication-Token" : sessionStorage.getItem('token'),
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    service_id: this.services.id,
                    cuser: sessionStorage.getItem('id'),
                    puser: this.professional.id,
                    requestdate: this.bookingDate,
                    servicedate: this.serviceDate,
                }),
                credentials: "same-origin",
            });
            if(servBook.ok){
                router.push("/cdashboard");
            }
            else{
                console.log("someerror");
            }
        },
    },

};

export default CBookAService;