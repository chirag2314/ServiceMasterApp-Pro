import router from "../utils/router.js";

const CEditServiceRequest = {
    template :  `
    <div>
 <h1>Update Service Request</h1>
    <h2>You are currently updating the Status for Request</h2>
    <form  @submit.prevent="updateservice">
        <label>Service Date:  </label><input v-model="serviceDate" type="date"> 
    <br>
    <input type="submit" value="Update Request" class="btn btn-success">
    </form>
    </div>
    `,

    props: ['srid'],

    data(){
      return {
        serviceDate: ""
      };
    },
    methods: {
      async updateservice(){
        const res = await fetch(window.location.origin + `/ceditservicerequest/` + this.srid, {
          method: 'POST',
          headers : {
              "Content-Type" : "application/json",
              'Authentication-Token' : sessionStorage.getItem('token'),
          },
          body: JSON.stringify({
            servicedate: this.serviceDate
          }),
        });
        if(res.ok){
          router.push("/cdashboard")
        }
        else{
          console.log("someerror")
        };
      },
    },

}
// commenting to resolve commit errors1

export default CEditServiceRequest;