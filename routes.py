from flask import render_template_string, render_template, Flask, request, jsonify
from flask_security import auth_required, current_user, roles_required
from flask_security import SQLAlchemySessionUserDatastore
from flask_security.utils import hash_password

def create_views(app : Flask, user_datastore : SQLAlchemySessionUserDatastore, db ):

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
            user_datastore.create_user(email=email, passwordhash=hash_password(password), roles=[role], name=name, active=active, contact=contact, pincode=pincode, experience=experience, service_id=service)
            db.session.commit()
        except:
            print('error while creating')
            db.session.rollback()
            return jsonify({'message' : 'error while creating user'}), 408
        return jsonify({'message' : 'user created'}), 200