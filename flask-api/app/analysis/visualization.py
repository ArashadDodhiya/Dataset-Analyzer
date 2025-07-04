import pandas as pd
import numpy as np
import base64
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import seaborn as sns
import io

# Utility: Convert Matplotlib plot to base64 string
def fig_to_base64():
    buf = io.BytesIO()
    plt.savefig(buf, format='png', bbox_inches='tight')
    buf.seek(0)
    image_base64 = base64.b64encode(buf.read()).decode('utf-8')
    buf.close()
    return image_base64

# Generate visualizations dictionary
def generate_visualizations(df):
    visualizations = {}

    # Histograms for numeric columns
    numeric_cols = df.select_dtypes(include=[np.number]).columns
    for col in numeric_cols:
        visualizations[f'Histogram - {col}'] = create_histogram(df, col)
        visualizations[f'Boxplot - {col}'] = create_boxplot(df, col)

    # Bar charts for categorical columns (low cardinality)
    categorical_cols = df.select_dtypes(include=['object', 'category']).columns
    for col in categorical_cols:
        if df[col].nunique() <= 10:
            visualizations[f'Bar Chart - {col}'] = create_barchart(df, col)
        elif df[col].nunique() <= 2:
            visualizations[f'Pie Chart - {col}'] = create_pie_chart(df, col)

    # Correlation heatmap
    if len(numeric_cols) >= 2:
        visualizations['Correlation Heatmap'] = create_correlation_heatmap(df[numeric_cols])

    # Missing value heatmap
    if df.isnull().sum().sum() > 0:
        visualizations['Missing Values Heatmap'] = create_missing_value_heatmap(df)

    return visualizations

# === Individual Chart Creators ===

def create_histogram(df, column):
    plt.figure(figsize=(8, 6))
    sns.histplot(df[column].dropna(), kde=True, color='skyblue', edgecolor='black')
    plt.title(f'Distribution of {column}')
    plt.xlabel(column)
    plt.ylabel('Frequency')
    img = fig_to_base64()
    plt.close()
    return img

def create_boxplot(df, column):
    plt.figure(figsize=(6, 4))
    sns.boxplot(x=df[column].dropna(), color='lightgreen')
    plt.title(f'Boxplot of {column}')
    plt.xlabel(column)
    img = fig_to_base64()
    plt.close()
    return img

def create_barchart(df, column):
    plt.figure(figsize=(8, 6))
    df[column].value_counts().plot(kind='bar', color='orange')
    plt.title(f'Count of each category in {column}')
    plt.xlabel(column)
    plt.ylabel('Count')
    img = fig_to_base64()
    plt.close()
    return img

def create_pie_chart(df, column):
    plt.figure(figsize=(6, 6))
    df[column].value_counts().plot.pie(autopct='%1.1f%%', startangle=90, colors=sns.color_palette("pastel"))
    plt.title(f'Pie Chart for {column}')
    plt.ylabel('')
    img = fig_to_base64()
    plt.close()
    return img

def create_correlation_heatmap(df):
    plt.figure(figsize=(10, 8))
    corr = df.corr(numeric_only=True)
    sns.heatmap(corr, annot=True, cmap='coolwarm', fmt=".2f", square=True)
    plt.title('Correlation Heatmap')
    img = fig_to_base64()
    plt.close()
    return img

def create_missing_value_heatmap(df):
    plt.figure(figsize=(12, 6))
    sns.heatmap(df.isnull(), cbar=False, cmap='viridis')
    plt.title('Missing Values Heatmap')
    img = fig_to_base64()
    plt.close()
    return img
