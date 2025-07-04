import pandas as pd
import numpy as np

def calculate_statistics(df):
    numeric_cols = df.select_dtypes(include=[np.number]).columns
    stats = {}
    
    for col in numeric_cols:
        stats[col] = {
            'mean': float(df[col].mean()),
            'median': float(df[col].median()),
            'std': float(df[col].std()),
            'min': float(df[col].min()),
            'max': float(df[col].max()),
            'percentiles': {
                '25': float(df[col].quantile(0.25)),
                '50': float(df[col].quantile(0.5)),
                '75': float(df[col].quantile(0.75))
            }
        }
    
    return stats