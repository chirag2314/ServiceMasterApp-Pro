import router from "../utils/router.js";

const AUpdateProfessional = {
    template: `
    <div>
      <h1>Update Professional</h1>
      <h2>You are currently updating the Status for {{ professionals.name }}</h2>
      <div class="form-group">
          <label for="status">Professional Status</label>
          <select v-model="active" class="form-control">
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select> 
      <br>
      <input type="submit" value="Update Professional" class="btn btn-success" @click="submitinfo">
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