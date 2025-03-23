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
import CProfile from "../pages/CProfile.js";
import CBookAService from "../pages/CBookAService.js";
import CCloseService from "../pages/CCloseService.js";
import CService from "../pages/CService.js";
import PDashboard from "../pages/PDashboard.js";
import PEditServiceRequest from "../pages/PEditServiceRequest.js";
import PProfile from "../pages/PProfile.js";

const routes = [
    {path : "/", component : Home },
    {path : "/register", component : Register},
    {path : "/login", component : Login},
    {path : "/logout", component : Logout},
    {path : "/cdashboard", component : CDashboard},
    {path : "/aaddservice", component : AAddService},
    {path : "/adashboard", component : ADashboard},
    {path : "/aeditservice/:serviceId", component : AEditService, props: true},
    {path : "/adeleteservice/:serviceId", component : ADeleteService, props: true},
    {path : "/aupdateprofessional/:professionalId", component : AUpdateProfessional},
    {path : "/cbookaservice", component : CBookAService},
    {path : "/ccloseservice", component : CCloseService},
    {path : "/cprofile", component : CProfile},
    {path : "/cservice", component : CService},
    {path : "/pdashboard", component : PDashboard},
    {path : "/peditservicerequest", component : PEditServiceRequest},
    {path : "/pprofile", component : PProfile},
];

const router = new VueRouter({
    routes,
});

export default router;