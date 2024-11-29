import router from "../utils/router.js";

const ADeleteService = {
    template: `
    <div>
        <h1>Delete Service</h1>
        <h2 class="text-center text-danger">
            Are you sure you want to delete the service?
        </h2>
        <input type="submit" value="Delete" class="btn btn-success">
    </div>
    `
}

export default ADeleteService