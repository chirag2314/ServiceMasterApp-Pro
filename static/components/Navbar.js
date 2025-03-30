import store from "../utils/store.js";
import router from "../utils/router.js";

const Navbar = {
    template : `
    <nav>
    <router-link to='/'> Home </router-link>
    <router-link v-if="!state.loggedIn" to='/login'> Login </router-link>
    <router-link v-if="!state.loggedIn" to='/register'> Register </router-link>
    <router-link v-if="state.loggedIn && state.role === 'customer'" to='/cdashboard'> Dashboard </router-link>
    <router-link v-if="state.loggedIn && state.role === 'professional'" to='/pdashboard'> Dashboard </router-link>
    <router-link v-if="state.loggedIn && state.role === 'admin'" to='/adashboard'> Dashboard </router-link>
    <router-link v-if="state.loggedIn" to='/cprofile'> Profile </router-link>
    <a :href="url" v-if="state.loggedIn" @click="logout"> Logout </a>
    </nav>
    `,
    data(){
        return{
        loggedIn: store.state.loggedIn,
        url : window.location.origin + "/logout",
        };
    },

    computed:{
        state(){
            return this.$store.state;
        },
    },

    methods:{
        logout(){
            sessionStorage.clear();
            this.$store.commit('logout')
            this.$store.commit('setRole',null)
            router.push("/home");
        },
    },
};
// commenting to resolve commit errors

export default Navbar;