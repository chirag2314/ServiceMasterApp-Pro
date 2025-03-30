import router from "../utils/router.js";

const CCloseService = {
    template :  `
    <div>
        <h1>Close Service Request</h1>
        <form @submit.prevent="closeservice">
            <label for="rating" class="form-label">Rating (On a scale of 1-5)</label>
            <input v-model="rating" type="text" name="rating" id="rating" class="form-control" required>
            <br>
            <label for="name" class="form-label">Review</label>
            <input v-model="review" type="text" name="review" id="review" class="form-control" required>
            <br>
            <div class="button">
                <input type="submit" value="Close Service Request" class="btn btn-success">
            </div>
        </form> 
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
// commenting to resolve commit errors

export default CCloseService;