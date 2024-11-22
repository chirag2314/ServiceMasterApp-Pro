const Navbar = {
    template : `
    <nav>
    <router-link to='/'> Home </router-link>
    <router-link to='/login'> Login </router-link>
    <router-link to='/cregister'> Register as Customer </router-link>
    <router-link to='/pregister'> Register as Professional </router-link>
    <router-link to='/logout'> Logout </router-link>
    </nav>
    `
}

export default Navbar;