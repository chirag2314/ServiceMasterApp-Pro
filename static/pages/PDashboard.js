import router from "../utils/router.js";

const PDashboard = {
    template :  `
    <div>
<h1>Hello, @ </h1>
    <h4 class="text-muted">Welcome back</h4>
    <div class="heading">
        <h2 class="text-muted">Service Requests</h2>
    </div>
    <table class="table">
        <thead>
            <th>SR ID</th>
            <th>Customer</th>
            <th>Professional</th>
            <th>Request Date</th>
            <th>Status</th>
            <th>Action</th>
        </thead>
        <tbody>

                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>
                        <a class="btn btn-primary">
                            <i class="fas fa-edit fa-xs"></i>
                            Edit
                        </a>
                       Service is 
                </td>
                </tr>
        </tbody>
    </table>
        </div>
    `
}

export default PDashboard;