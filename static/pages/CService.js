import router from "../utils/router.js";

const CService = {
    template :  `
    <div>
       <h3>Please choose your professional:</h3>
        <table class="table">
            <thead>
                <th>Username</th>
                <th>Name</th>
                <th>Contact</th>
                <th>Pincode</th>
                <th>Experience</th>
            </thead>
            <tbody>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td><a class="btn btn-primary" >
                        Choose
                    </a></td> 
                </tr>
            </tbody>
        </table>
    </div>
    `,
    data() {
        return {
            allProfessionals : []
        }
    },
    async mounted(){
        
    },
};

export default CService;