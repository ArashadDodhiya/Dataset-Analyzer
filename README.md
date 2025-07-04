# 🧠 Dataset Analyzer Web Tool

An end-to-end full-stack platform for automatic **data exploration**, **visualization**, and **insight generation**. Upload a dataset (CSV/Excel), and instantly get a breakdown of its structure, statistics, visualizations, data quality, and even AI-powered project ideas based on its contents.

---

## 🚀 Features

### 📁 Upload & Input
- Upload `.csv` or `.xlsx` datasets
- Preview the first few rows of the data
- File validation and error handling

### 📊 EDA (Exploratory Data Analysis)
- Data shape, column types, unique values
- Summary stats: mean, median, mode, std deviation
- Missing value analysis with heatmaps
- Outlier detection using Z-score / IQR

### 📈 Visualizations
- Histograms & bar charts
- Correlation matrix heatmap
- Boxplots for outliers
- Pie charts for categorical distribution

### 📋 Data Quality Report
- Duplicate detection
- Data type mismatches
- High-cardinality columns
- Empty or constant columns

### 🤖 “What Can I Build?” Suggestions
- ML task suggestions (classification, regression, etc.)
- Project ideas based on column types
- Dashboard and visualization recommendations

### 📤 Report Export
- Download reports as PDF or HTML
- Export individual charts

---

## 🛠 Tech Stack

### ⚙️ Backend
- Node.js + Express (REST API, Auth, File handling)
- Python + Flask (EDA, stats, plots)

### 🖥 Frontend
- Vite + React.js 
- Tailwind CSS

### 🗃 Database
- MongoDB 

### 📦 Others
- Multer (file uploads)
- Pandas, Matplotlib, Seaborn (Python analysis)
- Chart.js / Recharts (frontend visualizations)



