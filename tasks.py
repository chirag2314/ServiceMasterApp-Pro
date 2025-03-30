from celery import shared_task
import time
import flask_excel as excel
from models import ServiceRequest

@shared_task
def add(x,y):
    time.sleep(15)
    return x+y

@shared_task(ignore_result = False)
def create_csv():
    srdata = ServiceRequest.query.with_entities(ServiceRequest.cuser, ServiceRequest.servicereqid, ServiceRequest.puser, ServiceRequest.status).all()
    csv_out = excel.make_response_from_query_sets(srdata, ['servicereqid', 'cuser', 'puser', 'status'], 'csv')

    with open('./downloads/file.csv','wb') as file:
        file.write(csv_out.data)

    return 'file.csv'