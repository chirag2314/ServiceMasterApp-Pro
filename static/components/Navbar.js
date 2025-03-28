import store from "../utils/store.js";

const Navbar = {
    template : `
    <nav>
    <router-link to='/'> Home </router-link>
    <router-link v-if="!loggedIn" to='/login'> Login </router-link>
    <router-link v-if="!loggedIn" to='/register'> Register</router-link>
    <a :href="url" v-if="!loggedIn"> Logout </a>
    </nav>
    `,
    data(){
        return{
        loggedIn: store.state.loggedIn,
        url : window.location.origin + "/logout",
        };
    },
};

export default Navbar;