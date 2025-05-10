from datetime import datetime
from flask import render_template_string, render_template, Flask, request, jsonify, send_file
from flask_security import auth_required, current_user, roles_required
from flask_security import SQLAlchemySessionUserDatastore
from flask_security.utils import hash_password, verify_password
from models import ServiceRequest
from celery.result import AsyncResult
from tasks import create_csv

def create_views(app : Flask, user_datastore : SQLAlchemySessionUserDatastore, db ,cache):

    @app.route('/start-export')
    def start_export():
        task = create_csv.delay()
        return jsonify({'task_id' : task.id})
    
    @app.route('/get-csv/<task_id>')
    def get_csv(task_id):
        result = AsyncResult(task_id)
        if result.ready():
            return send_file('./downloads/file.csv')
        else:
            return "task not ready", 405

    @app.route('/get-task/<task_id>')
    def get_task(task_id):
        result = AsyncResult(task_id)
        if result.ready():
            return jsonify({'result' : result.result}), 200
        else:
            return "task not ready", 405

    @app.route('/')
    def index():
        return render_template('index.html')

    @app.route('/register', methods=['POST'])
    def register_post():
        data=request.get_json()
        email=data.get('email')
        password=data.get('password')
        name=data.get('name')
        role=data.get('role')
        contact=data.get('contact')
        pincode=data.get('pincode')
        experience=None
        service=None
        if role=='professional':
            experience = data.get('experience')
            service = data.get('service')
        if user_datastore.find_user(email=email):
            return jsonify({"message" : "user already exists"})
        if role == 'professional':
            active = 'Pending'
        elif role == 'customer':
            active = 'Approved'
        try:    
            user_datastore.create_user(email=email, password=hash_password(password), roles=[role], name=name, active=active, contact=contact, pincode=pincode, experience=experience, service_id=service)
            db.session.commit()
        except:
            print('error while creating')
            db.session.rollback()
            return jsonify({'message' : 'error while creating user'}), 408
        return jsonify({'message' : 'user created'}), 200
    
    @app.route('/mylogin', methods=['POST'])
    def login():
        data=request.get_json()
        email=data.get('email')
        password=data.get('password')
        if not email or not password:
            return jsonify({'message' : 'invalid email or password'}), 404
        user=user_datastore.find_user(email = email)
        if not user:
            return jsonify({'message' : 'invalid user'}), 404
        
        if verify_password(password, user.password):
                return jsonify({'token': user.get_auth_token(), 'id': user.id, 'email': user.email, 'role': user.roles[0].name, 'name':user.name , 'active':user.active}), 200
        else:
            return jsonify({'message' : 'wrong password'})
        
    @app.route('/cbookaservice', methods=['POST'])
    @roles_required('customer')
    @auth_required('token')
    def book_service_post():
        data=request.get_json()

        try:
            requestdate = datetime.strptime(data.get('requestdate'), "%d/%m/%Y").date()
            servicedate = datetime.strptime(data.get('servicedate'), "%Y-%m-%d").date()
        except ValueError as e:
            print(f"Error parsing dates: {e}")
            return jsonify({'message': 'Invalid date format'}), 400

        cuser=data.get('cuser')
        sid=data.get('service_id')
        puser=data.get('puser')
        print(requestdate)
        print(servicedate)
        servreq=ServiceRequest(cuser=cuser,puser=puser,service_id=sid,requestdate=requestdate,servicedate=servicedate,status='Requested')
        try:
            db.session.add(servreq)
            db.session.commit()
            return jsonify({'message' : 'SR created'}), 200
        except Exception as e:
            db.session.rollback()
            print(f"Error: {e}")
            return jsonify({'message' : 'error while creating SR'}), 408
        
    @app.route('/ccloseservice/<int:srid>', methods=['POST'])
    @roles_required('customer')
    @auth_required('token')
    def close_service_post(srid):
        data=request.get_json()
        rating=data.get('rating')
        review=data.get('review')
        servreq=ServiceRequest.query.get(srid)
        servreq.rating=rating
        servreq.review=review
        servreq.completedate=datetime.today().date()
        servreq.status='Closed'
        try:
            db.session.commit()
            return jsonify({'message' : 'SR Closed'}), 200
        except:
            db.session.rollback()
            return jsonify({'message' : 'error while closing SR'}), 408
        
    @app.route('/peditservicerequest/<int:srid>', methods=['POST'])
    @roles_required('professional')
    @auth_required('token')
    def edit_service_post(srid):
        data=request.get_json()
        status=data.get('status')
        servreq=ServiceRequest.query.get(srid)
        servreq.status=status
        if(status=='Closed'):
            servreq.completedate=datetime.today().date()
        try:
            db.session.commit()
            return jsonify({'message' : 'SR modified'}), 200
        except:
            db.session.rollback()
            return jsonify({'message' : 'error while editing SR'}), 408

    @app.route('/edituser/<int:uid>', methods=['POST'])
    @auth_required('token')
    def edit_user(uid):
        data=request.get_json()
        user=user_datastore.find_user(id = uid)
        user.password=hash_password(data.get('password'))
        try:
            db.session.commit()
            return jsonify({'message' : 'password modified'}), 200
        except:
            db.session.rollback()
            return jsonify({'message' : 'error while changing password'}), 408
        
    @app.route('/ceditservicerequest/<int:srid>', methods=['POST'])
    @roles_required('customer')
    @auth_required('token')
    def edit_servicerequest_post(srid):
        data=request.get_json()
        servicedate = datetime.strptime(data.get('servicedate'), "%Y-%m-%d").date()
        servreq=ServiceRequest.query.get(srid)
        servreq.servicedate=servicedate
        try:
            db.session.commit()
            return jsonify({'message' : 'SR modified'}), 200
        except:
            db.session.rollback()
            return jsonify({'message' : 'error while editing SR'}), 408