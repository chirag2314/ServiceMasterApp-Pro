import router from "../utils/router.js";

const CDashboard = {
    template: `
    <div class="container mt-4">
    <h1 class="text-center mb-4">Hello, {{ custname }}</h1>

    <h2 class="text-center mb-4" v-if="active === 'Pending'">You are yet to be approved by the Admin</h2>
    <h2 class="text-center mb-4" v-if="active === 'Rejected'">You are Blocked by the Admin</h2>

    <div v-if="active === 'Approved'">
        <!-- Services Section -->
        <div class="heading mb-4">
            <h2>Services for you:</h2>
            <div class="container-fluid">
                <form class="searchbar mb-3">
                    <input v-model="searchquery" type="text" class="form-control" id="search" name="search" placeholder="Search for services">
                </form>
            </div>
        </div>

        <div class="service-list row">
            <div v-for="s in filteredServices" :key="s.id" class="col-md-4 mb-4">
                <div class="card shadow-sm">
                    <div class="card-body">
                        <h4 class="card-title">{{ s.name }}</h4>
                        <p class="card-text">{{ s.description }}</p>
                        <p class="card-text">Price: {{ s.price }}/-</p>
                        <button class="btn btn-success" @click="chooseprof(s.id)">
                            Choose a Professional
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <h3 class="mt-5">Your Services:</h3>
        <div class="table-container p-4 border rounded shadow-sm mt-4">
            <table class="table table-bordered table-striped table-sm">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Service ID</th>
                        <th>Status</th>
                        <th>Completed Date</th>
                        <th>Rating</th>
                        <th>Review</th>
                        <th>Action</th>
                    </tr>
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
                                <button class="btn btn-primary" @click="editservicerequest(sr.servicereqid)">
                                    <i class="fas fa-edit fa-xs"></i> Edit Service
                                </button>
                                <button class="btn btn-danger" @click="closeservice(sr.servicereqid)">
                                    <i class="fas fa-times fa-xs"></i> Close Service
                                </button>
                            </span>
                            <div v-else>Service is {{ sr.status }}</div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
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

export default CDashboard;