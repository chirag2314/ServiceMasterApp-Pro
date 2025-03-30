import router from "../utils/router.js";

const PDashboard = {
    template :  `
    <div>
        <h1>Hello, {{profname}} </h1>
        <h4 class="text-muted">Welcome back</h4>
        <h2 align="center" v-if="active === 'Pending'">You are yet to be approved by the Admin. Please contact Admin at admin@servicemaster.com</h2>
        <h2 align="center" v-if="active === 'Rejected'">You are Blocked by the Admin. Please contact Admin at admin@servicemaster.com</h2>
        <div v-if="active === 'Approved'">
            <div class="heading">
                <h2 class="text-muted">Service Requests</h2>
            </div>
            <table class="table">
                <thead>
                    <th>SR ID</th>
                    <th>Customer</th>
                    <th>Professional</th>
                    <th>Request Date</th>
                    <th>Service Date</th>
                    <th>Status</th>
                    <th>Action</th>
                </thead>
                <tbody>
                        <tr v-for="sr in servicerequests" :key="sr.servicereqid">
                            <td>{{ sr.servicereqid }}</td>
                            <td>{{ sr.cuser }}</td>
                            <td>{{ sr.puser }}</td>
                            <td>{{ sr.requestdate }}</td>
                            <td>{{ sr.servicedate }}</td>
                            <td>{{ sr.status }}</td>
                            <td>
                            <span v-if="sr.status === 'Requested' || sr.status === 'Accepted'">
                                <a class="btn btn-primary" @click="editsr(sr.servicereqid)">
                                    <i class="fas fa-edit fa-xs"></i>
                                    Edit
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
    data() {
        return {
            servicerequests: [],
            profname: [],
            active: sessionStorage.getItem('active')
        };
    },
    async mounted(){
        const resProf = await fetch(`${window.location.origin}/api/servicerequestsp/${sessionStorage.getItem('id')}`,{
            headers: {
                'Authentication-Token' : sessionStorage.getItem('token'),
            },
        });
        if(resProf.ok) {
            const data = await resProf.json();
            this.servicerequests=data;
        };
        this.profname=sessionStorage.getItem('name')
    },
    methods:{
        editsr(srid){
            router.push("/peditservicerequest/" + srid)
        }
    }
}

// commenting to resolve commit errors


export default PDashboard;