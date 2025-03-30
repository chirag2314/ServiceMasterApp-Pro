import router from "../utils/router.js";

const CBookAService = {
    template :  `
    <div>
        <h1>Book your Service</h1>
        <h4>Check your booking</h4>
            <p>Service Name : {{ services.name }}</p>
            <p>Professional Name: {{ professional.name }}</p>
            <p>Customer Name: {{ customer_name }}</p>
            <p>Price: Rs {{ services.price }}/-</p>
            <p><label>Service Date:  </label><input v-model="serviceDate" type="date"></p>
            <p id="date">Booking Date: {{ bookingDate }}</p>
        <button class="btn btn-success" @click="bookService()">
            Book
        </button>
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
// commenting to resolve commit errors

export default CBookAService;