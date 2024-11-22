const CRegister = {
    template : `<div> 
    <h1>Register as Customer</h1>
    <form method="post">
    <label for="username" class="form-label">Username
    <input v-model="username" type="text" name="username" id="username" class="form-control" required>
    </label>
    <br>
    <label for="password" class="form-label">Password
    <input v-model="password" type="password" name="password" id="password" class="form-control" required>
    </label>
    <label for="pincode" class="form-label">Pincode
    <input v-model="pincode" type="text" name="pincode" id="pincode" class="form-control" minlength="6" maxlength="6" required>
    </label> 
    <label for="name" class="form-label">Name
    <input v-model="name" type="text" name="name" id="name" class="form-control" required>
    </label>
    <input type="submit" value="Register" class="btn btn-success">
    </form> 
    </div>`
}

export default CRegister;