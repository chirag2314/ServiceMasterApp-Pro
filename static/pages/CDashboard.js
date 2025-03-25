import router from "../utils/router.js";

const CDashboard = {
    template: `
    <div>
        <h1>Hello,</h1>
        <br>
        <div class="heading">
            <h2>Services for you:</h2>
            <div class="container-fluid">
                <form class="searchbar">
                    <input type="text" class="form-control" id="search" name="search" placeholder="Search for services">
                    <button type="submit" class="btn btn-primary">Search</button>
                </form>
            </div>
        </div>
        <br>
        <div class="service-list">
            <div v-for="s in services" :key="s.id" class="service">
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
                            <a class="btn btn-primary">
                                <i class="fas fa-edit fa-xs"></i>
                                Close Service
                            </a>
                        </span>
                        <span v-else>Service is {{ sr.status }}</span>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    `,
    data(){
        return{
            services: [],
            serviceRequests: [],
            user: [],
        };
    },
    async mounted(){
        const resServReq = await fetch(window.location.origin + "/api/professionals")
        if (resServReq.ok) {
            const data = await resServReq.json();
            this.serviceRequests = data;
        }
        const resServices = await fetch(window.location.origin + "/api/services")
        if (resServices.ok) {
            const data = await resServices.json();
            this.services = data;
        }
        const resUser = await fetch(window.location.origin + "/api/servicerequests")
        if (resUser.ok) {
            const data = await resUser.json();
            this.user = data;
        }
    },
    methods: {
        chooseprof(serviceId){
            router.push(`/cservice/`+serviceId)
        },
    }

}

export default CDashboard;