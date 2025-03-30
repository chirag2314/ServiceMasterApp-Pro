import router from "../utils/router.js";

const CProfile = {
    template :  `
    <div>
        <h1>Welcome, {{ name }}</h1>
    <h2 class="text-muted">{{ email }}, {{ role }}</h2>
    <h4>Edit Profile</h4>

    <form @submit.prevent="submitinfo">
        <label for="password" class="form-label"> Change Password: 
            <input v-model="password" type="password" name="password" id="password" class="form-control" required>
        </label>
        <input type="submit" value="Save Changes" class="btn btn-success">
    </form>
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