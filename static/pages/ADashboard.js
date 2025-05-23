import router from "../utils/router.js";

const ADashboard = {
    template : `
<div class="container mt-4">
    <h1 class="text-center mb-4">Admin Dashboard</h1>

    <div class="row mb-4">
        <div class="col-12 d-flex justify-content-between align-items-center">
            <h2 class="text-muted">Services</h2>
            <button class="btn btn-success" @click="addService">
                <i class="fas fa-plus"></i> Add Service
            </button>
        </div>
        <div class="col-12 mt-3">
            <div class="table-container p-4 border rounded shadow-sm">
                <table class="table table-bordered table-striped table-sm">
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
        </div>
    </div>

    <div class="row mb-4">
        <div class="col-12 d-flex justify-content-between align-items-center">
            <h2 class="text-muted">Professionals</h2>
        </div>
        <div class="col-12 mt-3">
            <form class="searchbar mb-3">
                <input v-model="searchquery" type="text" class="form-control" id="search" name="search" placeholder="Search for professionals">
            </form>
        </div>
        <div class="col-12">
            <div class="table-container p-4 border rounded shadow-sm">
                <table class="table table-bordered table-striped table-sm">
                    <thead>
                        <tr>
                            <th>Prof ID</th>
                            <th>Email</th>
                            <th>Name</th>
                            <th>Contact</th>
                            <th>Service</th>
                            <th>Active</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="professional in filteredProfessionals" :key="professional.id">
                            <td>{{ professional.id}} </td>
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
        </div>
    </div>

    <div class="row mb-4">
        <div class="col-12 d-flex justify-content-between align-items-center">
            <h2 class="text-muted">Service Requests</h2>
        </div>
        <div class="col-12 mt-3">
            <div class="table-container p-4 border rounded shadow-sm">
                <table class="table table-bordered table-striped table-sm">
                    <thead>
                        <tr>
                            <th>SR ID</th>
                            <th>Customer ID</th>
                            <th>Professional ID</th>
                            <th>Service ID</th>
                            <th>Request Date</th>
                            <th>Service Date</th>
                            <th>Completed Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="serviceRequest in serviceRequests" :key="serviceRequest.servicereqid">
                            <td>{{ serviceRequest.servicereqid }}</td>
                            <td>{{ serviceRequest.cuser }}</td>
                            <td>{{ serviceRequest.puser }}</td>
                            <td>{{ serviceRequest.service_id }}</td>
                            <td>{{ serviceRequest.requestdate }}</td>
                            <td>{{ serviceRequest.servicedate }}</td>
                            <td>{{ serviceRequest.completedate }}</td>
                            <td>{{ serviceRequest.status }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
`,
  data() {
    return {
      services: [],
      professionals: [],
      serviceRequests: [],
      searchquery: "",
    };
  },

  computed: {
    filteredProfessionals() {
      if (!this.searchquery) {
        return this.professionals;
      }
      const query = this.searchquery.toLowerCase();
      return this.professionals.filter(professional => {
        return (
          professional.name.toLowerCase().includes(query)
        );
      });
    }
  },

  async mounted(){
    const resProfessionals = await fetch(window.location.origin + "/api/professionals",{
        headers:{
            'Authentication-Token' : sessionStorage.getItem('token'),
        },
    });
    if (resProfessionals.ok) {
        const data = await resProfessionals.json();
        this.professionals = data;
    };
    const resServices = await fetch(window.location.origin + "/api/services",{
        headers:{
            'Authentication-Token' : sessionStorage.getItem('token'),
        },
    });
    if (resServices.ok) {
        const data = await resServices.json();
        this.services = data;
    };
    const resServiceReq = await fetch(window.location.origin + "/api/servicerequests",{
        headers:{
            'Authentication-Token' : sessionStorage.getItem('token'),
        },
    });
    if (resServiceReq.ok) {
        const data = await resServiceReq.json();
        this.serviceRequests = data;
    };
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
    deleteService(serviceId) {
        router.push(`/adeleteservice/` + serviceId);
    },
    // Navigate to Update Professional page
    updateProfessional(professionalId) {
        router.push(`/aupdateprofessional/` + professionalId);
    },
  }
};

export default ADashboard
