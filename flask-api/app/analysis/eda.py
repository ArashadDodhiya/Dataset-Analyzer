import pandas as pd
import numpy as np

def perform_eda(df):
    results = {
        'shape': df.shape,
        'columns': [],
        'missing_values': {},
        'duplicates': int(df.duplicated().sum()),
        'memory_usage': df.memory_usage(deep=True).sum() / (1024 * 1024)  # in MB
    }
    
    for column in df.columns:
        col_info = {
            'name': column,
            'dtype': str(df[column].dtype),
            'unique_values': int(df[column].nunique()),
            'sample_data': df[column].head().tolist()
        }
        
        # Add missing values count
        missing = df[column].isnull().sum()
        col_info['missing_values'] = {
            'count': int(missing),
            'percentage': float(missing / len(df) * 100)
        }
        results['missing_values'][column] = col_info['missing_values']
        
        results['columns'].append(col_info)
    
    return results