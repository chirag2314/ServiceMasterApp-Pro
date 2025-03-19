import router from "../utils/router.js";

const CBookAService = {
    template :  `
    <div>
        <h1>Book your Service</h1>
        <h4>Check your booking</h4>

            <p>Service Name : </p>
            <p>Professional Name: </p>
            <p>Customer Name: </p>
            <p>Price: Rs /-</p>
            <p id="date">Booking Date:</p>
        <script>
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleDateString();
        const message = "Booking Date: " + formattedDate;
        document.getElementById('date').textContent = message;
        </script>
        <button class="btn btn-success" @click="bookService(professional.id)">
            Book
        </button>
    </div>
    `
}

export default CBookAService;