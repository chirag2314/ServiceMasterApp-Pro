import router from "../utils/router.js";

const AUpdateProfessional = {
    template: `
    <div class="container mt-4">
    <!-- Title -->
    <h1 class="text-center mb-4">Update Professional</h1>

    <!-- Confirmation Message -->
    <h2 class="text-center mb-4">
        You are currently updating the status for <strong>{{ professionals.name }}</strong>
    </h2>

    <!-- Update Form -->
    <div class="row justify-content-center">
        <div class="col-lg-6">
            <div class="card shadow-sm">
                <div class="card-body">
                    <form @submit.prevent="submitinfo">
                        <!-- Status Selection -->
                        <div class="form-group mb-3">
                            <label for="status" class="form-label">Professional Status</label>
                            <select v-model="active" id="status" class="form-control" required>
                                <option value="Pending">Pending</option>
                                <option value="Approved">Approved</option>
                                <option value="Rejected">Rejected</option>
                            </select>
                        </div>

                        <!-- Submit Button -->
                        <div class="form-group text-center mt-4">
                            <button type="submit" class="btn btn-success" @click="submitinfo">
                                <i class="fas fa-save"></i> Update Professional
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
    `,
    props: ['professionalId'],

    data(){
      return {
        professionals: [],
        active: "",
      };
    },  
    async mounted(){
      const resProf = await fetch(`${window.location.origin}/api/aupdateprofessional/${this.professionalId}`,{
        headers: {
          'Authentication-Token' : sessionStorage.getItem('token'),
        },
      });
      if(resProf.ok) {
        const data = await resProf.json();
        this.professionals=data;
      };
    },
    methods: {
      async submitinfo(){
        const url = window.location.origin;
        const res = await fetch(url+`/api/aupdateprofessional/${this.professionalId}`, {
          method : 'POST',
          headers : {
            "Content-Type" : "application/json",
            'Authentication-Token' : sessionStorage.getItem('token'),
          },
          body : JSON.stringify({active: this.active}),
        });
        if(res.ok){
          router.push("/adashboard")
        }
        else{
          const errorData = await res.json();
          console.log(errorData)
        }
      }
    },
}

export default AUpdateProfessional