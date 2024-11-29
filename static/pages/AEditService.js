import router from "../utils/router.js";

const AEditService = {
    template: `
    <div>
        <h1>Edit Service</h1>
        <div class="form-group">
            <div @submit.prevent="submitService" >
                <label for="servicename" class="form-label">Name
                    <input v-model="servicename" type="text" id="servicename" required>
                </label>
                <br>

                <label for="serviceprice" class="form-label">Price
                    <input v-model="serviceprice" type="text" id="serviceprice" required>
                </label>
                <br>

                <label for="servicedescription" class="form-label">Description
                    <input v-model="servicedescription" type="text" id="servicedescription" required>
                </label>
                <br>

                <label for="servicetime" class="form-label">Time
                    <input v-model="servicetime" type="text" id="servicetime"  required>
                </label>
                <br>

                <input type="submit" value="Edit Service" class="btn btn-success">
            </div>
        </div>
    </div>
    `
}

export default AEditService