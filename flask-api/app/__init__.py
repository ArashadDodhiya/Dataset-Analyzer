from flask import Flask
from flask_cors import CORS
from .routes import analysis_blueprint

def create_app():
    app = Flask(__name__)
    CORS(app)
    
    # Load configuration
    app.config.from_pyfile('../config.py')
    
    # Register blueprints
    app.register_blueprint(analysis_blueprint)
    
    return app