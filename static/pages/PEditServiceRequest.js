import router from "../utils/router.js";

const PEditServiceRequest = {
    template :  `
    <div>
 <h1>Update Service Request</h1>
    <h2>You are currently updating the Status for Request </h2>
    <form  @submit.prevent="updateservice">
        <label for="status">Service Request Status</label>
        <select v-model="status" name="status" id="status">
          <option value="Accepted">Accepted</option>
          <option value="Declined">Declined</option>
          <option value="Closed">Closed</option>
        </select> 
    <br>
    <input type="submit" value="Update Request" class="btn btn-success">
    </form>
    </div>
    `,

    props: ['srid'],

    data(){
      return {
        status: ""
      };
    },
    methods: {
      async updateservice(){
        const res = await fetch(window.location.origin + `/peditservicerequest/` + this.srid, {
          method: 'POST',
          headers : {
              "Content-Type" : "application/json",
              'Authentication-Token' : sessionStorage.getItem('token'),
          },
          body: JSON.stringify({
              status: this.status
          }),
        });
        if(res.ok){
          router.push("/pdashboard")
        }
        else{
          console.log("someerror")
        };
      },
    },

}

export default PEditServiceRequest;