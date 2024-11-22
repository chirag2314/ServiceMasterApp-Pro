const PRegister = {
    template : `<div>
    <h1>Register as Professional</h1>
    <form method="post" enctype="multipart/form-data">
    <label for="username" class="form-label">Username
    <input v-model="username" type="text" name="username" id="username" class="form-control" required>
    </label>
    <br>
    <label for="password" class="form-label">Password
    <input v-model="password" type="password" name="password" id="password" class="form-control" required>
    </label>
    <label for="name" class="form-label">Name
    <input v-model="name" type="text" name="name" id="name" class="form-control" required>
    </label>
    <label for="contact" class="form-label">Contact
    <input v-model="contact" type="text" name="contact" id="contact" class="form-control" required>
    </label>
    <label for="experience" class="form-label">Experience
    <input v-model="experience" type="text" name="experience" id="experience" class="form-control" required>
    </label>
    <label for="pincode" class="form-label">Pincode
    <input v-model="pincode" type="text" name="pincode" id="pincode" class="form-control" minlength="6" maxlength="6" required>
    </label> 
    <label for="profile" class="form-label">Profile
    <input v-model="file" type="file" name="profile" id="profile" class="form-control" accept=".pdf" required>
    </label>
    <input type="submit" value="Register" class="btn btn-success">
    </form> 
    </div>
`,
}

export default PRegister;