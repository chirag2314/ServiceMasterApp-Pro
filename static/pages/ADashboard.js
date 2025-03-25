import router from "../utils/router.js";

const ADashboard = {
    template : `
    <div>
        <h1>Admin Dashboard</h1>
            
        <div class="heading">
            <h2 class="text-muted">Services</h2>
            <button class="btn btn-success" @click="addService">
                <i class="fas fa-plus"></i> Add Service
            </button>
        </div>

        <div>
            <table class="table">
                <thead>
                    <tr>
                    <th>Service ID</th>
                    <th>Service Name</th>
                    <th>Price</th>
                    <th>Description</th>
                    <th>Time</th>
                    <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="service in services" :key="service.id">
                    <td>{{ service.id }}</td>
                    <td>{{ service.name }}</td>
                    <td>{{ service.price }}</td>
                    <td>{{ service.description }}</td>
                    <td>{{ service.time }}</td>
                    <td>
                        <button class="btn btn-primary" @click="editService(service.id)">
                        <i class="fas fa-edit fa-xs"></i> Edit
                        </button>
                        <button class="btn btn-danger" @click="deleteService(service.id)">
                        <i class="fas fa-trash fa-xs"></i> Delete
                        </button>
                    </td>
                    </tr>
                </tbody>
            </table>
        </div>
        
        <br>

        <div>
            <div class="heading">
                <h2 class="text-muted">Professionals</h2>
            </div>

            <table class="table">
                <thead>
                    <tr>
                    <th>Username</th>
                    <th>Name</th>
                    <th>Contact</th>
                    <th>Service</th>
                    <th>Active</th>
                    <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="professional in professionals" :key="professional.id">
                    <td>{{ professional.email }}</td>
                    <td>{{ professional.name }}</td>
                    <td>{{ professional.contact }}</td>
                    <td>{{ professional.service_id }}</td>
                    <td>{{ professional.active }}</td>
                    <td>
                        <button class="btn btn-primary" @click="updateProfessional(professional.id)">
                        <i class="fas fa-edit fa-xs"></i> Edit
                        </button>
                    </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <br>

        <div>
            <div class="heading">
            <h2 class="text-muted">Service Requests</h2>
            </div>
            
            <table class="table">
                <thead>
                    <tr>
                    <th>SR ID</th>
                    <th>Customer</th>
                    <th>Professional</th>
                    <th>Service</th>
                    <th>Request Date</th>
                    <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="serviceRequest in serviceRequests" :key="serviceRequest.servicereqid">
                    <td>{{ serviceRequest.servicereqid }}</td>
                    <td>{{ serviceRequest.cuser }}</td>
                    <td>{{ serviceRequest.puser }}</td>
                    <td>{{ serviceRequest.serviceid }}</td>
                    <td>{{ serviceRequest.requestdate }}</td>
                    <td>{{ serviceRequest.status }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
`,
  data() {
    return {
      services: [],
      professionals: [],
      serviceRequests: []
    };
  },
  async mounted(){
    const resProfessionals = await fetch(window.location.origin + "/api/professionals")
    if (resProfessionals.ok) {
        const data = await resProfessionals.json();
        this.professionals = data;
    }
    const resServices = await fetch(window.location.origin + "/api/services")
    if (resServices.ok) {
        const data = await resServices.json();
        this.services = data;
    }
  },
  methods: {
    // Navigate to Add Service page
    addService() {
      router.push("/aaddservice");
    },
    // Navigate to Edit Service page
    editService(serviceId) {
        router.push(`/aeditservice/` + serviceId);
    },
    // Delete a service
    deleteService(serviceId) {
        router.push(`/adeleteservice/` + serviceId);
    },
    // Navigate to Update Professional page
    updateProfessional(professionalId) {
        router.push(`/aupdateprofessional/` + professionalId);
    }
  }
};

export default ADashboard
