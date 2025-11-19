import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report

# 1. LOAD THE DATA
# We read the csv file you provided
try:
    df = pd.read_csv('shopping_behavior_updated (1).csv')
    print("✅ Data Loaded Successfully")
except FileNotFoundError:
    print("❌ File not found. Please make sure 'shopping_behavior_updated (1).csv' is in the same folder.")
    exit()

# 2. PREPROCESSING (Cleaning & Encoding)
print("\n--- Starting Preprocessing ---")

# We don't need 'Customer ID' to predict behavior, it's just a random number.
if 'Customer ID' in df.columns:
    df = df.drop('Customer ID', axis=1)

# These are the columns that contain Text (Categorical) data
categorical_cols = [
    'Gender', 'Item Purchased', 'Location', 'Size', 'Color', 
    'Season', 'Subscription Status', 'Shipping Type', 
    'Discount Applied', 'Promo Code Used', 'Payment Method', 
    'Frequency of Purchases'
]

# We use a Dictionary to save our encoders so we can see what numbers mapped to what words later
encoders = {}

for col in categorical_cols:
    # Initialize a label encoder for each column
    le = LabelEncoder()
    # Fit and transform the data (e.g., turn "Small", "Medium", "Large" into 0, 1, 2)
    df[col] = le.fit_transform(df[col])
    # Save the encoder for later use
    encoders[col] = le

print("✅ Text columns converted to numbers.")

# 3. DEFINE TARGET AND FEATURES
# X is what we use to predict (Features)
# y is what we want to predict (Target) -> 'Category'
X = df.drop('Category', axis=1)
y = df['Category']

# Split data: 80% for Training, 20% for Testing
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

print(f"Training with {len(X_train)} customers. Testing on {len(X_test)} customers.")

# 4. TRAIN THE MODEL
print("\n--- Training Random Forest Classifier ---")
# Initialize the Brain (Random Forest)
model = RandomForestClassifier(n_estimators=100, random_state=42)

# Teach the Brain
model.fit(X_train, y_train)
print("✅ Model Trained!")

# 5. EVALUATION
# Let the model guess the categories for the Test set
predictions = model.predict(X_test)

# Calculate accuracy
accuracy = accuracy_score(y_test, predictions)
print(f"\n🎯 Model Accuracy: {accuracy * 100:.2f}%")

print("\n--- Detailed Report ---")
print(classification_report(y_test, predictions))

print("\n--- Feature Importance ---")
# This shows us which columns were most useful for the prediction
importances = pd.DataFrame({
    'Feature': X.columns,
    'Importance': model.feature_importances_
}).sort_values(by='Importance', ascending=False)

print(importances.head(10))