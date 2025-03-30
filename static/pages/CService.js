import router from "../utils/router.js";

const CService = {
    template :  `
    <div>
       <h3>Please choose your professional:</h3>
        <table class="table">
            <thead>
                <th>Username</th>
                <th>Name</th>
                <th>Contact</th>
                <th>Pincode</th>
                <th>Experience</th>
            </thead>
            <tbody>
                <tr v-for="prof in allProfessionals" :key=prof.id>
                    <td>{{ prof.email }}</td>
                    <td>{{ prof.name }}</td>
                    <td>{{ prof.contact }}</td>
                    <td>{{ prof.pincode }}</td>
                    <td>{{ prof.experience }}</td>
                    <td><a class="btn btn-primary" @click="submitinfo(prof.id,prof.service_id)">
                        Choose
                    </a></td> 
                </tr>
            </tbody>
        </table>
    </div>
    `,

    props: ['serviceId'],

    data() {
        return{
            allProfessionals : []
        };
    },
    async mounted(){
        const resProfessionals = await fetch(window.location.origin + `/api/serviceprofs/` + this.serviceId,{
            headers:{
                'Authentication-Token' : sessionStorage.getItem('token'),
            },
        });
        if (resProfessionals.ok) {
            const data = await resProfessionals.json();
            this.allProfessionals = data;
        }
    },
    methods:{
        submitinfo(pid,sid){
            router.push(`/cbookaservice/`+pid+`/`+sid);
        },
    }
};
// commenting to resolve commit errors

export default CService;