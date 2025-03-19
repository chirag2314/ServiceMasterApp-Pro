import router from "../utils/router.js";

const PEditServiceRequest = {
    template :  `
    <div>
 <h1>Update Service Request</h1>
    <h2>You are currently updating the Status for Request </h2>
    <form  method="post" class="form">
        <label for="status">Service Request Status</label>
        <select name="status" id="status">
          <option value="Accepted">Accepted</option>
          <option value="Declined">Declined</option>
          <option value="Closed">Closed</option>
        </select> 
    <br>
    <input type="submit" value="Update Request" class="btn btn-success">
    </form>
    </div>
    `
}

export default PEditServiceRequest;