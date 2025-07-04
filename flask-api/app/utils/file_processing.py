import pandas as pd
import os
from werkzeug.utils import secure_filename

ALLOWED_EXTENSIONS = {'csv', 'xlsx', 'xls'}

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def process_uploaded_file(file):
    if not allowed_file(file.filename):
        raise ValueError('File type not allowed')
    
    filename = secure_filename(file.filename)
    file_ext = filename.rsplit('.', 1)[1].lower()
    
    # Read file based on extension
    if file_ext == 'csv':
        df = pd.read_csv(file)
    elif file_ext in ['xlsx', 'xls']:
        df = pd.read_excel(file)
    else:
        raise ValueError('Unsupported file format')
    
    # Basic file info
    file_info = {
        'filename': filename,
        'extension': file_ext,
        'columns': list(df.columns),
        'row_count': len(df),
        'column_count': len(df.columns)
    }
    
    return df, file_info