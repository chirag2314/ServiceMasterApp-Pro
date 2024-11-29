import router from "../utils/router.js";

const AAddService = {
    template: `
    <div>
    <h1>Add Service</h1>
    <div class="form-group">
    <div @submit.prevent="submitService" >
      <!-- Service Name -->
      <label for="servicename" class="form-label">Name
        <input v-model="servicename" type="text" id="servicename" required>
      </label>
      <br>

      <!-- Service Price -->
      <label for="serviceprice" class="form-label">Price
        <input v-model="serviceprice" type="text" id="serviceprice" required>
      </label>
      <br>

      <!-- Service Description -->
      <label for="servicedescription" class="form-label">Description
        <input v-model="servicedescription" type="text" id="servicedescription" required>
      </label>
      <br>

      <!-- Service Time -->
      <label for="servicetime" class="form-label">Time
        <input v-model="servicetime" type="text" id="servicetime"  required>
      </label>
      <br>

      <!-- Submit Button -->
      <input type="submit" value="Add Service" class="btn btn-success">
    </div>
    </div>
    </div>
    `
}

export default AAddService