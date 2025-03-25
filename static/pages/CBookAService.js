import router from "../utils/router.js";

const CBookAService = {
    template :  `
    <div>
        <h1>Book your Service</h1>
        <h4>Check your booking</h4>
            <p>Service Name : {{ services.name }}</p>
            <p>Professional Name: {{ professional.name }}</p>
            <p>Customer Name: {{ customer.name }}</p>
            <p>Price: Rs {{ services.price }}/-</p>
            <p id="date">Booking Date: {{ bookingDate }}</p>
        <button class="btn btn-success" @click="bookService(professional.id)">
            Book
        </button>
    </div>
    `,

    props: ['professionalId','serviceId'],

    data() {
        return {
            services: [],
            professional: [],
            customer: [],
        };
    },
    async mounted(){
        const resService = await fetch(`${window.location.origin}/api/editservice/${this.serviceId}`)
        if(resService.ok) {
            const data = await resService.json();
            this.services=data;
        };
        const resProf = await fetch(`${window.location.origin}/api/aupdateprofessional/${this.professionalId}`)
        if(resProf.ok) {
            const data = await resProf.json();
            this.professional=data;
        };
        const currentDate = new Date();
        this.bookingDate = currentDate.toLocaleDateString();
    },
    methods: {
        bookService(prof_id){
            router.push("/cdashboard");
        },
    },

};

export default CBookAService;