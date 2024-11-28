import Home from "../pages/Home.js";
import Register from "../pages/Register.js";
import Login from "../pages/Login.js";
import Logout from "../pages/Logout.js";
import CDashboard from "../pages/CDashboard.js";

const routes = [
    {path : "/", component : Home },
    {path : "/register", component : Register},
    {path : "/login", component : Login},
    {path : "/logout", component : Logout},
    {path : "/cdashboard", component : CDashboard},
];

const router = new VueRouter({
    routes,
});

export default router;