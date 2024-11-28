from flask_restful import Api, Resource, fields, reqparse, marshal_with
from flask_security import auth_required
from models import db, Service, User, ServiceRequest

api=Api(prefix='/api')

parser = reqparse.RequestParser()


services_fields = {
    'id': fields.Integer,
    'name': fields.String,
    'description': fields.String,
    'price': fields.Integer,
    'time': fields.Integer
}

class ServiceResources(Resource):
    @auth_required()
    @marshal_with(services_fields)

    def get(self):
        all_resources=Service.query.all()
        return all_resources
    
    def post(self):
        args=parser.parse_args()
        services=Service(**args)
        db.session.add(services)
        db.session.commit()
        return {'message' : 'resource created'}, 200
    
api.add_resource(ServiceResources, '/services')