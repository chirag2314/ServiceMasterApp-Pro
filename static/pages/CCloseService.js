import router from "../utils/router.js";

const CCloseService = {
    template :  `
    <div class="container mt-4">
    <!-- Title -->
    <h1 class="text-center mb-4">Close Service Request</h1>

    <!-- Close Service Form -->
    <div class="row justify-content-center">
        <div class="col-lg-6">
            <div class="card shadow-sm">
                <div class="card-body">
                    <!-- Rating Input -->
                    <div class="form-group mb-3">
                        <label for="rating" class="form-label">Rating (On a scale of 1-5)</label>
                        <input v-model="rating" type="number" name="rating" id="rating" class="form-control" min="1" max="5" required>
                    </div>

                    <!-- Review Input -->
                    <div class="form-group mb-3">
                        <label for="review" class="form-label">Review</label>
                        <input v-model="review" type="text" name="review" id="review" class="form-control" required>
                    </div>

                    <!-- Submit Button -->
                    <div class="form-group text-center mt-4">
                        <button type="submit" class="btn btn-success" @click="closeservice">
                            <i class="fas fa-check-circle"></i> Close Service Request
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
    `,
    props: ['srid'],

    data(){
        return {
            rating: "",
            review: "",
        };
    },
    methods: {
        async closeservice(){
            const res = await fetch(window.location.origin + `/ccloseservice/` + this.srid, {
                method: 'POST',
                headers : {
                    "Content-Type" : "application/json",
                    'Authentication-Token' : sessionStorage.getItem('token'),
                },
                body: JSON.stringify({
                    rating: this.rating, review: this.review
                }),
            });
            if(res.ok){
                router.push("/cdashboard")
            }
            else{
                console.log("someerror")
            };
        },
    },
};

export default CCloseService;