import Home from "../pages/Home.js";
import Register from "../pages/Register.js";
import Login from "../pages/Login.js";
import Logout from "../pages/Logout.js";
import CDashboard from "../pages/CDashboard.js";
import AAddService  from "../pages/AAddService.js";
import ADashboard from "../pages/ADashboard.js";
import AEditService from "../pages/AEditService.js";
import ADeleteService from "../pages/ADeleteService.js";
import AUpdateProfessional from "../pages/AUpdateProfessional.js";

const routes = [
    {path : "/", component : Home },
    {path : "/register", component : Register},
    {path : "/login", component : Login},
    {path : "/logout", component : Logout},
    {path : "/cdashboard", component : CDashboard},
    {path : "/aaddservice", component : AAddService},
    {path : "/adashboard", component : ADashboard},
    {path : "/aeditservice", component : AEditService},
    {path : "/adeleteservice", component : ADeleteService},
    {path : "/aupdateprofessional", component : AUpdateProfessional},
];

const router = new VueRouter({
    routes,
});

export default router;