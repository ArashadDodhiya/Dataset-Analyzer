from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename
from .analysis.eda import perform_eda
from .analysis.statistics import calculate_statistics
from .analysis.visualization import generate_visualizations
from .analysis.ml_suggestions import get_ml_suggestions
from .utils.file_processing import process_uploaded_file
import os

analysis_blueprint = Blueprint('analysis', __name__)

@analysis_blueprint.route('/analyze', methods=['POST'])
def analyze():
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    
    try:
        # Process uploaded file
        df, file_info = process_uploaded_file(file)
        
        # Perform analysis based on request
        analysis_type = request.form.get('analysis_type', 'full')
        
        result = {
            'file_info': file_info,
            'analysis_type': analysis_type
        }
        
        if analysis_type in ['eda', 'full']:
            result['eda'] = perform_eda(df)
        
        if analysis_type in ['stats', 'full']:
            result['statistics'] = calculate_statistics(df)
        
        if analysis_type in ['viz', 'full']:
            result['visualizations'] = generate_visualizations(df)
        
        if analysis_type in ['ml', 'full']:
            result['ml_suggestions'] = get_ml_suggestions(df)
            
        return jsonify(result)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
