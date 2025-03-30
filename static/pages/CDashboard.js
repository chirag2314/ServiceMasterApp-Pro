import router from "../utils/router.js";

const CDashboard = {
    template: `
    <div>
        <h1>Hello, {{ custname }}</h1>
        <br>
        <h2 align="center" v-if="active === 'Pending'">You are yet to be approved by the Admin</h2>
        <h2 align="center" v-if="active === 'Rejected'">You are Blocked by the Admin</h2>
        <div v-if="active === 'Approved'">
            <div class="heading">
                <h2>Services for you:</h2>
                <div class="container-fluid">
                    <form class="searchbar">
                        <input v-model="searchquery" type="text" class="form-control" id="search" name="search" placeholder="Search for services">
                    </form>
                </div>
            </div>
            <br>
            <div class="service-list">
                <div v-for="s in filteredServices" :key="s.id" class="service">
                    <div class="service-info">
                        <h4>{{ s.name }}</h4>
                        <p>{{ s.description }}</p>
                        <p>Price: {{ s.price }}/-</p>
                        <form class="profbutton" @click="chooseprof(s.id)">
                            <input type="submit" value="Choose a Professional" class="btn btn-success">
                        </form>
                    </div>
                </div>
            </div>
            <br>
            <h3>Your Services:</h3>
            <table class="table">
                <thead>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Service ID</th>
                    <th>Status</th>
                    <th>Completed Date</th>
                    <th>Rating</th>
                    <th>Review</th>
                    <th>Action</th>
                </thead>
                <tbody>
                    <tr v-for="sr in serviceRequests" :key="sr.servicereqid">
                        <td>{{ sr.servicereqid }}</td>
                        <td>{{ sr.puser }}</td>
                        <td>{{ sr.service_id }}</td>
                        <td>{{ sr.status }}</td>
                        <td>
                            <span v-if="sr.status !== 'Completed'">{{ sr.completedate }}</span>
                            <span v-else>Service is {{ sr.status }}</span>
                        </td>
                        <td>
                            <span v-if="sr.status !== 'Declined'">{{ sr.rating || 'N/A' }}</span>
                            <span v-else>N/A</span>
                        </td>
                        <td>
                            <span v-if="sr.status !== 'Declined'">{{ sr.review || 'N/A' }}</span>
                            <span v-else>N/A</span>
                        </td>
                        <td>
                            <span v-if="sr.status === 'Requested' || sr.status === 'Accepted'">
                                <a class="btn btn-primary" @click="editservicerequest(sr.servicereqid)">
                                    <i class="fas fa-edit fa-xs"></i>
                                    Edit Service
                                </a>
                                <a class="btn btn-primary" @click="closeservice(sr.servicereqid)">
                                    <i class="fas fa-edit fa-xs"></i>
                                    Close Service
                                </a>
                            </span>
                            <div v-else>Service is {{ sr.status }}</div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    `,
    data(){
        return{
            services: [],
            serviceRequests: [],
            user: [],
            custname: "",
            active: sessionStorage.getItem('active'),
            searchquery: ""
        };
    },

    computed: {
        filteredServices() {
            if (!this.searchquery) {
                return this.services;
            }
            const searchQueryLower = this.searchquery.toLowerCase();
            return this.services.filter(service => {
                return (
                    service.name.toLowerCase().includes(searchQueryLower) 
                );
            });
        },
    },

    async mounted(){
        const resUser = await fetch(window.location.origin + "/api/professionals",{
            headers:{
                'Authentication-Token' : sessionStorage.getItem('token'),
            },
        })
        if (resUser.ok) {
            const data = await resUser.json();
            this.user = data;
        };
        const resServices = await fetch(window.location.origin + "/api/services",{
            headers:{
                'Authentication-Token' : sessionStorage.getItem('token'),
            },
        })
        if (resServices.ok) {
            const data = await resServices.json();
            this.services = data;
        }
        const resServReq = await fetch(window.location.origin + "/api/servicerequestsc/"+ sessionStorage.getItem('id'),{
            headers:{
                'Authentication-Token' : sessionStorage.getItem('token')
            },
        })
        if (resServReq.ok) {
            const data = await resServReq.json();
            this.serviceRequests = data;
        }
        this.custname=sessionStorage.getItem('name')
    },
    methods: {
        chooseprof(serviceId){
            router.push(`/cservice/`+serviceId);
        },
        closeservice(srid){
            router.push(`/ccloseservice/`+srid);
        },
        editservicerequest(srid){
            router.push(`/ceditservicerequest/`+srid);
        },
    },
};
// commenting to resolve commit errors

export default CDashboard;