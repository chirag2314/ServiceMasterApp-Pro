import router from "../utils/router.js";

const PDashboard = {
    template :  `
<div class="container mt-4">
    <!-- Welcome Message -->
    <h1 class="text-center mb-4">Hello, {{ profname }}</h1>
    <h4 class="text-muted text-center mb-4">Welcome back</h4>

    <!-- Status Message (Conditional) -->
    <div v-if="active === 'Pending'" class="alert alert-warning text-center">
        <h2>You are yet to be approved by the Admin. Please contact Admin at <a href="mailto:admin@servicemaster.com">admin@servicemaster.com</a></h2>
    </div>
    <div v-if="active === 'Rejected'" class="alert alert-danger text-center">
        <h2>You are blocked by the Admin. Please contact Admin at <a href="mailto:admin@servicemaster.com">admin@servicemaster.com</a></h2>
    </div>

    <!-- Service Requests Section (Visible only if Active is Approved) -->
    <div v-if="active === 'Approved'">
        <div class="heading mb-4">
            <h2 class="text-muted text-center">Service Requests</h2>
        </div>

        <!-- Service Request Table -->
        <div class="table-responsive">
            <table class="table table-bordered table-striped">
                <thead class="thead-dark">
                    <tr>
                        <th>SR ID</th>
                        <th>Customer</th>
                        <th>Professional</th>
                        <th>Request Date</th>
                        <th>Service Date</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="sr in servicerequests" :key="sr.servicereqid">
                        <td>{{ sr.servicereqid }}</td>
                        <td>{{ sr.cuser }}</td>
                        <td>{{ sr.puser }}</td>
                        <td>{{ sr.requestdate }}</td>
                        <td>{{ sr.servicedate }}</td>
                        <td>
                            <span :class="{
                                'text-warning': sr.status === 'Requested',
                                'text-success': sr.status === 'Accepted',
                                'text-muted': sr.status !== 'Requested' && sr.status !== 'Accepted'
                            }">{{ sr.status }}</span>
                        </td>
                        <td>
                            <span v-if="sr.status === 'Requested' || sr.status === 'Accepted'">
                                <button class="btn btn-primary" @click="editsr(sr.servicereqid)">
                                    <i class="fas fa-edit fa-xs"></i> Edit
                                </button>
                            </span>
                            <div v-else>
                                <span class="text-muted">Service is {{ sr.status }}</span>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
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