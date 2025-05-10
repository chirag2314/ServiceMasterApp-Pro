import store from "../utils/store.js";
import router from "../utils/router.js";

const Navbar = {
    template : `
    <nav class="navbar navbar-expand-lg navbar-light bg-transparent">
  <a class="navbar-brand text-dark" href="/">ServiceMasterApp PRO</a>
  <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav">
      <li class="nav-item">
        <router-link class="nav-link text-dark" to="/">Home</router-link>
      </li>
      <li class="nav-item" v-if="!state.loggedIn">
        <router-link class="nav-link text-dark" to="/login">Login</router-link>
      </li>
      <li class="nav-item" v-if="!state.loggedIn">
        <router-link class="nav-link text-dark" to="/register">Register</router-link>
      </li>
      <li class="nav-item" v-if="state.loggedIn && state.role === 'customer'">
        <router-link class="nav-link text-dark" to="/cdashboard">Dashboard</router-link>
      </li>
      <li class="nav-item" v-if="state.loggedIn && state.role === 'professional'">
        <router-link class="nav-link text-dark" to="/pdashboard">Dashboard</router-link>
      </li>
      <li class="nav-item" v-if="state.loggedIn && state.role === 'admin'">
        <router-link class="nav-link text-dark" to="/adashboard">Dashboard</router-link>
      </li>
      <li class="nav-item" v-if="state.loggedIn">
        <router-link class="nav-link text-dark" to="/cprofile">Profile</router-link>
      </li>
      <li class="nav-item" v-if="state.loggedIn">
        <a class="nav-link text-dark" :href="url" @click="logout">Logout</a>
      </li>
    </ul>
  </div>
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

export default Navbar;