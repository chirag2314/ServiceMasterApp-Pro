import store from "./store.js";
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
import CEditServiceRequest from "../pages/CEditServiceRequest.js";

const routes = [
    {path : "/", component : Home },
    {path : "/register", component : Register},
    {path : "/login", component : Login},
    {path : "/logout", component : Logout},
    {path : "/cdashboard", component : CDashboard, meta : {requiresLogin : true, role: 'customer'}},
    {path : "/aaddservice", component : AAddService, meta : {requiresLogin : true, role: 'admin'}},
    {path : "/adashboard", component : ADashboard, meta : {requiresLogin : true, role: 'admin'}},
    {path : "/aeditservice/:serviceId", component : AEditService, props: true, meta : {requiresLogin : true, role: 'admin'}},
    {path : "/adeleteservice/:serviceId", component : ADeleteService, props: true, meta : {requiresLogin : true, role: 'admin'}},
    {path : "/aupdateprofessional/:professionalId", component : AUpdateProfessional, props: true, meta : {requiresLogin : true, role: 'admin'}},
    {path : "/cbookaservice/:professionalId/:serviceId", component : CBookAService, props: true, meta : {requiresLogin : true, role: 'customer'}},
    {path : "/ccloseservice/:srid", component : CCloseService, props: true, meta : {requiresLogin : true, role: 'customer'}},
    {path : "/cprofile", component : CProfile, meta : {requiresLogin : true}},
    {path : "/cservice/:serviceId", component : CService, props: true, meta : {requiresLogin : true, role: 'customer'}},
    {path : "/pdashboard", component : PDashboard, meta : {requiresLogin : true, role: 'professional'}},
    {path : "/peditservicerequest/:srid", component : PEditServiceRequest, props: true, meta : {requiresLogin : true, role: 'professional'}},
    {path : "/ceditservicerequest/:srid", component : CEditServiceRequest, props: true, meta : {requiresLogin : true, role: 'customer'}}
];

const router = new VueRouter({
    routes,
});

router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresLogin)) {
        if (!store.state.loggedIn) {
            next({ path: "/login" });
        } 
        else if (to.meta.role && to.meta.role !== store.state.role) {
            next({ path: "/" });
        } 
        else {
            next();
        }
    } 
    else {
        next();
    }
});
export default router;

// commenting to resolve commit errors
