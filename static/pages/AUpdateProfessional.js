import router from "../utils/router.js";

const AUpdateProfessional = {
    template: `
    <div>
    <h1>Update Professional</h1>
    <h2>You are currently updating the Status for professional.name</h2>
    <form  method="post" class="form">
        <label for="status">Professional Status</label>
        <select name="status" id="status">
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select> 
    <br>
    <input type="submit" value="Update Professional" class="btn btn-success">
    </form>
    </div>
    `
}

export default AUpdateProfessional