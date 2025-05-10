# ServiceMasterApp Pro
## About

ServiceMasterApp Pro is a multi-user household services application developed as part of Modern Application Development 2 course, made using Flask framework, VueJS, Flask-RESTful, Flask-security and SQLite Database. This app let's customers search, book service and professionals. The admin create/edit/deletes services, approves professionals.

## Features

1. 3 Types of users: Admin, Customer, Professional
2. RBAC for authentication and authorization using flask-security
3. Ability to search services based on name
4. Customers can give ratings and reviews to products
5. Scheduled tasks for sending daily email reminders and monthly reports using Celery.

## Functionalities
### Customer
1. Can search for services based on name
2. Can book a Service Request for Professional of their choice
3. Can close a Service Request with Review and Rating
4. Modiy personal details and password
5. (WIP) Summary Page with service request history

### Professionals
1. Can choose to accept/decline service requests
2. Receives daily email reminders and monthly reports based on their activity
3. (WIP) Summary Page with service history

### Admin
1. Can create/edit/delete various services
2. Can Block/Approve a Professional
3. Can see summary of all service requests
4. (WIP) Summary Page with professionals and Service Requests history

## Tech Stack
### Backend:
- **Flask** - Lightweight web framework
- **Flask RESTful** - for APIs
- **SQLAlchemy** - ORM for database operations
- **SQLite** - Database

### Frontend:
- **VueJS** - Reactive frontend framework
- **HTML/CSS** - Frontend Markup and styling
- **Bootstrap** - Responsive UI Components

### Other:
- **Redis** – Backend caching and task queuing
- **Celery** – Asynchronous task queue for background jobs
- **MailHog** – SMTP server simulator for email testing

## Setup:

1. **Clone the Repository**
   ```bash
   git clone https://github.com/chirag2314/ServiceMasterApp-Pro.git
   cd ServiceMasterApp-Pro
   ```

2. **Create a Virtual Environment & Install Requirements**
   ```bash
   python3 -m venv venv
   . venv/bin/activate
   pip install -r requirements.txt
   ```
3. **Run Redis Server**
   Make sure Redis is installed and running:
   ```bash
   redis-server
   ```

4. **Start Celery Worker**
   ```bash
   celery -A app:celery_app worker -l INFO
   ```

5. **Run MailHog (for email testing)**
   - Download MailHog: https://github.com/mailhog/MailHog
   - Run it:
     ```bash
     .go/bin/MailHog
     ```

3. **Start the Flask Application**
   ```bash
   flask run
   ```

## Contact
Created by [Chirag](https://www.linkedin.com/in/chirag2301/) 
Feel free to make issues/PRs to improve the project and reach out for feedback!
