import router from "../utils/router.js";

const CCloseService = {
    template :  `
    <div>
        <h1>Close Service Request</h1>
<form method="post" enctype="multipart/form-data">
    <label for="rating" class="form-label">Rating (On a scale of 1-5)</label>
    <input type="text" name="rating" id="rating" class="form-control" required>
    <br>
    <label for="name" class="form-label">Review</label>
    <input type="text" name="review" id="review" class="form-control" required>
    <br>
    <div class="button">
        <input type="submit" value="Close Service Request" class="btn btn-success">
    </div>
</form> 
    </div>
    `
}

export default CCloseService;