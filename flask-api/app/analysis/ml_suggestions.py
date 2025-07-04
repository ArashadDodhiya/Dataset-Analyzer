import pandas as pd
import numpy as np
from sklearn.preprocessing import LabelEncoder

def get_ml_suggestions(df):
    suggestions = {
        'possible_problems': [],
        'target_suggestions': [],
        'feature_engineering': []
    }
    
    # Check for classification problems
    categorical_cols = df.select_dtypes(include=['object', 'category']).columns
    for col in categorical_cols:
        if 2 <= df[col].nunique() <= 10:
            suggestions['possible_problems'].append(
                f"Binary/Multi-class classification with target '{col}'"
            )
            suggestions['target_suggestions'].append(col)
    
    # Check for regression problems
    numeric_cols = df.select_dtypes(include=[np.number]).columns
    for col in numeric_cols:
        if df[col].nunique() > 10:
            suggestions['possible_problems'].append(
                f"Regression problem with target '{col}'"
            )
            suggestions['target_suggestions'].append(col)
    
    # Feature engineering suggestions
    for col in numeric_cols:
        suggestions['feature_engineering'].append(
            f"Consider scaling/normalization for '{col}'"
        )
    
    for col in categorical_cols:
        suggestions['feature_engineering'].append(
            f"Consider one-hot encoding for '{col}'"
        )
    
    return suggestions