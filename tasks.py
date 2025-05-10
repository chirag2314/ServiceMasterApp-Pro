from celery import shared_task
import time
import flask_excel as excel
from jinja2 import Template
from models import ServiceRequest, User
from mail_service import send_email
from datetime import datetime

@shared_task(ignore_result = False)
def create_csv():
    srdata = ServiceRequest.query.with_entities(ServiceRequest.cuser, ServiceRequest.servicereqid, ServiceRequest.puser, ServiceRequest.status).all()
    csv_out = excel.make_response_from_query_sets(srdata, ['servicereqid', 'cuser', 'puser', 'status'], 'csv')

    with open('./downloads/file.csv','wb') as file:
        file.write(csv_out.data)

    return 'file.csv'

@shared_task(ignore_result = True)
def daily_reminder():
    professionals = User.query.join(User.roles).filter_by(name='professional').all()
    for professional in professionals:
        pending_requests = ServiceRequest.query.filter_by(puser=professional.id, status='Requested').all()
        if pending_requests:
            with open('daily_reminder.html', 'r') as f:
                template = Template(f.read())
            return send_email(professional.email,"Daily Reminder: Pending Service Requests",template.render(name=professional.name))
    send_email("to", "sub", "message")

@shared_task(ignore_result = True)
def monthly_email():

    professionals = User.query.join(User.roles).filter_by(name='professional').all()
    for professional in professionals:
        month = datetime.utcnow().replace(day=1)  
        all_sr = ServiceRequest.query.filter(ServiceRequest.puser == professional.id,ServiceRequest.requestdate >= month).all()
        closed_sr = ServiceRequest.query.filter(ServiceRequest.puser == professional.id,ServiceRequest.completedate >= month,ServiceRequest.status == "Closed").all()
        with open('monthly_email.html', 'r') as f:
            template = Template(f.read())
        report = template.render(name=professional.name,requested_sr=all_sr,closed_sr=closed_sr)
        send_email(professional.email,"Monthly Report",report)
    send_email("to", "sub", "message")