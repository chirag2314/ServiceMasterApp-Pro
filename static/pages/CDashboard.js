import router from "../utils/router.js";

const CDashboard = {
    template : `
    <div>
        <h1>Hello, </h1>
        <div class="heading">
            <h2>Services for you:</h2>
            <div class="container-fluid">
                <form @submit.prevent="searchServices" class="searchbar">
                    <input
                        type="text"
                        class="form-control"
                        v-model="searchQuery"
                        placeholder="Search for services"
                    />
                    <button type="submit" class="btn btn-primary">Search</button>
                </form>
            </div>
        </div>
    </div>`
}


export default CDashboard