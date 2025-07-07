import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split, cross_val_score, GridSearchCV
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.linear_model import LinearRegression
from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor
from sklearn.svm import SVR
from sklearn.metrics import mean_squared_error, r2_score, mean_absolute_error
import warnings
warnings.filterwarnings('ignore')

print("=== SALARY PREDICTION PROJECT ===")
print("Analyzing factors that influence salary predictions")
print("=" * 50)

# Create synthetic salary dataset
np.random.seed(42)
n_samples = 1000

# Generate synthetic data
data = {
    'age': np.random.normal(35, 10, n_samples).astype(int),
    'years_experience': np.random.exponential(5, n_samples),
    'education_level': np.random.choice(['Bachelor', 'Master', 'PhD', 'High School'], n_samples, p=[0.4, 0.3, 0.15, 0.15]),
    'job_title': np.random.choice(['Software Engineer', 'Data Scientist', 'Manager', 'Analyst', 'Consultant'], n_samples, p=[0.25, 0.2, 0.2, 0.2, 0.15]),
    'company_size': np.random.choice(['Small', 'Medium', 'Large'], n_samples, p=[0.3, 0.4, 0.3]),
    'location': np.random.choice(['New York', 'San Francisco', 'Chicago', 'Austin', 'Seattle'], n_samples, p=[0.25, 0.25, 0.2, 0.15, 0.15])
}

# Create DataFrame
df = pd.DataFrame(data)

# Generate salary based on features (with some realistic correlations)
base_salary = 50000
df['salary'] = (
    base_salary +
    df['years_experience'] * 3000 +
    df['age'] * 500 +
    df['education_level'].map({'High School': 0, 'Bachelor': 15000, 'Master': 25000, 'PhD': 35000}) +
    df['job_title'].map({'Analyst': 0, 'Consultant': 10000, 'Software Engineer': 20000, 'Manager': 25000, 'Data Scientist': 30000}) +
    df['company_size'].map({'Small': 0, 'Medium': 10000, 'Large': 20000}) +
    df['location'].map({'Chicago': 0, 'Austin': 5000, 'Seattle': 10000, 'New York': 15000, 'San Francisco': 20000}) +
    np.random.normal(0, 10000, n_samples)
)

# Ensure positive salaries
df['salary'] = np.maximum(df['salary'], 30000)

print("Dataset created successfully!")
print(f"Dataset shape: {df.shape}")
print("\nFirst 5 rows:")
print(df.head())

print("\n=== DATA EXPLORATION ===")
print("\nDataset Info:")
print(df.info())

print("\nStatistical Summary:")
print(df.describe())

print("\nSalary Distribution by Education Level:")
print(df.groupby('education_level')['salary'].agg(['mean', 'median', 'std']).round(2))

print("\nSalary Distribution by Job Title:")
print(df.groupby('job_title')['salary'].agg(['mean', 'median', 'std']).round(2))

print("\nCorrelation Matrix (Numerical Features):")
numerical_cols = ['age', 'years_experience', 'salary']
correlation_matrix = df[numerical_cols].corr()
print(correlation_matrix.round(3))

print("\n=== DATA PREPROCESSING ===")

# Handle categorical variables
label_encoders = {}
categorical_columns = ['education_level', 'job_title', 'company_size', 'location']

df_encoded = df.copy()
for col in categorical_columns:
    le = LabelEncoder()
    df_encoded[col] = le.fit_transform(df[col])
    label_encoders[col] = le
    print(f"Encoded {col}: {dict(zip(le.classes_, le.transform(le.classes_)))}")

# Prepare features and target
X = df_encoded.drop('salary', axis=1)
y = df_encoded['salary']

print(f"\nFeatures shape: {X.shape}")
print(f"Target shape: {y.shape}")

# Split the data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
print(f"Training set size: {X_train.shape[0]}")
print(f"Test set size: {X_test.shape[0]}")

# Scale the features
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

print("\nFeatures scaled successfully!")

print("\n=== MODEL TRAINING ===")

# Initialize models
models = {
    'Linear Regression': LinearRegression(),
    'Random Forest': RandomForestRegressor(n_estimators=100, random_state=42),
    'Gradient Boosting': GradientBoostingRegressor(n_estimators=100, random_state=42),
    'Support Vector Regression': SVR(kernel='rbf')
}

# Train and evaluate models
results = {}

for name, model in models.items():
    print(f"\nTraining {name}...")
    
    # Use scaled data for SVR, original for tree-based models
    if name == 'Support Vector Regression':
        model.fit(X_train_scaled, y_train)
        y_pred = model.predict(X_test_scaled)
    else:
        model.fit(X_train, y_train)
        y_pred = model.predict(X_test)
    
    # Calculate metrics
    mse = mean_squared_error(y_test, y_pred)
    rmse = np.sqrt(mse)
    mae = mean_absolute_error(y_test, y_pred)
    r2 = r2_score(y_test, y_pred)
    
    results[name] = {
        'MSE': mse,
        'RMSE': rmse,
        'MAE': mae,
        'R2': r2,
        'model': model
    }
    
    print(f"  RMSE: ${rmse:,.2f}")
    print(f"  MAE: ${mae:,.2f}")
    print(f"  R²: {r2:.4f}")

print("\n=== MODEL COMPARISON ===")
print("Model Performance Summary:")
print("-" * 60)
print(f"{'Model':<25} {'RMSE':<12} {'MAE':<12} {'R²':<8}")
print("-" * 60)

