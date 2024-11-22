import Home from "../pages/Home.js";
import CRegister from "../pages/CRegister.js";
import PRegister from "../pages/PRegister.js";
import Login from "../pages/Login.js";
import Logout from "../pages/Logout.js";


const routes = [
    {path : "/", component : Home },
    {path : "/cregister", component : CRegister},
    {path : "/pregister", component : PRegister},
    {path : "/login", component : Login},
    {path : "/logout", component : Logout},
]

const router = new VueRouter({
    routes,
})

export default router;