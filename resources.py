from flask_restful import Api, Resource, fields, reqparse, marshal_with
from flask_security import auth_required
from models import db, Service, User, ServiceRequest, UserRoles, Role

api=Api(prefix='/api')

parser = reqparse.RequestParser()

parser.add_argument('id', type=int)
parser.add_argument('name',type=str)
parser.add_argument('description', type=str)
parser.add_argument('price',type=int)
parser.add_argument('time', type=int)


services_fields = {
    'id': fields.Integer,
    'name': fields.String,
    'description': fields.String,
    'price': fields.Integer,
    'time': fields.Integer
}

class ServiceResources(Resource):
    @marshal_with(services_fields)
    def get(self):
        all_resources=Service.query.all()
        return all_resources
    
    @marshal_with(services_fields)
    def post(self):
        args=parser.parse_args()
        services=Service(name=args.name, description=args.description, price=args.price, time=args.time)
        db.session.add(services)
        db.session.commit()
        return {'message' : 'service created'}, 200
     
api.add_resource(ServiceResources, '/services')

class ServiceResourceForDelete(Resource):
    @marshal_with(services_fields)
    def get(self,id):
        all_resources=Service.query.get(id)
        return all_resources
    
    @marshal_with(services_fields)
    def post(self, id):
        service=Service.query.get(id)
        if not service:
            return {'message' : 'invalid service'}, 404
        db.session.delete(service)
        db.session.commit()
        return {'message' : 'service deleted'}, 200
        
api.add_resource(ServiceResourceForDelete, '/deleteservice/<int:id>')

class ServiceResourceForEdit(Resource):
    @marshal_with(services_fields)
    def get(self,id):
        all_resources=Service.query.get(id)
        return all_resources
    
    @marshal_with(services_fields)
    def post(self, id):
        args=parser.parse_args()
        service=Service.query.get(id)
        if not service:
            return {'message' : 'invalid service'}, 404
        service.name=args.name
        service.description=args.description
        service.price=args.price
        service.time=args.time        
        db.session.commit()
        return {'message' : 'service updated'}, 200
        
api.add_resource(ServiceResourceForEdit, '/editservice/<int:id>')

parser.add_argument('id', type=int)
parser.add_argument('email',type=str)
parser.add_argument('name', type=str)
parser.add_argument('pincode',type=str)
parser.add_argument('contact', type=int)
parser.add_argument('serviceid', type=int)
parser.add_argument('experience', type=int)
parser.add_argument('active', type=int)

professional_fields = {
    'id' : fields.Integer,
    'email': fields.String,
    'name': fields.String,
    'pincode': fields.String,
    'contact': fields.Integer,
    'serviceid': fields.Integer,
    'experience': fields.Integer,
    'active': fields.String
}

class ProfessionalData(Resource):
    @marshal_with(professional_fields)
    def get(self):
        all_professionals = User.query.join(UserRoles).join(Role).filter(Role.name == 'professional').all()
        return all_professionals
    
api.add_resource(ProfessionalData, '/professionals')

servicerequest_fields = {
    'servicereqid' : fields.Integer,
    'cuser' : fields.Integer,
    'puser' : fields.Integer,
    'service_id' : fields.Integer,
    'requestdate' : fields.DateTime,
    'completedate' : fields.DateTime,
    'status' : fields.String,
    'rating' : fields.String,
    'review' : fields.String
}

class ServiceRequestData(Resource):
    @marshal_with(servicerequest_fields)
    def get(self):
        all_servicerequests = ServiceRequest.query.all()
        return all_servicerequests
    
api.add_resource(ServiceRequestData, '/servicerequests')