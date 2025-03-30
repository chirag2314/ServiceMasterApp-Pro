import router from "../utils/router.js";

const CProfile = {
    template :  `
    <div class="container mt-4">
    <!-- Welcome Message -->
    <h1 class="text-center mb-4">Welcome, {{ name }}</h1>

    <!-- User Info -->
    <h2 class="text-center text-muted mb-4">{{ email }}, {{ role }}</h2>

    <!-- Edit Profile Section -->
    <h4 class="text-center mb-3">Edit Profile</h4>

    <!-- Edit Profile Form -->
    <div class="row justify-content-center">
        <div class="col-lg-6">
            <div class="card shadow-sm">
                <div class="card-body">
                    <!-- Password Input -->
                    <div class="form-group mb-3">
                        <label for="password" class="form-label">Change Password:</label>
                        <input v-model="password" type="password" name="password" id="password" class="form-control" required>
                    </div>

                    <!-- Submit Button -->
                    <div class="form-group text-center mt-4">
                        <button type="submit" class="btn btn-success" @click=submitinfo>
                            <i class="fas fa-save"></i> Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

    `,
    data(){
        return {
            name: "",
            role: "",
            email: "",
            password: ""
        }
    },
    async mounted(){
        this.name=sessionStorage.getItem('name'),
        this.role=sessionStorage.getItem('role'),
        this.email=sessionStorage.getItem('email')
    },
    methods: {
        async submitinfo() {
            const url = window.location.origin;
            const res = await fetch(url+`/edituser/${sessionStorage.getItem('id')}`, {
                method : 'POST',
                headers : {
                    "Content-Type" : "application/json",
                    'Authentication-Token' : sessionStorage.getItem('token'),
                },
                body : JSON.stringify({ password: this.password}),
            });
            if(res.ok){
                switch (sessionStorage.getItem('role')){
                    case "admin":
                      router.push("/adashboard");
                      break;
                    case "professional":
                      router.push("/pdashboard");
                      break;
                    case "customer":
                      router.push("/cdashboard");
                      break;
                  }
            }
            else{
                console.log("someerror")
            }
        }
    },
}
// commenting to resolve commit errors

export default CProfile;