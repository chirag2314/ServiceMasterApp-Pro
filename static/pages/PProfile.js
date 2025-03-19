import router from "../utils/router.js";

const PProfile = {
    template :  `
    <div>
     <h1>Profile</h1>
    <h2 class="text-muted">@</h2>
    <h4>Edit Profile</h4>

    <form method="post">
        <label for="username" class="form-label"> Change Username: 
            <input type="text" name="username" id="username" class="form-control" required>
        </label>
        <label for="password" class="form-label"> Change Password: 
            <input type="password" name="password" id="password" class="form-control" required>
        </label>
        <input type="submit" value="Save Changes" class="btn btn-success">
    </form>
    </div>
    `
}

export default PProfile;