for name, metrics in results.items():
    print(f"{name:<25} ${metrics['RMSE']:<11,.0f} ${metrics['MAE']:<11,.0f} {metrics['R2']:<8.4f}")

# Find best model
best_model_name = min(results.keys(), key=lambda x: results[x]['RMSE'])
best_model = results[best_model_name]['model']

print(f"\nBest Model: {best_model_name}")
print(f"Best RMSE: ${results[best_model_name]['RMSE']:,.2f}")

print("\n=== FEATURE IMPORTANCE ===")
if hasattr(best_model, 'feature_importances_'):
    feature_importance = pd.DataFrame({
        'feature': X.columns,
        'importance': best_model.feature_importances_
    }).sort_values('importance', ascending=False)
    
    print("Feature Importance (Top Features):")
    print(feature_importance.head(10))
elif hasattr(best_model, 'coef_'):
    feature_importance = pd.DataFrame({
        'feature': X.columns,
        'coefficient': best_model.coef_
    })
    feature_importance['abs_coefficient'] = abs(feature_importance['coefficient'])
    feature_importance = feature_importance.sort_values('abs_coefficient', ascending=False)
    
    print("Feature Coefficients (Top Features):")
    print(feature_importance.head(10))

print("\n=== SALARY PREDICTIONS ===")

# Make predictions for sample profiles
sample_profiles = [
    {
        'age': 28,
        'years_experience': 3,
        'education_level': 'Bachelor',
        'job_title': 'Software Engineer',
        'company_size': 'Large',
        'location': 'San Francisco'
    },
    {
        'age': 35,
        'years_experience': 8,
        'education_level': 'Master',
        'job_title': 'Data Scientist',
        'company_size': 'Medium',
        'location': 'New York'
    },
    {
        'age': 42,
        'years_experience': 15,
        'education_level': 'PhD',
        'job_title': 'Manager',
        'company_size': 'Large',
        'location': 'Seattle'
    }
]

print("Sample Salary Predictions:")
print("-" * 80)

for i, profile in enumerate(sample_profiles, 1):
    # Encode the profile
    profile_encoded = profile.copy()
    for col in categorical_columns:
        if col in profile_encoded:
            profile_encoded[col] = label_encoders[col].transform([profile_encoded[col]])[0]
    
    # Create DataFrame for prediction
    profile_df = pd.DataFrame([profile_encoded])
    
    # Make prediction
    if best_model_name == 'Support Vector Regression':
        profile_scaled = scaler.transform(profile_df)
        predicted_salary = best_model.predict(profile_scaled)[0]
    else:
        predicted_salary = best_model.predict(profile_df)[0]
    
    print(f"\nProfile {i}:")
    for key, value in profile.items():
        print(f"  {key.replace('_', ' ').title()}: {value}")
    print(f"  Predicted Salary: ${predicted_salary:,.2f}")

print("\n=== CROSS-VALIDATION RESULTS ===")
print("5-Fold Cross-Validation Scores:")

for name, model in models.items():
    if name == 'Support Vector Regression':
        cv_scores = cross_val_score(model, X_train_scaled, y_train, cv=5, scoring='neg_mean_squared_error')
    else:
        cv_scores = cross_val_score(model, X_train, y_train, cv=5, scoring='neg_mean_squared_error')
    
    cv_rmse = np.sqrt(-cv_scores)
    print(f"{name}: RMSE = ${cv_rmse.mean():,.2f} (+/- ${cv_rmse.std() * 2:,.2f})")

print("\n=== HYPERPARAMETER TUNING ===")
print("Performing Grid Search for Random Forest...")

# Grid search for Random Forest
param_grid = {
    'n_estimators': [50, 100, 200],
    'max_depth': [10, 20, None],
    'min_samples_split': [2, 5, 10]
}

rf_grid = GridSearchCV(
    RandomForestRegressor(random_state=42),
    param_grid,
    cv=3,
    scoring='neg_mean_squared_error',
    n_jobs=-1
)

rf_grid.fit(X_train, y_train)

print(f"Best parameters: {rf_grid.best_params_}")
print(f"Best cross-validation score: ${np.sqrt(-rf_grid.best_score_):,.2f}")

# Final model evaluation
final_model = rf_grid.best_estimator_
final_predictions = final_model.predict(X_test)
final_rmse = np.sqrt(mean_squared_error(y_test, final_predictions))
final_r2 = r2_score(y_test, final_predictions)

print(f"Final model test RMSE: ${final_rmse:,.2f}")
print(f"Final model test R²: {final_r2:.4f}")

print("\n=== PROJECT SUMMARY ===")
print("✅ Dataset created with 1,000 salary records")
print("✅ Exploratory data analysis completed")
print("✅ Data preprocessing and encoding finished")
print("✅ Multiple models trained and compared")
print(f"✅ Best model identified: {best_model_name}")
print("✅ Feature importance analyzed")
print("✅ Sample predictions generated")
print("✅ Cross-validation performed")
print("✅ Hyperparameter tuning completed")

print(f"\n🎯 Final Model Performance:")
print(f"   • RMSE: ${final_rmse:,.2f}")
print(f"   • R²: {final_r2:.4f}")
print(f"   • This means our model can predict salaries within ~${final_rmse:,.0f} on average")

print("\n" + "=" * 50)
print("SALARY PREDICTION PROJECT COMPLETED!")
print("=" * 50)
